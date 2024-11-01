//Imports
    import express from 'express'
    import * as Empresa from '../controllers/empController.mjs'
    import Ocorrencia from '../models/ocorrenciaModel.mjs'
    const router = express.Router()

//Rotas
    router.get('/register',(req,res)=>{
        res.render('src/emp/registro')
    })

    router.post('/registering',async(req,res)=>{
        const dados = await req.body;
        const request  = await Empresa.Cadastro(dados)

        if(request[0] === true){
            console.log(request[1])
            res.redirect('/emp/register')
        }else{
            console.log(request[1])
            res.redirect('/emp/register')
        }
    })

    router.get('/login',(req,res)=>{
            res.render('src/emp/login')
    })

    router.post('/loggin',async(req,res)=>{
        const dados = await req.body
        const request = await Empresa.login(dados)

        if(request[0] === true){
            console.log(request[1])
            res.redirect('/emp/login')
        }else{
            console.log(request[1])
            res.redirect('/emp/login')
        }
    })

    router.get('/call',async(req,res)=>{
        try {
            Ocorrencia.findAll().then(ocorrencias=>{
                res.render('src/emp/chamado',{ocorrencias:ocorrencias})
            })    
        } catch (error) {
            console.log(error)
        }
        
    })
//Export
    export default router