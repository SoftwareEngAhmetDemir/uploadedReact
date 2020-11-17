import React, {
  Component,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';

import Select from 'react-select';
import axios from 'axios';
import makeAnimated from 'react-select/animated';
import Card from './Card';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../panel/Context/AuthContext';

import './style.css';
let EndPoint = 'https://serverbigfilserve.herokuapp.com'



var il = [];
var GayrimenkulFirst = [];
var GayrimenkulSecond = []; // Tip
//Konum///

var ilce = [];
var mahalle = [];
///////////////////////////
// Oda Sayisi
var Oda_Sayisi = [];

// ///////////////////////////////////////
//Alan////
var Minimum_Alan = 0;
var Maximum_Alan = 0;
var Bulundugu_Kat = [];
// ///////////////////////////

// ///////////////////////////

//Fiyat Araligi ///////////////

var Minimum_Araligi = 0;
var Maximum_Araligi = 0;
// /////////////////////////
var Yapinin_Durumu_a = [];
//////////////////////////////
var binanin_Yasi_a = [];
var binadaki_kat_sayisi_a = [];
var Yapim_Yili_a = [];
var Wc_sayisi_a = [];
var Banyo_sayisi_a = [];
var Isitma_Tipi_a = [];
var yapi_insa_tarzi_a = [];
var Cephe_a = [];
var Krediye_Uygunluk_a = [];
var filterlenecek = [];
// /////////////////////
var Ticari_Db = [];
var Tip_Db = [];
var City_Db = [];
var Town_Db = []; //Ilce all
var neighbour_Db = []; //Mahalle all

var Town_Db_f = []; //Ilce filter
var neighbour_Db_f = []; //Mahalle filter
var Yapinin_Durumu_Db = [];

var Oda_sayisi_Db = [];
var Bulundugu_Kat_Db = [];

var Binaninyasi_Db = [];

var YapimYili_Db = [];
var WcSayisi_Db = [];
var BanyoSayisi_Db = [];
var isitmaTipi_Db = [];
var YapiinsaaTarzi_Db = [];
var BinaCephesi_Db = [];
var KrediyeUygunluk_Db = [];
var obj;
var Binadaki_Kat_sayisi_Db = [];
export default React.memo(function Listpage() {
  const { user, gState, seTgState } = useContext(AuthContext);
  const [isitma, set_isitma] = useState([]);
  const [count, setCount] = useState(0);
  var estate = [];
  const [sehirId, setsehirId] = useState(0);

  /////////////////////////////
  //Kat ///

  const [town_state, setTownState] = useState([]);
  const [nb_state, setnbState] = useState([]); // neighbour state#

  var [filterstate, setFilterState] = useState([]);

  //////////////

  const [il_state, setIlState] = useState([]);
  // ////////////////////////
  var cc = 0;
  const [error, errf] = useState('');
  const get_isin_Tipleri = async () => {
    await axios.get(EndPoint+'/estate/isinmatipi').then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);
      }
    });
  };
  useEffect(() => {
    async function fx() {
      await axios
        .get(EndPoint+'/estate/public')
        .then((response) => {
          if (response.data.length > 0) {
            estate = response.data;
            errf('true');
          }
        })
        .catch((e) => {
          errf('Error 404!!!!');
          console.log(e);
        });
      //  console.log(estate)
      ////Ticari//////////////
      ///////
      for (let i = 0; i < estate.length; i++) {
        var Tc = JSON.stringify(Ticari_Db);
        obj = JSON.stringify({
          value: estate[i].props.Ticari,
          label: estate[i].props.Ticari,
        });

        if (!Tc.includes(obj))
          Ticari_Db.push({
            value: estate[i].props.Ticari,
            label: estate[i].props.Ticari,
          });

        var Tips = JSON.stringify(Tip_Db);
        obj = JSON.stringify({
          value: estate[i].props.Tip,
          label: estate[i].props.Tip,
        });

        if (!Tips.includes(obj))
          Tip_Db.push({
            value: estate[i].props.Tip,
            label: estate[i].props.Tip,
          });

        var Citys = JSON.stringify(City_Db);
        obj = JSON.stringify({
          value: estate[i].city[0].value,
          label: estate[i].city[0].label,
          town: estate[i].town[0].value,
          neighborhood: estate[i].neighborhood[0].value,
        });

        var k = false;
        for (let j = 0; j < City_Db.length; j++) {
          if (estate[i].city[0].value === City_Db[j].value) {
            k = true;
          }
        }
        if (!k)
          // eger sehir tekararli degilse depolama yap
          City_Db.push({
            value: estate[i].city[0].value,
            label: estate[i].city[0].label,
            town: estate[i].town[0].value,
            neighborhood: estate[i].neighborhood[0].value,
          });

        var Towns = JSON.stringify(Town_Db);
        obj = JSON.stringify({
          value: estate[i].town[0].value,
          label: estate[i].town[0].label,
          city: estate[i].city[0].value,
        });

        if (!Towns.includes(obj)) var k2 = false;
        for (let j = 0; j < Town_Db.length; j++) {
          if (estate[i].town[0].value === Town_Db[j].value) {
            k2 = true;
          }
        }
        if (!k2)
          Town_Db.push({
            value: estate[i].town[0].value,
            label: estate[i].town[0].label,
            city: estate[i].city[0].value,
          });

        var nbs = JSON.stringify(neighbour_Db);
        obj = JSON.stringify({
          value: estate[i].neighborhood[0].value,
          label: estate[i].neighborhood[0].label,
          town: estate[i].town[0].value,
        });

        if (!nbs.includes(obj)) var k3 = false;
        for (let j = 0; j < neighbour_Db.length; j++) {
          if (estate[i].neighborhood[0].value === neighbour_Db[j].value) {
            k3 = true;
          }
        }
        if (!k3)
          neighbour_Db.push({
            value: estate[i].neighborhood[0].value,
            label: estate[i].neighborhood[0].label,
            town: estate[i].town[0].value,
          });

        var Odas = JSON.stringify(Oda_sayisi_Db);
        obj = JSON.stringify({
          value: estate[i].props.OdaSayisi,
          label: estate[i].props.OdaSayisi,
        });

        //  console.log(obj)
        if (!Odas.includes(obj) && obj != '{}') var k4 = false;
        for (let j = 0; j < Oda_sayisi_Db.length; j++) {
          if (estate[i].props.OdaSayisi === Oda_sayisi_Db[j].value) {
            k4 = true;
          }
        }
        if (!k4)
          Oda_sayisi_Db.push({
            value: estate[i].props.OdaSayisi,
            label: estate[i].props.OdaSayisi,
          });

        var YapDs = JSON.stringify(Yapinin_Durumu_Db);
        obj = JSON.stringify({
          value: estate[i].props.YapininDurumu,
          label: estate[i].props.YapininDurumu,
        });

        if (!YapDs.includes(obj) && obj !== '{}')
          Yapinin_Durumu_Db.push({
            value: estate[i].props.YapininDurumu,
            label: estate[i].props.YapininDurumu,
          });

        var Bulun_Kat = JSON.stringify(Bulundugu_Kat_Db);
        obj = JSON.stringify({
          value: estate[i].props.BulunduguKat,
          label: estate[i].props.BulunduguKat,
        });

        if (!Bulun_Kat.includes(obj) && obj !== '{}')
          Bulundugu_Kat_Db.push({
            value: estate[i].props.BulunduguKat,
            label: estate[i].props.BulunduguKat,
          });

        obj = JSON.stringify({
          value: estate[i].props.BinadakiKatSayisi,
          label: estate[i].props.BinadakiKatSayisi,
        });
        var k5 = false;
        if (!Binadaki_Kat_sayisi_Db.includes(obj) && obj !== '{}') {
          for (let j = 0; j < Binadaki_Kat_sayisi_Db.length; j++) {
            if (
              Binadaki_Kat_sayisi_Db[j].value ===
              estate[i].props.BinadakiKatSayisi
            ) {
              k5 = true;
            }
          }
        }
        if (!k5)
          Binadaki_Kat_sayisi_Db.push({
            value: estate[i].props.BinadakiKatSayisi,
            label: estate[i].props.BinadakiKatSayisi,
          });

        obj = JSON.stringify({
          value: estate[i].props.BulunduguKat,
          label: estate[i].props.BulunduguKat,
        });

        if (!Bulun_Kat.includes(obj) && obj !== '{}')
          Bulundugu_Kat_Db.push({
            value: estate[i].props.BulunduguKat,
            label: estate[i].props.BulunduguKat,
          });

        var Binaniny = JSON.stringify(Binaninyasi_Db);
        obj = JSON.stringify({
          value: estate[i].props.Binaninyasi,
          label: estate[i].props.Binaninyasi,
        });

        if (!Binaniny.includes(obj) && obj !== '{}')
          Binaninyasi_Db.push({
            value: estate[i].props.Binaninyasi,
            label: estate[i].props.Binaninyasi,
          });

        var YapimY = JSON.stringify(YapimYili_Db);
        obj = JSON.stringify({
          value: estate[i].props.YapimYili,
          label: estate[i].props.YapimYili,
        });

        if (!YapimY.includes(obj) && obj !== '{}')
          YapimYili_Db.push({
            value: estate[i].props.YapimYili,
            label: estate[i].props.YapimYili,
          });

        var WcS = JSON.stringify(WcSayisi_Db);
        obj = JSON.stringify({
          value: estate[i].props.WcSayisi,
          label: estate[i].props.WcSayisi,
        });

        if (!WcS.includes(obj) && obj !== '{}')
          WcSayisi_Db.push({
            value: estate[i].props.WcSayisi,
            label: estate[i].props.WcSayisi,
          });

        var BanyoS = JSON.stringify(BanyoSayisi_Db);
        obj = JSON.stringify({
          value: estate[i].props.BanyoSayisi,
          label: estate[i].props.BanyoSayisi,
        });

        if (!BanyoS.includes(obj) && obj !== '{}')
          BanyoSayisi_Db.push({
            value: estate[i].props.BanyoSayisi,
            label: estate[i].props.BanyoSayisi,
          });

        var isitmaS = JSON.stringify(isitmaTipi_Db);
        obj = JSON.stringify({
          value: estate[i].props.isitmaTipi,
          label: estate[i].props.isitmaTipi,
        });

        if (!isitmaS.includes(obj))
          isitmaTipi_Db.push({
            value: estate[i].props.isitmaTipi,
            label: estate[i].props.isitmaTipi,
          });
        //   console.log(isitmaTipi_Db);

        var isitmaS = JSON.stringify(isitmaTipi_Db);
        obj = JSON.stringify({
          value: estate[i].props.isitmaTipi,
          label: estate[i].props.isitmaTipi,
        });

        //  isitmaTipi_Db.push({value:get_isitma_keys,label:get_isitma_keys});

        var YapiinsaaT = JSON.stringify(YapiinsaaTarzi_Db);
        obj = JSON.stringify({
          value: estate[i].props.YapiinsaaTarzi,
          label: estate[i].props.YapiinsaaTarzi,
        });

        if (!YapiinsaaT.includes(obj) && obj !== '{}')
          YapiinsaaTarzi_Db.push({
            value: estate[i].props.YapiinsaaTarzi,
            label: estate[i].props.YapiinsaaTarzi,
          });

        var BinaC = JSON.stringify(BinaCephesi_Db);
        obj = JSON.stringify({
          value: estate[i].props.BinaCephesi,
          label: estate[i].props.BinaCephesi,
        });

        if (!BinaC.includes(obj) && obj !== '{}')
          BinaCephesi_Db.push({
            value: estate[i].props.BinaCephesi,
            label: estate[i].props.BinaCephesi,
          });

        var Krediy = JSON.stringify(KrediyeUygunluk_Db);
        obj = JSON.stringify({
          value: estate[i].props.KrediyeUygunluk,
          label: estate[i].props.KrediyeUygunluk,
        });

        if (!Krediy.includes(obj) && obj !== '{}') {
          KrediyeUygunluk_Db.push({
            value: estate[i].props.KrediyeUygunluk,
            label: estate[i].props.KrediyeUygunluk,
          });
        }

        if (count === 1) {
          setFilterState([...estate]);

          setCount(count + 1);
        }
      }

      // ///////////////Tip/////////////////////////
    }

    fx();
  });

  const handleGayrimenkulFirst = (e) => {
    GayrimenkulFirst.length = 0;
    if (e != null) GayrimenkulFirst = e.map((p) => p.value);

    //console.log(GayrimenkulFirst)
  };

  // /////////////////////////////////////////////////////
  const handleGayrimenkulSecond = (e) => {
    GayrimenkulSecond.length = 0;
    if (e != null) GayrimenkulSecond = e.map((p) => p.value);
    //console.log('Second ',GayrimenkulSecond)
  };

  const IlHandler = (e) => {
    il.length = 0;
    var tb = []; // gecici depolamak icin
    il.length = 0;
    if (e != null) il = e.map((p) => p.value);

    // // ///////////////////////////////

    //Filtering For Town ////
    ///////////////
    tb.length = 0;

    for (let k = 0; k < il.length; k++) {
      for (let h = 0; h < Town_Db.length; h++) {
        if (il[k] === Town_Db[h].city) tb.push(Town_Db[h]);
      }
    }

    Town_Db_f = [...tb];
    setTownState([...Town_Db_f]);
  };

  console.log(town_state);

  // /////////////////////////////////////

  const IlceHandler = (e) => {
    ilce.length = 0;
    if (e != null)
      ilce = e.map(
        (p) =>
          //  //console.log(p.value)
          p.value
      );
    let dbtwon = [];
    dbtwon.length = 0;
    for (let i = 0; i < ilce.length; i++) {
      for (let j = 0; j < neighbour_Db.length; j++) {
        if (ilce[i] === neighbour_Db[j].town) {
          dbtwon.push(neighbour_Db[j]);
        }
      }
    }

    neighbour_Db_f = [...dbtwon];
    // const [nb_state,setnbState]= useState([]);
    setnbState([...neighbour_Db_f]);
    //console.log('nb');
    //console.log(il);
  };
  // ////////////////////////////////////////////
  const MahalleHandler = async (e) => {
    mahalle.length = 0;
    if (e != null) mahalle = e.map((p) => p.value);
  };
  // /////////////////////////////////////

  const OdaHandler = async (e) => {
    if (e != null) Oda_Sayisi = e.map((p) => p.value);
    //console.log(Oda_Sayisi);
  };
  // /////////////////////////
  const Minimum_Alan_Handler = (e) => {
    if (e.target.value == '') {
      Minimum_Alan = 0;
    }

    // if(e.target.value!=0)

    Minimum_Alan = Number(e.target.value);

    //console.log(Minimum_Alan)
  };

  const Maximum_Alan_Handler = async (e) => {
    if (e.target.value == '') {
      Maximum_Alan = 0;
    }
    if (e != null) Maximum_Alan = Number(e.target.value);

    //console.log(Maximum_Alan)
  };

  // /////////////////////////////////
  const Maximum_Fiyat_Handler = async (e) => {
    if (e.target.value == '') {
      Maximum_Araligi = 0;
    }
    if (e != null) Maximum_Araligi = Number(e.target.value);

    // //console.log(Maximum_Alan)
  };

  const Minimum_Fiyat_Handler = async (e) => {
    if (e.target.value == '') {
      Minimum_Araligi = 0;
    }
    if (e != null) Minimum_Araligi = Number(e.target.value);

    // //console.log(Maximum_Alan)
  };
  // ///////////////////////#
  const Bulundugu_Kat_f = (e) => {
    Bulundugu_Kat.length = 0;
    if (e != null) Bulundugu_Kat = e.map((p) => p.value);

    //console.log(Bulundugu_Kat)
  };

  // /////////////////////////
  const Yapinin_Durumu = async (e) => {
    Yapinin_Durumu_a.length = 0;
    if (e != null) Yapim_Yili_a = e.map((p) => p.value);

    //console.log(Yapinin_Durumu_a)
  };

  // /////////////////////////
  const binanin_Yasi = (e) => {
    binanin_Yasi_a.length = 0;
    if (e != null) binanin_Yasi_a = e.map((p) => p.value);

    //console.log(binanin_Yasi_a)
  };
  // /////////////////////////
  const binadaki_kat_sayisi = async (e) => {
    binadaki_kat_sayisi_a.length = 0;
    if (e != null) binadaki_kat_sayisi_a = e.map((p) => p.value);

    //console.log(binadaki_kat_sayisi_a)
  };

  ///////////////////////////////////
  const Yapim_Yili = (e) => {
    Yapim_Yili_a.length = 0;
    if (e != null) Yapim_Yili_a = e.map((p) => p.value);

    //console.log(Yapim_Yili_a)
  };
  // ///////////////////////////////////////
  const Wc_Sayisi = (e) => {
    Wc_sayisi_a.length = 0;
    if (e != null) Wc_sayisi_a = e.map((p) => p.value);

    //console.log(Wc_sayisi_a)
  };
  // /////////////////////////////
  const Banyo_sayisi = async (e) => {
    Banyo_sayisi_a.length = 0;
    if (e != null) Banyo_sayisi_a = e.map((p) => p.value);

    //console.log(Banyo_sayisi_a)
  };
  // //////////////////////////
  const isitma_Tipi = (e) => {
    Isitma_Tipi_a.length = 0;
    if (e != null) Isitma_Tipi_a = e.map((p) => p.value);

    //console.log(Isitma_Tipi_a)
  };
  // //////////////////////////////
  const yapi_insa_tarzi = async (e) => {
    yapi_insa_tarzi_a.length = 0;
    if (e != null) yapi_insa_tarzi_a = e.map((p) => p.value);
  };
  // ////////////////////////////
  const Cephe = async (e) => {
    Cephe_a.length = 0;
    if (e != null) Cephe_a = e.map((p) => p.value);

    //console.log(Cephe_a)
  };

  // /////////////////////////

  const Krediye_Uygunluk = async (e) => {
    Krediye_Uygunluk_a.length = 0;
    if (e != null) Krediye_Uygunluk_a = e.map((p) => p.value);

    //console.log(Krediye_Uygunluk_a)
  };
  // ///////////////////
  const [state, setState] = useState();

  const getEstateData = () => {
    axios.get(EndPoint+'/estate/public').then(async (res) => {
      if (res.data.length > 0) {
        setState(res.data);
      }
    });
  };

  let filterArray = [];

  if (gState.mainPageQueries && state && gState.mainPageQueries.length > 0) {
    for (const item in state) {
      if (gState.mainPageQueries.length === 1) {
        if (state[item].city[0].label === gState.mainPageQueries[0]) {
          filterArray.push(state[item]);
        }
      }
      if (gState.mainPageQueries.length === 2) {
        if (
          state[item].city[0].label === gState.mainPageQueries[0] &&
          state[item].props.OdaSayisi === gState.mainPageQueries[1]
        ) {
          filterArray.push(state[item]);
        }
      }
      if (
        state[item].city[0].label === gState.mainPageQueries[0] &&
        state[item].props.OdaSayisi === gState.mainPageQueries[1] &&
        state[item].props.Ticari === gState.mainPageQueries[2]
      ) {
        filterArray.push(state[item]);
      }
    }
  }

  useEffect(() => {
    getEstateData();
  }, []);

  const Filter_f = (e) => {
    seTgState({ ...gState, mainPageQueries: [] });
    //console.log('GB = > ',GayrimenkulFirst)

    //////////////////Alan Filter ////////////////
    //////////

    if (Minimum_Alan > Maximum_Alan && Maximum_Alan !== 0)
      return (
        <div>
          {' '}
          {window.alert('Minimum Alan Maximum Alandan Buyuk Olamaz!!!')}
        </div>
      );

    filterlenecek = estate.filter((item) => {
      if (
        Number(item.props.Alan) >= Minimum_Alan &&
        Number(item.props.Alan) <= Maximum_Alan
      )
        return item;
      if (Number(item.props.Alan) >= Minimum_Alan && Maximum_Alan === 0) {
        // extract the domain from the minimum value
        return item;
      }
      if (Number(item.props.Fiyat) <= Maximum_Alan && Minimum_Alan === 0) {
        // extract the domain from the maximum value
        return item;
      }
    });
    if (Maximum_Alan === 0 && Minimum_Alan === 0) filterlenecek = [...estate];

    ///////////////////////////////////////////////////////

    /////////Fiyat////////////////
    //////////////
    //console.log(Minimum_Araligi +' '+ Maximum_Araligi)

    if (Minimum_Araligi > Maximum_Araligi && Maximum_Araligi !== 0)
      return (
        <div>
          {' '}
          {window.alert('Minimum Fiyat Maximum Fiyattan Buyuk Olamaz!!!')}
        </div>
      );

    filterlenecek = filterlenecek.filter((item) => {
      if (
        Number(item.props.Fiyat) >= Minimum_Araligi &&
        Number(item.props.Fiyat) <= Maximum_Araligi
      )
        return item;
      if (
        Number(item.props.Fiyat) >= Minimum_Araligi &&
        Maximum_Araligi === 0
      ) {
        // extract the domain from the minimum value
        return item;
      }
      if (
        Number(item.props.Fiyat) <= Maximum_Araligi &&
        Minimum_Araligi === 0
      ) {
        // extract the domain from the maximum value
        return item;
      }
    });
    if (Maximum_Araligi === 0 && Minimum_Araligi === 0)
      filterlenecek = [...filterlenecek];

    ///////////////////////////////////////////////
    /////Ticari Filterleme //////////
    //////////////////
    let db = [];
    if (GayrimenkulFirst.length > 0) {
      for (let i = 0; i < GayrimenkulFirst.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (filterlenecek[j].props.Ticari === GayrimenkulFirst[i]) {
            db.push(filterlenecek[j]);
          }
        }
        if (db.length === 0) filterlenecek.length = 0;
      }
      // /////////////////////////////////////

      if (db.length !== 0) filterlenecek = [...db];
      db.length = 0;
      // ////////////////////////////////

      /////////////////////////////
    }

    /////////////////////////////

    let dbs = [];
    if (GayrimenkulSecond.length > 0) {
      for (let i = 0; i < GayrimenkulSecond.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (filterlenecek[j].props.Tip === GayrimenkulSecond[i]) {
            dbs.push(filterlenecek[j]);
          }
        }
      }
      if (dbs.length === 0) filterlenecek.length = 0;
    }
    // /////////////////////////////////////

    if (dbs.length !== 0) filterlenecek = [...dbs];

    // //console.log('after second' , filterlenecek)
    dbs.length = 0;
    // /////////////////////////////////////////////////////
    ///Konum icin Filterleme //////

    ////////////////////////

    let kms = []; // city
    kms.length = 0;
    if (il.length > 0) {
      for (let i = 0; i < il.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (filterlenecek[j].city[0].value === il[i]) {
            kms.push(filterlenecek[j]);
          }
        }
      }
      if (kms.length === 0) filterlenecek.length = 0;
    }
    // /////////////////////////////////////

    if (kms.length !== 0) filterlenecek = [...kms];

    //console.log('city' , filterlenecek)
    kms.length = 0;
    // //////////////////////////////////////////////////////////////////
    // ////////Mahalle //// Filter //////////
    ///////////////////////////

    let mahb = [];

    mahb.length = 0;
    if (mahalle.length > 0) {
      for (let i = 0; i < mahalle.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (filterlenecek[j].neighborhood[0].value === mahalle[i]) {
            mahb.push(filterlenecek[j]);
          }
        }
      }
      if (mahb.length === 0) filterlenecek.length = 0;
    }
    // /////////////////////////////////////

    if (mahb.length !== 0) filterlenecek = [...mahb];

    //  //console.log('city mahalle' , filterlenecek)
    mahb.length = 0;

    let ilces = []; // ilce
    if (ilce.length > 0) {
      for (let i = 0; i < ilce.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (filterlenecek[j].town[0].value === ilce[i]) {
            ilces.push(filterlenecek[j]);
          }
        }
      }
      if (ilces.length === 0) filterlenecek.length = 0;
    }
    // /////////////////////////////////////

    if (ilces.length !== 0) filterlenecek = [...ilces];

    ////console.log('after second' , filterlenecek)
    ilces.length = 0;

    // //console.log(filterlenecek)

    // /////////////////////////////
    /////////Oda Sayisi //////////
    ///////////////////////////

    let Odas = []; // Odalar
    if (Oda_Sayisi.length > 0) {
      for (let i = 0; i < Oda_Sayisi.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (filterlenecek[j].props.OdaSayisi === Oda_Sayisi[i]) {
            Odas.push(filterlenecek[j]);
          }
        }
      }
      if (Odas.length === 0) filterlenecek.length = 0;
    }

    if (Odas.length !== 0) filterlenecek = [...Odas];

    // //console.log('OdaSayisi' , filterlenecek)
    Odas.length = 0;

    //////////////////////////
    // /////////////////////////////
    /////////Yapinin Durumu //////////
    ///////////////////////////
    console.log(Yapinin_Durumu_a);
    let Y_P_D = []; // Yapinin Durumu
    if (Yapinin_Durumu_a.length > 0) {
      for (let i = 0; i < Yapinin_Durumu_a.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (filterlenecek[j].props.YapininDurumu === Yapinin_Durumu_a[i]) {
            Y_P_D.push(filterlenecek[j]);
          }
        }
      }
      if (Y_P_D.length === 0) filterlenecek.length = 0;
    }

    if (Y_P_D.length !== 0) filterlenecek = [...Y_P_D];

    // //console.log('Y_P_D' , filterlenecek)
    Y_P_D.length = 0;

    //////////////

    //////////////////////////
    // /////////////////////////////
    /////////bina yasi //////////
    ///////////////////////////

    let B_Y = []; // bina yasi
    if (binanin_Yasi_a.length > 0) {
      for (let i = 0; i < binanin_Yasi_a.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (filterlenecek[j].props.Binaninyasi === binanin_Yasi_a[i]) {
            B_Y.push(filterlenecek[j]);
          }
        }
      }
      if (B_Y.length === 0) filterlenecek.length = 0;
    }

    if (B_Y.length !== 0) filterlenecek = [...B_Y];

    //console.log('B_Y' , B_Y)
    B_Y.length = 0;

    //////////////

    //////////////////////////
    // /////////////////////////////
    /////////bina kat Sayisi //////////
    ///////////////////////////

    let B_K_S = []; // bina Kat Sayisi
    if (binadaki_kat_sayisi_a.length > 0) {
      for (let i = 0; i < binadaki_kat_sayisi_a.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (
            filterlenecek[j].props.BinadakiKatSayisi ===
            binadaki_kat_sayisi_a[i]
          ) {
            B_K_S.push(filterlenecek[j]);
          }
        }
      }
      if (B_K_S.length === 0) filterlenecek.length = 0;
    }

    if (B_K_S.length !== 0) filterlenecek = [...B_K_S];

    ////console.log('B_K_S' , filterlenecek)
    B_K_S.length = 0;

    //////////////

    //////////////////////////
    // /////////////////////////////
    /////////Yapim Yili //////////
    ///////////////////////////

    let Y_Y = []; // Yapim Yili
    if (Yapim_Yili_a.length > 0) {
      for (let i = 0; i < Yapim_Yili_a.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (filterlenecek[j].props.YapimYili === Yapim_Yili_a[i]) {
            Y_Y.push(filterlenecek[j]);
          }
        }
      }
      if (Y_Y.length === 0) filterlenecek.length = 0;
    }

    if (Y_Y.length !== 0) filterlenecek = [...Y_Y];

    //console.log('Y_Y' , filterlenecek)
    Y_Y.length = 0;

    //////////////

    //////////////////////////
    // /////////////////////////////
    /////////WC Sayis //////////
    ///////////////////////////

    let WC_S = []; // WC Sayis
    if (Wc_sayisi_a.length > 0) {
      for (let i = 0; i < Wc_sayisi_a.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (filterlenecek[j].props.WcSayisi === Wc_sayisi_a[i]) {
            WC_S.push(filterlenecek[j]);
          }
        }
      }
      if (WC_S.length === 0) filterlenecek.length = 0;
    }

    if (WC_S.length !== 0) filterlenecek = [...WC_S];

    //console.log('WC' , filterlenecek)
    WC_S.length = 0;

    //////////////

    //////////////////////////
    // /////////////////////////////
    /////////Banyo Sayisi //////////
    ///////////////////////////

    let B_S = []; //Banyo Sayisi
    if (Banyo_sayisi_a.length > 0) {
      for (let i = 0; i < Banyo_sayisi_a.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (filterlenecek[j].props.BanyoSayisi === Banyo_sayisi_a[i]) {
            B_S.push(filterlenecek[j]);
          }
        }
      }
      if (B_S.length === 0) filterlenecek.length = 0;
    }

    if (B_S.length !== 0) filterlenecek = [...B_S];

    //console.log('B_S' , filterlenecek)
    B_S.length = 0;

    //////////////

    //////////////////////////
    // /////////////////////////////
    /////////Isitma Tipi //////////
    ///////////////////////////

    let i_t = []; //Isitma Tipi
    if (Isitma_Tipi_a.length > 0) {
      for (let i = 0; i < Isitma_Tipi_a.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (filterlenecek[j].props.isitmaTipi === Isitma_Tipi_a[i]) {
            i_t.push(filterlenecek[j]);
          }
        }
      }
      if (i_t.length === 0) filterlenecek.length = 0;
    }

    if (i_t.length !== 0) filterlenecek = [...i_t];

    //console.log('i_t' , filterlenecek)
    i_t.length = 0;

    //////////////

    //////////////////////////
    // /////////////////////////////
    /////////Yapi insa Tarzi
    //////////
    ///////////////////////////

    let Y_i_T = []; //YapiinsaaTarzi
    if (yapi_insa_tarzi_a.length > 0) {
      for (let i = 0; i < yapi_insa_tarzi_a.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (filterlenecek[j].props.YapiinsaaTarzi === yapi_insa_tarzi_a[i]) {
            Y_i_T.push(filterlenecek[j]);
          }
        }
      }
      if (Y_i_T.length === 0) filterlenecek.length = 0;
    }

    if (Y_i_T.length !== 0) filterlenecek = [...Y_i_T];

    //console.log('Y_i_t' , filterlenecek)
    Y_i_T.length = 0;

    //////////////

    //////////////////////////
    // /////////////////////////////
    /////////Cephe_a
    //////////
    ///////////////////////////

    let B_C = []; //Binaa Cephesi
    if (Cephe_a.length > 0) {
      for (let i = 0; i < Cephe_a.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (filterlenecek[j].props.BinaCephesi === Cephe_a[i]) {
            B_C.push(filterlenecek[j]);
          }
        }
      }
      if (B_C.length === 0) filterlenecek.length = 0;
    }

    if (B_C.length !== 0) filterlenecek = [...B_C];

    //console.log('B_C' , filterlenecek)
    B_C.length = 0;

    //////////////

    //////////////////////////
    // /////////////////////////////
    /////////Krediye uygunluk
    //////////
    ///////////////////////////

    let K_U = []; //Krediye uygunluk
    if (Krediye_Uygunluk_a.length > 0) {
      for (let i = 0; i < Krediye_Uygunluk_a.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (
            filterlenecek[j].props.KrediyeUygunluk === Krediye_Uygunluk_a[i]
          ) {
            K_U.push(filterlenecek[j]);
          }
        }
      }
      if (K_U.length === 0) filterlenecek.length = 0;
    }

    if (K_U.length !== 0) filterlenecek = [...K_U];

    //console.log('K_U' , filterlenecek)
    K_U.length = 0;

    //////////////

    //////////////////////////
    // /////////////////////////////
    /////////bulundugu kat
    //////////
    ///////////////////////////

    //console.log('from son ', Bulundugu_Kat);
    let B_N_K = []; ///bulundugu kat
    if (Bulundugu_Kat.length > 0) {
      for (let i = 0; i < Bulundugu_Kat.length; i++) {
        for (let j = 0; j < filterlenecek.length; j++) {
          if (filterlenecek[j].props.BulunduguKat === Bulundugu_Kat[i]) {
            B_N_K.push(filterlenecek[j]);
          }
        }
      }
      if (B_N_K.length === 0) filterlenecek.length = 0;
    }

    if (B_N_K.length !== 0) filterlenecek = [...B_N_K];

    //console.log('B_N_K' , filterlenecek)
    B_N_K.length = 0;

    //////////////

    setFilterState([...filterlenecek]);
  };

  const [CityData, CitySetData] = useState(''); // Data olup olmadigini kontrol ediyor

  var citymap = []; //filter city by map
  // /////////////////////////////////////
  const CityDetail = async (Details) => {
    var plaka = -1;
    await axios.get(EndPoint+'/city/public').then((response) => {
      if (response.data.length > 0) {
        plaka = response.data.find(
          (item) => Number(item.sehir_key) === Number(Details)
        );
      }
    });
    await axios
      .get(EndPoint+'/estate/public')
      .then((response) => {
        if (response.data.length > 0) {
          estate = response.data;
          citymap = estate.filter(
            (item) => item.city[0].value === plaka.sehir_title
          );
          setFilterState(citymap);

          if (citymap.length > 0) {
            CitySetData('Var');
          } else CitySetData('Yok');
        }
      })
      .catch((e) => {
        errf('Error 404!!!!');
        console.log(e);
      });
  };

  // /////////////////////////
  const animatedComponents = makeAnimated();
  const location = useLocation();
  const plateNumber = new URLSearchParams(location.search).get('plateNumber');
  const city_url = new URLSearchParams(location.search).get('city');
  const turu_url = new URLSearchParams(location.search).get('turu');
  console.log('from here ' + city_url + ' ' + turu_url);
  //console.log(plateNumber);
  var all_data;

  if (city_url !== null && turu_url !== null) {
    console.log(filterstate);
    if (count < 3) {
      if (filterstate.length > 0) {
        citymap = filterstate.filter(
          (item) =>
            item.city[0].value == city_url && item.props.Ticari === turu_url
        );
        console.log(citymap);
        setFilterState(citymap);

        setCount(count + 1);
      }
    }
  }
  if (plateNumber !== null) {
    if (count < 2) {
      CityDetail(plateNumber);
      setCount(count + 1);
    }
    if (CityData === 'Yok')
      return (
        <div className='alert alert-danger' role='alert'>
          Sonuç Bulunmadı Bu Şehir ilgiyle bir İlanımız yoktur Şuan .....
        </div>
      );
  }

  const isitma_listesi = async () => {
    console.log('clicked');
    if (count === 0) {
      setCount(count + 1);
      await axios.get(EndPoint+'/estate/isinmatipi').then((response) => {
        if (response.data.length > 0) {
          //
          for (var i in response.data[0]._id)
            isitmaTipi_Db.push({ value: i, label: i });
        }
        console.log(isitmaTipi_Db);
        set_isitma(isitmaTipi_Db);
      });
    }
  };
  if (count === 0) isitma_listesi();

  if (error === 'true')
    return (
      <div>
        <section id='plp'>
          <div className='container-wide-xl'>
            <div className='row'>
              <div className='filter-area col-md-3'>
                <div className='h6 w-100 mt-2 float-left d-block d-md-none'>
                  Filtreler{' '}
                  <i className='filter-area-btn float-right fas fa-window-close'></i>
                </div>
                <div className='input-group mt-4 pt-3'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Anahtar Kelime Giriniz'
                  />
                  <div className='input-group-append'>
                    <button
                      className='fontSize-11 rounded-right px-3 btn-dark'
                      type='button'
                    >
                      <i className='fas fa-search'></i>
                    </button>
                  </div>
                </div>

                <div className='wrapper center-block float-left'>
                  <div className='h6 w-100 mt-4 float-left'>Gayrimenkul</div>
                  <div
                    className='panel-group'
                    id='accordion'
                    role='tablist'
                    aria-multiselectable='true'
                  >
                    <div className='panel panel-default'>
                      <div
                        className='panel-heading'
                        role='tab'
                        id='heading-1'
                        styles={{ fontSize: '600px' }}
                      >
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='Ticari'
                          label='label'
                          options={Ticari_Db}
                          className='fixInputSize'
                          onChange={handleGayrimenkulFirst}
                        />
                      </div>
                      <div
                        id='collapse-1'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck1'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck1'
                            >
                              Konut
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck2'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck2'
                            >
                              Arsa
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck3'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck3'
                            >
                              Ticari
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck4'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck4'
                            >
                              Tarla
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='panel panel-default'>
                      <div className='panel-heading' role='tab' id='heading-2'>
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='Lütfen Tip Seçiniz'
                          label='label'
                          options={Tip_Db}
                          onChange={handleGayrimenkulSecond}
                          className='fixInputSize'
                        />
                      </div>
                      <div
                        id='collapse-2'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body'>
                          <div className='panel-body row mx-0 p-3'>
                            <div className='form-group col-6 px-0 form-check'>
                              <input
                                type='checkbox'
                                className='form-check-input checkbox-effect-4'
                                id='exampleCheck11'
                              />
                              <label
                                className='form-check-label'
                                htmlFor='exampleCheck11'
                              >
                                Büro
                              </label>
                            </div>

                            <div className='form-group col-6 px-0 form-check'>
                              <input
                                type='checkbox'
                                className='form-check-input checkbox-effect-4'
                                id='exampleCheck21'
                              />
                              <label
                                className='form-check-label'
                                htmlFor='exampleCheck21'
                              >
                                Dükkan
                              </label>
                            </div>

                            <div className='form-group col-6 px-0 form-check'>
                              <input
                                type='checkbox'
                                className='form-check-input checkbox-effect-4'
                                id='exampleCheck31'
                              />
                              <label
                                className='form-check-label'
                                htmlFor='exampleCheck31'
                              >
                                Küçük Sanayi Tesisi
                              </label>
                            </div>

                            <div className='form-group col-6 px-0 form-check'>
                              <input
                                type='checkbox'
                                className='form-check-input checkbox-effect-4'
                                id='exampleCheck41'
                              />
                              <label
                                className='form-check-label'
                                htmlFor='exampleCheck41'
                              >
                                Depo
                              </label>
                            </div>

                            <div className='form-group col-6 px-0 form-check'>
                              <input
                                type='checkbox'
                                className='form-check-input checkbox-effect-4'
                                id='exampleCheck51'
                              />
                              <label
                                className='form-check-label'
                                htmlFor='exampleCheck51'
                              >
                                Eğlence Tesisi
                              </label>
                            </div>

                            <div className='form-group col-6 px-0 form-check'>
                              <input
                                type='checkbox'
                                className='form-check-input checkbox-effect-4'
                                id='exampleCheck61'
                              />
                              <label
                                className='form-check-label'
                                htmlFor='exampleCheck61'
                              >
                                Turistik Tesis
                              </label>
                            </div>

                            <div className='form-group col-6 px-0 form-check'>
                              <input
                                type='checkbox'
                                className='form-check-input checkbox-effect-4'
                                id='exampleCheck71'
                              />
                              <label
                                className='form-check-label'
                                htmlFor='exampleCheck71'
                              >
                                Tarım ve Hayvancılık Tesisi
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='wrapper center-block float-left'>
                  <div className='h6 w-100 mt-4 float-left'>Konum</div>

                  <div
                    className='panel-group'
                    id='accordion'
                    role='tablist'
                    aria-multiselectable='true'
                  >
                    <div className='panel panel-default'>
                      <div className='panel-heading' role='tab' id='heading-4'>
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='Lütfen Konum Seçiniz'
                          label='label'
                          options={City_Db}
                          className='fixInputSize'
                          onChange={IlHandler}
                        />
                      </div>
                      <div
                        id='collapse-4'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div
                            id='option_search_area'
                            className='w-100 float-left py-0'
                          >
                            <div className='form-group float-left w-100 px-0'>
                              <input
                                type='text'
                                className='form-control h-50 py-0'
                                id='search_input'
                              />
                            </div>
                            <div
                              id='search_in_check'
                              className='h100-ovy-scroll'
                            >
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111'
                                >
                                  İstanbul
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71112'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71112'
                                >
                                  Ankara
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71114'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71114'
                                >
                                  İzmir
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71115'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71115'
                                >
                                  Adana
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71116'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71116'
                                >
                                  Kayseri
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='panel panel-default'>
                      <div className='panel-heading' role='tab' id='heading-5'>
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='Lütfen İlçe Seçiniz'
                          label='label'
                          options={town_state}
                          className='fixInputSize'
                          onChange={IlceHandler}
                        />
                      </div>
                      <div
                        id='collapse-5'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div
                            id='option_search_area'
                            className='w-100 float-left py-0'
                          >
                            <div className='form-group float-left w-100 px-0'>
                              <input
                                type='text'
                                className='form-control h-50 py-0 float-left w-100 px-0'
                                id='search_input'
                              />
                            </div>
                            <div
                              id='search_in_check'
                              className='h100-ovy-scroll'
                            >
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck711111'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck711111'
                                >
                                  Kadıköy
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck711112'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck711112'
                                >
                                  Şişli
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck711114'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck711114'
                                >
                                  Ortaköy
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck711115'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck711115'
                                >
                                  Ataşehir
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck711116'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck711116'
                                >
                                  Maltepe
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='panel panel-default'>
                      <div className='panel-heading' role='tab' id='heading-55'>
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='Lütfen Mahalle Seçiniz'
                          label='label'
                          options={nb_state}
                          className='fixInputSize'
                          onChange={MahalleHandler}
                        />
                      </div>
                      <div
                        id='collapse-55'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div
                            id='option_search_area'
                            className='w-100 float-left py-0'
                          >
                            <div className='form-group float-left w-100 px-0'>
                              <input
                                type='text'
                                className='form-control h-50 py-0'
                                id='search_input'
                              />
                            </div>
                            <div
                              id='search_in_check'
                              className='h100-ovy-scroll'
                            >
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck7111111'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck7111111'
                                >
                                  Mecidiye Köy mah.
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck7111112'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck7111112'
                                >
                                  Dere Mah.
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck7111114'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck7111114'
                                >
                                  Gültepe mah.
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck7111115'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck7111115'
                                >
                                  Nişantaşı mah.
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck7111116'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck7111116'
                                >
                                  Osmanbey mah.
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='wrapper center-block float-left'>
                  <div className='h6 w-100 mt-4 float-left'>Oda Sayısı</div>

                  <div
                    className='panel-group'
                    id='accordion'
                    role='tablist'
                    aria-multiselectable='true'
                  >
                    <div className='panel panel-default'>
                      <div className='panel-heading' role='tab' id='heading-14'>
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='Lütfen Oda Sayısı Seçiniz'
                          label='label'
                          options={Oda_sayisi_Db}
                          className='fixInputSize'
                          onChange={OdaHandler}
                        />
                      </div>
                      <div
                        id='collapse-14'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck441'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck441'
                            >
                              1+0
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck442'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck442'
                            >
                              1+1
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck443'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck443'
                            >
                              2+1
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck444'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck444'
                            >
                              3+1
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck441'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck441'
                            >
                              1+0
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck4425'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck4425'
                            >
                              1+1
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck4435'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck4435'
                            >
                              2+1
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck4445'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck4445'
                            >
                              3+1
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='wrapper center-block float-left'>
                  <div className='h6 w-100 mt-4 float-left'>Alan (m2)</div>
                  <div className='row float-left w-100'>
                    <div className='form-group col-6'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='min.'
                        id='m2min'
                        onChange={Minimum_Alan_Handler}
                      />
                    </div>
                    <div className='form-group col-6'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='max.'
                        id='m2max'
                        onChange={Maximum_Alan_Handler}
                      />
                    </div>
                  </div>
                </div>

                <div className='wrapper center-block float-left'>
                  <div className='h6 w-100 mt-4 float-left'>Bulunduğu Kat</div>

                  <div
                    className='panel-group'
                    id='accordion'
                    role='tablist'
                    aria-multiselectable='true'
                  >
                    <div className='panel panel-default'>
                      <div
                        className='panel-heading'
                        role='tab'
                        id='heading-1444'
                      >
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='Bulunduğu Kat Seçiniz'
                          label='label'
                          options={Bulundugu_Kat_Db}
                          className='fixInputSize'
                          onChange={Bulundugu_Kat_f}
                        />
                      </div>
                      <div
                        id='collapse-1444'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div
                            id='option_search_area'
                            className='w-100 float-left py-0'
                          >
                            <div className='form-group float-left w-100 px-0'>
                              <input
                                type='text'
                                className='form-control h-50 py-0'
                                id='search_input'
                              />
                            </div>
                            <div
                              id='search_in_check'
                              className='h100-ovy-scroll'
                            >
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111115'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111115'
                                >
                                  Çatı Katı
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111125'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111125'
                                >
                                  Zemin Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111145'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111145'
                                >
                                  1. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111155'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111155'
                                >
                                  2. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111165'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111165'
                                >
                                  3. Kat
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='wrapper center-block float-left'>
                  <div className='h6 w-100 mt-4 float-left'>Fiyat Aralığı</div>
                  <div className='row float-left w-100'>
                    <div
                      id='slider-range'
                      className='w-100 float-left m-3'
                    ></div>
                    <div className='form-group col-6'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='min.'
                        id='amomin'
                        onChange={Minimum_Fiyat_Handler}
                      />
                    </div>
                    <div className='form-group col-6'>
                      <input
                        type='text'
                        className='form-control'
                        placeholder='max.'
                        id='amomax'
                        onChange={Maximum_Fiyat_Handler}
                      />
                    </div>
                  </div>
                </div>

                <div className='wrapper center-block float-left'>
                  <div className='h6 w-100 mt-4 float-left'>
                    Gayrimenkul Detayları
                  </div>

                  <div
                    className='panel-group'
                    id='accordion'
                    role='tablist'
                    aria-multiselectable='true'
                  >
                    <div className='panel panel-default'>
                      <div
                        className='panel-heading'
                        role='tab'
                        id='heading-144'
                      >
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='Yapının Durumu'
                          label='label'
                          options={Yapinin_Durumu_Db}
                          className='fixInputSize'
                          onChange={Yapinin_Durumu}
                        />
                      </div>
                      <div
                        id='collapse-144'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck441'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck441'
                            >
                              1+0
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck442'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck442'
                            >
                              1+1
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck443'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck443'
                            >
                              2+1
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck444'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck444'
                            >
                              3+1
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck441'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck441'
                            >
                              1+0
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck4425'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck4425'
                            >
                              1+1
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck4435'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck4435'
                            >
                              2+1
                            </label>
                          </div>

                          <div className='form-group col-6 px-0 form-check'>
                            <input
                              type='checkbox'
                              className='form-check-input checkbox-effect-4'
                              id='exampleCheck4445'
                            />
                            <label
                              className='form-check-label'
                              htmlFor='exampleCheck4445'
                            >
                              3+1
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className='panel-group'
                    id='accordion'
                    role='tablist'
                    aria-multiselectable='true'
                  >
                    <div className='panel panel-default'>
                      <div
                        className='panel-heading'
                        role='tab'
                        id='heading-14454111'
                      >
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='Binanın Yaşı'
                          label='label'
                          options={Binaninyasi_Db}
                          className='fixInputSize'
                          onChange={binanin_Yasi}
                        />
                      </div>
                      <div
                        id='collapse-14454111'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div
                            id='option_search_area'
                            className='w-100 float-left py-0'
                          >
                            <div className='form-group float-left w-100 px-0'>
                              <input
                                type='text'
                                className='form-control h-50 py-0'
                                id='search_input'
                              />
                            </div>
                            <div
                              id='search_in_check'
                              className='h100-ovy-scroll'
                            >
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111115'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111115'
                                >
                                  Çatı Katı
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111125'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111125'
                                >
                                  Zemin Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111145'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111145'
                                >
                                  1. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111155'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111155'
                                >
                                  2. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111165'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111165'
                                >
                                  3. Kat
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className='panel-group'
                    id='accordion'
                    role='tablist'
                    aria-multiselectable='true'
                  >
                    <div className='panel panel-default'>
                      <div
                        className='panel-heading'
                        role='tab'
                        id='heading-14454'
                      >
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='Binadaki Kat Sayısı'
                          label='label'
                          options={Binadaki_Kat_sayisi_Db}
                          className='fixInputSize'
                          onChange={binadaki_kat_sayisi}
                        />
                      </div>
                      <div
                        id='collapse-14454'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div
                            id='option_search_area'
                            className='w-100 float-left py-0'
                          >
                            <div className='form-group float-left w-100 px-0'>
                              <input
                                type='text'
                                className='form-control h-50 py-0'
                                id='search_input'
                              />
                            </div>
                            <div
                              id='search_in_check'
                              className='h100-ovy-scroll'
                            >
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111115'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111115'
                                >
                                  Çatı Katı
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111125'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111125'
                                >
                                  Zemin Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111145'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111145'
                                >
                                  1. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111155'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111155'
                                >
                                  2. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111165'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111165'
                                >
                                  3. Kat
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className='panel-group'
                    id='accordion'
                    role='tablist'
                    aria-multiselectable='true'
                  >
                    <div className='panel panel-default'>
                      <div
                        className='panel-heading'
                        role='tab'
                        id='heading-1445413'
                      >
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='Yapım yılı'
                          label='label'
                          options={YapimYili_Db}
                          className='fixInputSize'
                          onChange={Yapim_Yili}
                        />
                      </div>
                      <div
                        id='collapse-1445413'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div
                            id='option_search_area'
                            className='w-100 float-left py-0'
                          >
                            <div className='form-group float-left w-100 px-0'>
                              <input
                                type='text'
                                className='form-control h-50 py-0'
                                id='search_input'
                              />
                            </div>
                            <div
                              id='search_in_check'
                              className='h100-ovy-scroll'
                            >
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111115'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111115'
                                >
                                  Çatı Katı
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111125'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111125'
                                >
                                  Zemin Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111145'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111145'
                                >
                                  1. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111155'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111155'
                                >
                                  2. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111165'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111165'
                                >
                                  3. Kat
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className='panel-group'
                    id='accordion'
                    role='tablist'
                    aria-multiselectable='true'
                  >
                    <div className='panel panel-default'>
                      <div
                        className='panel-heading'
                        role='tab'
                        id='heading-1445412'
                      >
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='WC Sayısı'
                          label='label'
                          options={WcSayisi_Db}
                          className='fixInputSize'
                          onChange={Wc_Sayisi}
                        />
                      </div>
                      <div
                        id='collapse-1445412'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div
                            id='option_search_area'
                            className='w-100 float-left py-0'
                          >
                            <div className='form-group float-left w-100 px-0'>
                              <input
                                type='text'
                                className='form-control h-50 py-0'
                                id='search_input'
                              />
                            </div>
                            <div
                              id='search_in_check'
                              className='h100-ovy-scroll'
                            >
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111115'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111115'
                                >
                                  Çatı Katı
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111125'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111125'
                                >
                                  Zemin Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111145'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111145'
                                >
                                  1. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111155'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111155'
                                >
                                  2. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111165'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111165'
                                >
                                  3. Kat
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className='panel-group'
                    id='accordion'
                    role='tablist'
                    aria-multiselectable='true'
                  >
                    <div className='panel panel-default'>
                      <div
                        className='panel-heading'
                        role='tab'
                        id='heading-1445411'
                      >
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='Banyo Sayisi'
                          label='label'
                          options={BanyoSayisi_Db}
                          className='fixInputSize'
                          onChange={Banyo_sayisi}
                        />
                      </div>
                      <div
                        id='collapse-1445411'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div
                            id='option_search_area'
                            className='w-100 float-left py-0'
                          >
                            <div className='form-group float-left w-100 px-0'>
                              <input
                                type='text'
                                className='form-control h-50 py-0'
                                id='search_input'
                              />
                            </div>
                            <div
                              id='search_in_check'
                              className='h100-ovy-scroll'
                            >
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111115'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111115'
                                >
                                  Çatı Katı
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111125'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111125'
                                >
                                  Zemin Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111145'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111145'
                                >
                                  1. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111155'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111155'
                                >
                                  2. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111165'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111165'
                                >
                                  3. Kat
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className='panel-group'
                    id='accordion'
                    role='tablist'
                    aria-multiselectable='true'
                  >
                    <div className='panel panel-default'>
                      <div
                        className='panel-heading'
                        role='tab'
                        id='heading-144542'
                      >
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='isitma Tipi'
                          label='label'
                          options={isitma}
                          className='fixInputSize'
                          onChange={isitma_Tipi}
                        />
                      </div>
                      <div
                        id='collapse-144542'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div
                            id='option_search_area'
                            className='w-100 float-left py-0'
                          >
                            <div className='form-group float-left w-100 px-0'>
                              <input
                                type='text'
                                className='form-control h-50 py-0'
                                id='search_input'
                              />
                            </div>
                            <div
                              id='search_in_check'
                              className='h100-ovy-scroll'
                            >
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111115'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111115'
                                >
                                  Çatı Katı
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111125'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111125'
                                >
                                  Zemin Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111145'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111145'
                                >
                                  1. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111155'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111155'
                                >
                                  2. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111165'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111165'
                                >
                                  3. Kat
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className='panel-group'
                    id='accordion'
                    role='tablist'
                    aria-multiselectable='true'
                  >
                    <div className='panel panel-default'>
                      <div
                        className='panel-heading'
                        role='tab'
                        id='heading-144543'
                      >
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='Yapı İnşa Tarzı'
                          label='label'
                          options={YapiinsaaTarzi_Db}
                          className='fixInputSize'
                          onChange={yapi_insa_tarzi}
                        />

                        {/* <Select 
    components={animatedComponents}
    isMulti
    placeholder="Cephe"
  label= "label"
    options={options}
    className = "fixInputSize"

    onChange = {Cephe}
   
  /> */}
                      </div>
                      <div
                        id='collapse-144543'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div
                            id='option_search_area'
                            className='w-100 float-left py-0'
                          >
                            <div className='form-group float-left w-100 px-0'>
                              <input
                                type='text'
                                className='form-control h-50 py-0'
                                id='search_input'
                              />
                            </div>
                            <div
                              id='search_in_check'
                              className='h100-ovy-scroll'
                            >
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111115'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111115'
                                >
                                  Çatı Katı
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111125'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111125'
                                >
                                  Zemin Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111145'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111145'
                                >
                                  1. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111155'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111155'
                                >
                                  2. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111165'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111165'
                                >
                                  3. Kat
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className='panel-group'
                    id='accordion'
                    role='tablist'
                    aria-multiselectable='true'
                  >
                    <div className='panel panel-default'>
                      <div
                        className='panel-heading'
                        role='tab'
                        id='heading-144544'
                      >
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='Cephe'
                          label='label'
                          options={BinaCephesi_Db}
                          className='fixInputSize'
                          onChange={Cephe}
                        />
                      </div>
                      <div
                        id='collapse-144544'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div
                            id='option_search_area'
                            className='w-100 float-left py-0'
                          >
                            <div className='form-group float-left w-100 px-0'>
                              <input
                                type='text'
                                className='form-control h-50 py-0'
                                id='search_input'
                              />
                            </div>
                            <div
                              id='search_in_check'
                              className='h100-ovy-scroll'
                            >
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111115'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111115'
                                >
                                  Çatı Katı
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111125'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111125'
                                >
                                  Zemin Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111145'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111145'
                                >
                                  1. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111155'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111155'
                                >
                                  2. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111165'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111165'
                                >
                                  3. Kat
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className='panel-group'
                    id='accordion'
                    role='tablist'
                    aria-multiselectable='true'
                  >
                    <div className='panel panel-default'>
                      <div
                        className='panel-heading'
                        role='tab'
                        id='heading-144545'
                      >
                        <Select
                          components={animatedComponents}
                          isMulti
                          placeholder='Krediye Uygunluk'
                          label='label'
                          options={KrediyeUygunluk_Db}
                          className='fixInputSize'
                          onChange={Krediye_Uygunluk}
                        />
                      </div>
                      <div
                        id='collapse-144545'
                        className='border rounded-bottom panel-collapse collapse in'
                        role='tabpanel'
                        aria-labelledby='headingOne'
                      >
                        <div className='panel-body row mx-0 p-3'>
                          <div
                            id='option_search_area'
                            className='w-100 float-left py-0'
                          >
                            <div className='form-group float-left w-100 px-0'>
                              <input
                                type='text'
                                className='form-control h-50 py-0'
                                id='search_input'
                              />
                            </div>
                            <div
                              id='search_in_check'
                              className='h100-ovy-scroll'
                            >
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111115'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111115'
                                >
                                  Çatı Katı
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111125'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111125'
                                >
                                  Zemin Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111145'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111145'
                                >
                                  1. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111155'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111155'
                                >
                                  2. Kat
                                </label>
                              </div>
                              <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                                <input
                                  type='checkbox'
                                  className='form-check-input checkbox-effect-4'
                                  id='exampleCheck71111165'
                                />
                                <label
                                  className='form-check-label'
                                  htmlFor='exampleCheck71111165'
                                >
                                  3. Kat
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*FiLTRELE  */}
                    <button
                      href='#'
                      className='btn btn-warning float-left text-white btn-block'
                      onClick={(e) => Filter_f(e)}
                      id='myCheck'
                    >
                      FİLTRELE{' '}
                    </button>
                  </div>
                </div>
              </div>
              <div className='col-md-9'>
                {/* in here */}

                <ul className='breadcrumb col-12 col-sm-6 w-50 float-left'>
                  <li>
                    <a href='#'>Anasayfa</a>
                  </li>
                  <li>
                    <a href='#'>İlan Listesi</a>
                  </li>
                </ul>
                <div className='col-12 px-0 mx-0 mb-3 col-sm-6 float-right'>
                  <button
                    type='button'
                    className='filter-area-btn btn btn-default d-block d-md-none float-left shadow'
                  >
                    Filteleri Göster <i className='fas fa-filter'></i>
                  </button>
                  <button
                    type='button'
                    className='btn btn-default float-right shadow'
                    data-toggle='modal'
                    data-target='#siralama'
                  >
                    Sıralama <i className='fas fa-sort-amount-down-alt'></i>
                  </button>
                </div>
                <div
                  className='modal fade'
                  id='siralama'
                  tabIndex='-1'
                  role='dialog'
                  aria-labelledby='exampleModalLabel'
                  aria-hidden='true'
                >
                  <div className='modal-dialog' role='document'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h5
                          className='modal-title fontSize-12'
                          id='exampleModalLabel '
                        >
                          Sıralama
                        </h5>
                        <button
                          type='button'
                          className='close'
                          data-dismiss='modal'
                          aria-label='Close'
                        >
                          <span aria-hidden='true'>&times;</span>
                        </button>
                      </div>
                      <div className='modal-body fontSize-13'>
                        <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                          <input
                            type='radio'
                            className='form-check-input checkbox-effect-5'
                            name='sirala'
                            id='exampleCheck7111111asdasdasds5'
                          />
                          <label
                            className='form-check-label'
                            htmlFor='exampleCheck7111111asdasdasds5'
                          >
                            Akıllı Sıralama
                          </label>
                        </div>
                        <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                          <input
                            type='radio'
                            className='form-check-input checkbox-effect-5'
                            name='sirala'
                            id='exampleCheck7111111asdasdasds53'
                          />
                          <label
                            className='form-check-label'
                            htmlFor='exampleCheck7111111asdasdasds53'
                          >
                            Fiyat: Artan
                          </label>
                        </div>
                        <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                          <input
                            type='radio'
                            className='form-check-input checkbox-effect-5'
                            name='sirala'
                            id='exampleCheck7111111asdasdasds52'
                          />
                          <label
                            className='form-check-label'
                            htmlFor='exampleCheck7111111asdasdasds52'
                          >
                            Fiyat: Azalan
                          </label>
                        </div>
                        <div className='form-group w-100 float-left px-0 mb-2 form-check'>
                          <input
                            type='radio'
                            className='form-check-input checkbox-effect-5'
                            name='sirala'
                            id='exampleCheck7111111asdasdasds51'
                          />
                          <label
                            className='form-check-label'
                            htmlFor='exampleCheck7111111asdasdasds51'
                          >
                            Bitiş Süresi
                          </label>
                        </div>
                      </div>
                      <div className='modal-footer'>
                        <button
                          type='button'
                          className='btn btn-secondary'
                          data-dismiss='modal'
                        >
                          Kapat
                        </button>
                        <button type='button' className='btn btn-primary'>
                          Sırala
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ clear: 'both' }}></div>
                <div className='row'>
                  {filterArray.length > 0
                    ? filterArray.map((e, index) => {
                        return <Card key={index} option={e} id={1} />;
                      })
                    : filterstate.map((e, index) => {
                        return <Card key={index} option={e} id={1} />;
                      })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  */}

        {/*  */}
      </div>
    );
  else {
    return (
      <div
        className='spinner-border'
        role='status'
        style={{ margin: '15%', marginLeft: '50%' }}
      >
        <div className='sr-only'>Loading...</div>
      </div>
    );
  }
});
