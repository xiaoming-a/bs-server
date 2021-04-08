module.exports = app => {
  const express = require('express');

  // 服务器返回错误库
  const assert = require('http-assert')

  //引入登录授权中间件
  const authAd = require('../../middleware/auth')

  //创建子路由
  const router = express.Router();

  //导入各集合
  const Contract = require('../../models/Contract')

  //保存修报表信息
  router.post('/contracts', authAd(), async (req, res) => {
    const model = await Contract.create(req.body);
    res.send(model)
  });

  //获取修报表信息
  router.get('/contracts', authAd(), async (req, res) => {
    const model = await Contract.find();
    res.send(model)
  });


  //通过id获取编辑
  router.get('/contracts/:id', authAd(), async (req, res) => {
    const model = await Contract.findById(req.params.id);
    res.send(model)
  });

  //保存编辑
  router.put('/contracts/:id', authAd(), async (req, res) => {
    const model = await Contract.findByIdAndUpdate(req.params.id, req.body);
    res.send(model)
  });

  //通过id删除
  router.delete('/contracts/:id', authAd(), async (req, res) => {
    await Contract.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    })
  });

  // 搜索
  router.post('/contracts/search', async (req, res) => {
    const {contract_number} = req.body
    const numbers = contract_number.trim()
    let model
    if (numbers === '') {
      model = await Contract.find();
    } else {
      model = await Contract.find({contract_number: numbers});
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