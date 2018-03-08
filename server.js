/**
 * Created by xinzheng on 1/24/17.
 */
require('dotenv').config();

const express = require('express');

const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;
const publicMainNOLA_path = express.static(__dirname + '/public');

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
  console.log(process.env.API_TOKEN);
  fetch("https://analysis.conveyal.com/api/opportunities/" + gridRegionID + "/" + gridName, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": process.env.API_TOKEN,
    },
  })
    .then(res => response.json({url: res.url}));
});

app.post('/getModifications', function (request, response) {
  let projectID = request.body.projectID;
  fetch("https://analysis.conveyal.com/api/project/" + projectID + "/modifications", {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": process.env.API_TOKEN,
    },
  })
    .then(res => res.buffer())
    .then(buffer => response.send(buffer))
});

app.post('/updateModifications', function (request, response) {
  let modificationID = request.body.newModification._id;
  fetch("https://analysis.conveyal.com/api/modification/" + modificationID, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": process.env.API_TOKEN,
    },
    body: JSON.stringify(
      request.body.newModification
    )
  })
    .then(res => response.send(res))
});

app.listen(port, function () {
  console.log("App is running on port " + port);
});
