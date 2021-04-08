module.exports = app => {
  const express = require('express');

  // 服务器返回错误库
  const assert = require('http-assert')

  //引入登录授权中间件
  const authAd = require('../../middleware/auth')


  //创建子路由
  const router = express.Router();

  //导入各集合
  const House = require('../../models/House')
  const City = require('../../models/City')


  //保存房屋数据
  router.post('/houses', authAd(), async (req, res) => {
    const model = await House.create(req.body)
    res.send(model)
  })

  //获取出租房数据
  router.get('/houses', authAd(), async (req, res) => {
    const items = await House.find().populate('city')
    res.send(items)
  })

  //获取城市数据
  router.get('/houses/ci', authAd(), async (req, res) => {
    const model = await City.find();
    res.send(model)
  });

  //获取编辑房数据
  router.get('/houses/:id', authAd(), async (req, res) => {
    const items = await House.findById(req.params.id)
    res.send(items)
  })

  //保存房屋编辑数据
  router.put('/houses/:id', authAd(), async (req, res) => {
    const model = await House.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  //删除房屋数据
  router.delete('/houses/:id', authAd(), async (req, res) => {
    await House.findByIdAndDelete(req.params.id, req.body)
    res.send({success: true})
  })

  router.post('/houses/search', authAd(), async (req, res) => {
    // console.log(req.body)
    const {house_number} = req.body
    const numbers = house_number.trim()
    let model
    if (numbers === '') {
      model = await House.find();
    } else {
      model = await House.find({house_number: numbers});
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