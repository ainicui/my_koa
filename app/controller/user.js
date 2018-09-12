const mongoose = require('mongoose')
const UserSchema = require('../schema/user')
const User = mongoose.model('User', UserSchema)

const moment = require('moment')

const createToken = require('../token/createToken.js')
//数据库的操作
//根据用户名查找用户
const findUser = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    });
  });
};
//找到所有用户
const findAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, doc) => {
      if (err) {
        reject(err);
      }
      console.log('所有用户')
      resolve(doc);
    });
  });
};
//删除某个用户
const delUser = (id) => {
  return new Promise((resolve, reject)=>{
    User.findOneAndRemove({_id: id}, err=>{
      if(err){
        reject(err)
      }
      resolve()
    })
  })
}
//注册
exports.signup = async(ctx) => {
  let user = new User({
    username: ctx.request.body.username,
    password: ctx.request.body.password,
    sessionKey: createToken(this.username),
    date_time: moment().format('YYYY-MM-DD')
  })
  let doc = await findUser(user.username);
  if (doc) {
    ctx.status = 200;
    ctx.body = {
      code: 0,
      msg: '该用户已经存在'
    }
  } else {
    await new Promise((resolve, reject) => {
      user.save((err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    });
    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: '注册成功'
    }
  }
}
//登录
exports.login = async(ctx) => {
  let username = ctx.request.body.username
  let password = ctx.request.body.password

  let doc = await findUser(username)

  if (!doc) {
    ctx.status = 200;
    ctx.body = {
      code: 0,
      msg: '用户不存在'
    }
  } else if (doc.password === password) {
    let token = createToken(username)
    ctx.set('sessionKey', token)
    doc.sessionKey = token
    await new Promise((resolve, reject) => {
      doc.save(err => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    });

    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: '登陆成功'
    }
  } else {
    ctx.status = 200;
    ctx.body = {
      code: 0,
      msg: '密码错误'
    }
  }
}
// 查询所有用户信息
exports.allUsers = async(ctx) => {
  let doc = await findAllUsers();
  ctx.status = 200;
  console.log(doc)
  ctx.body = {
    code: 1,
    msg: '查询成功',
    data: doc
  };
}
//删除某个用户
exports.delUser = async(ctx) => {
  let id = ctx.request.body.id;
  try{
    await delUser(id);
    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: '删除成功'
    }
  }
  catch(err) {
    console.log(err)
  }
}