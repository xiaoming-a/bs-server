/**
 * 出租屋规则表
 **/

//引入数据库
const mongoose = require('mongoose');

//创建集合
const schema = new mongoose.Schema({
  house_number: {type: String},//房屋编号
  house_name: {type: String}, //房子名称/标题
  house_icon: [{
    title: {type: String},
    icon: {type: String}
  }], //房子图片
  tabs: [{type: String}], //房子标签
  rent: {type: Number}, //租金
  door_model: {type: String}, //户型
  area: {type: Number}, //面积
  checking_time: {type: String}, //看房时间
  pay: {type: String}, //支付形式
  elevator: {type: Boolean}, //电梯
  rent_way: {type: String}, //出租方式
  orientation: {type: String}, //朝向
  floors: {type: String}, //楼层
  fitment: {type: String}, //装修
  floor_type: {type: String}, //楼型
  configuration: [{type: String}], //家居配置
  bright_spot: {type: String}, //房屋亮点
  door_introduced: {type: String}, //户型介绍
  travel: {type: String}, //交通出行
  city: {type: mongoose.SchemaTypes.ObjectId, ref: 'City'}, //城市
  areas: {type: String}, //城市区域
  owners: {type: String}, //业主
  owners_number: {type: String}, //业主编号
  telephone: {type: Number}, //联系电话
  already_taken:{type: Boolean}, //是否租出
});

module.exports = mongoose.model('House', schema)