
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var fs = require("fs");
const csv = require("csvtojson");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

const csvFilePath='data/colleges.csv'
router.get('/colleges', function (req, res) {
  var firstItem=true
  res.writeHead(200, {'Content-Type': 'application/json'});
  csv()
  .fromFile(csvFilePath)
  .on('json',(jsonObj)=>{
      // console.log( jsonObj.UNITID );
      res.write(firstItem ? (firstItem=false,'[') : ',');
      res.write(JSON.stringify(jsonObj, null, 3));
  })
  .on('done',(error)=>{
      console.log('end');
      res.end(']');
  })
})

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(process.env.APP_NAME + " env => "  + process.env.NODE_ENV + ', port => ' + port);
