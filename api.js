const express = require('express');
const multer = require('multer');
const Productos = require('./productos');
const {Router} = express;
const app = express();
const router = Router();
const productos = new Productos();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname + '-' + Date.now());
    }
})
const upload = multer({storage: storage});

router.get('/', (req, res) => {
    try{
        res.status(200).json(productos.getAll());
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

router.get('/:id', (req, res) => {
    try{
        res.status(200).json(productos.getById(req.params.id));
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

router.post('/', upload.single('productThumbnail'),  (req, res) => {
    try{
        res.status(200).json(productos.storeProduct({...req.body, thumbnail: req.file.path}));
    }catch(err){
        res.status(400).json({error: err.message});
    }
})

router.put('/:id', (req, res) => {
    try{
        const nuevoProducto = {
            id:req.params.id,
            ...req.body
        };

        res.status(200).json(productos.updateProduct(nuevoProducto));
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

router.delete('/:id', (req, res) => {
    try{
        res.status(200).json(productos.deleteProduct(req.params.id));
    }catch(err){
        res.status(500).json({error: err.message});
    }
})

app.use('/api/productos', router);
const server = app.listen(PORT, () => console.log('Connected to port 8080...'));
server.on('error', error => console.log('Hubo un error: ', error));