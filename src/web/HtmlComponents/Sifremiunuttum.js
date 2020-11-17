import React, { useState, useContext, useEffect } from "react";
import AuthService from "../../panel/Services/AuthService";
import { AuthContext } from "../../panel/Context/AuthContext";
import axios from "axios";

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
   TextField,
   InputAdornment,
   Typography,
} from "@material-ui/core";

let ENDPOINT = 'https://serverbigfilserve.herokuapp.com'


function Sifremiunuttum() {
   const [user, setUser] = useState({ username: "", password: "" });
   const [message, setMessage] = useState(null);
   const authContext = useContext(AuthContext);

   const [t] = useTranslation();
   const history = useHistory();
   const { enqueueSnackbar } = useSnackbar();

   const [state, seTstate] = useState({
      username: "",
      showError: false,
      messageFromServer: "",
      showNullError: false,
   })


   const handleChange = (name) => (event) => {
      seTstate({
         [name]: event.target.value,
      });
   };

   const sendEmail = async (e) => {
      e.preventDefault();
      const { username } = state;
      if (username === "") {
         seTstate({
            showError: false,
            messageFromServer: "",
            showNullError: true,
         });
      } else {
         try {
            const response = await axios.post(
               ENDPOINT+"/user/forgotPassword",
               { username, }
            );
            console.log(response.data);
            if (response.data === "recovery email sent") {
               seTstate({
                  showError: false,
                  messageFromServer: "recovery email sent",
                  showNullError: false,
               });
            }
         } catch (error) {
            console.log(error);
            if (error.response.data === "email not in db") {
               seTstate({
                  showError: true,
                  messageFromServer: "",
                  showNullError: false,
               });
            }
         }
      }
   };


   const {
      username,
      messageFromServer,
      showNullError,
      showError,
   } = state;

   return (
      <section id="forgotPwd">
         <div class="container">
            <div class="row">
               <div class="justify-content-center forgotPwd-wrapper">
                  <div class="col-md-6 col-12 float-left forgotPwd-form">
                     <h1>Şifremi Unuttum</h1>

                     <form className="profile-form" onSubmit={sendEmail}>
                        <TextField
                           id="email"
                           label="E-posta adresiniz"
                           value={username}
                           onChange={handleChange("username")}
                           placeholder="Email Address"
                           style={{ width: "100%" }}
                        />
                        <Button
                           type="submit"
                           style={{ marginTop: "40px" }}
                           color="primary"
                        >
                           Şifre Sıfırlama Linki Gönder
                        </Button>
                     </form>
                     <div style={{ textAlign: 'center' }}>
                        {showNullError && (
                           <div>
                              <p style={{ fontSize: "20px", marginTop: "50px", lineHeight: "2" }}>E-posta adresi boş olamaz.</p>
                           </div>
                        )}
                        {showError && (
                           <div>
                              <p style={{ fontSize: "20px", marginTop: "50px", lineHeight: "2" }}>
                                 Bu e-posta adresi tanınmıyor. Lütfen
                                 yöneticinizle iletişime geçin.
                        </p>
                           </div>
                        )}
                        {messageFromServer === "recovery email sent" && (
                           <div>
                              <h3 style={{ fontSize: "20px", marginTop: "50px", lineHeight: "2" }}>Şifre Sıfırlama  E-postası Başarıyla Gönderildi!</h3>
                           </div>
                        )}
                     </div>

                  </div>
                  <div class="forgotPwd-img col-12 float-left col-md-6 p-0">
                     <img src="img/logo.svg" alt="#" />
                     <div class="content">
                        <h2>HOŞ GELDİNİZ</h2>
                        <h3>Sizden İstenen Bilgileri <br /> Eksiksiz Doldurup Şirenizi Sıfırlayabilirsiniz.</h3>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section >

   )
}

export default Sifremiunuttum
