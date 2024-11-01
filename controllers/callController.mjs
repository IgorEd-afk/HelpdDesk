//Imports   
    import {Chamados,ChamadosFechados} from '../models/chamadosModel.mjs'
    import yup from 'yup'
import Empresa from '../models/empModel.mjs'
    
//Schema Chamado
    let chamadoSchema = yup.object().shape({
        nomeFuncionario: yup.string().required('Nome do funcionário é necessário'),
        tipoChamadp:yup.string(),
        descricao:yup.string()
    })
    
//Funções
    function geraProtocolo(){
        const size = 17
        const alfa = []
        const protocol = []

        for(let i = 0;i<=9;i++){
            alfa.push(i)
        }

        for(let i=0;i<=size;i++){
            protocol.push(alfa[Math.floor(Math.random()*alfa.length)])
        }
        const prot = protocol.toString().replace(/[^0-9]/g, '')

        return prot

    }

    export async function addChamado(dados){
        try{
            
            await chamadoSchema.validate(dados)
            const protocol = geraProtocolo()
            
            const empresa = await Empresa.findOne({where:{id:dados.id}})


            Chamados.create({
                numProtocol:protocol,
                nomeEmpresa:dados.nomeFantasia,
                telefone:empresa.telefone,
                endereco:empresa.endereco,
                nomeFuncionario:dados.nomeFuncionario,
                tipoChamado:dados.tipo,
                descricao:dados.desc
            }).then(()=>{
                console.log('Chamado criado')
                return [true,'Chamado adicionado']
            }).catch(err=>{
                console.log(err)
                return [false,'Ocorreu um erro inesperado']
            })
            
        }catch(err){
            console.log(err)
        }
    }
