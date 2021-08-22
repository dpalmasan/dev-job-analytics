var ObjectID = require('bson-objectid');

module.exports = {
  "localhost:27017": {
    "databases": {
      "jobservatory": {
        "collections": [
          {
            "name": "system.namespaces",
            "documents": [
              {
                "name": "system.indexes"
              },
              {
                "name": "so_questions"
              }
            ]
          },
          {
            "name": "system.indexes",
            "documents": [
              {
                "v": 1,
                "key": {
                  "_id": 1
                },
                "ns": "jobservatory.so_questions",
                "name": "_id_",
                "unique": true
              }
            ]
          },
          {
            "name": "so_questions",
            "documents": [
              {
                "tag": "php",
                "date": "2021-08-17T00:00:00.000Z",
                "count": 230,
                "_id": ObjectID("61229a9f0d02a70b3e63e1a0")
              },
              {
                "tag": "python",
                "date": "2021-08-17T00:00:00.000Z",
                "count": 230,
                "_id": ObjectID("61229a9f0d02a70b3e63e1a1")
              }
            ]
          }
        ]
      }
    }
  }
}