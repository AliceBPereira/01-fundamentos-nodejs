import http from 'node:http'

// Aplicaçoes em nodejs rodam em um servidor, entao precisamos criar um servidor para nossa aplicaçao.
// CommonJS  =>require 
// ESmodules  => import/ export
const users = []

const server = http.createServer((request, response) => {
    const { method, url } = request
    console.log(request.headers)

    if (method === 'GET' && url === '/users') {
        return response
            .setHeader('Content-type', 'aplication/json')
            .end(JSON.stringify(users))
    }

    if (method === 'POST' && url === '/users') {
        users.push({
            id: 1,
            name: 'Alicia',
            email: 'alicia@example.com'
        })

        return response.writeHead(201).end()
    }
    //Early return
    return response.writeHead(404).end('Not found')
})

server.listen(3333) //porta onde o servidor vai rodar