const fs=require("fs")
class ProductManager{
    
    constructor(path){
        this.products=[]
        this.path=path
        this.init(path)
    }

    init(path){
        let exists=fs.existsSync(path)
        if(!exists){
            fs.writeFileSync(path,'[]')
            console.log("Archivo creado")
        }else{
            this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
        }
    }

    async addProduct({title,description,price,thumbnail,stock}){
        try{
            let id
            if(this.products.length===0){
                id=1
            }else{
                id=this.products[this.products.length-1].id+1
            }
            this.products.push({title,description,price,thumbnail,id,stock})
            let dataJSON=JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,dataJSON)
            console.log("Producto Agregado")
        }catch(error){
            console.log("Error al agregar producto",error)
        }
    }

    async getProducts(){
        try{
            await fs.promises.readFile(this.path,"utf-8")
            .then(res=>console.log(JSON.parse(res)))
            .catch(error=>console.log(error))
        }catch(error){
            console.log(error)
        }
    }

    async getProductById(id){
        await fs.promises.readFile(this.path,"utf-8")
            .then(res=>{
                    const products=JSON.parse(res)
                    let i = products.findIndex(p=>p.id === id);
                    if(i>=0){
                        console.log(products[i])
                    }else{
                        console.log("Producto no existente")
                    }
            })
            .catch(error=>console.log(error))
    }

    async updateProduct(id,data){
        try{
            let i = this.products.findIndex(p=>p.id === id);
            if(i>-1){
                this.products[i]=data
                let dataJSON = JSON.stringify(this.products,null,2)
                await fs.promises.writeFile(this.path,dataJSON)
                    .then(console.log("Producto Actualizado"))
                    .catch(error=>console.log(error))
            }else{
                console.log("Producto no encontrado para eliminar")
            }
        }catch(error){
            console.log("Error al actualizar producto",error)
        }
    }

    async deleteProduct(id){
       try{
            let i = this.products.findIndex(p=>p.id === id);
            if(i!==-1){
                this.products=this.products.filter(p=>p.id!==id)
                let dataJSON = JSON.stringify(this.products,null,2)
                await fs.promises.writeFile(this.path,dataJSON)
                console.log("Producto Eliminado")
            }else{
                console.log("Producto no existente")
            }
       }catch(error){
            console.log(error)
        }
    }
}

/*let usuario = new ProductManager("./productManager.js")
usuario.addProduct({title:"Alfajores",description:"descripcion",price:20,thumbnail:"url",stock:4})
usuario.addProduct({title:"Alfajores",description:"descripcion",price:23,thumbnail:"url",stock:3})
usuario.getProducts()
usuario.getProductById(1)
usuario.updateProduct(2,{
    "title": "Alfajores",
    "description": "nueva descripcion",
    "price": 20,
    "thumbnail": "url",
    "id": 2,
    "stock":4
})
usuario.deleteProduct(2)


Precondicion de updateProduct: Especificar todos los campos ya que no me salio poder cambiar solo uno.
*/



