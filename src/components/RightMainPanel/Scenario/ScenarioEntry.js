import React from "react";
import s from "./ScenarioEntry.css";

//bind redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionCreators from '../../../reducers/action';

//import configuration file
import {CorridorInfo} from "../../../config"

class ScenarioEntry extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {


    var ScenarioValue = Object.keys(this.props.data).map((corridorKey) =>{

        return (<div style={{width: 150, position: "relative", marginTop:2, marginLeft: 8}} key={corridorKey}>
          <div className="square" style={{padding: 3,fontSize: 13, color: "white", backgroundColor:CorridorInfo[corridorKey].color}}>
            {CorridorInfo[corridorKey].name}
          </div>
            <small style={{fontSize: 14,}}>R: {this.props.data[corridorKey].alternative}  | H:{Math.ceil(this.props.headwayTime[corridorKey])}  </small>
        </div>
        )
      }
      );



        if (this.props.selectNum === this.props.index) {
          return (
            <div className="scenarioEntry"  >
              <div className="" style={{margin: 0, padding: 0}}>



                    <div className="subHead scenarioEntrySubHead" style={{color: "white", backgroundColor: "#eec16f"}}>
                    {this.props.index === 0 ? `Base Scenario` : `New Scenario ${this.props.index}`   }
                    </div>


                {ScenarioValue}

              </div>
            </div>
          );
        }
        else{
          return (
            <div className="scenarioEntry" >
              <div className="" style={{margin: 0, padding: 0}}>
                <div className="subHead scenarioEntrySubHead" style={{color: "white", backgroundColor:"#eec16f"}}>
                  {this.props.index === 0 ? `Base Scenario` : `New Scenario`   }
                </div>

                {ScenarioValue}

              </div>
            </div>
          );




        }

  }
  }


  function mapStateToProps(state) {
    return {
      newScenario: state.scenarioStore,
      headwayTime : state.HeadwayTime,
  }
  }

  function mapDispachToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
  }


  // export default connect(mapStateToProps, mapDispachToProps)(ScenarioEntry);
export default ScenarioEntry;


