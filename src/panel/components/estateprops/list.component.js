import React, { Component, forwardRef, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import MaterialTable, { MTableToolbar } from "material-table";
import { useTranslation } from "react-i18next";
import Moment from "moment";

import { Doughnut } from "react-chartjs-2";

import {
  DialogActions,
  DialogContent,
  Button,
  Dialog,
  Card,
  Tooltip,
  Grid,
  Typography,
} from "@material-ui/core";

import {
  Settings,
  Edit,
  GroupAdd,
  AddBox,
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
} from "@material-ui/icons";

import "../../assets/css/style.css";
let ENDPOINT = "";

export default function InvoicesList(props) {
  const [t] = useTranslation();
  const history = useHistory();
  const pieColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#cc65fe",
    "#445ce2",
    "#e244b1",
    "#0c3836",
    "#51e4b5",
    "#ff0000",
    "#6eff00",
    "#00ffe7",
    "#28a743",
    "#ff00c8",
    "#063361",
    "#1f77b4",
    "#e377c2",
    "#ff7f0e",
    "#2ca02c",
    "#bcbd22",
    "#d62728",
    "#17becf",
    "#9467bd",
    "#7f7f7f",
    "#8c564b",
    "#3366cc",
  ];
  const customergroups_label = [{ title: t("groupName"), field: "name" }];
  const [state, seTstate] = useState({});
  const [open, seTopen] = useState(false);
  const [customergroups, seTcustomergroups] = useState([]);
  const [data, seTdata] = useState([]);
  const [payments, seTpayments] = useState([]);
  const [payment_id, seTpayment_id] = useState(0);

  const payments_label = [
    { title: t("Amount"), field: "amount" },
    {
      title: t("Paid Date"),
      field: "paid_date",
      render: (rowData) => {
        return (
          <div>{Moment(rowData.paid_date).format("DD/MM/YYYY HH:MM")}</div>
        );
      },
    },
  ];
  const columns = [
    {
      title: t("Sıra"),
      field: "order",
    },
    {
      title: t("Görünen Yazı"),
      field: "view_name",
    },
    {
      title: t("Alan Tipi"),
      field: "type",
    },
    {
      title: t("actions"),
      field: "_id",
      render: (rowData) => (
        <div>
          <Link to={`/panel/EstateProps/edit/${rowData._id}`}>
            <Edit />
          </Link>
        </div>
      ),
    },
  ];

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const getPaymentsData = (id) => {
    seTpayment_id(id);
    handleClickOpen();
    axios.get(ENDPOINT + "/invoices/payments/" + id).then((response) => {
      console.log(response.data);
      seTpayments(response.data[0].payments);
    });
  };

  const getInvoicesData = () => {
    axios.get(ENDPOINT + "/estateprops").then((response) => {
      if (response.data.length > 0) {
        seTdata(response.data);
        // console.log(data)
        // console.log(columns)
      }
    });
  };

  // componentDidMount = useEffect
  useEffect(() => {
    getInvoicesData();
  }, []);

  const handleClickOpen = () => {
    seTopen(true);
  };

  const handleClose = () => {
    getInvoicesData();
    seTopen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent style={{ padding: "0" }}>
          <MaterialTable
            title={t("Payments")}
            icons={tableIcons}
            columns={payments_label}
            data={payments}
            options={{
              exportButton: true,
            }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  axios.post(ENDPOINT + `/invoices/addpayments/${payment_id}`, {
                    amount: newData.amount,
                  });

                  payments.push(newData);
                  console.log(payments);
                  seTpayments(payments);
                  getInvoicesData();

                  resolve();
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  axios.post(
                    ENDPOINT + `/invoices/editpayments/${newData._id}`,
                    { amount: newData.amount }
                  );

                  const index = payments.indexOf(oldData);
                  payments[index] = newData;
                  console.log(payments);
                  seTpayments(payments);
                  getInvoicesData();

                  resolve();
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  axios.get(
                    ENDPOINT + `/invoices/deletepayments/${oldData._id}`
                  );

                  const index = payments.indexOf(oldData);
                  payments.splice(index, 1);
                  console.log(payments);
                  seTpayments(payments);
                  getInvoicesData();

                  resolve();
                }),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("okey")}
          </Button>
        </DialogActions>
      </Dialog>
      <div className="containerP">
        <Grid item container spacing={3}>
          <Grid container item md={12} className="panelGridRelative">
            <Card className="panelLargeIcon">
              <Receipt fontSize="large" />
            </Card>
            <Card className="listViewPaper">
              <MaterialTable
                title=""
                icons={tableIcons}
                columns={columns}
                data={data}
                options={{
                  exportButton: true,
                  pageSize: 10,
                  grouping: true,
                }}
                components={{
                  Toolbar: (props) => (
                    <div>
                      <Typography
                        component="h5"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className="typography"
                      >
                        {t("Emlak Özellik Listesi")}
                      </Typography>
                      <Link
                        to="/panel/EstatePropsCreate"
                        className="addButtonPlace"
                      >
                        <Tooltip title={t("createInvoice")}>
                          <AddBox fontSize="large" className="addButtonIcon" />
                        </Tooltip>
                      </Link>
                      <MTableToolbar {...props} />
                      <div style={{ clear: "both" }} />
                    </div>
                  ),
                }}
              />
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
