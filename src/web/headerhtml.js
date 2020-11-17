import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../panel/Context/AuthContext';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

export default function Headerhtml() {
  const { user } = useContext(AuthContext);
  const [state, setState] = useState();

  const getUser = () => {
    if (user) {
      setState(user);
    }
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <header>
      <div className='header' style={{ width: '99.88%' }}>
        <Navbar bg='light' expand='lg' className='d-block d-md-none'>
          <Nav.Link href='/'>
            <img src='img/logo.png' alt='Mülkedin' width='50' />
            <div>
              <h1 style={{ marginLeft: '200px' }}> 444 123 12</h1>
              <div style={{ fontSize: '10px', marginLeft: '190px' }}>
                Nasıl yardımcı olabiliriz?
              </div>
            </div>
          </Nav.Link>
          <Navbar.Toggle
            aria-controls='basic-navbar-nav'
            className='float-right'
          />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Nav.Link href='/'>Anasayfa</Nav.Link>
              <Nav.Link href='/filter'>Filter</Nav.Link>
              <Nav.Link href='/nedir'> Nedir?</Nav.Link>
              <Nav.Link href='/nasilcalisir'>Nasıl Çalışır?</Nav.Link>
              <Nav.Link href='/iletisim'> İletişim</Nav.Link>
              <Nav.Link href='/bizkimiz'> Biz Kimiz?</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className='row d-none d-md-block'>
          <div className='col-md-12 p-0'>
            <div className='col-md-2 logo'>
              <Link to='/'>
                <img src='img/logo.png' alt='Mülkedin' />
              </Link>
            </div>
            <div className='col-md-8 middle'>
              <div className='col-md-12 header-phone'>
                <a href='tel:444-123-12'>444 123 12</a>
                <span>Nasıl Yardımcı Olabiliriz?</span>
              </div>
              <div className='col-md-12 menu'>
                <nav>
                  <Link to='/'>Anasayfa</Link>
                  <Link to='/filter'>Filter</Link>
                  <Link to='/nedir'>Nedir?</Link>
                  <Link to='/nasilcalisir'>Nasıl Çalışır?</Link>
                  <Link to='/iletisim'>İletişim</Link>
                  <Link to='/bizkimiz'>Biz Kimiz?</Link>
                </nav>
              </div>
            </div>
            <div className='col-md-2 member-login'>
              <div className='col-md-12 header-social'>
                <i className='fab fa-twitter hover1 fontSize-12'></i>
                <i className='fab fa-facebook-f mx-2 hover1 fontSize-12'></i>
                <i className='fab fa-instagram hover1 fontSize-13'></i>
              </div>
              <div className='col-md-12 login'>
                {state === undefined || state.username === '' ? (
                  <Link to='/giris'>
                    <span>Giriş Yap</span>
                  </Link>
                ) : (
                  <Link to='/profil'>
                    Hesabım<span>{state.name}</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
