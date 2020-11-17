import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
let ENDPOINT = 'https://serverbigfilserve.herokuapp.com'

function SearchBar() {
  const [sehir, sehirset] = useState([]);

  const location = useLocation();
  const cityName = new URLSearchParams(location.search).get('city');
  const towName = new URLSearchParams(location.search).get('town');
  const ticari = new URLSearchParams(location.search).get('ticari');
  async function get_city_info() {
    var t;

    await Axios.get(ENDPOINT+'/estate/public').then((response) => {
      if (response.data.length > 0) {
        t = response.data;
      }
    });
    if (cityName !== null) t = t.filter((e) => e.city[0].label === cityName);

    if (cityName !== null && towName !== null) {
      t = t.filter(
        (e) => e.city[0].label === cityName && e.town[0].label === towName
      );
    }

    if (ticari !== null) {
      t = t.filter((e) => e.props.Ticari === ticari);
    }

    sehirset(t);
    console.log(sehir);
  }

  useEffect(() => {
    get_city_info();
  }, []);
  if (sehir.length > 0)
    return (
      <div className='row'>
        {/* {JSON.stringify(sehir[0].props.Fiyat)} */}
        {sehir.map((e, index) => (
          <a
            href={`CardDetails?cardid=${e._id}`}
            className='productCard col-md-4 col-lg-4 col-sm-6 col-xs-12'
          >
            <div key={index}>
              {/* {JSON.stringify(props)} */}
              <a>
                <img alt='' src={e.images[0]} />
                <div className='product-summary'>
                  <div className='summary-top'>
                    <span className='badge offer left-top'>
                      Teklif Bekleniyor
                    </span>
                    <span className='badge oppor right-top'>Fırsat</span>
                  </div>
                  <div className='summary-bottom'>
                    <ul>
                      <li>{e.props.Fiyat} TL</li>
                      <li>
                        <button>
                          <i className='fas fa-heart'></i>
                        </button>
                      </li>
                      {/* {props.option.city[0].label} {props.option.town[0].label}'de
{props.option.props.Alan}m2 {props.option.props.Ticari}` */}
                      <li>
                        {e.bank_id[0].label}'tan {e.city[0].label}{' '}
                        {e.town[0].label}'de
                        {e.props.Alan}m2 {e.props.Ticari}
                      </li>
                      <li>
                        <i className='fas fa-map-marker-alt'></i>
                        {e.bank_id[0].label}-{e.city[0].label}-{e.town[0].label}
                        'de
                        {e.props.Alan}m2 {e.props.Ticari}
                      </li>
                      <li>BRG</li>
                    </ul>
                  </div>
                </div>
              </a>
            </div>
          </a>
        ))}
        {/* //////////// */}
      </div>
    );
  else return <div>......Loading..........</div>;
}

export default SearchBar;
