/**
 * 管理员规则表
 **/
//引入数据库
const mongoose = require('mongoose');

//创建集合
const schema = new mongoose.Schema({
  username: {type: String},
  password: {
    type: String,
    //隐藏密码
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10) //密码加密
    }
  }
});

module.exports = mongoose.model('Administrator', schema)
