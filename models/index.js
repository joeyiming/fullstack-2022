const Blog = require('./blog')
const User = require('./user')
User.hasMany(Blog)
Blog.belongsTo(User)
// Blog.sync({ force: true })
// User.sync({ force: true })

module.exports = {
  Blog,
  User
}