import React from "react";
import PrecarityAnalysData from "./PrecarityAnalysData";
import { Badge} from "react-bootstrap";
import LearnMore from "./LearnMore";

class PrecarityAnalysList extends React.Component {
  render() {
    return (
      <div className="row mt-4 text-center">
        {PrecarityAnalysData.map(offer => {
          return (
            <div className="col-md-6" key={`prec-${offer._id}`}>
              <LearnMore>
                  <div>
                    <h2 style={{ color: offer.color, fontSize:'60px' }}>{offer.title}&copy;</h2>
                    <Badge
                        pill
                        className="mt-2"
                        variant="info"
                        style={{
                        padding: "15px",
                        backgroundColor: offer.color,
                        fontSize: "100%"
                        }}
                    >
                        {offer.subTitle}
                    </Badge>
                    <p className="mt-4">
                        {
                            offer.content
                        }
                    </p>
                  </div>   
            </LearnMore>
            </div>
          );
        })}
      </div>
    );
  }
}

export default PrecarityAnalysList;
