var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

exports.connect = function(dbUrl, next) {
    MongoClient.connect(dbUrl, function(err, db) {
        if (err) {
            console.log("Error connecting database " + dbUrl);
            return next(err);
        }

        console.log('Connected to MongoDB ' + dbUrl);
        return next(null, db);
    });
}

exports.close = function(db) {
    console.log('Closing database');
    db.close();
}

exports.dropCollection = function(db, collection, next) {
    db.dropCollection(collection, function(err, result) {
        if (err) {
            console.log("Error dropping collection");
            return next(err);
        }

        console.log('Collection dropped');
        return next();
    });
}

exports.insertDocument = function(db, collection, document, callback) {
    var col = db.collection(collection);
    col.insert(document, function(err, result) {
        if (err) {
            console.log('Error inserting into collection ', document);
            return callback(err);
        }
        console.log('Inserted document into collection');
        return callback(null, result);
    });
}

exports.findDocuments = function(db, collection, filter, callback) {
    var col = db.collection(collection);
    col.find({}).toArray(function(err, result) {
        if (err) {
            console.log('Error finding documents');
            return callback(err);
        }
        console.log('Found documents: length ', result.length);
        return callback(null, result);
    });
}

exports.removeDocument = function(db, collection, document, callback) {
    var col = db.collection(collection);
    col.deleteOne(document, function(err, result) {
        if (err) {
            console.log('Error deleting from collection ', document);
            return callback(err);
        }
        console.log('Deleted document from collection');
        return callback(null, result);
    });
}

exports.updateDocument = function(db, collection, document, newDocument, callback) {
    var col = db.collection(collection);
    col.updateOne(document, {$set: newDocument}, function(err, result) {
        if (err) {
            console.log('Error updating collection ', document);
            return callback(err);
        }
        console.log('Updated document');
        return callback(null, result);
    });
}
