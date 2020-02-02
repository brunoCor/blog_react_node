import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";

class Footer extends Component {
  
  render() {

    return (
      
      <Jumbotron
        className="text-center mt-4"
        style={{ backgroundColor: "#887ab4", color: "white" }}
      >
        <h3>Azzura Lights entreprise engagée</h3>
        <div className="container my-4">
          <img src={require("./../images/footer.png")} className="img-fluid"></img>
        </div>
        <p>
          Azzura Lights - 7 Avenue Raymond Féraud, 06200 NICE
          <br />
          Tel : 04.97.80.40.20 - E-mail.contact@be-ogeo.fr [ a changer !]
          <br />
          ©2016 - OGéo - SCOP ARL au capital de 12 000 € - SIRET 80913306900017
        </p>
      </Jumbotron>
    );
  }
}

export default Footer;
