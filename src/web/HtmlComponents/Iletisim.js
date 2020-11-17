import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { withNamespaces, useTranslation } from 'react-i18next';
import { withSnackbar, useSnackbar } from 'notistack';
let ENDPOINT = 'https://serverbigfilserve.herokuapp.com'

function Iletisim() {
    const [data, seTdata] = useState([]);
    const [info, seTinfo] = useState([]);

    const getContentData = () => {
        axios.get(ENDPOINT+'/content/iletisim/public').then((response) => {
            if (response.data.length > 0) {
                seTdata(response.data);
            }
        });
    };
    const getInfoData = () => {
        axios.get(ENDPOINT+'/content/iletisim-bilgileri/public').then((response) => {
            if (response.data.length > 0) {
                seTinfo(response.data);
            }
        });
    };

    useEffect(() => {
        getContentData();
        getInfoData();
    }, []);



    const [t] = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const [state, seTstate] = useState({
        adsoyad: "",
        mail: "",
        cep: "",
        mesaj: ""
    })

    const onSubmit = () => {
        if (state.adsoyad != "" && state.mail != "" && state.cep != "" && state.mesaj != "") {

            const mailingData = {

                "title": "İletişim Formuna bir mail geldi",
                "text": `<div> Adı Soyadı: ${state.adsoyad} <br /> E-posta: ${state.mail}<br /> Telefon Numarası: ${state.cep}<br /><br />${state.mesaj}  </div> `
            }

            axios.post(ENDPOINT+`/sendmail/adminsmail`, mailingData)

            enqueueSnackbar(t('En kısa sürede size geri dönüş yapacağız'), {
                variant: "success",
            });


        } else {
            enqueueSnackbar(t('Tüm alanları Doğru şekilde doldurduğunzudan emin olun'), {
                variant: "error",
            });
        }
    }

    return (
        <div>
            <section id='contact'>
                <div className='container mt-3'>
                    <div className='row'>
                        <div className='col-12 col-md-7 float-left px-sm-0 '>
                            {data.map((iletisim) => (
                                <Fragment key={iletisim.title.toUpperCase()}>
                                    <h1 className='h4'>{iletisim.title.toUpperCase()}</h1>
                                    <p className='fontSize-11 my-3 float-left'>{iletisim.text}</p>
                                </Fragment>
                            ))}
                            <h3 className='font-weight-bold fontSize-10 mt-4 float-left w-100 mb-2'>
                                İletişim Bilgilerimiz
              </h3>
                            <div className='row'>
                                {info.map((iletisimInfo) => (
                                    <div className='col-sm-6 col-12 mt-3 float-left' key={iletisimInfo.images[0]}>
                                        <div className='col-2 px-0 float-left'>
                                            <img src={iletisimInfo.images[0]} className=' w-100' />
                                        </div>
                                        <div className='fontSize-9 float-left col-10 pr-0 '>
                                            {iletisimInfo.title}
                                        </div>
                                        <div className='fontSize-9 float-left col-10 pr-0 '>
                                            {iletisimInfo.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <h3 className='font-weight-bold fontSize-10 mt-4 float-left w-100 mb-2'>
                                Sosyal Medya Hesaplarımız
              </h3>
                            <i className='fab fa-twitter hover1 fontSize-12'></i>
                            <i className='fab fa-facebook-f mx-2 hover1 fontSize-12'></i>
                            <i className='fab fa-instagram hover1 fontSize-13'></i>
                        </div>
                        <div className='ccol-12 col-md-5 px-0 mt-5   '>
                            <img src='img/maps.png' className='w-100 float-left' />
                        </div>
                        <div className='w-100 float-left border-bottom my-5'></div>
                        <div className='col-12 row'>
                            <h1 className='h2 w-100 float-left pl-3 pl-sm-0'>
                                Bize Mesaj Gönder
              </h1>
                            <div className="col-sm-8 col-12 my-4 px-0">
                                <div className="form-group float-left col-md-6 pl-3  pl-sm-0">
                                    <label htmlFor="adsoyad">Ad Soyad</label>
                                    <input type="text" required onChange={(e) => { seTstate({ ...state, adsoyad: e.target.value }) }} className="form-control" id="adsoyad" placeholder="Adınız ve Soyadınız" />
                                </div>
                                <div className="form-group  float-left col-md-6 pl-3 pl-sm-0">
                                    <label htmlFor="mail">E-Posta Adresi</label>
                                    <input type="text" required onChange={(e) => { seTstate({ ...state, mail: e.target.value }) }} className="form-control" id="mail" placeholder="E-posta Adresniz" />
                                </div>
                                <div className="form-group float-left col-md-6 pl-3  pl-sm-0">
                                    <label htmlFor="cep">Cep Telefonu</label>
                                    <input type="text" required onChange={(e) => { seTstate({ ...state, cep: e.target.value }) }} className="form-control" id="cep" placeholder="Cep numaranız" />
                                </div>
                                <div className="form-group float-left col-md-6 pl-3 pl-sm-0">
                                    <label htmlFor="mesaj">Mesajınız</label>
                                    <textarea type="text" required onChange={(e) => { seTstate({ ...state, mesaj: e.target.value }) }} className="form-control" id="mesaj" placeholder="Mesajınız"></textarea>
                                </div>
                                <div className="btn btn-info float-right fontSize-10 mr-3" onClick={onSubmit}>
                                    Gönder
                            <i className="fab fa-telegram-plane ml-2"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className='row mx-0 my-4'
                    style={{
                        backgroundIimage: 'url(img/contacktBanner.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                    }}
                >
                    <div className='container'>
                        <div className='col-md-6 col-12 bg-black my-md-5   float-left'>
                            <div className='container row my-4 p-4 BGblueOpacity '>
                                <div className='col-2 px-0'>
                                    <img src='img/icons/forsale.png' className='w-100' />
                                </div>
                                <div className='col-10  text-white mt-2'>
                                    <b className='fontSize-12 font-weight-bold'>Yeni İlanlar</b>
                                    <p className='fontSize-10'>
                                        İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında
                                        uzmanlarımız ile konuşun ve bilgi alın.
                  </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-12 bg-black  my-md-5   float-left'>
                            <div className='col-12 row my-4 p-4 BGblueOpacity'>
                                <div className='col-2 px-0'>
                                    <img src='img/icons/contactIcon.png' className='w-100' />
                                </div>
                                <div className='col-10  text-white mt-2'>
                                    <b className='fontSize-12 font-weight-bold'>
                                        Kazandıran İlanlar
                  </b>
                                    <p className='fontSize-10'>
                                        İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında
                                        uzmanlarımız ile konuşun ve bilgi alın.
                  </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Iletisim;
