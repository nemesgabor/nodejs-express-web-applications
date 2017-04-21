var express = require('express');
var bookRouter = express.Router();

var router = function(nav) {
    var books = [
        {
            Title:'Valami1',
            Author:'Valaki1',
            Genre: 'Biography',
            Read: false
        },
        {
            Title:'Valami2',
            Author:'Valaki2',
            Genre: 'Biography',
            Read: false
        },
        {
            Title:'Valami3',
            Author:'Valaki3',
            Genre: 'Biography',
            Read: false
        }
    ];
    bookRouter.route('/')
        .get(function(req,res) {
            res.render('bookListView',{
                    title:'Books',
                    nav: nav,
                    books:books
                });
        });
    bookRouter.route('/:id')
        .get(function(req,res) {
            var Id = req.params.id;
            res.render('bookView',{
                title:'Books',
                nav: nav,
                book:books[Id]
            });
        });
    return bookRouter;
};
module.exports = router;