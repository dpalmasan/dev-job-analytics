const request = require('supertest');
const createApp = require('../app');
const expect = require('chai').expect;
const StackOverflowQuestions = require("../models/StackOverflowQuestion");
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/jobservatory', {
  useUnifiedTopology: true
});

mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', (error) => {
      console.warn('Error : ',error);
  });

describe('Jobservatory server', () => {
  var app;
  var server;
  let questions = [
    {
      tag: 'php',
      date: new Date("2021-08-17T00:00:00.000Z"),
      count: 230
    },
    {
      tag: 'python',
      date: new Date("2021-08-18T00:00:00.000Z"),
      count: 511
    }
  ]

  before((done) => {
    mongoose.connection.collections.so_questions.drop(() => {
      StackOverflowQuestions.insertMany(questions, (err, docs) => {
        app = createApp();
        server = app.listen(function(err) {
          if (err) { return done(err); }
          done();
        }) 
      });
    }); 
  });

  after((done) => {
    mongoose.connection.close((err) => {
      if (err) {
        console.error(err);
      }

      // Mocha will hang if we do not close the server!
      server.close(() => {
        done();
      })
    })
  })

  it('Should return StackOverflow Questions', (done) => {
    request(app)
      .get('/api/v1/questions')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        results = res.body;
        expect(results).to.be.deep.equal({
          count: 2,
          data: [
            {
              color: "hsl(207, 70%, 50%)",
              data: [
                {
                  x: "2021-08-16T04:00:00.000Z",
                  y: 230
                }
              ],
              id: "php"
            },
            {
              color: "hsl(207, 70%, 50%)",
              data: [
                {
                  x: "2021-08-17T04:00:00.000Z",
                  y: 511
                }
              ],
              id: "python",
            }
          ],
          success: true
        });
        done();
      })
  })
})