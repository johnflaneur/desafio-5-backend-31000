const { Router } = require('express');
const router = Router();
const productos = [{
        "title": "Shampoo Sólido Natural",
        "price": 600,
        "thumbnail": "https://cdn.eldoce.tv/sites/default/files/styles/site_nota_slider_contenido/public/nota/2020/07/10/shampoo-solido.jpg?itok=Hs14Y5ry",
        "id": 1
    },
    {
        "title": "Jabón Vegano",
        "price": 375,
        "thumbnail": "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/042/350/products/jabon-avena1-1e695443afc399ad1a16212831536377-1024-1024.jpg",
        "id": 2
    },
    {
        "title": "Agua Micelar",
        "price": 250,
        "thumbnail": "http://d3ugyf2ht6aenh.cloudfront.net/stores/808/161/products/agua-micelar1-13e679e0f36d80ab2e15780643518946-640-0.jpg",
        "id": 3
    }
]

//get
router.get('/', (req, res) => {
    
    try{
        res.render('listado', {productos});
    }catch(error){
        console.log('Error, no se puede mostar los productos solicitados :: ',error)
    }
})



//post
router.post('/', (req, res) => {
    
try {
    const {
        title,
        price,
        thumbnail
    } = req.body
    let ultimo = productos.length - 1;
    let id = productos[ultimo].id + 1;
    productos.push({
        id,
        title,
        price,
        thumbnail
    });
    res.redirect('/')
}catch(error){
    console.log('Error con la solicitud.', error)
    res.sendStatus(500)
}
})


//get
router.get('/:id', (req, res) => {
    
   try { 
    let encontrado = productos.find(producto => producto.id == req.params.id);
    encontrado ? res.json(encontrado) : res.json({error: 'ID INVALIDO'})
    } catch(error) {
        console.log('Error con el método GET, ', error)
    }
    })

 


//put
router.put('/:id', (req, res) => {
try{
    const id = Number(req.params.id);
    const index = productos.findIndex(producto => producto.id === id)
    const oldProd = productos[index]

  
    if (productos.find((prod) => prod.id === id)) {
      productos[index] = req.body;
      productos[index].id = id;

      res.json(
        `${JSON.stringify(oldProd)}   ha sido actualizado a:  ${JSON.stringify(
          productos[index]
        )}`
      );
    } else {
      res.json(`El producto con el id: ${id} no existe`);
    }
}catch(error){
    console.log('Error reciente en el PUT ')
}
})


//delete
router.post('/eliminar/:id', (req, res) =>{
    
    try{
    const index = productos.findIndex((producto) => {
        return producto.id == req.params.id;
    });
    if (index === -1) {
        res.status(404)
    } else {
        productos.splice(index, 1);
        res.redirect('/productos')
    }
    }catch(error){
        console.log('Error con el método DELETE')
    }
})

module.exports = router;