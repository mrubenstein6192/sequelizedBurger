// requires all important packages
const express = require('express');
const exphbs = require('express-handlebars');

// initalize express
const app = express();

// use deployed port if deployed otherwise use local port 3000
const PORT = process.env.PORT || 3000;

var db = require("./models");

// use middleware for information passing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make public folder static 
app.use(express.static("public"));

// set up handlebars and allow views
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// bring in routes
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);

// catch all for errors and missed inputs
app.get('*', function(req, res) {
  res.json({
    status: 404,
    message: "Page not found!"
  });
});

// initialize server
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});