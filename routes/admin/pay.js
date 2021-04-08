module.exports = app => {
  const express = require('express');

  // 服务器返回错误库
  const assert = require('http-assert')

  //引入登录授权中间件
  const authAd = require('../../middleware/auth')

  //创建子路由
  const router = express.Router();

  //导入各集合
  const Pay = require('../../models/Pay')

  //保存费用表信息
  router.post('/pays', authAd(), async (req, res) => {
    const model = await Pay.create(req.body);
    res.send(model)
  });

  //获取费用表信息
  router.get('/pays', authAd(), async (req, res) => {
    const model = await Pay.find();
    res.send(model)
  });


  //通过id获取编辑
  router.get('/pays/:id', authAd(), async (req, res) => {
    const model = await Pay.findById(req.params.id);
    res.send(model)
  });

  //保存编辑
  router.put('/pays/:id', authAd(), async (req, res) => {
    const model = await Pay.findByIdAndUpdate(req.params.id, req.body);
    res.send(model)
  });

  //通过id删除
  router.delete('/pays/:id', authAd(), async (req, res) => {
    await Pay.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    })
  });

  //搜索
  router.post('/pays/search', async (req, res) => {
    const {pay_number} = req.body;
    const nums = pay_number.trim();
    console.log(nums)
    let model
    if (nums === '') {
      model = await Pay.find()
    } else {
      model = await Pay.find({pay_number: nums});
    }
    res.send(model)
  })

  app.use('/admin/api', router)

  //错误处理
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })

}