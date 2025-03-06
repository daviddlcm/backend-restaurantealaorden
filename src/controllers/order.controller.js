const Order = require("../models/order.model")
const messaging = require("../configs/firebase.config")

const postOrder = async (req, res) => {
    try {
        const { name, place, cantidad,id_user } = req.body
        const order = new Order({ name, place, cantidad, id_user })
        await order.save()
        return res.status(201).json(order)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.getAll()
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const confirmOrder = async (req, res) => {
    try{
        const { id_order } = req.body
        const order = await Order.getById(id_order)
        if(order == null){
            throw new Error("Order not found")
        }
        const registrationToken  = await Order.getTokenDeviceByIdUser(order.id_user)
        
        if(registrationToken  == null){
            throw new Error("Token device not found")
        }

        const message ={
            notification: {
                title: "Orden confirmada",
                body: "Tu orden ha sido confirmada"
            },
            token: registrationToken
        }

        const response = await messaging.messaging().send(message)
        console.log("Successfully sent message:", response)

        return res.status(200).json({message: "Order confirmed"})
    }catch(error){
        return res.status(400).json({message: error.message})
    }
}

const sendOrder = async (req,res) => {
    try{
        const { id_order } = req.body
        const order = await Order.getById(id_order)
        if(order == null){
            throw new Error("Order not found")
        }
        const token_device = await Order.getTokenDeviceByIdUser(order.id_user)
        
        if(token_device == null){
            throw new Error("Token device not found")
        }

        const message ={
            notification: {
                title: "Orden enviada",
                body: "Tu orden ha sido enviada"
            },
            token: token_device
        }

        const response = await messaging.messaging().send(message)
        console.log("Successfully sent message:", response)

        return res.status(200).json({message: "Order sended"})

    }catch(error){
        return res.status(400).json({message: error.message})
    }
}

module.exports = { postOrder, getAllOrders,confirmOrder,sendOrder }