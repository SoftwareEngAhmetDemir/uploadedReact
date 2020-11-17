import React, { forwardRef, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../Context/AuthContext';
import UploadImgView from '../helpers/uploadImgView.helper';
import UploadPdfView from '../helpers/uploadPdfView.helper';

import Moment from 'moment';

import MaterialTable from 'material-table';
import Select2 from '@material-ui/core/Select';

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
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  InputLabel,
} from '@material-ui/core';

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
  Save,
} from '@material-ui/icons';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import tr from 'date-fns/locale/tr';

import '../../assets/css/style.css';
let ENDPOINT = ''

export default function EstateCreate(props) {
  const [t] = useTranslation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { user, gState, seTgState } = useContext(AuthContext);

  const [estateProps, seTestateProps] = useState([]);
  const [dataCity, seTdataCity] = useState([]);
  const [dataDistrict, seTdataDistrict] = useState([]);
  const [dataNeighborhoods, seTdataNeighborhoods] = useState([]);
  const [active, seTactive] = useState(true);
  const [dataBank, seTdataBank] = useState([]);
  const [dataChance, seTdataChance] = useState([]);
  const [gropBoxOpen, seTgropBoxOpen] = useState(false);

  const [dataProps, seTdataProps] = useState({});

  const [state, seTstate] = useState({
    no: '',
    title: '',
    created: Date.now(),
    start_price: 0,
    now_price: 0,
    part_price: 0,
    start_date: Date.now(),
    end_date: Date.now(),
    note: '',
    video_embed: '',
    images: [],
    pdf: '',
    text: '',
    selectedChance: [{ label: 'Seçim Yapılmamış', value: 'Seçim Yapılmamış' }],
    selectedDefaultBank: [
      { label: 'Seçim Yapılmamış', value: 'Seçim Yapılmamış' },
    ],
    selectedDefaultCity: [
      { label: 'Seçim Yapılmamış', value: 'Seçim Yapılmamış' },
    ],
    selectedDefaultDistrict: [
      { label: 'Seçim Yapılmamış', value: 'Seçim Yapılmamış' },
    ],
    selectedDefaultNeighborhoods: [
      { label: 'Seçim Yapılmamış', value: 'Seçim Yapılmamış' },
    ],
    chance_category: '',
    selectedCategoryItems: [],
    findCategory: [],
  });

  const [category, setCategory] = useState({
    name: '',
  });

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

  /* Add Category */
  /* --------------- */
  const saveHandleNewCategory = () => {
    const data = {
      name: category.name,
    };

    axios
      .post(ENDPOINT+'/estatecategory/add', data)
      .then((res) => {
        if (res.data.variant == 'error') {
          enqueueSnackbar(t('Estate Category Not Added') + res.data.messagge, {
            variant: res.data.variant,
          });
        } else {
          enqueueSnackbar(t('Estate Category Added'), {
            variant: res.data.variant,
          });
        }

        getEstateCategories();
      })
      .catch((err) => console.log(err));

    seTgropBoxOpen(false);
  };
  const handleClickOpenGroup = () => {
    seTgropBoxOpen(true);
  };

  const handleCategoryBoxClose = () => {
    seTgropBoxOpen(false);
  };

  function getEstateCategories() {
    axios
      .get(ENDPOINT+'/estatecategory')
      .then((res) => {
        if (res.data.length > 0) {
          const details = [];
          for (const i in res.data) {
            details.push({
              label: res.data[i].name,
              value: res.data[i]._id,
            });
          }
          seTstate({ ...category, findCategory: details });
        }
      })
      .catch((err) => console.log(err));
  }
  /* --------------- */

  const handleChangeEstateProps_dropdown = (event) => {
    seTdataProps({
      ...dataProps,
      [event.value.value]: event.label,
    });

    console.log(dataProps);
  };

  const handleChangeEstateProps_input = (event) => {
    seTdataProps({
      ...dataProps,
      [event.target.name]: event.target.value,
    });

    console.log(dataProps);
  };

  const handleChangeEstateProps_checkbox = (event) => {
    if (dataProps[event.target.name]) {
      var change = dataProps[event.target.name];
    } else {
      var change = {};
    }
    change[event.target.value] = event.target.checked;
    console.log(change);
    seTdataProps({
      ...dataProps,
      [event.target.name]: change,
    });

    // console.log(dataProps);
  };

  const handleChangeBank = (selectedOption) => {
    seTstate({
      ...state,
      selectedDefaultBank: [
        { label: selectedOption.label, value: selectedOption.label },
      ],
    });
  };
  const handleChangeChance = (selectedOption) => {
    seTstate({
      ...state,
      selectedChance: [
        { label: selectedOption.label, value: selectedOption.label },
      ],
    });
  };

  const handleChangeCity = (selectedOption) => {
    console.log(selectedOption.value[2]);

    axios
      .get(ENDPOINT+'/city/district/' + selectedOption.value[2])
      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          const details = [];
          for (const i in response.data) {
            details.push({
              label: response.data[i].ilce_title,
              value: [
                response.data[i].ilce_title,
                response.data[i].ilce_id,
                response.data[i].ilce_key,
              ],
            });
          }
          seTdataDistrict(details);
        }
      })
      .catch((err) => console.log(err));

    seTstate({
      ...state,
      selectedDefaultCity: [
        { label: selectedOption.label, value: selectedOption.label },
      ],
    });
  };
  const handleChangeDistrict = (selectedOption) => {
    axios
      .get(ENDPOINT+'/city/neighborhood/' + selectedOption.value[2])
      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          const details = [];
          for (const i in response.data) {
            details.push({
              label: response.data[i].mahalle_title,
              value: [
                response.data[i].mahalle_title,
                response.data[i].mahalle_id,
                response.data[i].mahalle_ilcekey,
              ],
            });
          }
          seTdataNeighborhoods(details);
        }
      })
      .catch((err) => console.log(err));

    seTstate({
      ...state,
      selectedDefaultDistrict: [
        { label: selectedOption.label, value: selectedOption.label },
      ],
    });
  };
  const handleChangeNeighborhoods = (selectedOption) => {
    seTstate({
      ...state,
      selectedDefaultNeighborhoods: [
        { label: selectedOption.label, value: selectedOption.label },
      ],
    });
  };
  // default adress func end
  function getCityF() {
    axios
      .get(ENDPOINT+'/city')
      .then((response) => {
        if (response.data.length > 0) {
          const details = [];
          for (const i in response.data) {
            details.push({
              label: response.data[i].sehir_title,
              value: [
                response.data[i].sehir_title,
                response.data[i].sehir_id,
                response.data[i].sehir_key,
              ],
            });
          }
          seTdataCity(details);
        }
      })
      .catch((err) => console.log(err));
  }

  function getbankF() {
    axios
      .get(ENDPOINT+'/banks')
      .then((response) => {
        if (response.data.length > 0) {
          const details = [];
          for (const i in response.data) {
            details.push({
              label: response.data[i].name,
              value: [response.data[i].name, response.data[i].code],
            });
          }
          seTdataBank(details);
          console.log(details);
        }
      })
      .catch((err) => console.log(err));
  }

  function getEstatepropsF() {
    axios
      .get(ENDPOINT+'/estateprops')
      .then((response) => {
        if (response.data.length > 0) {
          seTestateProps(response.data);
        }
      })
      .catch((err) => console.log(err));
  }

  function getChanceF() {
    seTdataChance([
      {
        label: 'Mülke Özel Fırsat',
        value: { label: 'Mülke Özel Fırsat', value: 1 },
      },
      {
        label: 'Fiyatı Düşen Badge',
        value: { label: 'Fiyatı Düşen Badge', value: 2 },
      },
      {
        label: 'Son Eklenenlere Ekle',
        value: { label: 'Son Eklenenlere Ekle', value: 3 },
      },
    ]);
  }

  // componentDidMount = useEffect
  useEffect(() => {
    getCityF();
    getEstatepropsF();
    getbankF();
    getChanceF();
    getEstateCategories();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    let imgpath = [];
    let pdfpath = state.pdf;

    if (gState.uploadPictures) {
      console.log(gState.uploadPictures);
      const data = new FormData();
      for (var x = 0; x < gState.uploadPictures.length; x++) {
        data.append('file', gState.uploadPictures[x]);
      }

      await axios
        .post(ENDPOINT+'/uploadimg/uploadimg/' + 'estate', data)
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            var t = res.data[i].path.replace('..\\public', '');
            t = t.replace('build', '');
            imgpath.push(t);
          }
        })
        .catch((err) => {
          console.log('upload fail' + err);
        });

      seTgState({ ...gState, uploadPictures: '' });
    }

    console.log(imgpath);

    if (gState.uploadPdf) {
      const data = new FormData();
      for (var x = 0; x < gState.uploadPdf.length; x++) {
        data.append('file', gState.uploadPdf[x]);
      }

      await axios
        .post(ENDPOINT+'/uploadimg/uploadimg/' + 'estatepdf', data)
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            pdfpath = res.data[i].path.replace('build', '');
          }
        })
        .catch((err) => {
          console.log('pdf upload fail');
        });
      seTgState({ ...gState, uploadPdf: '' });
    }

    const Estate = {
      created_user: { name: user.name, id: user.id },
      title: state.title,
      active: active,
      city: state.selectedDefaultCity,
      town: state.selectedDefaultDistrict,
      neighborhood: state.selectedDefaultNeighborhoods,
      bank_id: state.selectedDefaultBank,
      note: state.note,
      created: state.created,
      props: dataProps,
      start_price: state.start_price,
      part_price: state.part_price,
      now_price: state.now_price,
      start_date: state.start_date,
      end_date: state.end_date,
      video_embed: state.video_embed,
      images: imgpath,
      chance: state.selectedChance,
      pdf: pdfpath,
      chance_category: state.selectedCategoryItems,
      text: state.text,
    };

    axios
      .post(ENDPOINT+'/estate/add', Estate)
      .then((res) => {
        if (res.data.variant === 'error') {
          enqueueSnackbar(t('Emlak Eklenemedi') + res.data.messagge, {
            variant: res.data.variant,
          });
        } else {
          enqueueSnackbar(t('Emlak Eklendi') + res.data.messagge, {
            variant: res.data.variant,
          });
          // navigate
          history.push('/panel/estatelist');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='containerP'>
      <ValidatorForm autoComplete='off' onSubmit={onSubmit}>
        <Grid item container spacing={3}>
          <Grid item container md={8} className='panelGridRelative'>
            <Card className='panelLargeIcon'>
              <Receipt fontSize='large' />
            </Card>
            <Card className='listViewPaper'>
              <Typography
                component='h1'
                variant='h6'
                color='inherit'
                noWrap
                className='typography'
              >
                {t('Emlak Oluştur')}
              </Typography>
              <FormControlLabel
                style={{ float: 'right' }}
                control={
                  <Switch
                    checked={active}
                    onChange={() => {
                      seTactive(!active);
                    }}
                    color='primary'
                  />
                }
                label={t(active ? 'Aktif' : 'Pasif')}
              />

              <Grid item container sm={12} spacing={4}>
                <Grid item sm={8}>
                  <FormGroup className='FormGroup'>
                    <FormControl>
                      <TextValidator
                        variant='outlined'
                        margin='dense'
                        label={t('İlan Başlığı')}
                        value={state.title}
                        onChange={(e) => {
                          seTstate({
                            ...state,
                            title: e.target.value,
                          });
                        }}
                      />
                      <FormHelperText>
                        {t('İlan için bir başlık belirleyiniz.')}
                      </FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>

                <Grid item sm={4}>
                  <FormGroup className='FormGroup'>
                    <FormControl>
                      <label className='selectLabel'>{t('Banka')}</label>
                      <Select
                        placeholder={t('Emlağın Ait olduğu Banka')}
                        value={state.selectedDefaultBank}
                        options={dataBank}
                        onChange={handleChangeBank}
                      />
                      <FormHelperText>
                        {t('Emlağın Ait olduğu Bankayı seçiniz')}
                      </FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid container item sm={4}>
                  <Grid item sm={12}>
                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <label className='selectLabel'>{t('Şehir')}</label>
                        <Select
                          placeholder={t('Şehir Seçiniz')}
                          value={state.selectedDefaultCity}
                          options={dataCity}
                          onChange={handleChangeCity}
                        />
                        <FormHelperText>{t('İl Seçiniz')}</FormHelperText>
                      </FormControl>
                    </FormGroup>

                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <label className='selectLabel'>{t('İlçe')}</label>
                        <Select
                          placeholder={t('İlçe Seçiniz')}
                          value={state.selectedDefaultDistrict}
                          options={dataDistrict}
                          onChange={handleChangeDistrict}
                        />
                        <FormHelperText>{t('İlçe Seçiniz')}</FormHelperText>
                      </FormControl>
                    </FormGroup>

                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <label className='selectLabel'>{t('Mahalle')}</label>
                        <Select
                          placeholder={t('Mahalle Seçiniz')}
                          value={state.selectedDefaultNeighborhoods}
                          options={dataNeighborhoods}
                          onChange={handleChangeNeighborhoods}
                        />
                        <FormHelperText>{t('Mahalle Seçiniz')}</FormHelperText>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                </Grid>

                <Grid container item sm={4}>
                  <Grid item sm={12}>
                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <TextValidator
                          variant='outlined'
                          margin='dense'
                          label={t('İhale Başlangıç Tutarı')}
                          value={state.start_price}
                          onChange={(e) => {
                            seTstate({
                              ...state,
                              start_price: e.target.value,
                              now_price: e.target.value,
                            });
                          }}
                          validators={['isNumber']}
                          errorMessages={[t('Rakamlardan oluşmalı')]}
                        />
                        <FormHelperText>
                          {t('İhale Başlangıç Tutarı')}
                        </FormHelperText>
                      </FormControl>
                    </FormGroup>

                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <TextValidator
                          variant='outlined'
                          margin='dense'
                          label={t('Katılım Bedeli ')}
                          value={state.part_price}
                          onChange={(e) => {
                            seTstate({
                              ...state,
                              part_price: e.target.value,
                            });
                          }}
                          validators={['isNumber']}
                          errorMessages={[t('Rakamlardan oluşmalı')]}
                        />
                        <FormHelperText>
                          {t('İhaleye Giriş İçin Yatırılacak Tutar ')}
                        </FormHelperText>
                      </FormControl>
                    </FormGroup>

                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <TextValidator
                          variant='outlined'
                          margin='dense'
                          label={t('Şu Anki fiyatı')}
                          value={state.now_price}
                          disabled={true}
                        />
                        <FormHelperText>
                          {t('İhale yapılan emlağın son fiyatı')}
                        </FormHelperText>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                </Grid>

                <Grid container item sm={4}>
                  <Grid item sm={12}>
                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <label className='selectLabel'>{t('Şans')}</label>
                        <Select
                          placeholder={t('Emlağın Ait olduğu Fırsatlar')}
                          value={state.selectedChance}
                          options={dataChance}
                          onChange={handleChangeChance}
                        />
                        <FormHelperText>
                          {t(
                            'Mülke Özel Fırsat/Fiyatı Düşen/Son Eklenenlere Ekle'
                          )}
                        </FormHelperText>
                      </FormControl>
                    </FormGroup>

                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <MuiPickersUtilsProvider
                          utils={DateFnsUtils}
                          locale={tr}
                        >
                          <KeyboardDatePicker
                            inputVariant='outlined'
                            margin='dense'
                            id='date-picker-dialog'
                            label={t('Başlangıç')}
                            format='dd/MM/yyyy'
                            value={state.start_date}
                            onChange={(date) =>
                              seTstate({
                                ...state,
                                start_date: date,
                              })
                            }
                            KeyboardButtonProps={{
                              'aria-label': 'Tarih Seçiniz',
                            }}
                          />
                        </MuiPickersUtilsProvider>
                        <FormHelperText>
                          {t('İhale başlangıç tarihi')}
                        </FormHelperText>
                      </FormControl>
                    </FormGroup>
                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <MuiPickersUtilsProvider
                          utils={DateFnsUtils}
                          locale={tr}
                        >
                          <KeyboardDatePicker
                            inputVariant='outlined'
                            margin='dense'
                            id='date-picker-dialog'
                            label={t('Bitiş')}
                            format='dd/MM/yyyy'
                            value={state.end_date}
                            onChange={(date) =>
                              seTstate({
                                ...state,
                                end_date: date,
                              })
                            }
                            KeyboardButtonProps={{
                              'aria-label': 'Tarih Seçiniz',
                            }}
                          />
                        </MuiPickersUtilsProvider>
                        <FormHelperText>
                          {t('İhale Bitiş tarihi')}
                        </FormHelperText>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                </Grid>
                <Grid container item sm={4} spacing={0}>
                  <Grid container item sm={1} spacing={0}>
                    <Tooltip title={t('addNewCategory')}>
                      <AddBox
                        onClick={handleClickOpenGroup}
                        fontSize='large'
                        style={{
                          margin: '20px 10px 0 5px',
                        }}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid container item sm={11} spacing={0}>
                    <div
                      style={{
                        marginTop: '0px',
                        clear: 'both',
                      }}
                    />
                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <Select
                          isMulti
                          placeholder={t('selectCategory')}
                          value={state.selectedCategoryItems}
                          options={state.findCategory}
                          onChange={(selectedOption) => {
                            seTstate({
                              ...state,
                              selectedCategoryItems: selectedOption,
                            });
                          }}
                        />
                        {console.log(state.findCategory)}
                        <FormHelperText>
                          {t('You Can Select Categories')}
                        </FormHelperText>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                </Grid>

                <Grid item sm={12}>
                  <FormGroup className='FormGroup'>
                    <FormControl>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        id='outlined-textarea'
                        label={t('Açıklama')}
                        multiline
                        margin='normal'
                        variant='outlined'
                        style={{
                          width: '100%',
                          float: 'left',
                        }}
                        value={state.note}
                        onChange={(e) => {
                          seTstate({
                            ...state,
                            note: e.target.value,
                          });
                        }}
                      />
                      <FormHelperText>{t('İlan Açıklaması')}</FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>

                <Grid item sm={12}>
                  <FormGroup className='FormGroup'>
                    <FormControl>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        id='outlined-textarea'
                        label={t('Video Embed Kodu')}
                        multiline
                        margin='normal'
                        variant='outlined'
                        style={{
                          width: '100%',
                          float: 'left',
                        }}
                        value={state.video_embed}
                        onChange={(e) => {
                          seTstate({
                            ...state,
                            video_embed: e.target.value,
                          });
                        }}
                      />
                      <FormHelperText>
                        {t('Video Embed Kodunu yapıştırınız')}
                      </FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item sm={12}>
                  <FormGroup className='FormGroup'>
                    <FormControl>
                      <TextValidator
                        id='outlined-textarea'
                        label={t('Notes')}
                        multiline
                        margin='normal'
                        variant='outlined'
                        labelWidth={60}
                        style={{
                          width: '100%',
                          height: '55px',
                        }}
                        value={state.text}
                        onChange={(e) => {
                          seTstate({
                            ...state,
                            text: e.target.value,
                          });
                        }}
                      />
                      <FormHelperText>{t('Not Bırakın')}</FormHelperText>
                    </FormControl>
                  </FormGroup>
                </Grid>
              </Grid>
            </Card>
            <div className='saveButtonPlace'>
              <Button type='submit' className='glow-on-hover'>
                <Save fontSize='small' style={{ marginRight: '15px' }} />
                {t('save')}
              </Button>
            </div>
          </Grid>
          <Grid container item md={4} className='panelGridRelative'>
            <Grid item sm={12}>
              <FormGroup className='FormGroup'>
                <FormControl>
                  <UploadImgView singleImage={false} />
                </FormControl>
              </FormGroup>
            </Grid>
            <Card className='listViewPaper' style={{ padding: '25px' }}>
              {estateProps.map((data) => {
                if (data.type == 'Checkbox') {
                  return (
                    <div
                      key={data.text}
                      style={{ width: '100%', marginBottom: '20px' }}
                    >
                      <FormControl
                        component='fieldset'
                        style={{ width: '100%' }}
                      >
                        <FormLabel component='legend'>
                          {data.view_name}
                        </FormLabel>
                        <FormGroup style={{ width: '100%', display: 'block' }}>
                          {data.items.map((data2) => (
                            <FormControlLabel
                              style={{ width: '45%', float: 'left' }}
                              key={data2.item_name}
                              required
                              control={
                                <Checkbox
                                  onChange={handleChangeEstateProps_checkbox}
                                  key={data2.item_name}
                                  value={data2.item_name}
                                  name={data.text}
                                />
                              }
                              label={data2.item_view_name}
                            />
                          ))}
                        </FormGroup>
                        <FormHelperText>{data.view_text}</FormHelperText>
                      </FormControl>
                    </div>
                  );
                } else if (data.type == 'Dropdown') {
                  return (
                    <div
                      key={data.text}
                      style={{ width: '100%', marginBottom: '20px' }}
                    >
                      <FormGroup className='FormGroupAdress'>
                        <FormControl>
                          <label className='selectLabel'>
                            {data.view_name}
                          </label>
                          <Select
                            placeholder={data.view_name}
                            required
                            options={data.items.map((data2) => ({
                              label: data2.item_view_name,
                              value: {
                                label: data2.item_view_name,
                                value: data.text,
                              },
                            }))}
                            onChange={handleChangeEstateProps_dropdown}
                          />
                          <FormHelperText>{data.view_name}</FormHelperText>
                        </FormControl>
                      </FormGroup>
                    </div>
                  );
                } else if (data.type == 'Input') {
                  return (
                    <div
                      key={data.text}
                      style={{ width: '100%', marginBottom: '20px' }}
                    >
                      <FormGroup className='FormGroupAdress'>
                        <FormControl>
                          <TextValidator
                            variant='outlined'
                            margin='dense'
                            required
                            label={data.view_name}
                            name={data.text}
                            onChange={handleChangeEstateProps_input}
                          />
                          <FormHelperText>{data.view_name}</FormHelperText>
                        </FormControl>
                      </FormGroup>
                    </div>
                  );
                }
              })}

              <FormGroup className='FormGroup'>
                <FormControl>
                  <UploadPdfView buttonText='PDF Yükleyin' single={false} />
                </FormControl>
              </FormGroup>
            </Card>
          </Grid>
        </Grid>
      </ValidatorForm>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={gropBoxOpen}
        onClose={handleCategoryBoxClose}
      >
        <DialogTitle>{t('Add New Category')}</DialogTitle>
        <DialogContent>
          <FormControl className='FormControl' style={{ width: '100%' }}>
            <InputLabel htmlFor='group'>{t('Category Name')}</InputLabel>
            <Input
              id='group'
              value={category.name}
              onChange={(e) => {
                setCategory({
                  ...category,
                  name: e.target.value,
                });
              }}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCategoryBoxClose} color='primary'>
            {t('cancel')}
          </Button>
          <Button onClick={saveHandleNewCategory} color='primary'>
            {t('save')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
