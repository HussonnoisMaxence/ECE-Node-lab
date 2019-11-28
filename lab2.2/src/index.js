var express = require('express');

var app = express();
var metrics = require('./metrics')
var path = require('path')

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', __dirname + "/views")
app.set('view engine', 'ejs');
app.set('metrics')

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil');
});
app.get(
  '/hello/:name', 
  (req, res) => res.render('hello.ejs', {name: req.params.name})
)
app.get('/metrics.json', (req, res) => {
  metrics.get((err, data) => {
    if(err) throw err
    res.status(200).json(data)
  })
})

app.listen(8080);