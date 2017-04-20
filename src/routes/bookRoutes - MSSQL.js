var express = require('express');
var bookRouter = express.Router();
var sql = require('mssql');

var router = function(nav) {
    var books = [
        {
            Title:'Valami1',
            Author:'Valaki1'
        },
        {
            Title:'Valami2',
            Author:'Valaki2'
        },
        {
            Title:'Valami3',
            Author:'Valaki3'
        }
    ];
    bookRouter.route('/')
        .get(function(req,res) {
            var request = new sql.Request();
            request.query('select * from books', function(err,result) {
                console.log(result.recordset);
                res.render('bookListView',{
                    title:'Books',
                    nav: nav,
                    books:result.recordset
                });
            });
        });
    bookRouter.route('/:id')
        .all(function(req,res,next) {
            var Id = req.params.id;
            var ps = new sql.PreparedStatement();
            ps.input('Id',sql.Int);
            ps.prepare('select * from books where Id = @Id',
                function(err) {
                    ps.execute({Id:Id},
                    function(err, result) {
                        if (result.recordset.length === 0) {
                            res.status(404).send('Not Found');
                        }
                        else {
                            console.log(result.recordset);
                            req.book = result.recordset[0];
                            next();
                        }
                    });
                });
        })
        .get(function(req,res) {
            res.render('bookView',{
                title:'Books',
                nav: nav,
                book:req.book
            });
        });
    return bookRouter;
};
module.exports = router;