import React, { Suspense, useContext, useState, useEffect, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Headerhtml from './headerhtml';
import Footerhtml from './footerhtml';
import Footerjs from './footerjs';
import './style.css';

const SearchBar = lazy(() => import('./HtmlComponents/SearchBar'));
const BizKimiz = lazy(() => import('./HtmlComponents/BizKimiz'));
const Iletisim = lazy(() => import('./HtmlComponents/Iletisim'));
const NasilCalisir = lazy(() => import('./HtmlComponents/NasilCalisir'));
const Profil = lazy(() => import('./HtmlComponents/Profil'));
const Giris = lazy(() => import('./HtmlComponents/Giris'));
const Uyeol = lazy(() => import('./HtmlComponents/Uyeol'));
const Listpage = lazy(() => import('./list_page'));
const AnaSayfa = lazy(() => import('./HtmlComponents/AnaSayfa'));
const Sifremiunuttum = lazy(() => import('./HtmlComponents/Sifremiunuttum'));
const CardDetails = lazy(() => import('./CardDetails'));
const Nedir = lazy(() => import('./HtmlComponents/Nedir'));

export default function Web() {
  return (
    <div>
      <script src='https://code.jquery.com/jquery-3.3.1.slim.min.js'></script>
      <script src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js'></script>
      <script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js'></script>
      <Router>
        <Headerhtml />
        <Suspense fallback={<div>Yükleniyor...</div>}>
          <Switch>
            <Route exact path='/' component={AnaSayfa} />
            <Route exact path='/filter' component={Listpage} />
            <Route exact path='/CardDetails' component={CardDetails} />
            <Route exact path='/nedir' component={Nedir} />
            <Route exact path='/nasilcalisir' component={NasilCalisir} />
            <Route exact path='/iletisim' component={Iletisim} />
            <Route exact path='/bizkimiz' component={BizKimiz} />
            <Route exact path='/giris' component={Giris} />
            <Route exact path='/Uyeol' component={Uyeol} />
            <Route exact path='/Sifremiunuttum' component={Sifremiunuttum} />
            <Route exact path='/profil' component={Profil} />
            <Route exact path='/searchbar' component={SearchBar} />
          </Switch>
        </Suspense>
        <Footerhtml />
        <Footerjs />
      </Router>
    </div>
  );
}
