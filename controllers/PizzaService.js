'use strict';

exports.addPizza = function(args, res, next) {
  /**
   * Add a new Pizza to the menu.
   * 
   *
   * body Pizza Pizza that should be added to the menu
   * no response value expected for this operation
   **/
  res.end();
}

exports.createTopping = function(args, res, next) {
  /**
   * Creates a new topping.
   * 
   *
   * pizzaId Long ID of pizza to update
   * body Topping Topping to be added to the pizza
   * no response value expected for this operation
   **/
  res.end();
}

exports.deletePizza = function(args, res, next) {
  /**
   * Deletes a Pizza
   * 
   *
   * pizzaId Long Id of pizza to delete.
   * no response value expected for this operation
   **/
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
  var examples = {};
  examples['application/json'] = {
  "size" : "Standard",
  "price" : 6.02745618307040320615897144307382404804229736328125,
  "name" : "aeiou",
  "id" : 0
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getPizzas = function(args, res, next) {
  /**
   * Returns all pizzas (their ids) on the menu.
   * 
   *
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ 0 ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
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
  var examples = {};
  examples['application/json'] = {
  "price" : 6.02745618307040320615897144307382404804229736328125,
  "name" : "Onions",
  "id" : 0
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.listToppings = function(args, res, next) {
  /**
   * Get the list of toppings for this pizza.
   * 
   *
   * pizzaId Long ID of pizza
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ 0 ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
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
  res.end();
}

