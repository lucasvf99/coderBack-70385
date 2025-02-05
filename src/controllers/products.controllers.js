import productModel from "../models/productModel.js"



export const getProducts = async (req, res) => {
    try { 
        const limit = req.query.limit
        console.log(limit)
        const page = req.params.page
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

        console.log(products);
        
        res.status(200).render('templates/home', {products})
        
    } catch (error) {
        console.log(error)
        res.status(500).send('Error al traer productos')
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