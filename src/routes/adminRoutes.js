var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var books = [
        {
            Title:'Valami1',
            Author:'Valaki1',
            Genre: 'Biography',
            bookId: 656,
            Read: false
        },
        {
            Title:'Valami2',
            Author:'Valaki2',
            Genre: 'Biography',
            bookId: 24280,
            Read: false
        },
        {
            Title:'Valami3',
            Author:'Valaki3',
            Genre: 'Biography',
            bookId: 24280,
            Read: false
        }
    ];
var router = function(nav) {
    adminRouter.route('/addBooks')
        .get(function(req,res) {
            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('books');
                collection.insertMany(books, function(err,results) {
                    res.send(results);
                    db.close();
                });
            });
            //res.send('Instering books');
        });
    return adminRouter;
};
module.exports = router;