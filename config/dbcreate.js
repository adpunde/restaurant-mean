var fs = require('fs');

var dbmod = require('./dbmod');
var async = require('async');

var dbUrl = 'mongodb://localhost:27017/restaurant';
var db;
var collection;
var categoriesData;
var menuData;
var categoriesCollection = 'categories';
var menuItemsCollection = 'menu_items';

async.series([
    function (next) {
        fs.readFile('categories.json', function(err, data) {
            if (err)
                return next(err);
            categoriesData = JSON.parse(data);
            collection = categoriesCollection;
            next();
        });
    },
    function (next) {
        fs.readFile('menu_items.json', function(err, data) {
            if (err)
                return next(err);
            menuData = JSON.parse(data);
            next();
        });
    },
    function(next) {
        dbmod.connect(dbUrl, function(err, dbres) {
            if (err)
                return next(err);
            db = dbres;
            next();
        });
    },
    function (next) {
        dbmod.dropCollection(db, collection, function(err) {
            if (err)
                console.log('Error dropping collection ', collection);
            next();
        });
    },
    function (next) {
        async.forEachOfSeries(categoriesData, function (val, key, done) {
            var obj = {};
            obj.id = val.id;
            obj.short_name = val.short_name;
            obj.name = val.name;
            obj.special_instructions = val.special_instructions;
            console.log('Adding', obj.name);
            dbmod.insertDocument(db, collection, obj, function(err, result) {
                if (err)
                    return done(err);
                done();
            });
        }, function(err) {
            if (err)
                return next(err);
            next();
        });
    },
    function (next) {
        dbmod.findDocuments(db, collection, '', function(err, docs) {
            if (err)
                return next(err);
            console.log("Found documents:", docs);
            next();
        });
    },
    function (next) {
        collection = menuItemsCollection;
        dbmod.dropCollection(db, collection, function(err) {
            if (err)
                console.log('Error dropping collection ', collection);
            next();
        });
    },
    function (next) {
        async.forEachOfSeries(menuData, function (val, key, done) {
            var obj = val;
            console.log('Adding', val.name);
            dbmod.insertDocument(db, collection, obj, function(err, result) {
                if (err)
                    return done(err);
                done();
            });
        }, function(err) {
            if (err)
                return next(err);
            next();
        });
    },
    function (next) {
        dbmod.findDocuments(db, collection, '', function(err, docs) {
            if (err)
                return next(err);
            console.log("Found documents:", docs);
            next();
        });
    }
],
function (err) {
    if (err)
        console.log('DB error');
    dbmod.close(db);
});
