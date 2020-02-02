import React from "react";
import "./MemberSection.css";
import Title from "./Title";
import MemberData from "./MemberData";
import CarouselHome from "./CarouselHome";

const MemberSection = () => {
  const nbImageBySlide = 3;
  const members = MemberData;
  const NbSlides = Math.ceil(members.length / nbImageBySlide);

  const carouselData = [];

  for (let i = 0; i < NbSlides; i++) {
    let data = members.slice(i * nbImageBySlide, (i + 1) * nbImageBySlide);
    if (data.length !== nbImageBySlide) {
      for (let j = 0; j < (nbImageBySlide - data.length); j++) {
        data.push(members[j]);
      }
    }
    carouselData.push(data);
  }

  return (
    <section className="mt-4 p-4">
      <Title title={"Nous somme membre de :"} />
      <div className="d-none d-md-block">
      <CarouselHome
          slides={carouselData}
          severalImageBySlide={true} 
          showIndicators={false}
          iconColor={"rgb(128, 189, 202)"}
        />
      </div>
      <div className="d-block d-md-none mt-4">
        <CarouselHome
          slides={MemberData} 
          showIndicators={false}
          iconColor={"rgb(128, 189, 202)"}
        />
      </div>
    </section>
  );
};

export default MemberSection;
