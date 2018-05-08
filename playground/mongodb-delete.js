const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", function(err, client) {
    if (err) {
        return console.log("unable to connect");
    }
    console.log("connected");
    const db = client.db("TodoApp")

    db.collection("Todos").findOneAndDelete({location: "Port Chester"}).then(function(results) {
        console.log(JSON.stringify(results, undefined, 2));
    }, function(err) {
        console.log(err);
    });

    client.close();
});