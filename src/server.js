import http from 'node:http'
import { json } from '../src/middlewares/json.js'

// Aplicaçoes em nodejs rodam em um servidor, entao precisamos criar um servidor para nossa aplicaçao.
// CommonJS  =>require 
// ESmodules  => import/ export
const users = []

const server = http.createServer(async(request, response) => {
    const { method, url } = request

    await json(request, response)

    if (method === 'GET' && url === '/users') {
        return response
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        const { nome, email } = request.body

        users.push({
            id: 1,
            nome,
            email,
        })

        return response.writeHead(201).end()
    }
    //Early return
    return response.writeHead(404).end('Not found')
})

server.listen(3333) //porta onde o servidor vai rodar