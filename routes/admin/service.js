module.exports = app => {
  const express = require('express');

  // 服务器返回错误库
  const assert = require('http-assert')

  //引入登录授权中间件
  const authAd = require('../../middleware/auth')

  //创建子路由
  const router = express.Router();

  //导入各集合
  const Service = require('../../models/Service')

  //保存修报表信息
  router.post('/services', authAd(), async (req, res) => {
    const model = await Service.create(req.body);
    res.send(model)
  });

  //获取修报表信息
  router.get('/services', authAd(), async (req, res) => {
    const model = await Service.find();
    res.send(model)
  });


  //通过id获取编辑
  router.get('/services/:id', authAd(), async (req, res) => {
    const model = await Service.findById(req.params.id);
    res.send(model)
  });

  //保存编辑
  router.put('/services/:id', authAd(), async (req, res) => {
    const model = await Service.findByIdAndUpdate(req.params.id, req.body);
    res.send(model)
  });

  //通过id删除
  router.delete('/services/:id', authAd(), async (req, res) => {
    await Service.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    })
  });

  //搜索
  router.post('/services/search', authAd(), async (req, res) => {
    // console.log(req.body)
    const {business_number} = req.body
    const num = business_number.trim();
    let model
    if (num === '') {
      model = await Service.find();
    } else {
      model = await Service.find({business_number: num});
    }
    res.send(model)
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