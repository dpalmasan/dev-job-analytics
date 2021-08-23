const request = require('supertest');
const createApp = require('../app');
const expect = require('chai').expect;
const StackOverflowQuestions = require("../models/StackOverflowQuestion");
const JobserverRecord = require("../models/Technology");
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/jobservatory', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

mongoose.connection
  .once('open', () => {})
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

  let techs = [
    {
      name: 'Angular.js',
      date: new Date("2021-08-12T00:00:00.000Z"),
      jobs_total: 65646,
      countries: [
        { name: 'Estados Unidos', jobs: 18633 },
        { name: 'Reino Unido', jobs: 1032 },
        { name: 'Canadá', jobs: 1852 },
        { name: 'Polonia', jobs: 842 },
        { name: 'Brasil', jobs: 3222 },
        { name: 'India', jobs: 15659 },
        { name: 'China', jobs: 6890 },
        { name: 'Chile', jobs: 112 },
        { name: 'Alemania', jobs: 3898 },
        { name: 'Países Bajos', jobs: 1099 },
        { name: 'Australia', jobs: 467 }
      ]
    }
  ]

  before((done) => {
    mongoose.connection.collections.so_questions.drop()
      .then(() => StackOverflowQuestions.insertMany(questions)
      )
      .then((docs, err) => {
        if (err) { done(err); }
      })
      .then(() => {
        mongoose.connection.collections.jobserver_records.drop()
      })
      .then(() => {
        // CAUTION: Will hang if schema is wrong! 
        return JobserverRecord.insertMany(techs)
      })
      .then((docs, err) => {
        if (err) { return done(err) }
        app = createApp();
        server = app.listen((err) => {
          if (err) { done(err); }
          done();
        });
      })
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

  it('Should return StackOverflow Questions /api/v1/questions', (done) => {
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
  });

  it('Should return technologies on /api/v1/technologies', (done) => {
    request(app)
      .get('/api/v1/technologies')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        results = res.body;
        expect(results).to.be.deep.equal({
          count: 1,
          data: [
            {
              color: "hsl(207, 70%, 50%)",
              data: [
                {
                  x: "2021-08-11T04:00:00.000Z",
                  y: 65646
                }
              ],
              id: "Angular.js"
            }
          ],
          success: true
        });
        done();
      })
  });
})