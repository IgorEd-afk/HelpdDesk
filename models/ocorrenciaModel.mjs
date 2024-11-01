//Import
    import * as db from './conn.mjs'

//Criando a tabela de ocorrencia
    const Ocorrencia = db.sequelize.define('ocorrencias',{
        status:{type:db.Sequelize.STRING,allowNull:false}
    })

//Sincronismo
    Ocorrencia.sync()

//Seeder
    async function syncAndSeed() {
        try {
           
            await Ocorrencia.sync();
    
            await Ocorrencia.bulkCreate([
                { status: 'Problemas com a internet, intranet ou rede local.' },
                { status: 'Bloqueio de conta por tentativas de acesso incorretas.' },
                { status: 'Erros ao usar programas ou aplicativos específicos.' },
                { status: 'Esquecimento de senha.' },
                { status: 'Dificuldades no envio, recebimento ou acesso a e-mails.' },
                { status: 'Pedidos para instalação ou atualização de softwares.' },
                { status: 'Pedidos para adquirir novos dispositivos ou equipamentos.' },
            ], {
               
                ignoreDuplicates: true
            });
    
            console.log('Tabela Ocorrencia criada com sucesso e dados iniciais inseridos.');
        } catch (error) {
            console.error('Erro ao criar a tabela Ocorrencia ou inserir dados iniciais:', error);
        }
    }

    //syncAndSeed()

//Export
    export default Ocorrencia