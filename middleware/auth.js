/**
 * 登录授权中间件
 */
module.exports = options => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const Administrator = require('../models/Administrator')

  return async (req, res, next) => {
    //中间件，处理是否登录
    const token = String(req.headers.authorization || '').split(' ').pop()
    //没有 有效的jwt token
    assert(token, 401, '请先登录')
    const {id} = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录')
    // 获取用户挂在到req以便后续利用
    req.user = await Administrator.findById(id)
    assert(req.user, 401, '请先登录')
    await next();
  }
}