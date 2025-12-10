import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { json } from '../src/middlewares/json.js'
import { Database } from './database.js'
// Aplicaçoes em nodejs rodam em um servidor, entao precisamos criar um servidor para nossa aplicaçao.
// CommonJS  =>require 
// ESmodules  => import/ export
const database = new Database()

const server = http.createServer(async(request, response) => {
    const { method, url } = request

    await json(request, response)

    if (method === 'GET' && url === '/users') {
        const users = database.select('users')
        return response
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        const { nome, email } = request.body

        const user ={
            id: randomUUID(),
            nome,
            email,
        }
        database.insert('users', user)

        return response.writeHead(201).end()
    }
    //Early return
    return response.writeHead(404).end('Not found')
})

server.listen(3333) //porta onde o servidor vai rodar