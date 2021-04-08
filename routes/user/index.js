module.exports = app => {
  const express = require('express');

  //引入集合
  const City = require('../../models/City');
  const House = require('../../models/House')
  const Student = require('../../models/Student')
  const Landlord = require('../../models/Landlord')
  const Pay = require('../../models/Pay')
  const Contract = require('../../models/Contract')
  const Service = require('../../models/Service')


  // 服务器返回错误库
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')


  //创建子路由
  const router = express.Router();

  router.get('/cities', async (req, res) => {
    const district = await City.find();
    res.send(district)
  })

  //获取出租房屋列表
  router.get('/houses/:id', async (req, res) => {
    // console.log(req.params.id)
    const model = await House.find({city: req.params.id});
    res.send(model)
  })

  //获取区域房屋数据列表
  router.post('/houses/areas', async (req, res) => {
    const {areas} = req.body
    const model = await House.find({areas})
    assert(model, 422, '该区域没有出租房了哦')
    res.send(model)
  })

  //获取价格区域的数据
  router.post('/price/index', async (req, res) => {
    const {index} = req.body
    if (index === 0) {
      const model = await House.find({rent: {$lt: 1000}})
      res.send(model)
    } else if (index === 1) {
      const model = await House.find({rent: {$gte: 1000, $lt: 2000}})
      res.send(model)
    } else if (index === 2) {
      const model = await House.find({rent: {$gte: 2000, $lt: 3000}})
      res.send(model)
    } else if (index === 3) {
      const model = await House.find({rent: {$gte: 3000}})
      res.send(model)
    }
  })

  //获取搜索城市区域
  router.post('/houses/city_address', async (req, res) => {
    const {address} = req.body
    console.log(address)
    const model = await House.find({areas: address})
    res.send(model)
  })

  //获取搜索出租房屋
  router.get('/search_cy/:id', async (req, res) => {
    const model = await House.find({areas: req.params.id})
    res.send(model)
  })

  //获取搜索区域所属城市
  router.post('/search_cy', async (req, res) => {
    let {cityId} = req.body
    const model = await House.find({city: cityId})
    res.send(model)
  })


  //获取出租房屋列表
  router.get('/houses/details/:id', async (req, res) => {
    const model = await House.findById(req.params.id);
    res.send(model)
  })

  //获取首页房屋数据
  router.get('/home/:id', async (req, res) => {
    // console.log(req.params.id)
    const model = await House.find({city: req.params.id}).populate('city').limit(4);
    res.send(model)
  })

  //获取缴费信息
  router.post('/pay', async (req, res) => {
    const {num} = req.body
    const model = await Pay.find({student_number: num})
    res.send(model)
  })

  //获取合同信息
  router.post('/contract', async (req, res) => {
    const {num} = req.body
    const model = await Contract.find({student_number: num})
    res.send(model)
  })

  //提交出租房房屋信息
  router.post('/puthouse', async (req, res) => {
    const {house_name, owners, telephone} = req.body

    assert(house_name, 422, "房屋名称不能为空")
    assert(owners, 422, "业主名称不能为空")
    assert(telephone, 422, "联系电话不能为空")

    const model = await House.create(req.body);
    res.send(model)
  })


  //提交维修信息信息
  router.post('/put_service', async (req, res) => {
    const model = await Service.create(req.body);
    res.send(model)
  })

  // 注册账号
  router.post('/register', async (req, res) => {
    const {account, password, status, name} = req.body

    assert(account, 422, "账号不能为空");
    assert(password, 422, "密码不能为空");
    assert(status, 422, '请选择登录身份');
    if (status === '0') {
      const model = await Student.create({
        number: account,
        password,
        name
      })
      res.send(model)
    } else if (status === '1') {
      const model = await Student.create({
        telephone: account,
        password,
        name
      })
      res.send(model)
    }
  })

  //通过id获取用户资料编辑
  //1.学生的
  router.get('/student_zl/:id', async (req, res) => {
    const model = await Student.findById(req.params.id);
    res.send(model)
  })

  //2.业主
  router.get('/landlord_zl/:id', async (req, res) => {
    const model = await Landlord.findById(req.params.id);
    res.send(model)
  })

  //通过id修改数据
  //1.学生的
  router.put('/student_zl/:id', async (req, res) => {
    const model = await Student.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  //2.业主
  router.get('/landlord_zl/:id', async (req, res) => {
    const model = await Landlord.findByIdAndUpdate(req.params.id, req.body);
    res.send(model)
  })


  app.use('/user/api', router)


  app.post('/user/api/login', async (req, res) => {
    // res.send('ok')
    const {account, password, status} = req.body
    //校验身份
    assert(status, 422, '请选择登录身份');

    //登录身份为学生 0
    if (status === '0') {
      const student = await Student.findOne({number: account}).select('+password')
      assert(student, 422, '用户不存在');
      const val = require('bcrypt').compareSync(password, student.password)
      assert(val, 422, '账号或密码不正确')
      const token = jwt.sign({id: student._id}, app.get('secret'))
      res.send({
        token,
        userId: student._id,
        username: student.name,
        num: student.student_number,
        userStatus: status
      })
    } else if (status === '1') {
      const landlord = await Landlord.findOne({telephone: account}).select('+password')
      assert(landlord, 422, '用户不存在')
      const val = require('bcrypt').compareSync(password, landlord.password)
      assert(val, 422, '账号或密码不正确')
      const token = jwt.sign({id: landlord._id}, app.get('secret'))
      res.send({
        token,
        userId: landlord._id,
        username: landlord.name,
        num: landlord.owners_number,
        userStatus: status
      })
    }
  })

  //上传图片
  const multer = require('multer')
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.use('/user/api/upload',upload.single('file'),async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })


  //错误处理
  app.use(async (err, req, res, next) => {
    console.log(err)
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}

