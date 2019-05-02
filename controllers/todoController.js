var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var todoSchema = new mongoose.Schema({
    item: String,
});

var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'Buy flowers'}).save(function(err) {
//     if (err) throw err;
//     console.log('item saved');
// });

// var data = [{item: 'poker face'}, {item: 'king'}, {item: 'queen'}]

module.exports = function(app) {
    app.get('/todo', function(req, res) {
        Todo.find({}, function(err, data) {
            if(err) throw err;
            res.render('todo', {todos: data});
        })
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        var itemOne = Todo(req.body).save(function(err, data) {
            if (err) throw err;
            // data.push(req.body);
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req, res) {
        // data = data.filter(function(todo) {
        //     return todo.item.replace(/ /g , '-') !== req.params.item;
        // });
        Todo.find({item: req.params.item.replace(/-/g , ' ')})
        .remove(function(err, data) {
            if(err) throw err;
            res.json(data);
        });
    });
}