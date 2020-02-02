import React from "react";
import Title from "./Title";
import MissionData from "./MissionData";
import LearnMore from "./LearnMore";

const MissionSection = () => {
  return (
    <section className="mt-4 p-4">
      <Title title="Nos missions réussis" />
      <div className="mt-4 container">
          <div className="text-center row" >
            {MissionData.map(mission => {
              return (
                <div key={mission._id} className="col-lg-4 col-md-6 mb-3">
                  <LearnMore>
                    <div>
                      <img className="img-fluid" src={mission.image} />
                      <p className="mt-2">{mission.content}</p>
                    </div>
                  </LearnMore> 
              </div>
              )
            })
            }
          </div>
        </div>
      </section>

  );
};

export default MissionSection;
