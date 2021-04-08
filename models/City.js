/**
 * 城市规则表
 **/
//引入数据库
const mongoose = require('mongoose');

//创建集合
const schema = new mongoose.Schema({
  city_name: {type: String}
});

module.exports = mongoose.model('City', schema)
