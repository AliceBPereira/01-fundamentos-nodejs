import http from 'node:http'

// Aplicaçoes em nodejs rodam em um servidor, entao precisamos criar um servidor para nossa aplicaçao.
// CommonJS  =>require 
// ESmodules  => import/ export
const users = []

const server = http.createServer(async(request, response) => {
    const { method, url } = request

    const buffers = []

    for await (const chunk of request){
        buffers.push(chunk)
    }

    try{
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    }catch{
        request.body = null
    }

    if (method === 'GET' && url === '/users') {
        return response
            .setHeader('Content-type', 'aplication/json')
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