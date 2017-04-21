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

        return (<div style={{width: 150, position: "relative", marginTop:2}} key={corridorKey}>
          <div className="square" style={{padding: 3,fontSize: 17, color: "white", backgroundColor:CorridorInfo[corridorKey].color}}>
            {CorridorInfo[corridorKey].name}
          </div>
            <small style={{fontSize: 16,}}>R: {this.props.data[corridorKey].alternative}  | H:{this.props.data[corridorKey].headway}  </small>
        </div>
        )
      }
      );



        if (this.props.selectNum === this.props.index) {
          return (
            <div className="" style={{display: "inline-block", whiteSpace: "nowrap", width:150, fontSize: 20, backgroundColor:"#eec16f", height: "100%"}} onClick={() => this.props.selectScenario(this.props.index)}>
              <div className="btn" style={{margin: 0, padding: 0}}>



                    <div className="subHead" style={{width: "100%", color: "white", backgroundColor: "#eec16f"}}>
                    {this.props.index === 0 ? `Base Scenario` : `New Scenario ${this.props.index}`   }
                    </div>



                {ScenarioValue}

              </div>
            </div>
          );
        }
        else{
          return (
            <div className="" style={{display: "inline-block", whiteSpace: "nowrap", width:150, fontSize: 20, height: "100%"}} onClick={() => this.props.selectScenario(this.props.index)}>
              <div className="btn" style={{margin: 0, padding: 0}}>
                <div className="subHead" style={{width:"100%", color: "white", backgroundColor:"#eec16f"}}>
                  {this.props.index === 0 ? `Base Scenario` : `New Scenario ${this.props.index}`   }
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
  }
  }

  function mapDispachToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
  }


  // export default connect(mapStateToProps, mapDispachToProps)(ScenarioEntry);
export default ScenarioEntry;


