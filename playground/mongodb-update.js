const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", function(err, client) {
    if (err) {
        return console.log("unable to connect");
    }
    console.log("connected");
    const db = client.db("TodoApp")

    db.collection("Users").findOneAndUpdate ({
        _id: new ObjectID("5ae8ff2cac43d515378fa457")
    }, {
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then(function(results) {
        console.log(JSON.stringify(results, undefined, 2));
    }, function(err) {
        console.log(err);
    });

    client.close();
});