module.exports = app => {
  const express = require('express');

  //jsonp返回token库
  const jwt = require('jsonwebtoken')
  // 服务器返回错误库
  const assert = require('http-assert')

  //引入管理员集合
  const Administrator = require('../../models/Administrator')

  //创建子路由
  const router = express.Router();

  //引入登录授权中间件
  const authAd = require('../../middleware/auth')

  //导入各集合
  const City = require('../../models/City')

  //保存区域数据
  router.post('/cities', authAd(), async (req, res) => {
    const {city_name} = req.body
    const name = city_name.trim();
    assert(name, 422, "不能为空")
    const citys = await City.findOne({city_name: name})
    assert(!citys, 422, "已经存在该城市")
    const model = await City.create(req.body);
    res.send(model)
  });

  //获取区域列表
  router.get('/cities', authAd(), async (req, res) => {
    const district = await City.find();
    res.send(district)
  });


  //通过id获取编辑
  router.get('/cities/:id', authAd(), async (req, res) => {
    const model = await City.findById(req.params.id);
    res.send(model)
  });

  //保存编辑
  router.put('/cities/:id', authAd(), async (req, res) => {
    const {city_name} = req.body
    const name = city_name.trim();
    assert(name, 422, "不能为空")
    const model = await City.findByIdAndUpdate(req.params.id, req.body);
    res.send(model)
  });

  //通过id删除
  router.delete('/cities/:id', authAd(), async (req, res) => {
    await City.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true
    })
  });


  app.use('/admin/api', router)

  //服务器上传接收
  const multer = require('multer')
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.use('/admin/api/upload', authAd(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  //登录路由
  app.post('/admin/api/login', async (req, res) => {
    //解构赋值
    const {username, password} = req.body
    //1.根据用户名找用户
    const user = await Administrator.findOne({username}).select('+password')
    //校验 user是否存在，不在抛出异常
    assert(user, 422, '用户不存在')
    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // 3.返回token
    const token = jwt.sign({id: user._id}, app.get('secret'))
    res.send({token})
  })

  //错误处理
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })


}