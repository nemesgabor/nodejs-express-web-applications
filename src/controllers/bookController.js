var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function(bookService, nav) {
    var getIndex = function(req,res) {
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function(err,db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function(err,results) {
                res.render('bookListView',{
                    title:'Books',
                    nav: nav,
                    books:results
                });
            });
        });
    };
    var getByID = function(req,res) {
        var id = new ObjectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function(err,db) {
            var collection = db.collection('books');
            collection.findOne({_id: id},function(err,results) {
                if (results.bookId) {
                    bookService.getBookById(results.bookId,
                    function(err, book) {
                        results.book = book;
                        //console.log(results);
                        res.render('bookView',{
                            title:'Books',
                            nav: nav,
                            book:results
                        });
                    });
                }
                else {
                    res.render('bookView',{
                        title:'Books',
                        nav: nav,
                        book:results
                    });
                }
            });
        });
    };
    var middleware = function(req,res,next) {
        // if (!req.user) {
        //     //res.redirect('/');
        // }
        next();
    };
    return {
        getIndex:getIndex,
        getById:getByID,
        middleware:middleware
    };
};
module.exports = bookController;