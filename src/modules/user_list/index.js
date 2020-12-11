/*
 * @Descripttion: 
 * @version: 
 * @Author: Jimmy
 * @Date: 2020-10-14 10:50:33
 * @LastEditors: Jimmy
 * @LastEditTime: 2020-12-10 14:14:00
 */
import React from "react";
import Title from "./component/title";
import Head from "./component/head";
import Table from "./component/table";
const androidEncryptAdmin = () => {
  return (
    <React.Fragment>
      <Title
         title="Android加固管理"
         content="(统计用户进行Android应用进行安全加固的情况)"
      />
      <Head></Head>
    </React.Fragment>
  )
}
export default androidEncryptAdmin;