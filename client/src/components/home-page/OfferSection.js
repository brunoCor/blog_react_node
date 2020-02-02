import React, { Component } from "react";
import Offers from "../../images/offer_list.png";
import Title from "./Title";
import OfferList from "./OfferList";
import PrecarityAnalysList from "./PrecarityAnalysList";

class OfferSection extends Component {
  render() {
    return (
      <section className="mt-4">
      <Title title="Nos offres" subTitle="Précarité énergétique" />
      <div
        className="mt-4 p-4"
        style={{ backgroundColor: "#d9ecf0", padding: "20px 0" }}
      >
        <div className="container">
          <OfferList />
          <PrecarityAnalysList />
          <div className="card mt-4">
            <div className="card-body">
              <div className="row ">
                <div className="col-md-6">
                  <img src={Offers} alt="mission" className="img-fluid" />
                </div>
                <div className="col-md-6">
                  <ul>
                    <li>Analyse, étude terrain</li>
                    <li>Mise en place d’un dispositif</li>
                    <li>Création de formations adaptées</li>
                    <li>Plans d’actions</li>
                    <li>Business Model</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </div>
      </section>
    );
  }
}

export default OfferSection;
