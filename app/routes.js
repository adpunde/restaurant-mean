var path = require('path');
var url = require('url');
var fs = require('fs');
var async = require('async');

var fooditem = require('./models/fooditem');
var categories = require('./models/categories');
var menuItems = require('./models/menuItems');

module.exports = function (app) {
    // API GET route
    app.get('/api/items', function (req, res) {
        fooditem.find(function (err, items) {
            if (err)
                return res.send(err);
            res.json(items);
        });
    });
    // API POST route
    app.post('/api/additem', function(req, res) {
        fooditem.add(req.body.name, req.body.category, function (err, item) {
            if (err)
                return res.send(err);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('ID: ' + item._id);
        });
    });

    // Frontend routes
    app.get('/api/categories', function(req, res) {
        categories.find({}, function (err, result) {
            if (err)
                res.send(err);
            res.json(result);
        });
    });

    app.get('/api/menu_items', function(req, res) {
        var obj = {};
        async.series([
            function (next) {
                menuItems.find({
                    short_name: {
                        "$regex": '^' + req.query.category + '\\d+',
                        "$options": "m"
                    }},
                    function (err, result) {
                        if (err)
                            return next(err);
                        obj.menu_items = result;
                        next();
                });
            },
            function (next) {
                categories.find({ short_name: req.query.category}, function (err, result) {
                    if (err)
                        return next(err);
                    obj.category = result[0];
                    next();
                });
            }
        ], function (err) {
            if (err)
                return res.send(err);
            res.json(obj);
        });
    });
    //     var mainDir = path.resolve(__dirname, '../');
    //     var pathname = url.parse(req.url).pathname;
    //
    //     if (pathname === '/config/categories.json') {
    //         res.sendFile(path.join(mainDir, '/config/categories.json'));
    //     }
    //     else if (pathname === '/config/menu_items.json') {
    //         var menuPath = path.join(mainDir, '/config/menu_items.json');
    //         fs.readFile(menuPath, function(err, data) {
    //             if (err)
    //                 return;
    //             var json = JSON.parse(data);
    //             var newJson = {};
    //             newJson.menu_items = [];
    //
    //             for(var i = 0; i < json.menu_items.length; i++) {
    //                 var entry = json.menu_items[i];
    //                 if (entry.short_name &&
    //                     entry.short_name.indexOf(req.query.category) !== -1) {
    //                         newJson.menu_items.push(entry);
    //                 }
    //             }
    //
    //             menuPath = path.join(mainDir, '/config/categories.json');
    //             fs.readFile(menuPath, function(err, data) {
    //                 if (err)
    //                     return;
    //                 json = JSON.parse(data);
    //                 res.json(newJson);
    //             });
    //         });
    //     }
    // });
}
