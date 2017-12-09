/**
 * Created by xinzheng on 1/24/17.
 */
require('dotenv').config();


// const _ = require('es6-promise').polyfill();
// const __ = require('isomorphic-fetch');

const fetch = require('node-fetch');

const path = require('path');
const express = require('express');


const app = express();
const port = process.env.PORT || 8000;
const publicMainNOLA_path = express.static(__dirname + '/public');

const mainNOLA_path = __dirname + '/public/index.html';
const landingNOLA_path = __dirname + '/public/indexLandingNOLA.html';

app.use(publicMainNOLA_path);

app.post('/api', function (request, response) {
  fetch("https://analysis.conveyal.com/api/analysis", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": process.env.API_TOKEN,
    },
    body: JSON.stringify(
      {
        "date": "2017-12-08",
        "fromTime": 25200,
        "toTime": 32400,
        "accessModes": "WALK",
        "directModes": "WALK",
        "egressModes": "WALK",
        "transitModes": "BUS,TRAM,RAIL,SUBWAY",
        "walkSpeed": 1.3888888888888888,
        "bikeSpeed": 4.166666666666667,
        "monteCarloDraws": 200,
        "maxRides": 4,
        "fromLat": 29.98646043083785,
        "fromLon": -90.13526916503908,
        "workerVersion": "v3.2.0",
        "projectId": "5a29eca1896fd005dc77a631",
        "variantIndex": 0
      }
    )
  })
    .then(res => res.buffer())
    .then(buffer => response.send(buffer))
});


// .then(res => response.send(res.body))

// }).then(res => {response.send(res.body["_transformState"].writechunk); console.log(res.body["_transformState"].writechunk)})


//
// app.get('/main/nola/point2point', function (request, response) {
//   response.sendFile(mainNOLA_path, function (error) {
//     if (error) {
//       console.log(error);
//     }
//   });
// });
//
// app.get('/main/nola/accessibility', function (request, response) {
//   response.sendFile(mainNOLA_path, function (error) {
//     if (error) {
//       console.log(error);
//     }
//   });
// });
//
// app.get('/landing/nola', function (request, response) {
//   response.sendFile(landingNOLA_path, function (error) {
//     if (error) {
//       console.log(error);
//     }
//   });
// });

app.listen(port, function () {
  console.log("App is running on port " + port);
});

