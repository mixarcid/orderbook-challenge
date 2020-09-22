var Order = require("./order.js");
var fs = require('fs');

class Exchange {
    constructor() {
	this.lastId = 0;
	this.buyOrders = []; //active buy orders
	this.sellOrders = []; //active sell orders
	this.allOrders = []; //gotta keep track of the old orders too
	this.saveFileName = 'orders.json';
    }

    saveFile(fileName) {
	fs.writeFileSync(fileName, JSON.stringify(this.allOrders));
    }

    sync(fileName) {
	//would do this async but no callback is given to the sync function
	const data = fs.readFileSync(fileName).toString();
	const orders = JSON.parse(data);
	this.lastId = orders.length;
	this.allOrders = [];
	for (var order of orders) {
	    order = new Order(order.id, order.isBuyOrder, order.quantity,
			      order.price, order.executedQuantity);
	    if (order.availableQuantity() > 0) {
		if (order.isBuyOrder) {
		    this.addBuyOrder(order);
		} else {
		    this.addSellOrder(order);
		}
	    }
	    this.allOrders.push(order);
	}
    }

    trade(buy, sell) {
	var quant = Math.min(sell.availableQuantity(), buy.availableQuantity());
	sell.executedQuantity += quant;
	buy.executedQuantity += quant;
    }

    //ensure buy orders are descending by price
    addBuyOrder(order) {
	var index;
	for (index=0; index<this.buyOrders.length; ++index) {
	    if (order.price > this.buyOrders[index].price) break;
	}
	this.buyOrders.splice(index, 0, order);
    }

    //sells are descending by price
    addSellOrder(order) {
	var index;
	for (index=0; index<this.sellOrders.length; ++index) {
	    if (order.price < this.sellOrders[index].price) break;
	}
	this.sellOrders.splice(index, 0, order);
    }
    
    buy(quantity, price) {
	var order = new Order(this.lastId++, true, quantity, price);
	this.allOrders.push(order);
	
	for (var sell of this.sellOrders) {
	    if (sell.price <= order.price) {
		this.trade(order, sell);
		if (order.availableQuantity() == 0) break;
	    }
	}

	this.sellOrders = this.sellOrders.filter((sell) => sell.availableQuantity() > 0);
	
	if (order.availableQuantity() > 0) {
	    this.addBuyOrder(order);
	}
	this.saveFile(this.saveFileName);
	return order;
    }

    sell(quantity, price) {
	var order = new Order(this.lastId++, false, quantity, price);
	this.allOrders.push(order);

	for (var buy of this.buyOrders) {
	    if (order.price <= buy.price) {
		this.trade(buy, order);
		if (order.availableQuantity() == 0) break;
	    }
	}

	this.buyOrders = this.buyOrders.filter((buy) => buy.availableQuantity() > 0);
	
	if (order.availableQuantity() > 0) {
	    this.addSellOrder(order);
	}

	this.saveFile(this.saveFileName);
	return order;
    }

    getQuantityAtPrice(price) {
	var num = 0;
	for (var sell of this.sellOrders) {
	    if (sell.price > price) break;
	    num += sell.availableQuantity();
	}
	for (var buy of this.buyOrders) {
	    if (buy.price < price) break;
	    num += buy.availableQuantity();
	}
	return num;
    }

    getOrder(id) {
	return this.allOrders[id];
    }
}

module.exports = Exchange;
