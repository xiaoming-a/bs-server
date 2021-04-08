module.exports = app => {
  const express = require('express');

  // 服务器返回错误库
  const assert = require('http-assert')

  //引入登录授权中间件
  const authAd = require('../../middleware/auth')


  //创建子路由
  const router = express.Router();

  //导入各集合
  const Landlord = require('../../models/Landlord')

  //保存信息
  router.post('/landlords', authAd(), async (req, res) => {
    const model = await Landlord.create(req.body);
    res.send(model)
  });

  //获取信息
  router.get('/landlords', authAd(), async (req, res) => {
    const model = await Landlord.find();
    res.send(model)
  });


  //通过id获取编辑
  router.get('/landlords/:id', authAd(), async (req, res) => {
    const model = await Landlord.findById(req.params.id);
    res.send(model)
  });

  //保存编辑
  router.put('/landlords/:id', authAd(), async (req, res) => {
    const model = await Landlord.findByIdAndUpdate(req.params.id, req.body);
    res.send(model)
  });

  //通过id删除
  router.delete('/landlords/:id', authAd(), async (req, res) => {
    await Landlord.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    })
  });

  //关键字获取数据（搜索）
  router.post('/landlords/search', authAd(), async (req, res) => {
    const {name} = req.body
    const names = name.trim()
    // console.log(names)
    let model
    if (names === '') {
      model = await Landlord.find();
    } else {
      model = await Landlord.find({name: names});
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