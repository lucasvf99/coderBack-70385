import producModel from "../models/productModel.js"



export const getProducts = async (req, res) => {
    try {
        const {limit, page, filter, metFilter, metOrder, ord} = req.body
        const pag = page !== undefined ? page : 1 // si page es distinto de undifined, consulto pagina, si no es 1 
        const lim = limit !== undefined ? limit : 10
                                                //category : 'lacteo'
        const filQuery =  metFilter !== undefined ?  {[metFilter]: filter} : {} // permite filtrar por el atributo que quiera
        const ordQuery = metOrder !== undefined ? {metOrder: ord} : {} // ordenar por precio 

        const prods = await producModel.paginate(filQuery, {limit: lim, page: pag, ordQuery, lean: true})
        // console.log(prods);

        prods.pageNumbers = Array.from({length: prods.totalPages}, (_,i)=> ({
            number: i +1 ,
            isCurrent: i + 1 === prods.page
        })) //para visualizar
        
        res.status(200).render('templates/home', {prods})
    } catch (error) {
        console.log(error)
        res.status(404).send('Error al mostrar Productos')
    }
}