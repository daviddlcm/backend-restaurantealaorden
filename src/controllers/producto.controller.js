const Producto = require("../models/producto.model")

const postProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio } = req.body
        const producto = new Producto({ nombre, descripcion, precio })
        await producto.save()
        return res.status(201).json(producto)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const getAllProductos = async (req, res) => {
    try {
        const productos = await Producto.getAll()
        return res.status(200).json(productos)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
module.exports ={postProducto,getAllProductos}