import React from "react";
import Title from "./Title";
import ClientData from "./ClientData";

const ClientSection = () => {

  return (
    <section>
    <Title title="Nos clients" />
    <div className="mt-4 p-4"
        style={{ backgroundColor: "#d9ecf0" }}
    >
      
      <div className="row mt-5">
        {ClientData.map(client => {
          return (
            <div key={client._id} className="col-md-6 col-xl-3 mb-4">
              <div className="card" style={{height:'100%'}}>
                <div className="card-body text-center p-1 pb-4" >
                  <img
                    alt={`client-${client._id}`}
                    src={client.image}
                    className="img-fluid"
                    style={{width:'70%', marginTop:'-50px'}}
                  />
                  <h3>{client.wording}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
};

export default ClientSection;
