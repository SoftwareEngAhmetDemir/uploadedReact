import React, { useState, useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';

import PrivateRoute from './Hocs/PrivateRoute';
import UnPrivateRoute from './Hocs/UnPrivateRoute';

import AuthService from './Services/AuthService';
import { AuthContext } from './Context/AuthContext';

import { useTranslation } from 'react-i18next';
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './assets/css/style.css';

import {
  SupervisedUserCircle,
  Receipt,
  MonetizationOn,
  Ballot,
  InsertChart,
  ArrowDropDownCircle,
  PowerSettingsNew,
  Dashboard,
  FeaturedPlayList,
} from '@material-ui/icons';
import i18n from './i18n';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import CustomersEdit from './components/customers/edit.component';
import CustomersCreate from './components/customers/create.component';
import CustomersList from './components/customers/list.component';

import InvoicesList from './components/invoices/list.component';
import InvoicesCreate from './components/invoices/create.component';
import InvoicesEdit from './components/invoices/edit.component';

import EstatesList from './components/estate/list.component';
import EstatesCreate from './components/estate/create.component';
import EstatesEdit from './components/estate/edit.component';

import EstatePropsList from './components/estateprops/list.component';
import EstatePropsCreate from './components/estateprops/create.component';
import EstatePropsEdit from './components/estateprops/edit.component';

import ProductsList from './components/products/list.component';
import ProductsCreate from './components/products/create.component';
import ProductsEdit from './components/products/edit.component';

import BanksList from './components/banks/list.component';
import BanksCreate from './components/banks/create.component';
import BanksEdit from './components/banks/edit.component';

import BizKimizCreate from './components/contents/bizkimiz/create.component';
import BizKimizList from './components/contents/bizkimiz/list.component';
import BizKimizEdit from './components/contents/bizkimiz/edit.component';

import IletisimCreate from './components/contents/iletisim/create.component';
import IletisimList from './components/contents/iletisim/list.component';
import IletisimEdit from './components/contents/iletisim/edit.component';

import IletisimBilgileriCreate from './components/contents/iletisimBilgileri/create.component';
import IletisimBilgileriList from './components/contents/iletisimBilgileri/list.component';
import IletisimBilgileriEdit from './components/contents/iletisimBilgileri/edit.component';

import NedirCreate from './components/contents/nedir/create.component';
import NedirList from './components/contents/nedir/list.component';
import NedirEdit from './components/contents/nedir/edit.component';

import NasılCreate from './components/contents/nasıl/create.component';
import NasılList from './components/contents/nasıl/list.component';
import NasılEdit from './components/contents/nasıl/edit.component';

import UsersList from './components/users/list.component';
import UsersCreate from './components/users/create.component';
import UsersEdit from './components/users/edit.component';

import Register from './components/register/register';
import Login from './components/register/login';

import ForgotPassword from './components/register/forgotpassword';
import ResetPassword from './components/register/resetpassword';

/*
import CreateExercise from './components/exercises/create.component';
import EditExercise from './components/exercises/edit.component';
import ExercisesList from './components/exercises/list.component';
*/


export default function Panel() {
  const { t } = useTranslation();
  const history = useHistory();

  const [nowDate, seTnowDate] = useState(new Date());
  const [open, seTopen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
      history.push('/');
    });
  };

  const unauthenticatedNavBar = () => {
    return (
      <>
        <Route
          render={({ location, history }) => (
            <>
              {location.pathname === '/panel'
                ? history.push('/panel/login')
                : ''}
              <main style={{ height: '100%' }}>
                <div style={{ height: '100%' }}>
                  <UnPrivateRoute path='/panel/login' component={Login} />
                  <UnPrivateRoute
                    path='/panel/reset/:token'
                    component={ResetPassword}
                  />
                  <UnPrivateRoute
                    path='/panel/forgotPassword'
                    component={ForgotPassword}
                  />
                </div>
              </main>
            </>
          )}
        />
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Route
          render={({ location, history }) => (
            <>
              <SideNav
                onMouseOver={() => seTopen(true)}
                onMouseOut={() => seTopen(false)}
                onToggle={() => { }}
                expanded={open}
                onSelect={(selected) => {
                  const to = `/${selected}`;
                  if (location.pathname !== to) {
                    history.push(to);
                  }
                }}
              >
                <SideNav.Toggle />

                <SideNav.Nav defaultSelected='panel/Estatelist'>
                  <NavItem eventKey='panel/Bankslist'>
                    <NavIcon>
                      <MonetizationOn
                        fontSize='large'
                        style={{ marginTop: '7px' }}
                      />
                    </NavIcon>
                    <NavText>Bankalar</NavText>
                  </NavItem>

                  <NavItem eventKey='panel/Estatelist'>
                    <NavIcon>
                      <FeaturedPlayList
                        fontSize='large'
                        style={{ marginTop: '7px' }}
                      />
                    </NavIcon>
                    <NavText>Emlaklar</NavText>
                  </NavItem>
                  <NavItem eventKey='panel/EstatePropsList'>
                    <NavIcon>
                      <Ballot fontSize='large' style={{ marginTop: '7px' }} />
                    </NavIcon>
                    <NavText>Emlak Özellikleri</NavText>
                  </NavItem>
                  <NavItem eventKey='panel/customerslist'>
                    <NavIcon>
                      <SupervisedUserCircle
                        fontSize='large'
                        style={{ marginTop: '7px' }}
                      />
                    </NavIcon>
                    <NavText>Müşteriler</NavText>
                  </NavItem>
                  <NavItem eventKey='panel/charts'>
                    <NavIcon>
                      <ArrowDropDownCircle
                        fontSize='large'
                        style={{ marginTop: '7px' }}
                      />
                    </NavIcon>
                    <NavText>Drowdown</NavText>
                    <NavItem eventKey='panel/stafflist'>
                      <NavText>Staff </NavText>
                    </NavItem>
                    <NavItem eventKey='charts/barchart'>
                      <NavText>Bar Chart</NavText>
                    </NavItem>
                  </NavItem>

                  <NavItem eventKey='panel/content'>
                    <NavIcon>
                      <ArrowDropDownIcon
                        fontSize='large'
                        style={{ marginTop: '7px' }}
                      />
                    </NavIcon>
                    <NavText>İçerik Sayfaları</NavText>
                    <NavItem eventKey='panel/nedirlist'>
                      <NavText>Nedir </NavText>
                    </NavItem>
                    <NavItem eventKey='panel/nasıllist'>
                      <NavText>Nasıl Çalışır</NavText>
                    </NavItem>
                    <NavItem eventKey='panel/iletisimlist'>
                      <NavText>İletişim Text</NavText>
                    </NavItem>
                    <NavItem eventKey='panel/iletisimBilgilerilist'>
                      <NavText>İletişim Bilgileri</NavText>
                    </NavItem>
                    <NavItem eventKey='panel/bizkimizlist'>
                      <NavText>Biz Kimiz</NavText>
                    </NavItem>
                  </NavItem>

                  <NavItem
                    eventKey='panel/login'
                    onClick={onClickLogoutHandler}
                  >
                    <NavIcon>
                      <PowerSettingsNew
                        fontSize='large'
                        style={{ marginTop: '7px' }}
                      />
                    </NavIcon>
                    <NavText>Logout</NavText>
                  </NavItem>
                </SideNav.Nav>
              </SideNav>
              <main style={{ marginLeft: '63px' }}>
                {/*<div>
                           Lang:
                           <button onClick={() => changeLanguage("tr")}>tr</button>
                           <button onClick={() => changeLanguage("en")}>en</button>
                           <span />
                        </div>
                        */}
                <div>
                  <PrivateRoute
                    roles={['bankslist', 'banksonlyyou']}
                    path='/panel/Bankslist'
                    component={BanksList}
                  />
                  <PrivateRoute
                    roles={['bankscreate', 'banksonlyyou']}
                    path='/panel/BankCreate'
                    component={BanksCreate}
                  />
                  <PrivateRoute
                    roles={['banksedit', 'banksonlyyou']}
                    path='/panel/Banks/edit/:id'
                    component={BanksEdit}
                  />
                  <PrivateRoute
                    roles={['estateslist', 'estatesonlyyou']}
                    path='/panel/EstatePropslist'
                    component={EstatePropsList}
                  />
                  <PrivateRoute
                    roles={['estatescreate', 'estatesonlyyou']}
                    path='/panel/EstatePropsCreate'
                    component={EstatePropsCreate}
                  />
                  <PrivateRoute
                    roles={['estatesedit', 'estatesonlyyou']}
                    path='/panel/EstateProps/edit/:id'
                    component={EstatePropsEdit}
                  />
                  <PrivateRoute
                    roles={['estateslist', 'estatesonlyyou']}
                    path='/panel/Estatelist'
                    component={EstatesList}
                  />
                  <PrivateRoute
                    roles={['estatescreate', 'estatesonlyyou']}
                    path='/panel/EstateCreate'
                    component={EstatesCreate}
                  />
                  <PrivateRoute
                    roles={['estatesedit', 'estatesonlyyou']}
                    path='/panel/Estate/edit/:id'
                    component={EstatesEdit}
                  />
                  <PrivateRoute
                    roles={['customerslist', 'customersonlyyou']}
                    path='/panel/CustomersList'
                    component={CustomersList}
                  />
                  <PrivateRoute
                    roles={['customerscreate', 'customersonlyyou']}
                    path='/panel/CustomerCreate'
                    component={CustomersCreate}
                  />
                  <PrivateRoute
                    roles={['customersedit', 'customersonlyyou']}
                    path='/panel/Customers/edit/:id'
                    component={CustomersEdit}
                  />
                  <PrivateRoute
                    roles={['invoicescreate']}
                    path='/panel/invoicecreate'
                    component={InvoicesCreate}
                  />
                  <PrivateRoute
                    roles={['invoiceslist', 'invoicesonlyyou']}
                    path='/panel/invoiceslist'
                    component={InvoicesList}
                  />
                  <PrivateRoute
                    roles={['invoicesedit', 'invoicesonlyyou']}
                    path='/panel/invoices/edit/:id'
                    component={InvoicesEdit}
                  />
                  <PrivateRoute
                    roles={['productslist', 'productsonlyyou']}
                    path='/panel/productslist'
                    component={ProductsList}
                  />
                  <PrivateRoute
                    roles={['productscreate']}
                    path='/panel/productcreate'
                    component={ProductsCreate}
                  />
                  <PrivateRoute
                    roles={['productsedit', 'productsonlyyou']}
                    path='/panel/products/edit/:id'
                    component={ProductsEdit}
                  />

                  <PrivateRoute
                    roles={['contentlist', 'contentonlyyou']}
                    path='/panel/bizkimizlist'
                    component={BizKimizList}
                  />
                  <PrivateRoute
                    roles={['contentcreate']}
                    path='/panel/bizkimizcreate'
                    component={BizKimizCreate}
                  />
                  <PrivateRoute
                    roles={['contentedit', 'contentonlyyou']}
                    path='/panel/bizkimiz/edit/:id'
                    component={BizKimizEdit}
                  />

                  <PrivateRoute
                    roles={['contentlist', 'contentonlyyou']}
                    path='/panel/iletisimlist'
                    component={IletisimList}
                  />
                  <PrivateRoute
                    roles={['contentcreate']}
                    path='/panel/iletisimcreate'
                    component={IletisimCreate}
                  />
                  <PrivateRoute
                    roles={['contentedit', 'contentonlyyou']}
                    path='/panel/iletisim/edit/:id'
                    component={IletisimEdit}
                  />

                  <PrivateRoute
                    roles={['contentlist', 'contentonlyyou']}
                    path='/panel/iletisimBilgilerilist'
                    component={IletisimBilgileriList}
                  />
                  <PrivateRoute
                    roles={['contentcreate']}
                    path='/panel/iletisimBilgilericreate'
                    component={IletisimBilgileriCreate}
                  />
                  <PrivateRoute
                    roles={['contentedit', 'contentonlyyou']}
                    path='/panel/iletisimBilgileri/edit/:id'
                    component={IletisimBilgileriEdit}
                  />

                  <PrivateRoute
                    roles={['contentlist', 'contentonlyyou']}
                    path='/panel/nedirlist'
                    component={NedirList}
                  />
                  <PrivateRoute
                    roles={['contentcreate']}
                    path='/panel/nedircreate'
                    component={NedirCreate}
                  />
                  <PrivateRoute
                    roles={['contentedit', 'contentonlyyou']}
                    path='/panel/nedir/edit/:id'
                    component={NedirEdit}
                  />

                  <PrivateRoute
                    roles={['contentlist', 'contentonlyyou']}
                    path='/panel/nasıllist'
                    component={NasılList}
                  />
                  <PrivateRoute
                    roles={['contentcreate']}
                    path='/panel/nasılcreate'
                    component={NasılCreate}
                  />
                  <PrivateRoute
                    roles={['contentedit', 'contentonlyyou']}
                    path='/panel/nasıl/edit/:id'
                    component={NasılEdit}
                  />

                  <PrivateRoute
                    roles={['stafflist', 'staffonlyyou']}
                    path='/panel/stafflist'
                    component={UsersList}
                  />
                  <PrivateRoute
                    roles={['staffcreate']}
                    path='/panel/staffcreate'
                    component={UsersCreate}
                  />
                  <PrivateRoute
                    roles={['staffedit', 'staffonlyyou']}
                    path='/panel/staff/edit/:id'
                    component={UsersEdit}
                  />
                  <UnPrivateRoute path='/panel/login' component={Login} />
                </div>
              </main>
            </>
          )}
        />
      </>
    );
  };
  return !isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar();
}
