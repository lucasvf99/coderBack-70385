import cartModel from '../models/cartModel.js'
import productModel from '../models/productModel.js'
import ticketModel from '../models/ticketModel.js'

export const getCart = async (req,res) => {
    try {
        const cId = req.params.cId
        const cart = await cartModel.findOne({_id: cId})

        let totalAmount = 0
        for(let prod of cart.products){
            let producto = await productModel.findById(prod.id_prod)
            if(producto){
                totalAmount += Math.round(producto.price * prod.quantity)
            }
        }

        if(cart){
            res.status(200).render('templates/cart', {
            cart,
            url_js: '/js/cartCheckout.js',
            url_css: '/css/cart.css',
            totalAmount
                })
        }else{
            res.status(404).send('No se encontro el carrito')
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al cargar carrito')
    }
}


export const createCart = async (req, res) => {
    try {
        const cart = await cartModel.create({products: []})
        if(cart){
            res.status(200).send(cart)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al crear carrito')
    }
}

export const insertProductCart = async (req,res) => {
    try {
        const cId = req.params.cId
        const pId = req.params.pId
        const {quantity} = req.body
        const cart = await cartModel.findById({_id:cId})

        if(cart){
            const indice = cart.products.findIndex(el => el.id_prod._id.toString() === pId) 
            if(indice != -1){
                    cart.products[indice].quantity += quantity
                }else{
                    cart.products.push({id_prod: pId, quantity:quantity})
                }

            const rta = await cartModel.findByIdAndUpdate(cId, cart)
            res.status(200).send({message: 'Producto agregado', cart : cart })

        }else{
            res.status(404).send('Carrito no existe')
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Error"})
    }
}

export const updateProductCart = async (req,res) => {
    try {
        const cId = req.params.cId
        const {newProduct} = req.body
        const cart = await cartModel.findById({_id:cId})
        
        cart.products = newProduct
        cart.save()
        res.status(200).send(cart)

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al cargar producto')
    }
}

export const updateQuantityProduct = async (req,res) => {
    try {
        const cId = req.params.cId
        const pId = req.params.pId
        const {quantity} = req.body
        const cart = await cartModel.findById({_id:cId})
        if(cart){
            const indice = cart.products.findIndex(el => el.id_prod == pId)
                if(indice != -1){
                    cart.products[indice].quantity = quantity
                    cart.save()
                    res.status(200).send(cart)
                }else{
                    res.status(404).send('Producto no encontrado')
                }
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al cambiar cantidad')
    }
}

export const checkout = async (req,res) => {
    try {
        const cId = req.params.cId
        const cart = await cartModel.findById(cId)
        let productStockNull = []
        if(cart && cart.products.length > 0){
            for(const prod of cart.products){
                let producto = await productModel.findById(prod.id_prod)
                if(producto.stock - prod.quantity < 0){
                    productStockNull.push(producto.id)
                }
            }
            if(productStockNull.length ===  0){
                
                let totalAmount = 0
                for(let prod of cart.products){
                    console.log(prod.id_prod)
                    let producto = await productModel.findById(prod.id_prod)
                    if(producto){
                        producto.stock -= prod.quantity
                        totalAmount += Math.round(producto.price * prod.quantity)
                        await producto.save()
                    }
                }

                const newTicket = await ticketModel.create({
                    code: crypto.randomUUID(),
                    purchaser: req.user.email,
                    amount: totalAmount,
                    products: cart.products
                })

                await cartModel.findByIdAndUpdate(cId, {products: []})
                res.status(200).send({tiket: newTicket, render: '/', productsNull: productStockNull})
            }else{
                productStockNull.forEach((prodId) => {
                    let indice = cart.products.findIndex(prod => prod.id == prodId)
                    cart.products.slice(indice,1)
                })
                await cartModel.findByIdAndUpdate(cId, {
                    products: cart.products
                })
                res.status(400).send(productStockNull)

            }
        }else{
            res.status(404).send({message: 'Carrito vacio'})
        }
        
    } catch (e) {
        console.log(e)
        res.status(500).send('Error al terminar compra')
    }
} 

export const deleteProductCart = async (req,res) => {
    try {
        const cId = req.params.cId
        const pId = req.params.pId

        const cart = await cartModel.findOne({_id: cId})

        if(cart){
            const indice = cart.products.findIndex(prod => prod.id_prod._id.toString() ===  pId)
            if(indice != -1){
                cart.products.splice(indice,1)
                const response = await cartModel.findByIdAndUpdate(cId, cart)
                res.status(200).send({message: 'Producto Eliminado', cart: cart})
            }else{
                res.status(404).send({message: 'El producto no existe'})
            }
        }else{
            res.status(404).send({message: 'El carrito no existe'})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al eliminar carrito')
    }
}

export const deletCart = async (req,res) => {
    try {
        const cId = req.params.cId
        const cart = await cartModel.findOne({_id: cId})
        if(cart){
            cart.products = []
            const response = await cartModel.findByIdAndUpdate(cId, cart)
            res.status(200).send({message: 'Carrito vacio', cart: cart})
        }else{
            res.status(404).send({message:'Carrito no existe'})
        }   
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar carrito')
    }
}