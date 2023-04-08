class ProductManager{
    
    constructor(){
        this.products=[]
    }

    addProduct(title,description,price,thumbnail,stock){
        let id
        if(this.products.length===0){
            id=1
        }else{
            id=this.products[this.products.length-1].id+1
        }
        this.products.push({title,description,price,thumbnail,id,stock})
    }

    getProductos(){
        console.log(this.products)
    }

    getProductById(id){
        let i = this.products.findIndex(p=>p.id === id);
        if(i>=0){
            console.log(this.products[i])
        }else{
            console.log("Not found")
        }
    }
}