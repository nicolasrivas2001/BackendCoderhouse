import express from "express"
import carrito from "Entrega3.js"

let server = express()
let PORT = 8080
let ready =()=>console.log("Server ready on port" +PORT)

server.listen(PORT,ready)
server.use(express.urlencoded({entended:true}))

let rutaIndex="/"
let indexFunction=(req,res)=>{
    let productos=carrito.getProductos()
    return res.send(productos)
}
server.get(rutaIndex,indexFunction)


let rutaProductos="/api/products"
let getProducts=(req,res)=>{
    let cantidad=req.query.cantidad ?? 5
    let productos=carrito.getProducts.slice(0,cantidad)
    return res.send({
        succes:true,
        response:productos
    })
}
server.get(rutaProductos,getProducts)

let rutaProductosId="/api/products/:id"
let getProductsById=(req,res)=>{
    let parametros=request.parametros
    let id=parametros.id
    const producto=carrito.getProductsById(id)
    if(producto){
        return res.send({
            succes:true,
            response:{producto}
        })
    }else{
        return res.send({
            succes:false,
            response:{}
        })
    }
}
server.get(rutaProductosId,getProductsById)


