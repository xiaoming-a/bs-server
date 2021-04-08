/**
 * 合同规则表
 **/
//引入数据库
const mongoose = require('mongoose');

//创建集合
const schema = new mongoose.Schema({
  contract_number: {type: String},//合同编号
  house_number: {type: String},//房屋编号
  student_number: {type: String}, //学生编号
  begin_date:{type:Date}, //起始日期
  finish_date:{type:Date}, //结束日期
  contract_state: {type: Boolean}, //合同状况
  rent: {type: Number}, //租金
  cash_pledge: {type: Number}, //押金
  remark:{type: String} //备注
});

module.exports = mongoose.model('Contract', schema)
