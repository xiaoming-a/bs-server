//数据库
module.exports = app => {
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/BYSJ', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('创建数据库成功'))
      .catch(err => console.log('创建数据库失败', err))
}