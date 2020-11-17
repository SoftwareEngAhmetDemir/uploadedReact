import React from 'react';

export default function Footerhtml() {
  return (
    <section className='footer'>
      <div className='container-md pt-5 '>
        <div className='col-12 col-sm-4 mt-2 float-left pb-5'>
          <a
            href='#'
            className='pt-4 float-left w-100 text-center text-sm-left'
          >
            <img src='img/logo.png' width='100' />
          </a>
          <p className='pt-2 w-100 float-left fontSize-9 lineHeight-16'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at
            feugiat eros. Duis finibus ultricies nunc, eu consequat arcu aliquam
            ut. Proin convallis
          </p>
        </div>
        <div className='  col-12 col-sm-3 col-md-3 px-md-0 offset-0 ofset-sm-1 mt-3 px-0 px-sm-2 pl-3 pl-md-2 float-left pb-5'>
          <a href='#' className='fontSize-14 w-100 float-left mt-4'>
            Nedir?
          </a>
          <a href='#' className='fontSize-14 w-100 float-left mt-4'>
            Nasıl Çalışır?
          </a>
          <a href='#' className='fontSize-14 w-100 float-left mt-4'>
            Sizi Arayalım
          </a>
        </div>
        <div className='col-12 col-sm-5 pt-3 mt-2 px-0 float-left pb-5'>
          <b className='h5 font-weight-bold ml-3 mb-3 float-left'>İletişim</b>
          <div className='fontSize-10 w-100 float-left'>
            <div className='mt-2 col-1 float-left'>
              <img src='img/icons/002-pin.svg' width='20' />
            </div>
            <div className='float-left mt-2 col-10'>
              Lorem ipsum dolor sit amet elit. Pellentesque quis ligula
            </div>
          </div>
          <div className='fontSize-14 w-100 float-left mt-2'>
            <div className='mt-2 col-1 float-left'>
              <img src='img/icons/001-phone.svg' width='22' />
            </div>
            <div className='float-left mt-2 pt-1 col-10'>444 123 12</div>
          </div>
          <div className='fontSize-10 w-100 float-left mt-2'>
            <div className='mt-2 col-1 float-left'>
              <img src='img/icons/003-email.svg' width='25' />
            </div>
            <div className='float-left mt-2 pt-1 col-10'>
              loremipsum123@gmail.com
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
