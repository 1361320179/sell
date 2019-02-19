var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);

var appData = require('./data.json')
var seller = appData.seller
var goods = appData.goods
var ratings = appData.ratings
var apiRoutes = express.Router()
app.use('/api', apiRoutes)

app.get('/api/seller', (req, res) => {
  res.json({
    errno: 0,
    data: seller
  })
})
app.get('/api/goods', (req, res) => {
  res.json({
    errno: 0,
    data: goods
  })
})
app.get('/api/ratings', (req, res) => {
  res.json({
    errno: 0,
    data: ratings
  })
})

app.use(express.static('./dist'));

module.export = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n');
})

