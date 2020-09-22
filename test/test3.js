var assert = require('assert');
var Exchange = require('../lib/index.js');

var exchange = new Exchange();

//Tests example from Readme using getQuantityAtPrice

exchange.buy(10, 2);
exchange.buy(5, 3);
exchange.sell(50, 8);
exchange.sell(5, 12);
exchange.buy(51, 9);

assert(exchange.getQuantityAtPrice(9) == 1);
