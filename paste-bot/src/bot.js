require('dotenv').config();

const {Client } = require('discord.js');

const mongo = require('./mongo');


const client  = new Client({
    partials: ['MESSAGE', 'REACTION']
});

const PREFIX = "<";

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', async () => {

    await mongo().then(mongoose => {
        try{

            console.log('connected to mmonogo')


        }finally{
        mongoose.connection.close()

        }
    })
    
    console.log(`${client.user.tag} is logged in`);

})

mongoose.connect(process.env.MONGODB_SRV, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('connected to dataabase');
}).catch((err) => {

    console.log(err);
})

client.on('message', (message) => {

    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);

        if (CMD_NAME === 'test'){
            message.channel.send(args.join(" "));
        }
    }

});