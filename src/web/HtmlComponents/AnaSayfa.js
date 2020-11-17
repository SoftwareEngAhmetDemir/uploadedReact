import { Tooltip } from '@material-ui/core';
import React, { useEffect, useState, Fragment, useContext } from 'react';
import { useHistory, Link, NavLink } from 'react-router-dom';
import TurkeyMap from 'turkey-map-react';
import axios from 'axios';
import '../../web/style.css';
import { PieChart } from 'react-minimal-pie-chart';
import Select from 'react-select';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import SwiperCore, { Pagination } from 'swiper';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../panel/Context/AuthContext';
import mülkedinLogo from '../../assets/img/Urun_Yok_Banner.jpg';
let EndPoint= ""

SwiperCore.use([Pagination]);

function AnaSayfa() {
    const [t] = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
        AuthContext
    );
    var [show_cities, show_cities_f] = useState([]);
    var [chart_show, char_show_f] = useState([]);
    var son_mat = [];
    var colors = [
        { color: '#E38627', Ticari: 'Arsa' },
        { color: '#C13C37', Ticari: 'Tarla' },
        { color: '#6A2135', Ticari: 'Ticari' },
        { color: 'blue', Ticari: 'Konut' },
    ];
    useEffect(() => {
        async function fx() {
            // ///////////////////////////////
            await axios.get(EndPoint+'/estate/city').then((response) => {
                if (response.data.length > 0) {
                    ct = response.data;
                }
            });

            /*  console.log(ct); */

            // //////////////////////////

            var cities;

            cities = ct.map((e) => e._id.city[0].label);

            /* console.log(cities); */
            show_cities_f(cities);
            // //////////////////
            var city_count = ct.map((e) => e.count);

            /* console.log(city_count); */

            // ///////////////////////
            var city_with_dup = [];

            await axios.get(EndPoint+'/estate/public').then((response) => {
                if (response.data.length > 0) {
                    city_with_dup = response.data.map((e) => {
                        if (e.props.Ticari !== undefined) {
                            return { title: e.city[0].label, Ticari: e.props.Ticari };
                        }
                    });
                }
            });

            // console.log(city_with_dup)

            // /////////////////////////////////

            var all_cities_sorted = [];

            var f = [];
            cities.map((e) => {
                city_with_dup.map((ce) => {
                    if (e === ce.title) {
                        // console.log(JSON.stringify(ce))
                        all_cities_sorted.push(ce);
                        f.push(ce.Ticari);
                    }
                });
            });
            /* console.log(f);
            console.log(all_cities_sorted); */

            // //////////////////////////////
            var tc;

            await axios.get(EndPoint+'/estate/Ticari').then((response) => {
                if (response.data.length > 0) {
                    tc = response.data;
                }
            });

            // console.log(tc)
            // /////////////////
            var sort_tc = [];
            var tow_c;
            tow_c = tc.map((e) => e.count);

            // console.log(tow_c)
            cities.map((e) => {
                tc.map((r, index) => {
                    if (e === r._id.City[0].label) {
                        //  console.log(r)
                        var tobj = {
                            title: r._id.Ticari,
                            value: tow_c[index],
                            city: r._id.City[0].label,
                        };
                        sort_tc.push(tobj);
                    }
                });
            });

            /* console.log(sort_tc); */
            // /////////////////////////

            /////////////

      var son_data = [];
      let uv = 0;
      cities.map((e, j) => {
        var nat = [];
        console.log(e);
        uv = 0;
        sort_tc.map((s, index) => {
          if (e === s.city) {
            let ind = colors.find((e) => e.Ticari === s.title);
            console.log(ind);
            nat.push({
              title: s.value,
              value: s.value,
              color: ind.color,
              turu: s.title,
            });
            uv++;
          }
        });
        son_mat.push(nat);
      });
      // ////////////////////////

            char_show_f(son_mat);
        }
        fx();
    }, []);

  const [ilan_S, ilan_S_F] = useState("");
  const [sehir_counter, setCounter] = useState("");
  const history = useHistory();

  const Go_To_Filter = (Details) => {
    //console.log(Details);

    if (sehir_counter !== "Bekleyiniz...." && sehir_counter !== "0")
      history.push("/filter?plateNumber=" + Details.plateNumber);
  };
  const Ilan_Sayisi_Harita_Uzerinde = async (Details) => {
    console.log(Details.plateNumber);
    ilan_S_F("Bekleyiniz....");
    setCounter("Bekleyiniz....");
    var plaka = [];
    await axios.get("/city/public").then((response) => {
      if (response.data.length > 0) {
        console.log(response.data);

        plaka = response.data.find(
          (item) => item.sehir_key === Details.plateNumber
        );
        console.log(plaka);
      }
    });
    console.log(JSON.stringify(plaka));
    if (JSON.stringify(plaka) !== undefined) {
      var sehir_adi = plaka.sehir_title;
      var City_Db = [];
      await axios
        .get("/estate/public")
        .then((response) => {
          if (response.data.length > 0) {
            City_Db = response.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
      var Cities_Counter = 0;
      for (let k = 0; k < City_Db.length; k++) {
        if (City_Db[k].city[0].value === sehir_adi) Cities_Counter++;
      }

      //  console.log(Cities_Counter)
      ilan_S_F(sehir_adi + " : " + Cities_Counter.toString() + " Ilan var");
      setCounter(Cities_Counter.toString());
    }
  };

    const mydata = [
        // { title: 'One', value: 10, color: '#E38627' },
        // { title: 'One', value: 10, color: '#E38627' },
        // { title: 'Three', value: 20, color: '#6A2135' },
    ];

    var ct; //cities

  const Ftr = (e, segmentIndex, index) => {
    console.log(chart_show[index][segmentIndex]);

    console.log(show_cities[index]);

    history.push(
      "/filter?city=" +
        show_cities[index] +
        "&&turu=" +
        chart_show[index][segmentIndex].turu
    );
  };

  const [open, setOpen] = useState(false);
  const [state, setState] = useState([]);
  const [category, setCategory] = useState({
    findCategory: [],
    selectedCategoryItemValue: "",
    selectedCategoryItemLabel: "",
  });
  const { gState, seTgState } = useContext(AuthContext);
  const [userState, setUserState] = useState({
    username: '',
    name: '',
    surname: '',
    favorites: [],
    id: '',
  });

    const [like, setLikeState] = useState(false);


    const [selectState, setselectState] = useState({
        findTicari: [],
        findCity: [],
        findOdaSayısı: [],
        selectedTicari: '',
        selectedCity: '',
        selectedOdaSayısı: '',
    });

    const getUserData = async () => {
        if (user && user.id !== '') {
            if (user.role[0].customers === true) {
                await axios.get(EndPoint+`/staff/customer/${user.id}`).then((response) => {
                    setUserState({
                        ...userState,
                        id: response.data._id,
                        username: response.data.username,
                        name: response.data.name,
                        surname: response.data.surname,
                        favorites: response.data.favorites,
                    });
                });
            } else {
                await axios.get(EndPoint+`/staff/${user.id}`).then((response) => {
                    setUserState({
                        ...userState,
                        id: response.data._id,
                        username: response.data.username,
                        name: response.data.name,
                        surname: response.data.surname,
                        favorites: response.data.favorites,
                    });
                });
            }
        }
    };

    const getEstateData = async () => {
        await axios.get(EndPoint+'/estate/public').then((res) => {
            if (res.data.length > 0) {
                const detailsCity = [];
                const map = new Map();
                for (const item in res.data) {
                    if (!map.has(res.data[item].city[0].label)) {
                        map.set(res.data[item].city[0].label, true);
                        detailsCity.push({
                            label: res.data[item].city[0].label,
                            value: res.data[item].city[0].value,
                        });
                    }
                }
                setselectState({
                    ...selectState,
                    findCity: detailsCity,
                });
                setState(res.data);
            }
        });
    };

    function getEstateCategories() {
        axios
            .get(EndPoint+'/estatecategory/public')
            .then((res) => {
                if (res.data.length > 0) {
                    const details = [];
                    for (const i in res.data) {
                        details.push({
                            label: res.data[i].name,
                            value: res.data[i]._id,
                        });
                    }
                    setCategory({ ...category, findCategory: details });
                }
            })
            .catch((err) => console.log(err));
    }

    const handleSelectCity = async (newValue) => {
        await axios.get(EndPoint+'/estate/public').then(async (res) => {
            const detailsOdaSayısı = [];
            if (res.data.length > 0) {
                const map = new Map();
                for (const item in res.data) {
                    if (newValue.value === res.data[item].city[0].value) {
                        if (
                            !map.has(res.data[item].props.OdaSayisi) &&
                            res.data[item].props.OdaSayisi !== undefined
                        ) {
                            map.set(res.data[item].props.OdaSayisi, true);
                            detailsOdaSayısı.push({
                                label: res.data[item].props.OdaSayisi,
                                value: res.data[item].props.OdaSayisi,
                            });
                        }
                    }
                }
                setselectState({
                    ...selectState,
                    findOdaSayısı: detailsOdaSayısı,
                    selectedCity: newValue,
                });
            }
        });
    };

    const handleSelectOdaSayısı = async (newValue) => {
        await axios.get(EndPoint+'/estate/public').then(async (res) => {
            const detailsTicari = [];
            if (res.data.length > 0) {
                const map = new Map();
                for (const item in res.data) {
                    if (
                        newValue.label === res.data[item].props.OdaSayisi &&
                        selectState.selectedCity.value === res.data[item].city[0].value
                    ) {
                        if (
                            !map.has(res.data[item].props.Ticari) &&
                            res.data[item].props.Ticari !== undefined
                        ) {
                            map.set(res.data[item].props.Ticari, true);
                            detailsTicari.push({
                                label: res.data[item].props.Ticari,
                                value: res.data[item].props.Ticari,
                            });
                        }
                    }
                }
                setselectState({
                    ...selectState,
                    findTicari: detailsTicari,
                    selectedOdaSayısı: newValue,
                });
            }
        });
    };

    const handleSelectTicari = (newValue) => {
        setselectState({
            ...selectState,
            selectedTicari: newValue,
        });
    };

    const addLike = async (id) => {
        await axios
            .put(EndPoint+`staff/${user.id}/like/${id}`)
            .then((res) => {
                if (res.data.variant == 'error') {
                    enqueueSnackbar(t(' Not Liked ') + res.data.messagge, {
                        variant: res.data.variant,
                    });
                } else {
                    enqueueSnackbar(t('Liked '), {
                        variant: res.data.variant,
                    });
                }
            })
            .catch((err) => console.log(err));
        if (like === false) {
            setLikeState(true);
        } else {
            setLikeState(false);
        }
    };

    const removeLike = async (id) => {
        await axios
            .put(EndPoint+`staff/${user.id}/unlike/${id}`)
            .then((res) => {
                if (res.data.variant == 'error') {
                    enqueueSnackbar(t(' Not Removed ') + res.data.messagge, {
                        variant: res.data.variant,
                    });
                } else {
                    enqueueSnackbar(t('Removed '), {
                        variant: res.data.variant,
                    });
                }
            })
            .catch((err) => console.log(err));
        if (like === false) {
            setLikeState(true);
        } else {
            setLikeState(false);
        }
    };

    var estateArr = [];
    const map = new Map();
    for (const estate of state) {
        if (!map.has(estate._id)) {
            map.set(estate._id, true);
            estateArr.push(estate);
        }
    }

    var likeArray = [];
    for (const like of userState.favorites) {
        for (const estate of state) {
            if (like === estate._id) {
                likeArray.push(like);
            }
        }
    }

    var chanceCat = [];

    for (const estate of state) {
        if (chanceCat.indexOf(estate.chance_category) === -1) {
            if (estate.chance_category) {
                const values = estate.chance_category.map((value) => value.value);
                for (const i in values) {
                    chanceCat.push(values[i]);
                }
            }
        }
    }

    useEffect(() => {
        getEstateCategories();
        getEstateData();
    }, []);

    useEffect(() => {
        getUserData();
    }, [like]);

    const onSubmit = (e) => {
        e.preventDefault();
        let searchQueries = [];

        if (
            selectState.selectedCity.value &&
            selectState.selectedCity.value !== undefined
        ) {
            searchQueries.push(selectState.selectedCity.value);
        }
        if (
            selectState.selectedOdaSayısı.value &&
            selectState.selectedOdaSayısı.value !== undefined
        ) {
            searchQueries.push(selectState.selectedOdaSayısı.value);
        }
        if (
            selectState.selectedTicari.value &&
            selectState.selectedTicari.value !== undefined
        ) {
            searchQueries.push(selectState.selectedTicari.value);
        }
        seTgState({
            ...gState,
            mainPageQueries: searchQueries,
        });
        history.push('/filter');
    };

    return (
        <Fragment>
            <section id='mainSlider'>
                <div className='searchBar row container-md px-0'>
                    <form onSubmit={onSubmit}>
                        <div className='col-sm-3 col-4  px-0  float-left'>
                            <div className='form-control category  ' id='select1'>
                                <Select
                                    value={selectState.selectedCity}
                                    options={selectState.findCity}
                                    onChange={handleSelectCity}
                                    placeholder={'Konum'}
                                />
                            </div>
                        </div>
                        <div className='col-sm-3 col-4  px-0  float-left'>
                            <div className='form-control location' id='select2'>
                                <Select
                                    value={selectState.selectedOdaSayısı}
                                    options={selectState.findOdaSayısı}
                                    onChange={handleSelectOdaSayısı}
                                    placeholder={'Oda Sayısı'}
                                />
                            </div>
                        </div>
                        <div className='col-sm-3 col-4  px-0  float-left'>
                            <div className='form-control room' id='select3'>
                                <Select
                                    value={selectState.selectedTicari}
                                    options={selectState.findTicari}
                                    onChange={handleSelectTicari}
                                    placeholder={'Kategori'}
                                />
                            </div>
                        </div>
                        <div className='col-sm-3 col-12  px-0 float-left'>
                            <div className='searchArea'>
                                <input
                                    type='search'
                                    id='gsearch'
                                    name='gsearch'
                                    placeholder='Ara...'
                                />
                                <button type='submit'>
                                    <svg
                                        width='1em'
                                        height='1em'
                                        marginRight='5px'
                                        viewBox='0 0 16 16'
                                        className='bi bi-search'
                                        fill='currentColor'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'
                                        />
                                        <path
                                            fillRule='evenodd'
                                            d='M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z'
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='container justify-content-center'>
                    <div className='features owerflow-1200'>
                        <div className='li'>
                            <div className='ov2'>
                                <img src='img/icons/servicePrice.png' alt='' />
                                <span>Hizmet Bedeli Avantajı</span>
                            </div>
                        </div>
                        <div className='li'>
                            <div className='ov2'>
                                <img src='img/icons/kdv.png' alt='' />
                                <span>KDV Avantajı</span>
                            </div>
                        </div>
                        <div className='li'>
                            <div className='ov2'>
                                <img src='img/icons/authorMark.png' alt='' />
                                <span>Kurumsal Satıcı</span>
                            </div>
                        </div>
                        <div className='li'>
                            <div className='ov2'>
                                <img src='img/icons/tapu.png' alt='' />
                                <span>Temiz Tapu</span>
                            </div>
                        </div>
                        <div className='li'>
                            <div className='ov2'>
                                <img src='img/icons/seffaf.png' alt='' />
                                <span>Şeffaf Satış</span>
                            </div>
                        </div>
                        <div className='li'>
                            <div className='ov2'>
                                <img src='img/icons/experience.png' alt='' />
                                <span>Mesleki Tecrübe</span>
                            </div>
                        </div>
                        <div className='li'>
                            <div className='ov2'>
                                <img src='img/icons/profVision.png' alt='' />
                                <span>Profesyonel Görüş</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br />
            <br />
            <br />

            <section id='first-slider'>
                {category.findCategory.map((data) => (
                    <Fragment key={data.value}>
                        <div className='container'>
                            <h5 className='sectionTitle'>
                                {data.label}
                                <span>{data.label}</span>
                            </h5>
                        </div>
                        <div id='sliderFirst' className='slider-wrapper'>
                            <div className='container-fluid'>
                                <h1>Lorem ipsum dolor sit amet consectetur</h1>
                                <span className='text'>Sit amet consectetur masa sed arcu</span>
                                <Link to='/filter'>Tümüne Göz At</Link>
                            </div>
                            <br />
                            <div id='sliderFirst' className='slider-wrapper'>
                                <Swiper spaceBetween={50} slidesPerView={3}>
                                    {estateArr.map((estate) => {
                                        if (estate.chance_category) {
                                            return estate.chance_category.map((value) => {
                                                if (value.value === data.value) {
                                                    return (
                                                        <SwiperSlide key={estate._id}>
                                                            <div className='swiper-wrapper'>
                                                                <div className='swiper-slide'>
                                                                    <Link to='#'>
                                    <span>
                                      <Link
                                          to={`/CardDetails?cardid=${estate._id}`}
                                      >
                                        {estate.images[0] === '' ||
                                        estate.images[0] === undefined ? (
                                            <img
                                                src={mülkedinLogo}
                                                alt={mülkedinLogo}
                                            />
                                        ) : (
                                            <img
                                                src={estate.images[0]}
                                                alt={estate.images[0]}
                                            />
                                        )}
                                      </Link>
                                    </span>
                                                                        <div className='product-summary'>
                                                                            <div className='summary-top'>
                                        <span className='badge offer left-top'>
                                          Teklif Bekleniyor
                                        </span>
                                                                                <span className='badge oppor right-top'>
                                          Fırsat
                                        </span>
                                                                            </div>
                                                                            <div className='summary-bottom'>
                                                                                <ul>
                                                                                    <li>{estate.props.Fiyat} TL</li>

                                                                                    {userState.id !== '' ? (
                                                                                        <li>
                                                                                            {userState.favorites.includes(
                                                                                                estate._id
                                                                                            ) ? (
                                                                                                <Button
                                                                                                    onClick={(e) =>
                                                                                                        removeLike(estate._id)
                                                                                                    }
                                                                                                    key={like}
                                                                                                >
                                                                                                    <FavoriteIcon></FavoriteIcon>
                                                                                                </Button>
                                                                                            ) : (
                                                                                                <Button
                                                                                                    onClick={(e) =>
                                                                                                        addLike(estate._id)
                                                                                                    }
                                                                                                    key={like}
                                                                                                >
                                                                                                    <FavoriteBorderIcon></FavoriteBorderIcon>
                                                                                                </Button>
                                                                                            )}
                                                                                        </li>
                                                                                    ) : (
                                                                                        ''
                                                                                    )}

                                                                                    <li>
                                                                                        {estate.bank_id[0].label}'tan{' '}
                                                                                        {estate.city[0].label}{' '}
                                                                                        {estate.town[0].label}'de
                                                                                        {estate.props.Alan}m2{' '}
                                                                                        {estate.props.Ticari}
                                                                                    </li>
                                                                                    <li>
                                                                                        <i className='fas fa-map-marker-alt'></i>
                                                                                        {estate.bank_id[0].label}-
                                                                                        {estate.city[0].label}-
                                                                                        {estate.town[0].label}'de
                                                                                        {estate.props.Alan}m2{' '}
                                                                                        {estate.props.Ticari}
                                                                                    </li>
                                                                                    <li>BRG</li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                                <div className='swiper-pagination'></div>
                                                            </div>
                                                        </SwiperSlide>
                                                    );
                                                }
                                            });
                                        }
                                    })}
                                </Swiper>
                            </div>
                        </div>
                        <br />
                    </Fragment>
                ))}
            </section>

            <section id='secondSlider'>
                <div className='container-wide'>
                    <div id='sliderSecond' className='swiper-container'>
                        <div className='swiper-wrapper'>
                            <Swiper
                                spaceBetween={50}
                                slidesPerView={3}
                                pagination={{ clickable: true }}
                            >
                                <SwiperSlide>
                                    <Link className='tarla' to='/filter'>
                                        <img
                                            className='first-img'
                                            src='img/icons/Yatitimlik_Arsalar.png'
                                            alt=''
                                        />
                                        <img
                                            className='second-img d-none'
                                            src='img/icons/Yatitimlik_Arsalar1.png'
                                            alt=''
                                        />
                                        <p className='option-title'>Yatırımlık Arsalar</p>
                                        <p className='option-desc'>
                                            İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında
                                            uzmanlarımız ile konuşun ve bilgi alın.
                                        </p>
                                    </Link>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Link className='konut' to='/filter'>
                                        <img
                                            className='first-img'
                                            src='img/icons/satilik-konutlar.png'
                                            alt=''
                                        />
                                        <img
                                            className='second-img d-none'
                                            src='img/icons/satilik-konutlar1.png'
                                            alt=''
                                        />
                                        <p className='option-title'>Satılık Konutlar</p>
                                        <p className='option-desc'>
                                            İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında
                                            uzmanlarımız ile konuşun ve bilgi alın.
                                        </p>
                                    </Link>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Link className='mustakil' to='/filter'>
                                        <img
                                            className='first-img'
                                            src='img/icons/Mustakil-Evler.png'
                                            alt=''
                                        />
                                        <img
                                            className='second-img d-none'
                                            src='img/icons/Mustakil-Evler1.png'
                                            alt=''
                                        />
                                        <p className='option-title'>Müstakil Evler</p>
                                        <p className='option-desc'>
                                            İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında
                                            uzmanlarımız ile konuşun ve bilgi alın.
                                        </p>
                                    </Link>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Link className='villa' to='/filter'>
                                        <img
                                            className='first-img'
                                            src='img/icons/Villalar.png'
                                            alt=''
                                        />
                                        <img
                                            className='second-img d-none'
                                            src='img/icons/Villalar12.png'
                                            alt=''
                                        />
                                        <p className='option-title'>Villalar</p>
                                        <p className='option-desc'>
                                            İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında
                                            uzmanlarımız ile konuşun ve bilgi alın.
                                        </p>
                                    </Link>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Link className='daire' to='/filter'>
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
                                            İlgilendiğiniz gayrimenkul ve satış süreçleri hakkında
                                            uzmanlarımız ile konuşun ve bilgi alın.
                                        </p>
                                    </Link>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                <TurkeyMap
                    onClick={(Details) => Go_To_Filter(Details)}
                    onHover={(Details) => Ilan_Sayisi_Harita_Uzerinde(Details)}
                    cityWrapper={(cityComponent, cityData) => (
                        <Tooltip title={ilan_S} key={cityData.id}>
                            {cityComponent}
                        </Tooltip>
                    )}
                />

                {/* <img
          className='myimg'
          src='http://www.theage.com.au/ffximage/2007/09/12/mario300_narrowweb__300x392,0.jpg'
          width='200'
          height='150'
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '10px',
            zIndex: '2',
            border: '0 none',
            borderRadius: '50%',
            objectFit: 'contain',
            opacity: '1',
          }}
        /> */}

                <table>
                    <tbody>
                    <tr>
                        {chart_show.map((e, index) => {
                            return (
                                <td key={index}>
                                    <PieChart
                                        style={{
                                            width: '200px',
                                            position: 'relative',
                                            zIndex: '1',
                                            left: '10px',
                                        }}
                                        onClick={(e, segmentIndex) => Ftr(e, segmentIndex, index)}
                                        data={e}
                                    />
                                    <br />
                                    <div style={{ marginLeft: '95px' }}>
                                        {show_cities[index]}
                                    </div>
                                </td>
                            );
                        })}
                    </tr>
                    </tbody>
                </table>
                <br />
                <div className='row' style={{ position: 'relative', left: '40px' }}>
                    <div
                        style={{
                            backgroundColor: colors[0].color,
                            height: '20px',
                            width: '20px',
                        }}
                    ></div>{' '}
                    <span style={{ fontSize: '20px' }}>Arsa</span>
                    <div
                        style={{
                            backgroundColor: colors[1].color,
                            height: '20px',
                            width: '20px',
                            marginLeft: '5%',
                        }}
                    ></div>{' '}
                    <span style={{ fontSize: '20px' }}>Tarla</span>
                    <div
                        style={{
                            backgroundColor: colors[2].color,
                            height: '20px',
                            width: '20px',
                            marginLeft: '5%',
                        }}
                    ></div>{' '}
                    <span style={{ fontSize: '20px' }}>Ticari</span>
                    <div
                        style={{
                            backgroundColor: colors[3].color,
                            height: '20px',
                            width: '20px',
                            marginLeft: '5%',
                        }}
                    ></div>{' '}
                    <span style={{ fontSize: '20px' }}>Konut</span>
                </div>
            </div>
        </Fragment>
    );
}

export default AnaSayfa;
