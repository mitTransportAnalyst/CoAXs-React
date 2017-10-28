/**
 * Created by xinzheng on 1/24/17.
 */

const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const publicMainNOLA_path = express.static(__dirname + '/public');

const mainNOLA_path = __dirname + '/public/index.html';
const landingNOLA_path = __dirname + '/public/indexLandingNOLA.html';

app.use(publicMainNOLA_path);

app.get('/main/nola/point2point', function (request, response) {
  response.sendFile(mainNOLA_path, function (error) {
    if (error) {
      console.log(error);
    }
  });
});

app.get('/main/nola/accessibility', function (request, response) {
  response.sendFile(mainNOLA_path, function (error) {
    if (error) {
      console.log(error);
    }
  });
});

app.get('/landing/nola', function (request, response) {
  response.sendFile(landingNOLA_path, function (error) {
    if (error) {
      console.log(error);
    }
  });
});

app.listen(port, function () {
  console.log("App is running on port " + port);
});

