/**
 * 维修规则表
 **/
//引入数据库
const mongoose = require('mongoose');

//创建集合
const schema = new mongoose.Schema({
  business_number: {type: String}, //业务号
  house_number: {type: String},//房屋编号
  tenant_name:{type: String}, //提交人
  telephone:{type: Number}, //联系电话
  service_icon: [{
    icon: {type: String}
  }], //维修原因图片
  Maintenance_reasons:{type: String}, //维修原因描述
  submission_date:{
    type:Date,
    default: Date.now
  }, //提交日期
  remark:{type: String} //备注
});

module.exports = mongoose.model('Service', schema)
