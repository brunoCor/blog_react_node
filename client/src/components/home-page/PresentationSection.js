import React from "react";
import CarouselHome from "./CarouselHome";
import PresentationSlideData from "./PresentationSlideData"; 

class PresentationSection extends React.Component {
    render() {

        return(
            <section>
                <CarouselHome 
                    slides={PresentationSlideData}   
                    iconColor={'white'}             
                />
            </section>
        )
    }
}

export default PresentationSection;