//Imports
    import express from 'express'
    import * as Empresa from '../controllers/empController.mjs'
    import EmpresaModel from '../models/empModel.mjs'
    import Ocorrencia from '../models/ocorrenciaModel.mjs'
    import * as Chamado from '../controllers/callController.mjs'

    const router = express.Router()

//Rotas
    router.get('/register',(req,res)=>{
        res.render('src/emp/registro')
    })

    router.post('/registering',async(req,res)=>{
        const dados = await req.body
        const request  =  await Empresa.Cadastro(dados)

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
            const empresa = await EmpresaModel.findOne({where:{email:dados.email}})
            req.session.empId = empresa.id    
            res.redirect('/emp/login')
        }else{
            console.log(request[1])
            res.redirect('/emp/login')
        }
    })

    router.get('/call',async(req,res)=>{
        try {
            await Ocorrencia.findAll().then(ocorrencias=>{
                res.render('src/emp/chamado',{ocorrencias:ocorrencias})
            })    
        } catch (error) {
            console.log(error)
        }
    })

    router.post('/called',async(req,res)=>{
        const empresa = await EmpresaModel.findOne({ where: { id: req.session.empId } });
        const dados = Object.assign({}, empresa.get({ plain: true }), req.body)
        
        Chamado.addChamado(dados)

    })
//Export
    export default router