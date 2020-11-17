import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
let EndPoint = 'https://serverbigfilserve.herokuapp.com'

function Nedir() {
  const [data, seTdata] = useState([]);

  const getContentData = () => {
    axios.get(EndPoint+'/content/nedir/public').then((response) => {
      if (response.data.length > 0) {
        seTdata(response.data);
      }
    });
  };

  useEffect(() => {
    getContentData();
  }, []);

  return (
    <div>
      {data.map((nedir) => (
        <section id='profile'>
          <div className='container-wide-xl'>
            <div className='row'>
              <div className='col-sm-5 col-lg-4 order-1 order-sm-0 float-left col-md-5 px-0 mt-5 pt-5 '>
                <img src={nedir.images[0]} className='w-100 float-left' />
              </div>
              <div className='col-sm-7 col-lg-8 order-0 order-sm-1 float-left col-md-7 px-0 '>
                <div className='how mt-sm-5'>
                  <h1>{nedir.title}</h1>
                  <span>{nedir.text}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default Nedir;
