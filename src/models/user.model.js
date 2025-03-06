require("dotenv").config()

const db = require("../configs/bd.config")

class User{
    constructor({id_user, username,email,password,nombre,token}){
        this.id_user = id_user,
        this.email = email,
        this.password = password
        this.username = username
        this.nombre = nombre
        this.token = token
    }

    async save(){
        const connection = await db.createConnection()
        const [result] = await connection.execute("INSERT INTO users (username,email,password,nombre,token) VALUES (?,?,?,?,?)", [this.username,this.email,this.password,this.nombre,this.token])

        connection.end()

        if(result.insertId == 0){
            throw new Error("User was not created")
        }
        this.id_user = result.insertId
    }

    static async findByEmail(username){
        const connection = await db.createConnection()
        const [result] = await connection.execute("SELECT * FROM users WHERE username = ?", [username])

        connection.end()

        if(result.length == 0){
            return null
        }

        return new User(result[0])
    }
    static async getAll(){
        const connection = await db.createConnection()
        const [result] = await connection.execute("SELECT * FROM users")

        connection.end()

        if(result.length == 0){
            return null
        }

        return result.map(user => new User(user))
    }
    
    static async findById(id_user){
        const connection = await db.createConnection()
        const [result] = await connection.execute("SELECT * FROM users WHERE id_user = ?", [id_user])

        connection.end()

        if(result.length == 0){
            return null
        }

        return new User(result[0])
    }


}

module.exports = User