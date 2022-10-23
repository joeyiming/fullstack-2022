const Blog = require('./blog')
const User = require('./user')
const Readinglist = require('./readinglist')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglist, as: 'readingBlog' })
Blog.belongsToMany(User, { through: Readinglist, as: 'reader' })

module.exports = {
  Blog,
  User,
  Readinglist
}