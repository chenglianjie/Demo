/*
 * @Author: kiliaosi
 * @Date: 2020-04-01 16:40:59
 * @LastEditors: kiliaosi
 * @LastEditTime: 2020-04-01 17:15:28
 * @Description:
 */
import {
  ENCRYPTDETAILSTATE
} from './actionType';
// 自定义的初始数据
const defaultState = {
  state1: '我是安卓加固state1',
  filter: '我是安卓加固filter',
};
function encryptandriod(state = defaultState, action) {
  switch (action.type) {
    // 点击详情
    case ENCRYPTDETAILSTATE: {
      return { ...state, state1:"我改变了"};
    }
    default:
      return state;
  }
}
export default encryptandriod;
