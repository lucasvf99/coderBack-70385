



export const getProducts = (req, res) => {
    try {
        res.status(200).render('templates/home', {})
    } catch (error) {
        console.log(error)
        res.status(404).send('Error al mostrar Productos')
    }
}