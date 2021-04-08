module.exports = app => {
  const express = require('express');

  // 服务器返回错误库
  const assert = require('http-assert')

  //引入登录授权中间件
  const authAd = require('../../middleware/auth')

  //创建子路由
  const router = express.Router();

  //导入各集合
  const Student = require('../../models/Student')

  //保存学生信息
  router.post('/students', authAd(), async (req, res) => {
    const model = await Student.create(req.body);
    res.send(model)
  });

  //获取学生信息
  router.get('/students', authAd(), async (req, res) => {
    const model = await Student.find();
    res.send(model)
  });


  //通过id获取编辑
  router.get('/students/:id', authAd(), async (req, res) => {
    const model = await Student.findById(req.params.id);
    res.send(model)
  });

  //保存编辑
  router.put('/students/:id', authAd(), async (req, res) => {
    const model = await Student.findByIdAndUpdate(req.params.id, req.body);
    res.send(model)
  });

  //通过id删除
  router.delete('/students/:id', authAd(), async (req, res) => {
    await Student.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    })
  });

  //关键字获取数据（搜索）
  router.post('/students/search', authAd(), async (req, res) => {
    const {name} = req.body
    const names = name.trim()
    // console.log(names)
    let model
    if (names === '') {
      model = await Student.find();
    } else {
      model = await Student.find({name: names});
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