import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../panel/Context/AuthContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { withSnackbar, useSnackbar } from 'notistack';
import { withNamespaces, useTranslation } from 'react-i18next';
import Select from 'react-select';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import tr from 'date-fns/locale/tr';
import { Block } from '@material-ui/icons';
import UploadPdfView from '../../panel/components/helpers/uploadPdfView.helper';
let ENDPOINT = 'https://serverbigfilserve.herokuapp.com'

function Profil(props) {
  const [t] = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { user, gState, seTgState } = useContext(AuthContext);

  const history = useHistory();
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
  });

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      border: '1px solid #ebebeb',
      borderRadius: '4px',
      height: '100%',
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: '80%',
      height: '40px',
      textAlign: 'center',
      display: 'flex',
      border: '1px solid #ebebeb',
      marginTop: '20px',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

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
  console.log(user);
  function getUserData() {
    if (user && user.id !== '') {
      if (user.role[0].customers === true) {
        axios.get(ENDPOINT+`/staff/customer/${user.id}`).then((response) => {
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
            zipcode: response.data.zipcode,
            address: response.data.address,
            _id: response.data._id,
            selectedDefaultCity: response.data.city,
            selectedDefaultNeighborhoods: response.data.neighborhood,
            selectedDefaultDistrict: response.data.town,
            files: response.data.files,
          });
        });
      } else {
        axios.get(ENDPOINT+`/staff/${user.id}`).then((response) => {
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
            zipcode: response.data.zipcode,
            address: response.data.address,
            _id: response.data._id,
            selectedDefaultCity: response.data.city,
            selectedDefaultNeighborhoods: response.data.neighborhood,
            selectedDefaultDistrict: response.data.town,
            files: response.data.files,
          });
          seTpermissions(response.data.role);
        });
      }
    } else {
      history.push('/');
    }
  }

  function updatePassword(_id, password) {
    if (user.role[0].customers === true) {
      axios
        .post(ENDPOINT+`/staff/updatePasswordCustomer`, { _id, password })
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
    } else if (user.role[0].customers === false) {
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
  }

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
  console.log(state);

  useEffect(() => {
    getCityF();
    getUserData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    let pdfpath = [];

    if (state.password) {
      updatePassword(state._id, state.password);
    }

    if (gState.uploadPdf) {
      console.log(gState.uploadPdf);
      const data = new FormData();
      for (var x = 0; x < gState.uploadPdf.length; x++) {
        data.append('file', gState.uploadPdf[x]);
      }

      await axios
        .post(ENDPOINT+'/uploadimg/uploadimg/' + 'userpdf', data)
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            var t = res.data[i].path.replace('..\\public', '');
            t = t.replace('build', '');
            pdfpath.push(t);
          }
        })
        .catch((err) => {
          console.log('upload fail' + err);
        });

      seTgState({ ...gState, uploadPdf: '' });
    }
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
      files: pdfpath,
    };

    if (user.role[0].customers === true) {
      console.log(Staff);
      axios
        .post(ENDPOINT+`/staff/customer/${state._id}`, Staff)
        .then((res) => {
          if (res.data.variant == 'error') {
            enqueueSnackbar(t('Staff Not Updated ') + res.data.messagge, {
              variant: res.data.variant,
            });
          } else {
            enqueueSnackbar(t('Staff Updated'), {
              variant: res.data.variant,
            });
            /* history.go(0); */
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(ENDPOINT+`/staff/${state._id}`, Staff)
        .then((res) => {
          if (res.data.variant == 'error') {
            enqueueSnackbar(t('Staff Not Updated ') + res.data.messagge, {
              variant: res.data.variant,
            });
          } else {
            enqueueSnackbar(t('Staff Updated'), {
              variant: res.data.variant,
            });
            /*  history.go(0); */
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div style={{ marginTop: '50px' }}>
      <section id='profile'>
        <div className='container-wide-xl'>
          <div className='row'>
            <div className='col-md-3'>
              <div className='activeTenders'>
                <div className='profile-pic'>
                  <a href='#'>
                    <img src='img/bankLogo/logo-black.png' alt='#' />
                  </a>
                  <span>
                    {state.name} {state.surname}
                  </span>
                  <button>Profili Güncelle</button>
                </div>

                <div className=' profile-menu'>
                  <ul>
                    <li>
                      <a className='active' href='#'>
                        <img src='#' alt='' />
                        <span>Aktif İhaleler</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <img src='#' alt='' />
                        <span>Katıldığım İhaleler</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <img src='#' alt='' />
                        <span>Kazandığım İhaleler</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <img src='#' alt='' />
                        <span>Takibe Aldığım İhaleler</span>
                      </a>
                    </li>
                    <li>
                      <a href='#'>
                        <img src='#' alt='' />
                        <span>Pasif İhaleler</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='col-md-9 activeTenders'>
              <div className='row'>
                <h1>Profile</h1>
                <div className='col-md-8'>
                  <div className='row'>
                    <form
                      id='profile-information'
                      action=''
                      onSubmit={onSubmit}
                    >
                      <h3>Kişisel Bilgiler</h3>
                      <ul>
                        <li>
                          <label>Adınız</label>
                          <input
                            type='text'
                            placeholder='Adınız'
                            value={state.name}
                            onChange={(e) => {
                              seTstate({
                                ...state,
                                name: e.target.value,
                              });
                            }}
                          />
                        </li>
                        <li>
                          <label>Soyadınız</label>
                          <input
                            type='text'
                            placeholder='Soyadınız'
                            value={state.surname}
                            onChange={(e) => {
                              seTstate({
                                ...state,
                                surname: e.target.value,
                              });
                            }}
                          />
                        </li>
                        <li>
                          <label>Cinsiyet</label>
                          <ul>
                            <li style={{ width: '100%' }}>
                              <select>
                                <option>Kadın</option>
                              </select>
                            </li>
                          </ul>
                        </li>
                        <li>
                          {' '}
                          <label>Doğum Tarihi</label>
                          <MuiPickersUtilsProvider
                            utils={DateFnsUtils}
                            locale={tr}
                          >
                            <KeyboardDatePicker
                              style={{
                                width: '%100',
                                height: '40px',
                                display: 'block',
                                marginTop: '0',
                              }}
                              id='date-picker-dialog'
                              format='dd/MM/yyyy'
                              maxDate={new Date()}
                              value={state.birthday || ''}
                              onChange={(date) =>
                                seTstate({
                                  ...state,
                                  birthday: date,
                                })
                              }
                            />
                          </MuiPickersUtilsProvider>
                        </li>
                        <li>
                          <label>Cep Telefonu</label>
                          <input
                            type='text'
                            value={state.phone || ''}
                            onChange={(e) => {
                              seTstate({
                                ...state,
                                phone: e.target.value,
                              });
                            }}
                          />
                        </li>
                        <li>
                          <label>İş Telefonu</label>
                          <input
                            type='text'
                            value={state.tel || ''}
                            onChange={(e) => {
                              seTstate({
                                ...state,
                                tel: e.target.value,
                              });
                            }}
                          />
                        </li>
                      </ul>
                      <h3>Adres Bilgileri</h3>
                      <ul>
                        <li>
                          <label>Adres Başlığı</label>
                          <input
                            type='text'
                            value={state.address || ''}
                            onChange={(e) => {
                              seTstate({
                                ...state,
                                address: e.target.value,
                              });
                            }}
                          />
                        </li>
                        <li>
                          <label>İl</label>
                          <Select
                            styles={customStyles}
                            placeholder={t('Şehir Seçiniz')}
                            value={state.selectedDefaultCity || ''}
                            options={dataCity}
                            onChange={handleChangeCity}
                          />
                        </li>
                        <li>
                          <label>İlçe</label>
                          <Select
                            styles={customStyles}
                            placeholder={t('İlçe Seçiniz')}
                            value={state.selectedDefaultDistrict || ''}
                            options={dataDistrict}
                            onChange={handleChangeDistrict}
                          />
                        </li>
                        <li>
                          <label>Mahalle</label>
                          <Select
                            styles={customStyles}
                            placeholder={t('Mahalle Seçiniz')}
                            value={state.selectedDefaultNeighborhoods || ''}
                            options={dataNeighborhoods}
                            onChange={handleChangeNeighborhoods}
                          />
                        </li>
                      </ul>
                      <h3>Şifre</h3>
                      <ul>
                        <li>
                          <label>E-Posta</label>
                          <input
                            type='mail'
                            value={state.username}
                            onChange={(e) => {
                              seTstate({
                                ...state,
                                username: e.target.value,
                              });
                            }}
                          />
                        </li>
                        <li>
                          <label>Şifre</label>
                          <input
                            type='password'
                            placeholder='*******'
                            value={state.password}
                            onChange={(e) => {
                              seTstate({
                                ...state,
                                password: e.target.value,
                              });
                            }}
                          />
                        </li>
                      </ul>
                      <button style={{ marginTop: '25px' }} type='submit'>
                        GÜNCELLE
                      </button>
                    </form>
                  </div>
                </div>
                <div className='col-md-4'>
                  <div className='notes'>
                    <ul>
                      <li className='title'>Şifrenizi Güncellemek için</li>
                      <li>Lorem İpsum Dolor Sit Amet</li>
                      <li>Lorem İpsum Dolor Sit Amet</li>
                      <li>Lorem İpsum Dolor Sit Amet</li>
                    </ul>
                    <span>
                      Lütfen gerekli düzenlemeler için bizimle irtiabata
                      geçiniz. İrtibat numaramız:{' '}
                      <strong>+90 216 515 40 05</strong>
                    </span>
                  </div>
                  <div style={{ width: '70%', marginTop: '25px' }}>
                    {' '}
                    <p style={{ fontSize: '15px' }}>
                      Dosyalarınızı Buradan Yükleyebilirsiniz
                    </p>
                    <UploadPdfView buttonText='PDF Yükleyin' single={false} />
                  </div>{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profil;
