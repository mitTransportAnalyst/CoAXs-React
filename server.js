/**
 * Created by xinzheng on 1/24/17.
 */

const path = require('path');
const express = require('express');




// const app = express();
// const port = process.env.PORT || 3000;
// const public_path = express.static(__dirname + '/public');
// const index_path = __dirname + '/public/index.html';
//
// app.use(public_path);
//
// app.get('*', function (request, response) {
//   response.sendFile(index_path, function (error) {
//     if (error) {
//       console.log(error);
//     }
//   });
// });



const app = express();
const port = process.env.PORT || 3000;
// const public_path = express.static(__dirname + '/public/LandingNOLA');
const publicMainNOLA_path = express.static(__dirname + '/public');
// const publicLandingNOLA_path = express.static(__dirname + '/LandingNOLA');


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
  // app.use(publicLandingNOLA_path);

  response.sendFile(landingNOLA_path, function (error) {
    if (error) {
      console.log(error);
    }
  });
});



app.listen(port, function() {
  console.log("App is running on port " + port);
});

