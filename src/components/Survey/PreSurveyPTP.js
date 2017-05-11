
import React from "react";
import "./PreSurvey.css"



/**
 * The main view which include TopleftPanel, map and RightMainPanel component
 */

class PreSurveyPTP extends React.Component {

  componentDidMount(){
    fetch('https://api.mlab.com/api/1/databases/tdm/collections/user?q={"city":"NOLA"}&apiKey=9zaMF9-feKwS1ZliH769u7LranDon3cC',{method:'PUT',    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, body:JSON.stringify({"$inc":{"count":1}})});
  }

  render() {
    console.log(this.props.location.query.email);
    let formurl = `https://www.123contactform.com/sf.php?s=123contactform-2679634&control28805034=${this.props.location.query.email}`;



    return (
      <div className="page-home">
        {/*<iframe allowTransparency="true" style={{minHeight:"100%", height:"100vh", overflow:"auto",}} width="100%" height="100%" id="contactform123" name="contactform123" marginWidth="0" marginHeight="0" frameBorder="0" src="http://www.123contactform.com/my-contact-form-2675573.html"/>*/}
        <iframe allowTransparency="true" style={{minHeight:"100%", height:"100vh", overflow:"auto",}} width="100%" height="100%" id="contactform123" name="contactform123" marginWidth="0" marginHeight="0" frameBorder="0" src={formurl}/>

      </div>

    );
  }
}




export default PreSurveyPTP;



