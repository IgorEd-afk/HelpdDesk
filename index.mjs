//Imports
    import express from 'express'
    import {engine} from 'express-handlebars'
    import bodyparser from 'body-parser'
    import empresa from './routes/emoRouter.mjs'
    import path from 'path'
    import { fileURLToPath } from 'url'
    const app = express()

//Configurações
    //BodyParser
        app.use(bodyparser.urlencoded({extended:true}))
        app.use(bodyparser.json())

    //Handlebars
        app.engine('handlebars', engine())
        app.set('view engine', 'handlebars')
        app.set('views', './views')
    
    //Pasta public
        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        app.use(express.static(path.join(__dirname,'public')))

//Rotas
    app.get('/',(req,res)=>{
        res.render('teste')
    })

    app.use('/emp',empresa)
//Localhost
    app.listen(3000,()=>{
        console.log('ouvindo em localhost:3000')
    })