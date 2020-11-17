import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter, Redirect, useHistory, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import SwiperCore, { Pagination } from 'swiper';
let EndPoint = 'https://serverbigfilserve.herokuapp.com'

SwiperCore.use([Pagination]);

function NasilCalisir() {
  const [data, seTdata] = useState([]);

  const getContentData = () => {
    axios.get(EndPoint+'/content/nasil/public').then((response) => {
      if (response.data.length > 0) {
        seTdata(response.data);
      }
    });
  };

  useEffect(() => {
    getContentData();
  }, []);
  return (
    <div>
      <section id='profile'>
        <div className='container-wide-xl'>
          <div className='row'>
            {data.map((nasıl) => (
              <div className='col-md-6'>
                <div className='how'>
                  <h1>{nasıl.title}</h1>
                  <span>{nasıl.text}</span>
                </div>
              </div>
            ))}
            <div
              className='col-md-6 mt-5 pt-5'
              style={{
                background: 'url(img/blueBg.png) center center no-repeat',
              }}
            >
              <div className='w-75 mx-auto mt-sm-5 mr-sm-5 pr-sm-5 pt-sm-5'>
                <div id='howToBuy' className='swiper-container pr-sm-5 mr-sm-5'>
                  <div className='swiper-wrapper'>
                    <Swiper
                      spaceBetween={50}
                      slidesPerView={3}
                      pagination={{ clickable: true }}
                    >
                      <SwiperSlide>
                        <div className='swiper-slide'>
                          <a className='tarla' href='#'>
                            <img
                              className='first-img'
                              src='img/icons/satilik-konutlar.png'
                              alt=''
                            />
                            <p className='option-title'>Yatırımlık Arsalar</p>
                            <p className='option-desc'>
                              İlgilendiğiniz gayrimenkul ve satış süreçleri
                              hakkında uzmanlarımız ile konuşun ve bilgi alın.
                            </p>
                          </a>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className='swiper-slide'>
                          <a className='konut' href='#'>
                            <img
                              className='first-img'
                              src='img/icons/satilik-konutlar.png'
                              alt=''
                            />
                            <p className='option-title'>Satılık Konutlar</p>
                            <p className='option-desc'>
                              İlgilendiğiniz gayrimenkul ve satış süreçleri
                              hakkında uzmanlarımız ile konuşun ve bilgi alın.
                            </p>
                          </a>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className='swiper-slide'>
                          <a className='mustakil' href='#'>
                            <img
                              className='first-img'
                              src='img/icons/Mustakil-Evler.png'
                              alt=''
                            />
                            <p className='option-title'>Müstakil Evler</p>
                            <p className='option-desc'>
                              İlgilendiğiniz gayrimenkul ve satış süreçleri
                              hakkında uzmanlarımız ile konuşun ve bilgi alın.
                            </p>
                          </a>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className='swiper-slide'>
                          <a className='villa' href='#'>
                            <img
                              className='first-img'
                              src='img/icons/Villalar.png'
                              alt=''
                            />
                            <p className='option-title'>Villalar</p>
                            <p className='option-desc'>
                              İlgilendiğiniz gayrimenkul ve satış süreçleri
                              hakkında uzmanlarımız ile konuşun ve bilgi alın.
                            </p>
                          </a>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className='swiper-slide'>
                          <a className='daire' href='#'>
                            <img
                              className='first-img'
                              src='img/icons/Daireler.png'
                              alt=''
                            />
                            <img
                              className='second-img d-none'
                              src='img/icons/Daireler2.png'
                              alt=''
                            />
                            <p className='option-title'>3+1 Daireler</p>
                            <p className='option-desc'>
                              İlgilendiğiniz gayrimenkul ve satış süreçleri
                              hakkında uzmanlarımız ile konuşun ve bilgi alın.
                            </p>
                          </a>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>

                  <div className='swiper-pagination'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NasilCalisir;
