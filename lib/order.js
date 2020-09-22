class Order {

    constructor(id, isBuyOrder, quantity, price, executedQuantity=0) {
	this.id = id;
	this.isBuyOrder = isBuyOrder;
	this.quantity = quantity;
	this.price = price;
	this.executedQuantity = executedQuantity;
    }

    availableQuantity() {
	return this.quantity - this.executedQuantity;
    }
    
}

module.exports = Order;
