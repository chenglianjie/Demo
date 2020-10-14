
import { message } from "antd";
import {
  encryptDetailaction,
} from './action';

//  点击详情时 获取单个app数据 然后根据状态跳转到不同的界面
const clickDetail = () => async (dispatch) => {
  try {
    dispatch(encryptDetailaction());
  } catch (error) {
    message.error(error);
  }
};
export default {
  clickDetail,
};
