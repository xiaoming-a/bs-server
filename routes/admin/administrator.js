module.exports = app => {
  const express = require('express');

  // 服务器返回错误库
  const assert = require('http-assert')

  //引入登录授权中间件
  const authAd = require('../../middleware/auth')

  //创建子路由
  const router = express.Router();

  //导入各集合
  const Administrator = require('../../models/Administrator')

  //保存管理员数据
  router.post('/administrators', authAd(), async (req, res) => {
    const model = await Administrator.create(req.body);
    res.send(model)
  });

  //获取管理员列表
  router.get('/administrators', authAd(), async (req, res) => {
    const district = await Administrator.find();
    res.send(district)
  });


  //通过id获取编辑信息
  router.get('/administrators/:id', authAd(), async (req, res) => {
    const model = await Administrator.findById(req.params.id);
    res.send(model)
  });

  //保存编辑
  router.put('/administrators/:id', authAd(), async (req, res) => {
    const model = await Administrator.findByIdAndUpdate(req.params.id, req.body);
    res.send(model)
  });

  //通过id删除
  router.delete('/administrators/:id', authAd(), async (req, res) => {
    await Administrator.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    })
  });

  app.use('/admin/api', router)

  //错误处理
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })

}