var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
var bodyParser = require('body-parser');

var app = express();
var compiler = webpack(config);

var mockMissions = [{
    id: 1,
	rank: 'S',
	price: '1000 $',
	sensei: 'Yoda',
	description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like'
},
{
    id: 2,
	rank: 'B',
	price: '100 yen',
	sensei: 'Skywalker',
	description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like'
},
{
    id: 3,
	rank: 'D',
	price: '5 $',
	sensei: 'Shifu',
	description: 'Test'
}];

const mockShinobies = [{
	name: 'Shifu',
	missionsCompleted: 35,
	student: 'Po'
},
{
	name: 'Yoda',
	missionsCompleted: 65,
	student: 'Sandwich'
},
{
	name: 'Skywalker',
	missionsCompleted: 25,
	student: 'Ben Swolo'
}];

const mockStudents = [{
	name: 'Po',
	age: 93,
	senseiName: 'Shifu'
},
{
	name: 'Sandwich',
	age: 26,
	senseiName: 'Yoda'
},
{
	name: 'Ben Swolo',
	age: 27,
	senseiName: 'Skywalker'
}];

const mockProfiles = [{
    senseiName: 'Shifu',
	iq: 124,
	power: 'Very high',
	rank: 'Master',
	skills: 'Can spin chopsticks while eating'
},
{
    senseiName: 'Yoda',
	iq: 12421,
	power: 'Very high',
	rank: 'lol Dead',
	skills: 'Master of stealing sandwiches'
},
{
    senseiName: 'Skywalker',
	iq: 14,
	power: 'Very high',
	rank: 'Legend',
	skills: '"Ben Swolo NAAAAAH!!1" screamer'
}];

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/imgs'));

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/register', function(req, res) {
  console.log('got request');
  console.log(req.body.userName);
  res.json({name: 'anton'});
});

app.post('/addStudent', function(req, res) {
  console.log('got request');
  console.log(req.body);
  res.json([...mockStudents, {
	name: 'Artem Pishalov',
	age: 20,
	senseiName: 'Yoda'
}]);/*{
    senseiName: 'Snoke',
	iq: 1,
	power: 'Very high ?',
	rank: 'Very old :P',
	skills: 'Stupid death master'
}*/
});

app.post('/updateStudent', function(req, res) {
  console.log('got request');
  console.log(req.body);
  res.json([...mockStudents, {
	name: 'Artem Krrutin',
	age: 15,
	senseiName: 'Alekseev PHAHAHA'
}]);
});

app.post('/deleteSensei', function(req, res) {
  console.log('got request');
  console.log(req.body);
  res.json([]);
});

app.post('/addSensei', function(req, res) {
  console.log('got request');
  console.log(req.body);
  res.json([...mockShinobies, {
	name: 'Shrek',
	missionsCompleted: 0,
	student: 'Kek'
}]);
});

app.post('/updateSensei', function(req, res) {
  console.log('got request');
  console.log(req.body);
  res.json([...mockShinobies, {
	name: 'Snoke',
	missionsCompleted: 34534,
	student: 'Ben Swolo 2.0'
}]);
});

app.post('/deleteStudent', function(req, res) {
  console.log('got request');
  console.log(req.body);
  res.json([]);
});

app.post('/addMission', function(req, res) {
  console.log('got request');
  console.log(req.body);
  res.json({name: 'Username*', isAdmin: true, missions: [...mockMissions, {
		id: 4,
		rank: 'D',
		price: '300 $',
		stage: 'Done',
		description: 'New added mission'
	}]});
});

app.post('/updateMission', function(req, res) {
  console.log('got request');
  console.log(req.body);
  res.json({name: 'Username*', isAdmin: true, missions: []});
});

app.post('/deleteMission', function(req, res) {
  console.log('got request');
  console.log(req.body);
  res.json({name: 'Username*', isAdmin: true, missions: []});
});

app.get('/user', function(req, res) {
    console.log('got user-request');
    console.log(req.query.username);
    res.json({name: 'Username*', isAdmin: true, missions: mockMissions});
});

app.get('/generateMissionsPdf', function(req, res) {
    console.log('got generate pdf request');
    res.json({generated: 'True'});
});

app.get('/generateMissionsExcel', function(req, res) {
    console.log('got generate excel request');
    res.json({generated: 'True'});
});

app.get('/generateMissionsCsv', function(req, res) {
    console.log('got generate csv request');
    res.json({generated: 'True'});
});

app.get('/initialRequest', function(req, res) {
    console.log('got initial request');
    res.json({
        senseis: mockShinobies,
        students: mockStudents,
        profiles: mockProfiles
    });
});

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
