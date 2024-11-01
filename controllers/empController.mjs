//Import
    import Empresa from '../models/empModel.mjs'
    import yup, { array } from 'yup'
    import bcrypt from 'bcryptjs'

//Criando modelagem 
    let empresaSchema = yup.object().shape({
        nome:yup.string().required('Nome é obrigatório'),
        cnpj:yup.string().required('CNPJ é obrigatório'),
        email:yup.string().email().required('Email é obrigatório'),
        senha:yup.string().required('Senha é obrigatória'),
        endereco:yup.array().required('Forneça um endereço')
    })

//Funções
    async function crypto(senha){
        const salt = await bcrypt.genSalt(10)
        let hash =  bcrypt.hash(senha,salt)
        
        return hash
    }
    export async function Cadastro(dados){
        
        try{
            var endereco = []
            endereco.push(dados.cidade,dados.bairro,dados.rua,dados.cep)
            dados.endereco = endereco

            await empresaSchema.validate(dados,{abortEarly:false})
            const usr = await Empresa.findOne({where:{cnpj:dados.cnpj}})

            if(usr){
                return [false,'Usuário já existe']
            }
            var senhahash = await crypto(dados.senha)
            await Empresa.create({
                nomeFantasia:dados.nome,
                cnpj:dados.cnpj,
                email:dados.email,
                senha:senhahash ,
                endereco:JSON.stringify(dados.endereco),
            }).then(()=>{
                return [true,'Cadastro realizado com sucesso']
            })
            
        }catch(err){
            if (err.name === 'ValidationError') {
                const errors = err.inner.map(error => error.message)
                console.log(errors)
                return[false,errors]
            } else {
                console.error('Erro desconhecido:', err)
                return[false,err]
            }
        }
    }

    export async function login(dados){
        try{
            const empresa = await Empresa.findOne({where:{email:dados.email}})

            if(!empresa)
                return [false,'Usuário não encontrado!']

            const comparacao = await bcrypt.compare(dados.senha,empresa.senha)

            if(comparacao){
                console.log('acertou')
                return [true,'bem-vindo']
            }
            console.log('Errou')
            return [false,'Credenciais incorretas']
        }catch(err){
            console.log(err)
            return [false,'Ocorreu um erro inesperado']
        }
    }