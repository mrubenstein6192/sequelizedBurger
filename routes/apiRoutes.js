var db = require("../models");

module.exports = app => {

  app.get("/api/burgers", function (req, res) {
    db.Burger.findAll({})
      .then(dbBurgerData => res.json(dbBurgerData))
      .catch(err => {
        console.log(err);
        res.jason(err);
      });
  });

  app.post("/api/burgers", function (req, res) {
    db.Burger.create(req.body)
      .then(dbBurgerData => res.json(dbBurgerData))
      .catch(err => {
        console.log(err);
        res.jason(err);
      });
  })

  app.get("/api/burgers/:id", function(req, res) {
    db.Burger.findAll({
      where: {
        id: req.params.id
      }
    })
      .then(dbBurgerData => res.json(dbBurgerData))
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });
  
  app.put("/api/burgers/:id", function (req, res) {
    db.Burger.update( {ready: req.body.ready}, {
        where: {
          id: req.params.id
        }
      })
      .then(dbBurgerData => res.json(dbBurgerData))
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });

app.delete("/api/burgers/:id", function(req, res) {
  db.Burger.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(function(dbBurgerData){
    res.json(dbBurgerData);
  });
})

}

