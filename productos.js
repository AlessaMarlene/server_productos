module.exports = class Productos{
    constructor(){
        this.productos = [];
        this.id = 0;
    }

    getAll(){
        if(this.productos.length < 1) throw new Error('No hay productos almacenados');
        
        return this.productos;
    }

    getById(id){
        const producto = this.productos.find(p => p.id == id);

        if(!producto) throw new Error('Producto no encontrado');

        return producto;
    }

    storeProduct(producto){
        if(!producto || !Object.keys(producto).length === 3) throw new Error('Producto inválido');

        this.productos.push({id: ++this.id, ...producto});

        return this.productos[this.productos.length - 1];
    }

    updateProduct(producto){
        if(!Object.keys(producto).length === 4) throw new Error('Producto inválido');
        
        if(!this.productos.some(p => p.id == producto.id)) throw new Error('Producto no encontrado');

        for(let i = 0; i < this.productos.length; i++){
            if(this.productos[i].id == producto.id) this.productos[i] = producto;
        }
    }

    deleteProduct(id){
        if(!this.productos.some(p => p.id == id)) throw new Error('Producto no encontrado');

        this.productos = this.productos.filter(p => p.id != id);
    }
}