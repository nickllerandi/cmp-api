// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", function(err, client) {
    if (err) {
        return console.log("unable to connect");
    }
    console.log("connected");
    const db = client.db("TodoApp")

    db.collection("Users").insertOne({
        name: "Nick",
        age: 29,
        location: "Port Chester"
    }, function(err, result) {
        if (err) {
            return console.log(err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});