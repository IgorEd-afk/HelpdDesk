//Imports
    import {Sequelize} from 'sequelize'
    import dotenv from 'dotenv'
    dotenv.config({ path: '/home/igor/Documentos/Estudos/Express/HelpDesk/.env'})
    
    const sequelize = new Sequelize({
        dialect:'sqlite',
        storage:`${process.env.DB_URL}/help.db`
    })

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    export {Sequelize, sequelize}
    