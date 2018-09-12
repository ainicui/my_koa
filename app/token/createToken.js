const JWT = require('jsonwebtoken')

module.exports = function (user_id) {
  const token = JWT.sign({user_id: user_id}, 'along', {expiresIn: '60s'})
  return token
}
