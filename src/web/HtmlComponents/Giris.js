import React, { useState, useContext, useEffect } from "react";
import AuthService from "../../panel/Services/AuthService";
import { AuthContext } from "../../panel/Context/AuthContext";

import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useTranslation } from "react-i18next";

import {
  FormControl,
  FormGroup,
  FormHelperText,
  Grid,
  Button,
  Container,
  InputAdornment,
  Typography,
} from "@material-ui/core";

function Giris() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const [t] = useTranslation();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        enqueueSnackbar(t("Login Successfully"), {
          variant: "success",
        });
        history.push("/profil");
      } else {
        enqueueSnackbar(t("Login information is incorrect. Try again."), {
          variant: "error",
        });
      }
    });
  };

  return (
    <section id="login">
      <div className="container">
        <div className="row">
          <div className="row login-wrapper">
            <div className="col-md-6 col-12 order-2 order-md-1 login-form">
              <h1>Giriş Yap</h1>
              <ValidatorForm
                autoComplete="off"
                onSubmit={onSubmit}
                style={{ height: "100%" }}
              >
                <FormGroup className="FormGroupLogin">
                  <FormControl>
                    <TextValidator
                      variant="outlined"
                      margin="dense"
                      label={t("E-mail")}
                      name="username"
                      onChange={onChange}
                      required
                    />
                    <FormHelperText> {t("You need a E-mail.")} </FormHelperText>
                  </FormControl>
                </FormGroup>
                <FormGroup className="FormGroupLogin">
                  <FormControl>
                    <TextValidator
                      variant="outlined"
                      margin="dense"
                      label={t("Password")}
                      name="password"
                      type="password"
                      onChange={onChange}
                      required
                    />
                    <FormHelperText>
                      {" "}
                      {t("You need a Password")}{" "}
                    </FormHelperText>
                  </FormControl>
                </FormGroup>
                <button type="submit">GİRİŞ YAP</button>
                <button
                  className="white"
                  onClick={() => {
                    history.push("/uyeol");
                  }}
                  type="button"
                >
                  ÜYE OL
                </button>
                <a href="/sifremiunuttum">Şifremi Unuttum</a>
              </ValidatorForm>
            </div>
            <div className="login-img col-md-6 order-1 order-md-2 col-12 p-0">
              <img src="img/logo.svg" alt="#" />
              <div className="content">
                <h2>HOŞ GELDİNİZ</h2>
                <h3>
                  Mülkedin'in Fırsatlarından Yararlanmak için Lütfen Giriş
                  Yapınız.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Giris;
