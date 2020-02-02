import React from "react";
import BusinessImage from "../../images/business.png";

var backgroundStyle = {
  backgroundImage: `url(${BusinessImage})`
};

const BusinessSection = () => {
  return (
    <section className="mt-4 p-4" style={backgroundStyle}>
      <div className="row">
        <div className="col-lg-6 offset-lg-4">
          <div className="card">
            <div className="card-body">
            <div className="text-center mb-2">
              <h3 className="mb-0" ><strong>Notre Métier</strong></h3>
              <strong>
                Incenderat autem audaces usque ad insaniam homines ad
              </strong>
            </div>
            
              <p>
                Incenderat autem audaces usque ad insaniam homines ad haec, quae
                nefariis egere conatibus, Luscus quidam curator urbis subito
                visus: eosque ut heiulans baiolorum praecentor ad expediendum
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
