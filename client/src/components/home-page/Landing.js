import React from "react";
import PresentationSection from "./PresentationSection";
import OfferSection from "./OfferSection";
import BusinessSection from "./BusinessSection";
import MissionSection from "./MissionSection";
import ClientSection from "./ClientSection";
import MemberSection from "./MemberSection";

const Landing = () => {
  return (
    // style={{ textAlign: 'center' }}
    <div>
      <PresentationSection />
      <BusinessSection />
      <OfferSection />
      <MissionSection />
      <ClientSection />
      <MemberSection />
    </div>
  );
};

export default Landing;
