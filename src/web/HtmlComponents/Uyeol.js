import React, { Component, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { withSnackbar, useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withNamespaces, useTranslation } from 'react-i18next';
import ImageUploader from 'react-images-upload';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import tr from 'date-fns/locale/tr';

import { AuthContext } from '../../panel/Context/AuthContext';

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
let ENDPOINT = 'https://serverbigfilserve.herokuapp.com'

function Uyeol() {
  const [t] = useTranslation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [openalert, seTopenalert] = useState(false);
  const { isAuthenticated, user } = useContext(AuthContext);
  const [dataCity, seTdataCity] = useState([]);
  const [dataDistrict, seTdataDistrict] = useState([]);
  const [dataNeighborhoods, seTdataNeighborhoods] = useState([]);
  const [permissions, seTpermissions] = useState([
    {
      customers: true,
    },
  ]);

  const [state, seTstate] = useState({
    username: '',
    name: '',
    surname: '',
    password: '',
    phone: '',
    created_user: '',
    tckn: '',
    group_id: 0,
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
    repeatPassword: '',
    onay: false,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const Staff = {
      created_user: { name: 'Register Page', id: 'Register Page' },
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
      estates: '',
      docs: '',
      city: state.selectedDefaultCity,
      neighborhood: state.selectedDefaultNeighborhoods,
      town: state.selectedDefaultDistrict,
      zipcode: state.zipcode,
      address: state.address,
    };

    axios
      .post(ENDPOINT+`/staff/add/register`, Staff)
      .then((res) => {
        console.log(res.data);
        if (res.data.variant == 'error') {
          enqueueSnackbar(
            t('Bir hata oluştu, girdiğiniz bilgileri kontrol ediniz') +
            res.data.messagge,
            { variant: res.data.variant }
          );
        } else {

          const mailingData = {

            "username": state.username,
            "title": "Yeni Üyelik Oluşturuldu",
            "text": `<div> Merhaba aşağıdaki bilgilerle bir üyelik oluşturuldu <br /> Adı Soyadı ${state.name} ${state.surname}<br /> Mail Adresi:${state.username}  </div> `
          }

          axios.post(ENDPOINT+`/sendmail/adminsmail`, mailingData)

          enqueueSnackbar(t('Üyeliğiniz oluşturuldu, giriş yapabilirsiniz.'), {
            variant: res.data.variant,
          });
          history.push('/giris');
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== state.password) {
        return false;
      }
      return true;
    });
  }, [state]);
  return (
    <section id='signUp' style={{ marginTop: '50px' }}>
      <div className='container'>
        <div className='row'>
          <div className='justify-content-center sign-wrapper'>
            <div className='signUp-img float-left col-12 col-md-6 p-0'>
              <img src='img/logo.svg' alt='#' />
              <div className='content'>
                <h2>MERHABA</h2>
                <h3>
                  Üyeliğinizi Tamamlamak için Yandaki Bigileri Eksiksiz
                  Dodlurunuz.
                </h3>
              </div>
            </div>
            <div className='col-md-6 float-left col-12 signUp-form'>
              <h1>Üye Ol</h1>
              <ValidatorForm autoComplete='off' onSubmit={onSubmit}>
                <Grid item container sm={12}>
                  <Grid item container sm={6}>
                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <TextValidator
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
                          validators={['required']}
                          errorMessages={[t('Bu Alan Zorunlu')]}
                        />
                        <FormHelperText>{t('You need Name')}</FormHelperText>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item container sm={6}>
                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <TextValidator
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
                          validators={['required']}
                          errorMessages={[t('Bu Alan Zorunlu')]}
                        />
                        <FormHelperText>{t('You need Surname')}</FormHelperText>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item container sm={12}>
                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <TextValidator
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
                          validators={['required']}
                          errorMessages={[t('Bu Alan Zorunlu')]}
                        />
                        <FormHelperText>{t('You need E-mail')}</FormHelperText>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item container sm={6}>
                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <TextValidator
                          variant='outlined'
                          margin='dense'
                          label={t('Password')}
                          type='password'
                          value={state.password}
                          onChange={(e) => {
                            seTstate({
                              ...state,
                              password: e.target.value,
                            });
                          }}
                          validators={['required']}
                          errorMessages={[t('Bu Alan Zorunlu')]}
                        />
                        <FormHelperText>
                          {t('You need a password')}
                        </FormHelperText>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item container sm={6}>
                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <TextValidator
                          variant='outlined'
                          margin='dense'
                          label={t('Password')}
                          onChange={(e) => {
                            seTstate({
                              ...state,
                              repeatPassword: e.target.value,
                            });
                          }}
                          name='repeatPassword'
                          type='password'
                          validators={['isPasswordMatch', 'required']}
                          errorMessages={[
                            'Şifreler Eşleşmiyor',
                            'Bu Alan Zorunlu',
                          ]}
                          value={state.repeatPassword}
                        />
                        <FormHelperText>
                          {t('Şifrenizi Tekrardan Girin')}
                        </FormHelperText>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item container sm={12}>
                    <FormGroup className='FormGroup'>
                      <FormControl style={{ width: '100%' }}>
                        <PhoneInput
                          inputStyle={{
                            width: '100%',
                            padding: '4px 0px 4px 45px',
                            marginBottom: '15px',
                          }}
                          inputProps={{
                            required: true,
                          }}
                          placeholder='+90 555 222 34 34'
                          country={'tr'}
                          value={state.phone}
                          onChange={(phone) =>
                            seTstate({ ...state, phone: phone })
                          }
                          required
                        />
                        <FormHelperText>
                          {t('Cep Telefonu numaranızı giriniz')}
                        </FormHelperText>
                      </FormControl>
                    </FormGroup>
                  </Grid>
                  <Grid item container sm={6}>
                    <FormGroup className='FormGroup'>
                      <FormControl>
                        <TextValidator
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
                          validators={[
                            'isNumber',
                            'required',
                            'minNumber:11',
                            'maxNumber:11',
                          ]}
                          errorMessages={[
                            t('Rakamlardan oluşmalı', 'Bu Alan Zorunlu'),
                          ]}
                        />
                        <FormHelperText>
                          {t('TC kimlik numaranızı giriniz.')}
                        </FormHelperText>
                      </FormControl>
                    </FormGroup>
                  </Grid>

                  <Grid item container sm={6}>
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
                  </Grid>
                </Grid>
                <div style={{ height: '50px', clear: 'both' }}></div>
                <input
                  id='kvkk'
                  type='checkbox'
                  onChange={(e) => {
                    seTstate({ ...state, onay: !state.onay });
                    console.log(state.onay);
                  }}
                />

                <a href='#'>
                  <span>KVKK</span> Metnini Okudum ve Onaylıyorum
                </a>
                <div style={{ height: '40px', clear: 'both' }}></div>

                <button
                  type='submit'
                  onClick={onSubmit}
                  disabled={state.onay ? false : true}
                >
                  ÜYE OL
                </button>
              </ValidatorForm>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Uyeol;
