const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client) => {
    if (err) {
        return console.log("unable to connect");
    }
    console.log("connected");
    const db = client.db("TodoApp")

    db.collection("Todos").find({location: "Pakistan"}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log(err);
    });

    client.close();
});