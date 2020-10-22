import React from "react";
import {Cascader} from "antd";
import { pca, pcaa } from 'area-data';
import 'react-area-linkage/dist/index.css'; // v2 or higher
import { AreaSelect, AreaCascader } from 'react-area-linkage';
class DetectionAndriod extends React.Component {
  selectedChange(value) {
    console.log(value);
  }

  render(){
    console.log("pcaa",pcaa);
    return(
      <div style={{height:200}}>
        <AreaCascader type='code' defaultArea={["510000", "510100", "510107"]} onChange={this.selectedChange} level={1} data={pcaa} />
      </div>    
    )
  }
}
export default DetectionAndriod;
// import React from "react";
// import {Cascader} from "antd";

// class DetectionAndriod extends React.Component {
  
//   onChange(value) {
//     console.log(value);
//   }
//   render(){
//     const options = [
//       {
//         value: 'zhejiang',
//         label: 'Zhejiang',
//         children: [
//           {
//             value: 'hangzhou',
//             label: 'Hangzhou',
//             children: [
//               {
//                 value: 'xihu',
//                 label: 'West Lake',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         value: 'jiangsu',
//         label: 'Jiangsu',
//         children: [
//           {
//             value: 'nanjing',
//             label: 'Nanjing',
//             children: [
//               {
//                 value: 'zhonghuamen',
//                 label: 'Zhong Hua Men',
//               },
//             ],
//           },
//         ],
//       },
//     ];
//     return(
//       <div>
//       <Cascader
//         defaultValue={['zhejiang', 'hangzhou', 'xihu']}
//         options={options}
//         onChange={this.onChange}
//         />,

//       </div>    
//     )
//   }
// }
// export default DetectionAndriod;