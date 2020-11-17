import React, { Component, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { withSnackbar, useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withNamespaces, useTranslation } from 'react-i18next';
import ImageUploader from 'react-images-upload';

import { AuthContext } from '../../Context/AuthContext';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import tr from 'date-fns/locale/tr';

import {
  FormControl,
  DialogContentText,
  FormGroup,
  InputLabel,
  Input,
  FormHelperText,
  Card,
  Button,
  Typography,
  TextField,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControlLabel,
  Grid,
  FormLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';

import { AddBox, GroupAdd, Delete, Save } from '@material-ui/icons';

import '../../assets/css/style.css';
let ENDPOINT = ''

export default function ProductEdit(props) {
  const [t] = useTranslation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [openalert, seTopenalert] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [dataCity, seTdataCity] = useState([]);
  const [dataDistrict, seTdataDistrict] = useState([]);
  const [dataNeighborhoods, seTdataNeighborhoods] = useState([]);

  const [state, seTstate] = useState({
    username: '',
    name: '',
    surname: '',
    password: '',
    phone: '',
    created_user: '',
    tckn: '',
    group_id: '',
    birthday: Date.now(),
    gsm: '',
    tel: '',
    estates: '',
    docs: '',
    city: '',
    neighborhood: '',
    town: '',
    zipcode: '',
    address: '',
    text: '',
  });

  const [permissions, seTpermissions] = useState([
    {
      customers: false,

      staffonlyyou: true,
      staffcreate: false,
      staffedit: false,
      stafflist: false,
      staffdelete: false,

      customersonlyyou: true,
      customerscreate: false,
      customersedit: false,
      customerslist: false,
      customersdelete: false,

      productsonlyyou: true,
      productscreate: false,
      productsedit: false,
      productslist: false,
      productsdelete: false,

      bankaccountsonlyyou: true,
      bankaccountscreate: false,
      bankaccountsedit: false,
      bankaccountslist: false,
      bankaccountsdelete: false,

      customersgrouponlyyou: true,
      customersgroupcreate: false,
      customersgroupedit: false,
      customersgrouplist: false,
      customersgroupdelete: false,

      invoicesonlyyou: true,
      invoicescreate: false,
      invoicesedit: false,
      invoiceslist: false,
      invoicesdelete: false,

      paymentsonlyyou: true,
      paymentscreate: false,
      paymentsedit: false,
      paymentslist: false,
      paymentsdelete: false,

      productsCategoriesonlyyou: true,
      productsCategoriescreate: false,
      productsCategoriesedit: false,
      productsCategorieslist: false,
      productsCategoriesdelete: false,
    },
  ]);

  /////////
  const handleChangeCity = (selectedOption) => {
    axios
      .get(ENDPOINT+'/city/district/' + selectedOption.value[2])
      .then((response) => {
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
          console.log(details);
        }
      })
      .catch((err) => console.log(err));
  }

  //////////////

  function getUserData() {
    axios.get(ENDPOINT+`/staff/${props.match.params.id}`).then((response) => {
      seTstate({
        ...state,
        username: response.data.username,
        name: response.data.name,
        surname: response.data.surname,
        phone: response.data.phone,
        tckn: response.data.tckn,
        group_id: response.data.group_id,
        birthday: response.data.birthday,
        tel: response.data.tel,
        estates: response.data.estates,
        docs: response.data.docs,
        selectedDefaultCity: response.data.city,
        selectedDefaultNeighborhoods: response.data.neighborhood,
        selectedDefaultDistrict: response.data.town,
        zipcode: response.data.zipcode,
        address: response.data.address,
        _id: response.data._id,
        text: response.data.text,
      });
      console.log(response.data);
      seTpermissions(response.data.role);
    });
  }

  function updatePassword() {
    const { _id, password } = state;

    axios
      .post(ENDPOINT+`/staff/updatePasswordSuperadmin`, { _id, password })
      .then((res) => {
        if (res.data.variant == 'success') {
          enqueueSnackbar(t('Password Updated '), {
            variant: 'success',
          });
        } else {
          enqueueSnackbar(t('Password Not Updated ') + res.data.messagge, {
            variant: 'error',
          });
        }
      })
      .catch((err) => console.log(err));
  }

  // componentDidMount = useEffect
  useEffect(() => {
    getCityF();
    getUserData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const Staff = {
      username: state.username,
      name: state.name,
      surname: state.surname,
      phone: state.phone,
      password: state.password,
      role: permissions,

      tckn: state.tckn,
      group_id: state.group_id,
      birthday: state.birthday,
      tel: state.tel,
      estates: state.estates,
      docs: state.docs,
      city: state.selectedDefaultCity,
      neighborhood: state.selectedDefaultNeighborhoods,
      town: state.selectedDefaultDistrict,
      zipcode: state.zipcode,
      address: state.address,
      text: state.text,
    };
    console.log(Staff);
    if (user.role[0]['superadmin']) {
      const Staff = {
        username: state.username,
        name: state.name,
        surname: state.surname,
        phone: state.phone,
        password: state.password,
        role: permissions,

        tckn: state.tckn,
        group_id: state.group_id,
        birthday: state.birthday,
        tel: state.tel,
        estates: state.estates,
        docs: state.docs,
        city: state.selectedDefaultCity,
        neighborhood: state.selectedDefaultNeighborhoods,
        town: state.selectedDefaultDistrict,
        zipcode: state.zipcode,
        address: state.address,
        text: state.text,
      };
    } else {
      const Staff = {
        username: state.username,
        name: state.name,
        surname: state.surname,
        phone: state.phone,
        tckn: state.tckn,
        group_id: state.group_id,
        birthday: state.birthday,
        tel: state.tel,
        estates: state.estates,
        docs: state.docs,
        city: state.selectedDefaultCity,
        neighborhood: state.selectedDefaultNeighborhoods,
        town: state.selectedDefaultDistrict,
        zipcode: state.zipcode,
        address: state.address,
        text: state.text,
      };
    }

    if (state.password) {
      updatePassword();
    }

    axios
      .post(ENDPOINT+`/staff/${props.match.params.id}`, Staff)
      .then((res) => {
        if (res.data.variant == 'error') {
          enqueueSnackbar(t('Staff Not Updated ') + res.data.messagge, {
            variant: res.data.variant,
          });
        } else {
          enqueueSnackbar(t('Staff Updated'), {
            variant: res.data.variant,
          });
          history.push('/panel/customerslist');
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteData = (id) => {
    axios.delete(ENDPOINT+`/staff/${id}`).then((res) => {
      enqueueSnackbar(res.data.messagge, {
        variant: res.data.variant,
      });
      history.push('/panel/customerslist');
    });
  };

  return (
    <div className='containerP'>
      <ValidatorForm autoComplete='off' onSubmit={onSubmit}>
        <Grid item container spacing={3}>
          <div className='listViewPaper'>
            <Grid item container md={3} className='panelGridRelative'>
              <Card className='panelLargeIcon'>
                <GroupAdd fontSize='large' />
              </Card>

              <Typography
                component='h1'
                variant='h6'
                color='inherit'
                noWrap
                style={{ width: '100%' }}
                className='typography'
              >
                {t('Müşteri Düzenle')}

                <Tooltip title={t('Delete User')}>
                  <Button
                    variant='outlined'
                    color='primary'
                    style={{
                      float: 'right',
                      marginRight: '115px',
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
                  <DialogTitle>{t('Delete User')}</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {t('deleteInfoText1')}
                      <br />
                      {t('deleteInfoText2')}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        seTopenalert(false);
                      }}
                      color='primary'
                    >
                      {t('cancel')}
                    </Button>
                    <Button
                      onClick={() => {
                        deleteData(state._id);
                      }}
                      color='primary'
                      autoFocus
                    >
                      {t('delete')}
                    </Button>
                  </DialogActions>
                </Dialog>
              </Typography>
              <Grid item container sm={12}>
                <div style={{ clear: 'both' }}></div>

                <FormGroup className='FormGroup'>
                  <FormControl>
                    <TextValidator
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant='outlined'
                      margin='dense'
                      label={t('Name')}
                      value={state.name}
                      onChange={(e) => {
                        seTstate({
                          ...state,
                          name: e.target.value,
                        });
                      }}
                      required
                    />
                    <FormHelperText>{t('You need Name')}</FormHelperText>
                  </FormControl>
                </FormGroup>

                <FormGroup className='FormGroup'>
                  <FormControl>
                    <TextValidator
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant='outlined'
                      margin='dense'
                      label={t('Surname')}
                      value={state.surname}
                      onChange={(e) => {
                        seTstate({
                          ...state,
                          surname: e.target.value,
                        });
                      }}
                      required
                    />
                    <FormHelperText>{t('You need Surname')}</FormHelperText>
                  </FormControl>
                </FormGroup>

                <FormGroup className='FormGroup'>
                  <FormControl>
                    <TextValidator
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant='outlined'
                      margin='dense'
                      label={t('E-mail')}
                      value={state.username}
                      onChange={(e) => {
                        seTstate({
                          ...state,
                          username: e.target.value,
                        });
                      }}
                      required
                    />
                    <FormHelperText>{t('You need E-mail')}</FormHelperText>
                  </FormControl>
                </FormGroup>

                <FormGroup className='FormGroup'>
                  <FormControl>
                    <TextValidator
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant='outlined'
                      margin='dense'
                      label={t('Password')}
                      value={state.password}
                      onChange={(e) => {
                        seTstate({
                          ...state,
                          password: e.target.value,
                        });
                      }}
                    />
                    <FormHelperText>{t('You need a password')}</FormHelperText>
                  </FormControl>
                </FormGroup>
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
              <div className='saveButtonPlace'>
                <Button
                  type='submit'
                  onClick={onSubmit}
                  className='glow-on-hover'
                >
                  <Save fontSize='small' style={{ marginRight: '15px' }} />
                  {t('save')}
                </Button>
              </div>
            </Grid>
            <Grid item container md={3} className='panelGridRelative'>
              <Grid item container sm={12} style={{ marginTop: '50px' }}>
                <FormGroup className='FormGroup'>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Üye Durumu</FormLabel>

                    <RadioGroup
                      row
                      value={state.group_id}
                      onChange={(event) => {
                        seTstate({
                          ...state,
                          group_id: event.target.value,
                        });
                      }}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label='Onaylı'
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label='Onaysız'
                      />
                    </RadioGroup>
                  </FormControl>
                  <div style={{ clear: 'both', height: '3px' }}></div>
                  <FormControl>
                    <TextValidator
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant='outlined'
                      margin='dense'
                      label={t('TC kimlik Numarası')}
                      value={state.tckn}
                      onChange={(e) => {
                        seTstate({
                          ...state,
                          tckn: e.target.value,
                        });
                      }}
                      required
                      validators={['isNumber']}
                      errorMessages={[t('Rakamlardan oluşmalı')]}
                    />
                    <FormHelperText>{t('You need TCKN')}</FormHelperText>
                  </FormControl>
                </FormGroup>
                <FormGroup className='FormGroup'>
                  <FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={tr}>
                      <KeyboardDatePicker
                        inputVariant='outlined'
                        margin='dense'
                        id='date-picker-dialog'
                        label={t('Doğum Tarihi')}
                        format='dd/MM/yyyy'
                        maxDate={new Date()}
                        value={state.birthday}
                        onChange={(date) =>
                          seTstate({
                            ...state,
                            birthday: date,
                          })
                        }
                        KeyboardButtonProps={{
                          'aria-label': 'Tarih Seçiniz',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    <FormHelperText>
                      {t('Doğum tarihini giriniz')}
                    </FormHelperText>
                  </FormControl>
                </FormGroup>
                <FormGroup className='FormGroup'>
                  <FormControl style={{ width: '100%', marginTop: '15px' }}>
                    <FormLabel component='legend'>Gsm</FormLabel>

                    <PhoneInput
                      inputStyle={{ width: '100%' }}
                      placeholder='+90 555 222 34 34'
                      country={'tr'}
                      value={state.phone}
                      onChange={(phone) => seTstate({ ...state, phone: phone })}
                      inputProps={{
                        required: true,
                      }}
                    />
                    <FormHelperText>
                      {t('Cep Telefonu numaranızı giriniz')}
                    </FormHelperText>
                  </FormControl>
                </FormGroup>
                <FormGroup className='FormGroup'>
                  <FormControl style={{ width: '100%', marginTop: '12px' }}>
                    <FormLabel component='legend'>Sabit Telefon</FormLabel>

                    <PhoneInput
                      inputStyle={{ width: '100%' }}
                      placeholder='+90 212 222 34 34'
                      country={'tr'}
                      value={state.tel}
                      onChange={(tel) => seTstate({ ...state, tel: tel })}
                      inputProps={{
                        required: true,
                      }}
                    />
                    <FormHelperText>
                      {t('Sabit Telefon numaranızı giriniz')}
                    </FormHelperText>
                  </FormControl>
                </FormGroup>
                estates: docs: zipcode: address:
              </Grid>
            </Grid>

            <Grid container item sm={4} spacing={5}>
              <Grid item sm={12}>
                <FormGroup className='FormGroup' style={{ marginTop: '50px' }}>
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

                <FormGroup className='FormGroup'>
                  <FormControl>
                    <TextValidator
                      variant='outlined'
                      margin='dense'
                      label={t('Posta Kodu')}
                      value={state.zipcode}
                      onChange={(e) => {
                        seTstate({
                          ...state,
                          zipcode: e.target.value,
                        });
                      }}
                      validators={['isNumber']}
                      errorMessages={[t('Rakamlardan Oluşmalı')]}
                    />
                    <FormHelperText>
                      {t('Posta Koduna İhtiyacınız var')}
                    </FormHelperText>
                  </FormControl>
                </FormGroup>

                <FormGroup className='FormGroup'>
                  <TextValidator
                    id='outlined-textarea'
                    label={t('Adres')}
                    multiline
                    margin='normal'
                    variant='outlined'
                    style={{
                      width: '100%',
                      float: 'left',
                    }}
                    value={state.address}
                    onChange={(e) => {
                      seTstate({
                        ...state,
                        address: e.target.value,
                      });
                    }}
                  />
                  <FormHelperText>
                    {t('Adres Bilgisini Giriniz')}
                  </FormHelperText>
                </FormGroup>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </ValidatorForm>
    </div>
  );
}
