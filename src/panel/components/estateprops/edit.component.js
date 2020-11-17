import React, { forwardRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../Context/AuthContext";

import Moment from "moment";

import MaterialTable from "material-table";
import Select2 from "@material-ui/core/Select";

import {
   FormControl,
   FormGroup,
   FormHelperText,
   Card,
   Button,
   Typography,
   TextField,
   Tooltip,
   FormLabel,
   Switch,
   FormControlLabel,
   InputAdornment,
   RadioGroup,
   Radio,
   TableRow,
   TableCell,
   TableBody,
   Table,
   MenuItem,
   Grid,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogContentText,
   DialogActions,
} from "@material-ui/core";

import {
   AddBox,
   PlaylistAddCheck,
   ContactMail,
   Edit,
   ArrowUpward,
   Check,
   ChevronLeft,
   ChevronRight,
   Clear,
   DeleteOutline,
   FilterList,
   FirstPage,
   LastPage,
   Remove,
   SaveAlt,
   Search,
   ViewColumn,
   Receipt,
   Delete,
   Save,
} from "@material-ui/icons";

import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import tr from "date-fns/locale/tr";

import "../../assets/css/style.css";
let ENDPOINT = ''

export default function EstatePropsEdit(props) {
   const [t] = useTranslation();
   const history = useHistory();
   const { enqueueSnackbar } = useSnackbar();
   const { user } = useContext(AuthContext);
   const [dataType, seTdataType] = useState([
      { label: "Checkbox", value: "Checkbox" },
      { label: "Dropdown", value: "Dropdown" },
      { label: "Input", value: "Input" },
   ]);
   const [openalert, seTopenalert] = useState(false);

   const [dataItems, seTdataItems] = useState([]);
   const [state, seTstate] = useState({
      created: Date.now(),
      name: "",
      view_name: "",
      order: 0,
      selectedDefaultType: [{ label: "Seçim Yapılmamış", value: "Seçim Yapılmamış" }],
   });

   const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
      DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
      ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
   };
   const columns = [
      {
         title: t("İtem Görünen İsmi"),
         field: "item_view_name",
      },
      {
         title: t("İtem Alan İsmi"),
         field: "item_name",
      },
   ];
   const handleChangeType = (selectedOption) => {
      seTstate({
         ...state,
         selectedDefaultType: [{ label: selectedOption.label, value: selectedOption.label }],
      });
   };

   function getEstatePropsData() {
      axios.get(ENDPOINT+`/estateprops/${props.match.params.id}`).then((response) => {
         const details = [];
         for (const i in response.data.group_id) {
            details.push({
               label: response.data.group_id[i].label,
               value: response.data.group_id[i].value,
            });
         }
         seTstate({
            name: response.data.text,
            view_name: response.data.view_name,
            order: response.data.order,
            selectedDefaultType: [{ label: response.data.type, value: response.data.type }],
         });
         seTdataItems(response.data.items);
      });
   }

   // componentDidMount = useEffect
   useEffect(() => {
      getEstatePropsData();
   }, []);

   const onSubmit = (e) => {
      e.preventDefault();

      const EstateProps = {
         created_user: { name: user.name, id: user.id },
         text: state.name,
         type: state.selectedDefaultType[0].label,
         view_name: state.view_name,
         order: state.order,
         items: dataItems,
      };

      axios
         .post(ENDPOINT+`/estateprops/${props.match.params.id}`, EstateProps)
         .then((res) => {
            console.log(res.data);
            if (res.data.variant === "error") {
               enqueueSnackbar(t("Emlak Özelliği Eklendi Eklenemedi"), {
                  variant: res.data.variant,
               });
            } else {
               enqueueSnackbar(t("Emlak Özelliği Eklendi"), {
                  variant: res.data.variant,
               });
               // navigate
               history.push("/panel/EstatePropsList");
            }
         })
         .catch((err) => console.log(err));
   };

   const deleteData = (id) => {
      axios.delete(ENDPOINT+`/estateprops/${props.match.params.id}`).then((res) => {
         enqueueSnackbar(res.data.messagge, {
            variant: res.data.variant,
         });
         history.push("/panel/EstatePropsList");
      });
   };


   return (
      <div className="containerP">
         <ValidatorForm autoComplete="off" onSubmit={onSubmit}>
            <Grid item container spacing={3}>
               <Grid item container md={12} className="panelGridRelative">
                  <Card className="panelLargeIcon">
                     <Receipt fontSize="large" />
                  </Card>
                  <Card className="listViewPaper">
                     <Typography component="h1" variant="h6" color="inherit" noWrap className="typography">
                        {t("Emlak Özelliği Oluştur")}

                        <Tooltip title={t("Silem İşlemi")}>
                           <Button
                              variant="outlined"
                              color="primary"
                              style={{
                                 float: "right",
                                 marginRight: "115px",
                              }}
                              onClick={() => {
                                 seTopenalert(true);
                              }}
                           >
                              <Delete />
                           </Button>

                        </Tooltip>
                        <Dialog
                           open={openalert}
                           onClose={() => {
                              seTopenalert(false);
                           }}
                        >
                           <DialogTitle>{t("Delete User")}</DialogTitle>
                           <DialogContent>
                              <DialogContentText>
                                 {t("deleteInfoText1")}
                                 <br />
                                 {t("deleteInfoText2")}
                              </DialogContentText>
                           </DialogContent>
                           <DialogActions>
                              <Button
                                 onClick={() => {
                                    seTopenalert(false);
                                 }}
                                 color="primary"
                              >
                                 {t("cancel")}
                              </Button>
                              <Button
                                 onClick={() => {
                                    console.log(state._id)
                                    deleteData(state._id);
                                 }}
                                 color="primary"
                                 autoFocus
                              >
                                 {t("delete")}
                              </Button>
                           </DialogActions>
                        </Dialog>
                     </Typography>
                     <Grid item container sm={12} spacing={4}>
                        <Grid item sm={3}>
                           <FormGroup className="FormGroup">
                              <FormControl>
                                 <TextValidator
                                    variant="outlined"
                                    margin="dense"
                                    label={t("Sıra")}
                                    type="number"
                                    value={state.order}
                                    onChange={(e) => {
                                       seTstate({
                                          ...state,
                                          order: e.target.value,
                                       });
                                    }}
                                 />
                                 <FormHelperText>{t("Sıra numarası")}</FormHelperText>
                              </FormControl>
                           </FormGroup>
                        </Grid>

                        <Grid item sm={3}>
                           <FormGroup className="FormGroup">
                              <FormControl>
                                 <label className="selectLabel">{t("Özellik tipi")}</label>
                                 <Select
                                    placeholder={t("Özellik Tipi Seçiniz")}
                                    value={state.selectedDefaultType}
                                    options={dataType}
                                    onChange={handleChangeType}
                                 />
                                 <FormHelperText>{t("Emlağın özellik çeşidini seçiniz örn selectbox")}</FormHelperText>
                              </FormControl>
                           </FormGroup>
                        </Grid>

                        <Grid item sm={3}>
                           <FormGroup className="FormGroup">
                              <FormControl>
                                 <TextValidator
                                    variant="outlined"
                                    margin="dense"
                                    label={t("Alan Adı")}
                                    value={state.name}
                                    onChange={(e) => {
                                       seTstate({
                                          ...state,
                                          name: e.target.value,
                                       });
                                    }}
                                 />
                                 <FormHelperText>{t("Özelliğin alan ismi")}</FormHelperText>
                              </FormControl>
                           </FormGroup>
                        </Grid>

                        <Grid item sm={3}>
                           <FormGroup className="FormGroup">
                              <FormControl>
                                 <TextValidator
                                    variant="outlined"
                                    margin="dense"
                                    label={t("Görülecek İsim")}
                                    value={state.view_name}
                                    onChange={(e) => {
                                       seTstate({
                                          ...state,
                                          view_name: e.target.value,
                                       });
                                    }}
                                 />
                                 <FormHelperText>{t("Özelliğin görünen ismi")}</FormHelperText>
                              </FormControl>
                           </FormGroup>
                        </Grid>

                        <Grid container item sm={12} spacing={0}>
                           <MaterialTable
                              title="İtemler"
                              columns={columns}
                              data={dataItems}
                              icons={tableIcons}
                              style={{ width: "100%", boxShadow: "1px -2px 5px 0px #0000000f" }}
                              options={{
                                 actionsColumnIndex: -1,
                                 paging: false,
                              }}
                              editable={{
                                 onRowAdd: (newData) =>
                                    new Promise((resolve, reject) => {
                                       dataItems.push(newData);
                                       seTdataItems(dataItems);
                                       seTstate({ ...state });
                                       resolve();
                                    }),
                                 onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                       const index = dataItems.indexOf(oldData);
                                       dataItems[index] = newData;
                                       seTdataItems(dataItems);
                                       seTstate({ ...state });

                                       resolve();
                                    }),
                                 onRowDelete: (oldData) =>
                                    new Promise((resolve, reject) => {
                                       const index = dataItems.indexOf(oldData);
                                       dataItems.splice(index, 1);
                                       seTdataItems(dataItems);
                                       seTstate({ ...state });
                                       resolve();
                                    }),
                              }}
                           />
                        </Grid>
                     </Grid>
                  </Card>
                  <div className="saveButtonPlace">
                     <Button type="submit" className="glow-on-hover">
                        <Save fontSize="small" style={{ marginRight: "15px" }} />
                        {t("save")}
                     </Button>
                  </div>
               </Grid>
            </Grid>
         </ValidatorForm>
      </div>
   );
}
