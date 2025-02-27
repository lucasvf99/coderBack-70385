import productModel from "../models/productModel.js"



export const getProducts = async (req, res) => {
    try { 
        const limit = req.query.limit
        const page = req.query.page
        const {filter, metFilter, metOrder, ord } = req.body
        const pag = page !== undefined ? page : 1
        const lim = limit !== undefined ? limit : 10
       

        const filQuery = metFilter !== undefined ? {[metFilter]: filter} : {}
        const ordQuery = metOrder !== undefined ? {metOrder: ord} : {}

        const products = await productModel.paginate(filQuery, {
            limit: lim,
            page: pag, 
            ordQuery, 
            lean:true ,
            select: 'title description category price stock code thumbnails'
        })

        
        products.pageNumbers = Array.from({length: products.totalPages}, (_, i) => ({
            number: i + 1 ,
            isCurrent: i + 1 === products.page
        }))

        res.status(200).render('templates/home', {
        products,
        url_js:"/js/cart.js",
        url_css: "css/home.css"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al traer productos')
    }
}

export const getProduct = async (req,res) => {
    try {
        const pId = req.params.pId
        const product = await productModel.findById({_id: pId}).lean()
        if(product){
            res.status(200).render('templates/product', {
                product,
                url_js: "/js/cart.js"
            })
        }else{
            res.status(404).send('Producto no encontrado')
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send('No se pudo encontrar el producto')
    }
}

export const updateProduct = async (req,res) => {
    try {
        const pId = req.query.pId
        const updateProduct = req.body

        const product = await productModel.findByIdAndUpdate(pId, updateProduct)

        if(product){
            res.status(200).redirect('templates/home', {product})
        }else{
            res.status(404).send('Producto no encontrado')
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar producto')
    }
}

export const deleteProduct = async (req,res) => {
    try {
        const pId = req.query.pId
        const rta = await productModel.findByIdAndDelete(pId)
        if(rta){
            res.status(200).send('Producto eliminado')
        }else{
            res.status(404).send('Producto no encontrado')
        }        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar producto')
    }
}

export const createProduct = async (req,res) => {
    try {
            if(!(req.body  == {})){
                const product = req.body
                await productModel.create(product)
                res.status(200).send('Producto creado')
            }else{
                res.status(400).send('Faltan datos')
            }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}