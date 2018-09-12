const router = require('koa-router')()
const FromDetail = require('../app/controller/from')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello World!',
    data: [
      {
        code: 1,
        msg: '火影忍者'
      },
      {
        code: 1,
        msg: '海贼王'
      },
      {
        code: 1,
        msg: '七龙珠'
      }
    ]
  })
})
router.post('/all', FromDetail.allUsers)
router.post('/del', FromDetail.delUser)
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})
router.post('/upload', async(ctx, next)=>{
  const file = ctx.request.files.file
  let name = file.path.split('\\').pop()
  ctx.body = {
    code: 1,
    msg: '上传成功',
    data: {
      type: file.type,
      url: `http://localhost:3000/upload/${name}`
    }
  }
})
router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/api', async (ctx, next) => {
  ctx.body = {
    data: [
      {
        code: 1,
        msg: '火影忍者'
      },
      {
        code: 1,
        msg: '海贼王'
      },
      {
        code: 1,
        msg: '七龙珠'
      }
    ] 
  }
})

module.exports = router
