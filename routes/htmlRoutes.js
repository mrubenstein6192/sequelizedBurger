var db = require("../models");

module.exports = (app) => {
  
  app.get("/", function(req, res){

    db.Burger.findAll()
      .then(dbBurgerData => {
        res.render("index", {burgerData: dbBurgerData})
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });
}