import React from "react";
import OfferData from "./OfferData"; 

class OfferList extends React.Component {

    render() {
        return (
        <div className="row text-center mt-4">
            {
                OfferData.map( offer => {
                    return(
                        <div key={`of-${offer._id}`} className="col-md-4">
                            <div className="card" style={{height:'100%'}}>
                                <div className="card-body">
                                <img src={offer.image} style={{width:'50%'}} className="img-fluid" alt={`offer-${offer._id}`} />
                                <p className='mt-4'>
                                    <strong>{offer.content}</strong>
                                </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        )
        
    }
}

export default OfferList;


