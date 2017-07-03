/**
 * Created by xinzheng on 5/11/17.
 */

import React from "react";


class GraphLabel extends React.Component {

  render() {
    const {x, y, stroke, value, fill} = this.props;
    return (

        <text x={x} y={y} dx={27} fill={fill} fontSize={15} textAnchor="middle">{value !== null ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}</text>


    );
  }
}



export default GraphLabel;

