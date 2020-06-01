class Order {
    constructor(id,items,totalAmount,date){
        this.id = id
        this.items = items
        this.totalAmount = Number.parseFloat(totalAmount).toFixed(2)
        this.date = date
    }

}

export default Order