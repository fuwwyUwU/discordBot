require('dotenv').config();

const {Client } = require('discord.js');

const mongo = require('./mongo.js');

const PrefixSchema = require('./schemas/prefix-shema')

const client  = new Client({
    partials: ['MESSAGE', 'REACTION']
});

const command = require('./command')




client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', async () => {



    await mongo().then(mongoose => {
        try{

            console.log('conneected to monoogo')
        }finally{
        mongoose.connection.close()
        }
    })
    
    console.log(`${client.user.tag} is logged in`);


    command(client, ['c', 'copy'], message => {
        message.channel.send('pong')
    })

})

