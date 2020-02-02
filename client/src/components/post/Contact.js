import React from "react";
import PostForm from "./PostForm";
import Iframe from "react-iframe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = () => {
  return (
    // style={{ textAlign: 'center' }}
    <div className="mt-4">
      <div className="row">
        <div className="col-md-6 mt-4">
          <div className="card" style={{borderRadius: '1rem', height:'100%'}}>
            {/* <div className="card-header"> */}

            {/* </div> */}
            <div
              className="card-body"
              style={{'backgroundImage': 'linear-gradient(to left, #e6ef97, #b5c62c)', 'borderColor':'#b5c62c', 'color':'white', borderRadius: '1rem'}}
            >
            <div className="pl-3">
            <h3>Nous contacter</h3>
              <p className="mt-4">
                <FontAwesomeIcon icon="envelope" /> <strong>Email</strong> :
                bienvenue@azzura-light.from
                <br />
                <FontAwesomeIcon icon="phone-square-alt" />{" "}
                <strong>Téléphone</strong> : 04 93 96 80 99
                <br />
                <br />
                <FontAwesomeIcon icon="map-marker-alt" /> <strong>AZZURA LIGHTS</strong>
                <br />
                7 Avenue Raymond Féraud
                <br />
                06200 Nice
              </p>
            </div>
              
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-4">
          <Iframe
            url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.381371107471!2d7.2272952148816065!3d43.681834258597746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cdd056cdbc3053%3A0xfc6114f59add3733!2s7+Avenue+Raymond+F%C3%A9raud%2C+06200+Nice!5e0!3m2!1sfr!2sfr!4v1563885047088!5m2!1sfr!2sfr"
            width="100%"
            height="300px"
            position="relative"
          />
        </div>
      </div>
      <PostForm />
    </div>
  );
};

export default Contact;
