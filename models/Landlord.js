/**
 * 业主规则表
 **/
//引入数据库
const mongoose = require('mongoose');

//创建集合
const schema = new mongoose.Schema({
  owners_number: {type: String}, //业主编号
  name: {type: String}, //姓名
  age: {type: Number}, //年龄
  gender: {type: String}, //性别
  telephone: {type: Number}, //联系电话与账号
  password: {
    type: String,
    //隐藏密码
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10) //密码加密
    }
  }, //密码
  identity_number: {type: String}, //身份证
  address:{type: String}, //家庭住址
});

module.exports = mongoose.model('Landlord', schema)
