/**
 * Created by xinzheng on 1/24/17.
 */
require('dotenv').config();

const express = require('express');

const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;
const publicMainNOLA_path = express.static(__dirname + '/public');

const mainNOLA_path = __dirname + '/public/index.html';

app.use(publicMainNOLA_path);
app.use(bodyParser.json()); // for parsing application/json

app.post('/api', function (request, response) {
  fetch("https://analysis.conveyal.com/api/analysis", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": process.env.API_TOKEN,
    },
    body: JSON.stringify(
      request.body
    )
  })
    .then(res => res.buffer())
    .then(buffer => response.send(buffer))
});

app.post('/grid', function (request, response) {
  let gridRegionID = request.body.gridRegionID;
  let gridName = request.body.gridName;
  fetch("https://analysis.conveyal.com/api/opportunities/"+gridRegionID+"/"+gridName, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": process.env.API_TOKEN,
    },
  })
    .then(res => response.json({ url: res.url }));

  // .then(res => res.buffer())
    // .then(buffer => response.send(buffer))
});

//
// app.get('/main/nola/accessibility', function (request, response) {
//   response.sendFile(mainNOLA_path, function (error) {
//     if (error) {
//       console.log(error);
//     }
//   });
// });

app.listen(port, function () {
  console.log("App is running on port " + port);
});

