import {
  ENCRYPTDETAILSTATE,
} from './actionType';

// 加固详情状态
const encryptDetailaction = (signData, newState) => ({
  type: ENCRYPTDETAILSTATE,
  signData,
  newState,
});


export {
  encryptDetailaction,
};
