const request = require('supertest');
const chai = require('chai');
const chaiExclude = require('chai-exclude');
const sinon = require('sinon');
const mongoose = require('mongoose');
const createApp = require('../app');
const connectDB = require('../config/db');
const StackOverflowQuestions = require('../models/StackOverflowQuestion');
const JobserverRecord = require('../models/Technology');

const { expect, assert } = chai;
chai.use(chaiExclude);

process.env.MONGO_URI = 'mongodb://localhost:27017/jobservatory';

describe('Jobservatory server', () => {
  let app;
  let server;
  const questions = [
    {
      tag: 'php',
      date: new Date('2021-08-17T00:00:00.000Z'),
      count: 230,
    },
    {
      tag: 'python',
      date: new Date('2021-08-17T00:00:00.000Z'),
      count: 511,
    },
  ];

  const techs = [
    {
      name: 'Angular.js',
      date: new Date('2021-08-12T00:00:00.000Z'),
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
        { name: 'Australia', jobs: 467 },
      ],
    },
  ];

  before((done) => {
    this.clock = (date) => sinon.useFakeTimers(new Date(date));
    this.clock('2021-08-12');
    connectDB()
      .then(() => {
        // Idempotency on runs
        mongoose.connection.db.dropDatabase((err, result) => {
          if (err) {
            done(err);
          }
          console.log(`Dropping database: ${result}`);
        });
      })
      .then(() => StackOverflowQuestions.insertMany(questions))
      .then((docs, err) => {
        if (err) {
          done(err);
        }
      })
      // CAUTION: Will hang if schema is wrong!
      .then(() => JobserverRecord.insertMany(techs))
      .then((docs, err) => {
        if (err) {
          return done(err);
        }
        app = createApp();
        server = app.listen((serverErr) => {
          if (serverErr) {
            done(serverErr);
          }
          done();
        });
        return server;
      });
  });

  after((done) => {
    mongoose.connection.close((err) => {
      if (err) {
        done(err);
      }
      // Mocha will hang if we do not close the server!
      server.close(() => {
        done();
      });
    });
  });

  it('Should return StackOverflow Questions /api/v1/questions', (done) => {
    request(app)
      .get('/api/v1/questions')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        const results = res.body;
        expect(results).to.be.deep.equal({
          count: 2,
          data: [
            {
              color: 'hsl(207, 70%, 50%)',
              data: [
                {
                  x: new Date('2021-08-17T00:00:00.000Z').toISOString(),
                  y: 230,
                },
              ],
              id: 'php',
            },
            {
              color: 'hsl(207, 70%, 50%)',
              data: [
                {
                  x: new Date('2021-08-17T00:00:00.000Z').toISOString(),
                  y: 511,
                },
              ],
              id: 'python',
            },
          ],
          success: true,
        });
        return done();
      });
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
        const results = res.body;
        expect(results).to.be.deep.equal({
          count: 1,
          data: [
            {
              color: 'hsl(207, 70%, 50%)',
              data: [
                {
                  x: new Date('2021-08-12T00:00:00.000Z').toISOString(),
                  y: 65646,
                },
              ],
              id: 'Angular.js',
            },
          ],
          success: true,
        });
        return done();
      });
  });

  it('Should return technologies by name on /api/v1/technologies/:name', (done) => {
    request(app)
      .get('/api/v1/technologies/Angular.js')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        const results = res.body;
        assert.deepEqualExcludingEvery(results, {
          count: 1,
          data: {
            jobsOpenByCountry: [
              {
                __v: 0,
                _id: '6114648052046e6c76cc05e4',
                countries: [
                  {
                    _id: '6114648052046e6c76cc05e5',
                    jobs: 18633,
                    name: 'Estados Unidos',
                  },
                  {
                    _id: '6114648052046e6c76cc05e6',
                    jobs: 1032,
                    name: 'Reino Unido',
                  },
                  {
                    _id: '6114648052046e6c76cc05e7',
                    jobs: 1852,
                    name: 'Canadá',
                  },
                  {
                    _id: '6114648052046e6c76cc05e8',
                    jobs: 842,
                    name: 'Polonia',
                  },
                  {
                    _id: '6114648052046e6c76cc05e9',
                    jobs: 3222,
                    name: 'Brasil',
                  },
                  {
                    _id: '6114648052046e6c76cc05ea',
                    jobs: 15659,
                    name: 'India',
                  },
                  {
                    _id: '6114648052046e6c76cc05eb',
                    jobs: 6890,
                    name: 'China',
                  },
                  {
                    _id: '6114648052046e6c76cc05ec',
                    jobs: 112,
                    name: 'Chile',
                  },
                  {
                    _id: '6114648052046e6c76cc05ed',
                    jobs: 3898,
                    name: 'Alemania',
                  },
                  {
                    _id: '6114648052046e6c76cc05ee',
                    jobs: 1099,
                    name: 'Países Bajos',
                  },
                  {
                    _id: '6114648052046e6c76cc05ef',
                    jobs: 467,
                    name: 'Australia',
                  },
                ],
                date: '2021-08-12T00:00:00.000Z',
                jobs_total: 65646,
                name: 'Angular.js',
              },
            ],
            jobsOpenByDate: [
              {
                color: 'hsl(207, 70%, 50%)',
                data: [
                  {
                    x: '2021-08-12T00:00:00.000Z',
                    y: 65646,
                  },
                ],
                id: 'Angular.js',
              },
            ],
            questionsOpen: [],
          },
          success: true,
        }, ['_id']);
        return done();
      });
  });
});
