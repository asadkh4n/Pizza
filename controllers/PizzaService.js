'use strict';
var low	= require('lowdb');
const db = low('pizzaFile.json');

function uuid() {
	return Math.floor(Math.random()*(999-100+1)+100);
}

exports.addPizza = function(args, res, next) {
  /**
   * Add a new Pizza to the menu.
   * 
   *
   * body Pizza Pizza that should be added to the menu
   * no response value expected for this operation
   **/
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;

  var result = db.get('pizzas')
	  .push({ id: uuid(), text: args.body.value.name, size: args.body.value.size, price: args.body.value.price })
	  .value()
  res.end(JSON.stringify(result));
}

exports.createTopping = function(args, res, next) {
  /**
   * Creates a new topping.
   * 
   * pizzaId Long ID of pizza to update
   * body Topping Topping to be added to the pizza
   * no response value expected for this operation
   **/
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 201;

  var result = db.get('toppings')
	  .push({id: uuid(), name: args.body.value.name, price: args.body.value.price, pizzaId: args.pizzaId.value})
	  .value()
  res.end(JSON.stringify(result));
}

exports.deletePizza = function(args, res, next) {
  /**
   * Deletes a Pizza
   * 
   *
   * pizzaId Long Id of pizza to delete.
   * no response value expected for this operation
   **/
  if(args.pizzaId.value === '') {
    res.statusCode = 500;
    res.end('ID Required');
 }
 res.setHeader('Content-Type', 'application/json');
 res.statusCode = 204;
 db.get('pizzas')
   .remove({ id: args.pizzaId.value })
   .value()
   res.end("deleted");
 res.end();
}

exports.deleteToppingById = function(args, res, next) {
  /**
   * Delete topping by ID
   * Deletes the topping with the given ID.
   *
   * pizzaId Long ID of the pizza.
   * toppingId Long ID of the topping.
   * no response value expected for this operation
   **/
  if(args.toppingId.value === '') {
    res.statusCode = 500;
    res.end('ID Required');
 }
 res.setHeader('Content-Type', 'application/json');
 res.statusCode = 204;
 db.get('toppings')
   .remove({ id: args.toppingId.value })
   .value()
   res.end("deleted");
 res.end();
}

exports.getPizzaById = function(args, res, next) {
  /**
   * Get pizza by ID
   * Returns a single Pizza
   *
   * pizzaId Long ID of pizzas
   * returns Pizza
   **/
  if(args.pizzaId.value === '') {
    res.statusCode = 500;
    res.end('ID Required');
 }
 res.setHeader('Content-Type', 'application/json');
 res.statusCode = 200;
 res.end(JSON.stringify(db.get('pizzas').find({ id: args.pizzaId.value }).value()));
}

exports.getPizzas = function(args, res, next) {
  /**
   * Returns all pizzas (their ids) on the menu.
   * 
   *
   * returns List
   **/
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.end(JSON.stringify(db.get('pizzas').map((pizza) => { return pizza.id; })));
}

exports.getToppingById = function(args, res, next) {
  /**
   * Find topping by ID
   * Returns the topping with the given ID.
   *
   * pizzaId Long ID of the pizza.
   * toppingId Long ID of the topping.
   * returns Topping
   **/
  if(args.pizzaId.value === '') {
    res.statusCode = 500;
    res.end('ID Required');
 }
 res.setHeader('Content-Type', 'application/json');
 res.statusCode = 200;
 res.end(JSON.stringify(db.get('toppings')
 .filter({ id: args.toppingId.value, pizzaId:args.pizzaId.value })
 .map((topping) => {return _objectWithoutProperties(topping, ['pizzaId'])}).value()[0]));
}

//this function removes a certain property and returns the remaining object
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.listToppings = function(args, res, next) {
  /**
   * Get the list of toppings for this pizza.
   * 
   * pizzaId Long ID of pizza
   * returns List
   **/
  if(args.pizzaId.value === '') {
    res.statusCode = 500;
    res.end('ID Required');
 }
 res.setHeader('Content-Type', 'application/json');
 res.statusCode = 200;
 res.end(JSON.stringify(db.get('toppings').filter({pizzaId: args.pizzaId.value}).map((topping) => { return topping.id; }).value()));
}

exports.updatePizza = function(args, res, next) {
  /**
   * Update an existing pizza
   * 
   *
   * body Pizza Pizza that should be modified
   * pizzaId Long ID of pizzas
   * no response value expected for this operation
   **/
  if(args.pizzaId.value === '') {
    res.statusCode = 500;
    res.end('ID Required');
 }
 res.setHeader('Content-Type', 'application/json');
 res.statusCode = 201;
 var result = db.get('pizzas')
   .find({ id: args.pizzaId.value })
   .assign({name: args.body.value.name, size: args.body.value.size, price: args.body.value.price})
   .value()
 res.end(JSON.stringify(result));
}

