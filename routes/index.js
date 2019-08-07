var data = [{ item: '222' }, { item: '222' }, { item: '222' }]

var bodyPaser = require('body-parser')

var urlencodeParser = bodyPaser.urlencoded({ extended: false })

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.redirect('/posts')
  })
  app.get('/todo', function (req, res) {
    res.render('todo', { todos: data })
  })
  app.post('/todo', urlencodeParser, function (req, res) {
    console.log(req.body)
    data.push(req.body)
    var errno = 0
    var message = 'success'
    res.json({ data: { errno, data, message } })
  })
  app.use('/signup', require('./signup'))
  app.use('/signin', require('./signin'))
  app.use('/signout', require('./signout'))
  app.use('/posts', require('./posts'))
  app.use('/comments', require('./comments'))
}
