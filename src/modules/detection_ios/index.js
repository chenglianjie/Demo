import React from "react";
import {Cascader} from "antd";
import { pca, pcaa } from 'area-data';
import 'react-area-linkage/dist/index.css'; // v2 or higher
import { AreaSelect, AreaCascader } from 'react-area-linkage';
class Detectionios extends React.Component {
  selectedChange(value) {
    console.log(value);
  }
  render(){
  
    return(
      <div style={{height:200}}>
        <AreaCascader type='text' onChange={this.selectedChange} level={1} data={pcaa} />
      </div>    
    )
  }
}
export default Detectionios;