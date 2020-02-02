import React from "react";
import { Button } from "react-bootstrap";

const LearnMore = props => {
    return (
            <div className='card' style={{height:'100%'}}>
                <div className='card-body d-flex flex-column'>
                    {props.children}
                    <div className="mt-auto"><Button variant="outline-secondary">En savoir plus</Button></div>
                </div>
            </div> 

    )
}

export default LearnMore;