const router = require('koa-router')()
const User = require('../app/controller/user')
const FromDetail = require('../app/controller/from')
router.prefix('/users')

router.post('/signup', User.signup)
router.post('/login', User.login)
router.post('/from', FromDetail.FromData)

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
