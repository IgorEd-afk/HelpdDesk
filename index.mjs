//Imports
    import express from 'express'
    import {engine} from 'express-handlebars'
    import bodyparser from 'body-parser'
    import empresa from './routes/emoRouter.mjs'
    import path from 'path'
    import { fileURLToPath } from 'url'
    import session from 'express-session'
    import flash from 'connect-flash'
    const app = express()

//Configurações
    //Session
        app.use(session({
            secret: 'nodejs',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
        
    //Middleware
        app.use(function(req,res,next){
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg') 
            res.locals.error = req.flash('error')
            next()
        })
    //BodyParser
        app.use(bodyparser.urlencoded({extended:true}))
        app.use(bodyparser.json())

    //Handlebars
        app.engine('handlebars', engine({
            defaultLayout: 'main',
            runtimeOptions: {
              allowProtoPropertiesByDefault: true,
              allowProtoMethodsByDefault: true,
            },
          }))
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