var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');
var TaskDao = require('./models/taskDao');
var TaskList = require('./routes/tasklist');
var Request = require('request');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Todo App:
var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});
var taskDao = new TaskDao(docDbClient, config.databaseId, config.collectionId);
var taskList = new TaskList(taskDao);
taskDao.init();
const options = {
  method: 'POST',
  url: 'https://management.azure.com/subscriptions/8f43ede1-74a4-4cde-8156-764899b2220f/resourceGroups/DashboardAmperePlus/providers/Microsoft.DataFactory/factories/databackup-ampere/pipelines/cosmosToBlob/createRun?api-version=2018-06-01',
  headers: {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNDQyMzhmZDgtZjk4MS00MDU5LTgwYzMtN2IyZDFjZjYwMDA1LyIsImlhdCI6MTU2MjY5NjQyNiwibmJmIjoxNTYyNjk2NDI2LCJleHAiOjE1NjI3MDAzMjYsImFpbyI6IjQyWmdZRGdUOTBERWhYZG5hc3MzUGVlS3BUc1pBUT09IiwiYXBwaWQiOiJjMTJmMmE4ZC1iZjE3LTQ5OWQtYWU0NC05ZTMwMjliZWZiNzUiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80NDIzOGZkOC1mOTgxLTQwNTktODBjMy03YjJkMWNmNjAwMDUvIiwib2lkIjoiNDljY2JjMmQtZDBjYy00MDJiLWI0ZGItMDVlOWFhZTIyODFkIiwic3ViIjoiNDljY2JjMmQtZDBjYy00MDJiLWI0ZGItMDVlOWFhZTIyODFkIiwidGlkIjoiNDQyMzhmZDgtZjk4MS00MDU5LTgwYzMtN2IyZDFjZjYwMDA1IiwidXRpIjoiS2IxaWVFSkRoa2FiRjhHRFJoTUFBQSIsInZlciI6IjEuMCJ9.GLefkZWoEbglkSMU1_PZUQvUbviUsloq6tWcpk20w7MtATbUJBRJh7R_Nhe9XEAE9sOA9a-hcNWNaQyp1EReej0auBArlmYH00VfOVuhEwBJIKqjJImNQiirSuoE-lu5HBja6ME0bwUvoCNOBvbkCBEe-Jva9izzfvCD4hDut2rtNCEseNLUc4vmDwUXLaamCRRxPuTexHnsIRV2QMpwhW4yHxnAdFPVSvfo2785bb3KpG7L1AkclUf_RPvYPGoqubg6uDh79uk5qgzDF4fr8Dzaw__F9jCT2bQEdWJtsSO8kPiuCYX9H4OdIEF_yOwofJAKzrdPQaZefyycQ67idA',
      'Content-Type': 'application/json'
  }
};
Request.post(options,(error,response,body)=>{
  if(error)
    console.log(error);
  console.log(JSON.parse(body));
})
/*Request.post({
            
  
  'url': 'https://management.azure.com/subscriptions/8f43ede1-74a4-4cde-8156-764899b2220f/resourceGroups/DashboardAmperePlus/providers/Microsoft.DataFactory/factories/databackup-ampere/pipelines/cosmosToBlob/createRun?api-version=2018-06-01',
  'method': 'POST',
  //'body': req.body,
  'headers': {
      'Authorization':/*{ 'tokenType': 'Bearer',
      'expiresIn': '3600',
      'expiresOn': '2019-07-02T14:40:32.214Z',
      'resource': 'https://management.azure.com',
      'accessToken':
       'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNDQyMzhmZDgtZjk4MS00MDU5LTgwYzMtN2IyZDFjZjYwMDA1LyIsImlhdCI6MTU2MjA3NDUzMiwibmJmIjoxNTYyMDc0NTMyLCJleHAiOjE1NjIwNzg0MzIsImFpbyI6IjQyWmdZTGcyWVpkRjNPR0tpMGRPdGV6a1UvbXFBd0E9IiwiYXBwaWQiOiJjMTJmMmE4ZC1iZjE3LTQ5OWQtYWU0NC05ZTMwMjliZWZiNzUiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80NDIzOGZkOC1mOTgxLTQwNTktODBjMy03YjJkMWNmNjAwMDUvIiwib2lkIjoiNDljY2JjMmQtZDBjYy00MDJiLWI0ZGItMDVlOWFhZTIyODFkIiwic3ViIjoiNDljY2JjMmQtZDBjYy00MDJiLWI0ZGItMDVlOWFhZTIyODFkIiwidGlkIjoiNDQyMzhmZDgtZjk4MS00MDU5LTgwYzMtN2IyZDFjZjYwMDA1IiwidXRpIjoieGNpc1N4LXNaRWl2cmdHX0MtRnVBQSIsInZlciI6IjEuMCJ9.SMFxFRw7yXFjDJK15rDB23lNJemcWIdyxSOib5FP9YHpAE8dX8P32Ap8qlTmCFwmpZf0-N5sTZ6Lyhbwrlrg-oztzeoQ5Dn3BnEJK8ncW4FeFxp6BhXdGAP_nkxSsqeg7xllqmUItLZk2kQWKYs5A03DgRPhpBpR2UZ-ckYw9Lj_IpMZdAWDyjPMDScZtCoo0K_078Hq4t91UqT9BZNwdcceBJZyQ8knJ6FJYL7n8nQdQ2jRAgMOcFpF0UIzneS9j72rTyKYpFibnXd4uZUK0LBSmCThyWX1nm-B7TY3BRicOCQsrDKmket3OAV5kVMdmC1thamr7R5XvJX_oryOPg',
      'isMRRT': true,
      '_clientId': 'c12f2a8d-bf17-499d-ae44-9e3029befb75',
      '_authority':
       'https://login.windows.net/44238fd8-f981-4059-80c3-7b2d1cf60005' }
       { tokenType: 'Bearer',
  expiresIn: 3600,
  expiresOn: '2019-07-02T14:40:32.214Z',
  resource: 'https://management.azure.com',
  accessToken:
   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNDQyMzhmZDgtZjk4MS00MDU5LTgwYzMtN2IyZDFjZjYwMDA1LyIsImlhdCI6MTU2MjA3NDUzMiwibmJmIjoxNTYyMDc0NTMyLCJleHAiOjE1NjIwNzg0MzIsImFpbyI6IjQyWmdZTGcyWVpkRjNPR0tpMGRPdGV6a1UvbXFBd0E9IiwiYXBwaWQiOiJjMTJmMmE4ZC1iZjE3LTQ5OWQtYWU0NC05ZTMwMjliZWZiNzUiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80NDIzOGZkOC1mOTgxLTQwNTktODBjMy03YjJkMWNmNjAwMDUvIiwib2lkIjoiNDljY2JjMmQtZDBjYy00MDJiLWI0ZGItMDVlOWFhZTIyODFkIiwic3ViIjoiNDljY2JjMmQtZDBjYy00MDJiLWI0ZGItMDVlOWFhZTIyODFkIiwidGlkIjoiNDQyMzhmZDgtZjk4MS00MDU5LTgwYzMtN2IyZDFjZjYwMDA1IiwidXRpIjoieGNpc1N4LXNaRWl2cmdHX0MtRnVBQSIsInZlciI6IjEuMCJ9.SMFxFRw7yXFjDJK15rDB23lNJemcWIdyxSOib5FP9YHpAE8dX8P32Ap8qlTmCFwmpZf0-N5sTZ6Lyhbwrlrg-oztzeoQ5Dn3BnEJK8ncW4FeFxp6BhXdGAP_nkxSsqeg7xllqmUItLZk2kQWKYs5A03DgRPhpBpR2UZ-ckYw9Lj_IpMZdAWDyjPMDScZtCoo0K_078Hq4t91UqT9BZNwdcceBJZyQ8knJ6FJYL7n8nQdQ2jRAgMOcFpF0UIzneS9j72rTyKYpFibnXd4uZUK0LBSmCThyWX1nm-B7TY3BRicOCQsrDKmket3OAV5kVMdmC1thamr7R5XvJX_oryOPg',
  isMRRT: true,
  _clientId: 'c12f2a8d-bf17-499d-ae44-9e3029befb75',
  _authority:
   'https://login.windows.net/44238fd8-f981-4059-80c3-7b2d1cf60005' }
,
    
      'Content-Type': 'application/json'
  }
}, (error, response, body) => {
  if(error) {
      return console.dir(error);
  }
  console.dir(JSON.parse(body));
});*/
app.get('/', taskList.showTasks.bind(taskList));
//app.post('/addtask', taskList.addTask.bind(taskList));
//app.post('/completetask', taskList.completeTask.bind(taskList));
app.set('view engine', 'ejs');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.ejs');
});


module.exports = app;
