const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");
const {FiosCmp} = require("./../models/fiosCmp");

// TODOs

const todos = [{
    text: "first todo"
}, {
    text: "second todo"
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe("POST /todos", () => {
    it("should create a new todo", (done) => {
        var text = "Test todo text";

        request(app)
            .post("/todos")
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it("should not create todo with invalid data", (done) => {
        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe("GET /todos", () => {
    it("should get all todos", (done) => {
        request(app)
            .get("/todos")
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

// FIOSCMP

const cmps = [{
    tactic: "first tactic",
    lob: "first lob"
}, {
    tactic: "second tactic",
    lob: "second lob"
}];

beforeEach((done) => {
    FiosCmp.remove({}).then(() => {
        return FiosCmp.insertMany(cmps);
    }).then(() => done());
});

describe("POST /fioscmp", () => {
    it("should create new cmp", (done) => {

        var tactic = "EMC";

        request(app)
            .post("/fioscmp")
            .send({tactic})
            .expect(200)
            .expect((res) => {
                expect(res.body.tactic).toBe(tactic);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                FiosCmp.find({tactic}).then((cmps) => {
                    expect(cmps.length).toBe(1);
                    expect(cmps[0].tactic).toBe(tactic);
                    done();
                }).catch((e) => done(e));
            });
    });

    it("should not create cmp with invalid data", (done) => {
        request(app)
            .post("/fioscmp")
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                FiosCmp.find().then((cmps) => {
                    expect(cmps.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe("GET /fioscmp", () => {
    it("Should get all Fios CMPs", (done) => {
        request(app)
            .get("/fioscmp")
            .expect(200)
            .expect((res) => {
                expect(res.body.cmps.length).toBe(2);
            })
            .end(done);
    });
});
