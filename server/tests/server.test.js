const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");
const {FiosCmp} = require("./../models/fiosCmp");

beforeEach((done) => {
    Todo.remove({}).then(() => done());
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

                Todo.find().then((todos) => {
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
});

beforeEach((done) => {
    FiosCmp.remove({}).then(() => done());
});

describe("POST /fioscmp", () => {
    it("should create new cmp", (done) => {
        var tactic = "EMC";
        var lob = "CON"

        request(app)
            .post("/fioscmp")
            .send({tactic, lob})
            .expect(200)
            .expect((res) => {
                expect(res.body.tactic).toBe(tactic);
                expect(res.body.lob).toBe(lob);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                FiosCmp.find().then((cmps) => {
                    expect(cmps.length).toBe(1);
                    expect(cmps[0].tactic).toBe(tactic);
                    expect(cmps[0].lob).toBe(lob);
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
                    expect(cmps.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
});
