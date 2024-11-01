//Imports   
    import * as db from './conn.mjs'

//Criando tabela de chamados    
    const Chamados = db.sequelize.define('chamados',{
        numProtocol:{type:db.Sequelize.STRING,allowNull:false},
        nome:{type:db.Sequelize.STRING,allowNull:false},
        telefone:{type:db.Sequelize.STRING,allowNull:false},
        endereco:{type:db.Sequelize.STRING,allowNull:false},
        nomeFuncionario:{type:db.Sequelize.STRING,allowNull:false},
        tipoChamado:{type:db.Sequelize.STRING,allowNull:false},
        descricao:{type:db.Sequelize.STRING,allowNull:false}
    })

    const ChamadosFechados = db.sequelize.define('chamadosResolvidos',{
        numProtocol:{type:db.Sequelize.STRING,allowNull:false},
        nome:{type:db.Sequelize.STRING,allowNull:false},
        telefone:{type:db.Sequelize.STRING,allowNull:false},
        endereco:{type:db.Sequelize.STRING,allowNull:false},
        nomeFuncionario:{type:db.Sequelize.STRING,allowNull:false},
        tipoChamado:{type:db.Sequelize.STRING,allowNull:false},
        descricao:{type:db.Sequelize.STRING,allowNull:false}
    })

//Sincronizando com o banco
    Chamados.sync()
    ChamadosFechados.sync()

//Exports
    export {Chamados,ChamadosFechados}