const db =require("../configs/bd.config")

class Order{
    constructor({id_order, name, place, cantidad,id_user}){
        this.id_order = id_order,
        this.name = name,
        this.place = place,
        this.cantidad = cantidad
        this.id_user = id_user
    }

    async save(){
        const connection = await db.createConnection()
        const [result] = await connection.execute("INSERT INTO orders (name, place, cantidad,id_user) VALUES (?, ?, ?, ?)", [this.name, this.place, this.cantidad,this.id_user])

        connection.end()

        if(result.insertId == 0){
            throw new Error("Order was not created")
        }
        this.id_order = result.insertId
    }

    static async getAll(){
        const connection = await db.createConnection()
        const [result] = await connection.execute("SELECT * FROM orders")

        connection.end()

        if(result.length == 0){
            return null
        }

        return result.map(order => new Order(order))
    }

    static async getById(id_order){
        const connection = await db.createConnection()
        const [result] = await connection.execute("SELECT * FROM orders WHERE id_order = ?", [id_order])

        connection.end()

        if(result.length == 0){
            return null
        }

        return new Order(result[0])
    }
    static async getTokenDeviceByIdUser(id_user){
        const connection = await db.createConnection()
        
        const [result] = await connection.execute("SELECT token FROM users WHERE id_user = ?", [id_user])
        
        connection.end()

        if(result.length == 0){
            return null
        }

        return result[0].token
    }
    
}
module.exports = Order