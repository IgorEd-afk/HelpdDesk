//Imports
    import * as db from './conn.mjs'

//Criando tabela de empresas    
    const Empresa = db.sequelize.define('empresa',{
        nomeFantasia:{type:db.Sequelize.STRING,allowNull:false},
        cnpj:{type:db.Sequelize.STRING,allowNull:false},
        telefone:{type:db.Sequelize.STRING,allowNull:false},
        email:{type:db.Sequelize.STRING,allowNull:false},
        senha:{type:db.Sequelize.STRING,allowNull:false},
        endereco:{type:db.Sequelize.STRING,allowNull:false},
        chamados:{type:db.Sequelize.STRING,allowNull:true},
    })

//Sincroização
    Empresa.sync()

//Export
    export default Empresa