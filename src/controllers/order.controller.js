const Order = require("../models/order.model")

const postOrder = async (req, res) => {
    try {
        const { name, place, cantidad,id_user } = req.body
        const order = new Order({ name, place, cantidad, id_user })
        await order.save()
        res.status(201).json(order)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.getAll()
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { postOrder, getAllOrders }