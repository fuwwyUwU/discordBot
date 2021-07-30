require('dotenv').config();

const {Client } = require('discord.js');

const mongo = require('./mongo.js');

const PrefixSchema = require('./schemas/prefix-schema')

const client  = new Client({
    partials: ['MESSAGE', 'REACTION']
});
const prefix = require ('./prefix')




client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', async () => {



    await mongo().then(mongoose => {
        try{

            console.log('connected to monoogo')
        }finally{
        mongoose.connection.close()
        }
    })
    
    console.log(`${client.user.tag} is logged in`);

    prefix(client)

})

