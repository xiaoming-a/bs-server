//引用express
const express = require('express');

const app = express();

//引入跨域模块
app.use(require('cors')());

//秘钥
app.set('secret', 'beyesheji')

//jsonp格式
app.use(express.json())

app.use('/uploads', express.static(__dirname + '/uploads'))

//使用管理员各路由
require('./routes/admin/index')(app);
require('./routes/admin/room')(app);
require('./routes/admin/service')(app);
require('./routes/admin/administrator')(app);
require('./routes/admin/student')(app);
require('./routes/admin/landlord')(app);
require('./routes/admin/contract')(app);
require('./routes/admin/pay')(app);


//使用用户各路由
require('./routes/user/index')(app);

require('./plugins/db')(app);

//监听端口
app.listen(3000, () => {
  console.log('http://localhost:3000');
});