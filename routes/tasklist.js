var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');

function TaskList(taskDao) {
  this.taskDao = taskDao;
}
var Request = require('request');

module.exports = TaskList;
TaskList.prototype = {
    showTasks: function (req, res) {
        var self = this;
        
        var querySpec = {
            query: 'SELECT * FROM root r',
            /*parameters: [{
                name: '@completed',
                value: false
            }]*/
        };
        /*const options = {
            hostname: 'management.azure.com',
            port: 443,
            path: '/subscriptions/<subscriptionId>/resourceGroups/<resourceGroup>/providers/Microsoft.DataFactory/factories/<datafactoryName>/pipelines/<pipelineName>/createRun?api-version=2018-06-01',
            method: 'POST',
            body: req.body,
            headers: {
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNDQyMzhmZDgtZjk4MS00MDU5LTgwYzMtN2IyZDFjZjYwMDA1LyIsImlhdCI6MTU2MTk4NDQxMCwibmJmIjoxNTYxOTg0NDEwLCJleHAiOjE1NjE5ODgzMTAsImFpbyI6IjQyWmdZRWpqdkhZcjUvYlcvZ2ZTVWJPYU1qZXZBd0E9IiwiYXBwaWQiOiJjMTJmMmE4ZC1iZjE3LTQ5OWQtYWU0NC05ZTMwMjliZWZiNzUiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80NDIzOGZkOC1mOTgxLTQwNTktODBjMy03YjJkMWNmNjAwMDUvIiwib2lkIjoiNDljY2JjMmQtZDBjYy00MDJiLWI0ZGItMDVlOWFhZTIyODFkIiwic3ViIjoiNDljY2JjMmQtZDBjYy00MDJiLWI0ZGItMDVlOWFhZTIyODFkIiwidGlkIjoiNDQyMzhmZDgtZjk4MS00MDU5LTgwYzMtN2IyZDFjZjYwMDA1IiwidXRpIjoiSVVZOHQxZklkay0wVVI3MUdXZEVBQSIsInZlciI6IjEuMCJ9.ZBnY_Mg5M8gJ9fi3udBvjYsxjIGOPnUN24lBptct4B3wzksf1BwACP2FrQbgTisJorpuf5a5HTJD2D7lctvH3xS6aBX0Bh5CADar8F1z5k8ibedMMs1Ybc01ZYESg18LHv9D_btD8oQMf4Qhdl5i34wQ4aLv-u4jH4UMXpq5pUQASo1HGrAwFEnT3dBOeLuwNHusViQBnoh_KBwuwywnqb02l6_NXgHtrFcS0RTCsUOzQwC_I7yGCR3vwyUpmt3spATth8-uCR74WKMT81xKvyF8RF6CPsH8VV9wMBuIZZcdpsWu0AZfRkna3_TV3yVbcewJhMl7qL39X6cEhDn9Hw'
                ,
                'Content-Type': 'application/json'
            }
        };
        const _options = {
            hostname: 'management.azure.com',
            port: 443,
            path: '/subscriptions/8f43ede1-74a4-4cde-8156-764899b2220f/resourceGroups/DashboardAmperePlus/providers/Microsoft.DataFactory/factories/databackup-ampere/pipelines/cosmosToBlob/createRun?api-version=2018-06-01',
            method: 'POST',
            body: req.body,
            headers: {
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyIsImtpZCI6IkN0ZlFDOExlLThOc0M3b0MyelFrWnBjcmZPYyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuYXp1cmUuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNDQyMzhmZDgtZjk4MS00MDU5LTgwYzMtN2IyZDFjZjYwMDA1LyIsImlhdCI6MTU2MTk4NDQxMCwibmJmIjoxNTYxOTg0NDEwLCJleHAiOjE1NjE5ODgzMTAsImFpbyI6IjQyWmdZRWpqdkhZcjUvYlcvZ2ZTVWJPYU1qZXZBd0E9IiwiYXBwaWQiOiJjMTJmMmE4ZC1iZjE3LTQ5OWQtYWU0NC05ZTMwMjliZWZiNzUiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC80NDIzOGZkOC1mOTgxLTQwNTktODBjMy03YjJkMWNmNjAwMDUvIiwib2lkIjoiNDljY2JjMmQtZDBjYy00MDJiLWI0ZGItMDVlOWFhZTIyODFkIiwic3ViIjoiNDljY2JjMmQtZDBjYy00MDJiLWI0ZGItMDVlOWFhZTIyODFkIiwidGlkIjoiNDQyMzhmZDgtZjk4MS00MDU5LTgwYzMtN2IyZDFjZjYwMDA1IiwidXRpIjoiSVVZOHQxZklkay0wVVI3MUdXZEVBQSIsInZlciI6IjEuMCJ9.ZBnY_Mg5M8gJ9fi3udBvjYsxjIGOPnUN24lBptct4B3wzksf1BwACP2FrQbgTisJorpuf5a5HTJD2D7lctvH3xS6aBX0Bh5CADar8F1z5k8ibedMMs1Ybc01ZYESg18LHv9D_btD8oQMf4Qhdl5i34wQ4aLv-u4jH4UMXpq5pUQASo1HGrAwFEnT3dBOeLuwNHusViQBnoh_KBwuwywnqb02l6_NXgHtrFcS0RTCsUOzQwC_I7yGCR3vwyUpmt3spATth8-uCR74WKMT81xKvyF8RF6CPsH8VV9wMBuIZZcdpsWu0AZfRkna3_TV3yVbcewJhMl7qL39X6cEhDn9Hw'
                ,
                'Content-Type': 'application/json'
            }
        };
        Request.post("https://management.azure.com/subscriptions/8f43ede1-74a4-4cde-8156-764899b2220f/resourceGroups/DashboardAmperePlus/providers/Microsoft.DataFactory/factories/databackup-ampere/pipelines/cosmosToBlob/createRun?api-version=2018-06-01",(err,res,body)=>{
        if(err) {
            return console.log(err);
        }
        console.dir(JSON.parse(body));
        });*/
        
       
        self.taskDao.find(querySpec, function (err, items) {
            if (err) {
                throw (err);
            }

            res.render('index.ejs', {
                title: 'My ToDo List ',
                tasks: items
            });
        });
    },

    addTask: function (req, res) {
        var self = this;
        var item = req.body;

        self.taskDao.addItem(item, function (err) {
            if (err) {
                throw (err);
            }

            res.redirect('/');
        });
    },

    completeTask: function (req, res) {
        var self = this;
        var completedTasks = Object.keys(req.body);

        async.forEach(completedTasks, function taskIterator(completedTask, callback) {
            self.taskDao.updateItem(completedTask, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        }, function goHome(err) {
            if (err) {
                throw err;
            } else {
                res.redirect('/');
            }
        });
    }/*,
    backup: function(req,res) {
        Request.post("https://management.azure.com/subscriptions/8f43ede1-74a4-4cde-8156-764899b2220f/resourceGroups/DashboardAmperePlus/providers/Microsoft.DataFactory/factories/databackup-ampere/pipelines/cosmosToBlob/createRun?api-version=2018-06-01",(err,res,body)=>{
        if(err) {
            return console.dir(err);
        }
        console.dir(JSON.parse(body));
    });
    }*/
};