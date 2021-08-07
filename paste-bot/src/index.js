require('dotenv').config();

const {Client, Message } = require('discord.js');

const mongo = require('./mongo.js');

const PrefixSchema = require('./schemas/prefix-schema')

const client  = new Client({
    partials: ['MESSAGE', 'REACTION']
});
const prefix = require ('./prefix')

const command = require('./command')




client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', async () => {



    await mongo().then(mongoose => {
        try{

            console.log('connncted to mongo')
        }finally{
        mongoose.connection.close()
        }
    })
    
    console.log(`${client.user.tag} is logged in`);

    prefix(client)

    command(client, ['test', 't'], message => {
        return message.channel.send('tets')
    })

})





