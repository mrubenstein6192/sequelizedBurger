//import our connection
const connection = require('./connection');

// create a function that reads from the burgers table
// SELECT * FROM burgers
const findAll = () => {
  // create a new Promise
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM burgers', function(err, dbBurgerData) {
      if (err) {
        // this will throw to a .catch()
        return reject(err);
      }
      // this will throw to a .then()
      return resolve(dbBurgerData);
    });
  });
};

// find a burger by id
// SELECT * FROM burger WHERE id = ?
const findById = burgerId => {
  // create a new Promise
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM burgers WHERE id = ?', [burgerId], function(err, dbBurgerData) {
      if (err) {
        // this will throw to a .catch()
        return reject(err);
      }
      // this will throw to a .then()
      return resolve(dbBurgerData);
    });
  });
};

// CREATE/INSERT
// INSERT INTO burgers SET ? ({name: "burgerName"})
const create = burgerDataObj => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO burgers SET ?", [burgerDataObj], function(err, dbBurgerData) {
      if (err) {
        // this will throw to a .catch()
        return reject(err);
      }
      // this will throw to a .then()
      return resolve(dbBurgerData);
    });
  });
};

// UPDATE burgers (set value of "ready" to true or false)
// UPDATE burger SET burger = ? WHERE id = ? ([true, 2])
const update = (readyValue, burgerId) => {
  return new Promise((resolve, reject) => {

    // set readyValue to boolean true/false
    readyValue = (readyValue === "true") 
      ? true : false;

    connection.query("UPDATE burgers SET ready = ? WHERE id = ?", [readyValue, burgerId], function(err, dbBurgerData) {

      if (err) {
        return reject(err);
      }
      else if (dbBurgerData.changedRows === 0) {
        return reject({message: "You probably have the wrong ID"});
      }
      else {
        return resolve(dbBurgerData);
      }
    })
  })
}

// DELETE a burger
// DELETE FROM burgers WHERE id = ?
const remove = (burgerId) => {
  return new Promise((resolve, reject) => {

    connection.query("DELETE FROM burgers WHERE id = ?", [burgerId], function (err, dbBurgerData) {

      if (err) {
        return reject(err);
      }
      else if (dbBurgerData.affectedRows === 0) {
        return reject({ message: "You probably have the wrong ID" });
      }
      else {
        return resolve(dbBurgerData);
      }
    })
  })
}

// export all of our new functions as methods of an object
module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};
