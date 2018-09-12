const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myApp');

let db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', function () {
  console.log('数据库连接出错!')
});
db.on('open', function () {
  console.log('数据库连接成功!')
})