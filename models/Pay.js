/**
 * 费用规则表
 **/
//引入数据库
const mongoose = require('mongoose');

//创建集合
const schema = new mongoose.Schema({
  pay_number:{type: String},//缴费单号
  house_number: {type: String},//房屋编号
  student_number: {type: String}, //学生编号
  name: {type: String}, //姓名
  rent: {type: Number}, //租金
  water_rate:{type: Number}, //水费
  electric_charge:{type: Number}, //电费
  gas_fee:{type: Number}, //燃气费
  garbage_fees:{type: Number}, //处理垃圾费用
  remark:{type: String} //备注
});

module.exports = mongoose.model('Pay', schema)
