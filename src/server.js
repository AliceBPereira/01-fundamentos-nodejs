import http from 'node:http'

// Aplicaçoes em nodejs rodam em um servidor, entao precisamos criar um servidor para nossa aplicaçao.
// CommonJS  =>require 
// ESmodules  => import/ export

const server = http.createServer((request, response) => {
    return response.end('Hello World')
})

server.listen(3333) //porta onde o servidor vai rodar