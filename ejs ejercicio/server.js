const express = require('express');
const app = express();
const rutas = require('./routes/index.js')
const puerto = 8080;
const path = require('path')


//acceso al public
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')
app.use('/', rutas);

app.listen(puerto, () => {
    
        console.log(`El servidor está escuchando el puerto: ${puerto}`)

})