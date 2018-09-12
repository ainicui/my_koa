const mongoose = require('mongoose')
const FromSchema = require('../schema/form')
const FromData = mongoose.model('from_detail', FromSchema)
const _score = require('underscore')
const fs = require('fs')

//根据Id查找用户
const findId = (id) => {
  return new Promise((resolve, reject) => {
    FromData.findById(id, (err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    });
  });
};
// 所查询用户的数量
const findAllBum = function () {
  return new Promise((resolve, reject) => {
    FromData.count({}, (err, num) => {
      if (err) {
        reject(err)
      }
      resolve(num)
    })
  })
}
// 查询所有的用户
const findAll = function () {
  return new Promise((resolve, reject) => {
    FromData.find({}, (err, doc) => {
      if (err) {
        reject(err);
      }
      resolve(doc);
    });
  });
}
//分页查询
const findPage = function (pageSize, currentPage) {
  let skipnum = (currentPage - 1) * pageSize
  return new Promise((resolve, reject) => {
    FromData.find()
      .skip(skipnum)
      .limit(pageSize)
      .exec((err, doc) => {
        if (err) {
          reject(doc)
        }
        resolve(doc)
      })
  })
}

//删除某个用户
const delUser = function (id) {
  return new Promise((resolve, reject) => {
    FromData.findOneAndRemove({ _id: id }, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

// 提交表单
exports.FromData = async (ctx) => {
  let id = ctx.request.body.id
  console.log(ctx.request.body)
  if (id) {
    let _from
    let doc = await findId(id)
    _from = _score.extend(doc, ctx.request.body)
    await new Promise((resolve, reject) => {
      _from.save((err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: '提交成功'
    }
  } else {
    let user = new FromData({
      user_name: ctx.request.body.user_name,
      address: ctx.request.body.address,
      content: ctx.request.body.content,
      imgUrl: ctx.request.body.imgUrl,
      date_time: new Date
    })
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
      msg: '提交成功'
    }
  }
}
// 查询用户信息
exports.allUsers = async (ctx) => {
  let id = ctx.request.body.id
  let pageSize = ctx.request.body.pageSize
  let currentPage = ctx.request.body.currentPage
  let num = await findAllBum() // 数量
  let doc
  /*----- 根据id查询 -----*/
  if (id) {
    doc = await findId(id);
  } else {
    doc = await findAll()
  }
  /*----- 分页查询 ------*/
  if (pageSize || currentPage) {
    doc = await findPage(pageSize, currentPage)
  }

  ctx.status = 200;
  ctx.body = {
    code: 1,
    msg: '查询成功',
    num: num,
    data: doc
  };
}
//删除某个用户
exports.delUser = async (ctx) => {
  let id = ctx.request.body.id;
  try {
    await delUser(id);
    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: '删除成功'
    }
  }
  catch (err) {
    console.log(err)
  }
}