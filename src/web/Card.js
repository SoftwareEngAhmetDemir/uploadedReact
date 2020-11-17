import { Link } from '@material-ui/core';
import { Router } from '@material-ui/icons';
import React from 'react';
import { Route, useHistory } from 'react-router-dom';

function Card(props) {
  const history = useHistory();
  function Go_Next(props) {
    history.push('/CardDetails?cardid=' + props.option._id);
  }
  var ims;
  // if(props.option.images[0].substring('../public'.length))
  ims = props.option.images[0];
  /* console.log(ims); */

  return (
    <div
      key={ims}
      className='productCard col-md-6 col-lg-4 col-sm-6 col-xs-12'
      onClick={() => Go_Next(props)}
    >
      {/* {JSON.stringify(props)} */}
      <a>
        <img src={ims} alt='' />
        <div className='product-summary'>
          <div className='summary-top'>
            <span className='badge offer left-top'>Teklif Bekleniyor</span>
            <span className='badge oppor right-top'>Fırsat</span>
          </div>
          <div className='summary-bottom'>
            <ul>
              <li>{props.option.props.Fiyat} TL</li>
              <li>
                <button>
                  <i className='fas fa-heart'></i>
                </button>
              </li>
              <li>
                {props.option.bank_id[0].label}'tan {props.option.city[0].label}{' '}
                {props.option.town[0].label}'de
                {props.option.props.Alan}m2 {props.option.props.Ticari}
              </li>
              <li>
                <i className='fas fa-map-marker-alt'></i>
                {props.option.bank_id[0].label}-{props.option.city[0].label}-
                {props.option.town[0].label}'de
                {props.option.props.Alan}m2 {props.option.props.Ticari}
              </li>
              <li>BRG</li>
            </ul>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Card;
