import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
let ENDPOINT = 'https://serverbigfilserve.herokuapp.com'
function BizKimiz() {
  const [data, seTdata] = useState([]);

  const getContentData = () => {
    axios.get(ENDPOINT + "/content/bizkimiz/public").then((response) => {
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
      <section id="whous" style={{ width: "90%" }}>
        <div className="row">
          <div className="container mt-3 ">
            <div className="container text-center">
              <h5 className="sectionTitle">
                BİZ KİMİZ
                <span>BİZ KİMİZ</span>
              </h5>
            </div>
            {data.map((data) => (
              <div className="person_area row  ">
                <div className="img_area col-12 col-sm-4 px-0 ">
                  <img
                    src="img/parson_border_bg.png"
                    className="w-100 mt-sm-5 mt-sm-1 "
                    style={{
                      backgroundImage: `url(${data.images[0].replaceAll(
                        /\\/g,
                        "/"
                      )})`,
                    }}
                  />
                </div>
                <div className="text_area col-12 col-sm-8 ">
                  <h2>{data.title}</h2>
                  <h5>{data.subtitle}</h5>
                  <p>{data.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  */}
    </div>
  );
}

export default BizKimiz;
