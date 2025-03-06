const bd = require("../configs/bd.config")

class Producto {
    constructor({nombre,descripcion,precio}){
        this.nombre = nombre
        this.descripcion = descripcion
        this.precio = precio
    }
    async save(){
        const connection = await bd.createConnection()
        const [result] = await connection.execute("INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)", [this.nombre, this.descripcion, this.precio])

        connection.end()

        if(result.insertId == 0){
            throw new Error("Producto was not created")
        }
        this.id_producto = result.insertId


    }
    static async getAll(){
        const connection = await bd.createConnection()
        const [result] = await connection.execute("SELECT * FROM productos")

        connection.end()

        if(result.length == 0){
            return null
        }

        return result.map(producto => new Producto(producto))
    }
}
module.exports = Producto