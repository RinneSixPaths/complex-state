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
	description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like'
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

app.get('/generateMissionsExel', function(req, res) {
    console.log('got generate exel request');
    res.json({generated: 'True'});
});

app.get('/generateMissionsCsv', function(req, res) {
    console.log('got generate csv request');
    res.json({generated: 'True'});
});

app.listen(3000, function(err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
