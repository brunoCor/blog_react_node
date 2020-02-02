import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CarouselHome.css";

class CarouselHome extends Component {
  render() {
    const {slides, showIndicators, iconColor, iconeSize, severalImageBySlide} = this.props;

    return (
      <Carousel
        indicators={showIndicators===false?showIndicators:true}
        nextIcon={
          <FontAwesomeIcon
            aria-hidden="true"
            style={{ color: iconColor?iconColor:"rgb(128, 189, 202)", fontSize: iconeSize?iconeSize:"60px" }}
            icon="caret-right"
          />
        }
        prevIcon={
          <FontAwesomeIcon
            aria-hidden="true"
            style={{ color: iconColor?iconColor:"rgb(128, 189, 202)", fontSize: iconeSize?iconeSize:"60px" }}
            icon="caret-left"
          />
        }
      >
        {
          (!severalImageBySlide) ?
          (slides.map( slide => {
            return (
              <Carousel.Item key={`slide-offer-${slide._id}`}>
                <img className="d-block w-100" src={slide.image} alt={`slide-${slide._id}`} />
              </Carousel.Item>
            )
          })
          ):
          (
            slides.map((slideData, index) => {
              return (
                <Carousel.Item key={`item-${index}`}>
                  <div
                    className="my-4 rounded row py-4"
                    style={{
                      backgroundColor: "white",
                      paddingLeft: "5%",
                      paddingRight: "5%"
                    }}
                  >
                    {slideData.map(slide => {
                      return (
                        <div
                          className="col-md-4 text-center"
                          key={`support-${slide._id}`}
                        >
                          <img src={slide.image} className="img-fluid" />
                        </div>
                      );
                    })}
                  </div>
                </Carousel.Item>
              );
            })
          )
        }
      </Carousel>
    );
  }
}

export default CarouselHome;
