const { mongoose } = require("mongoose")
const mongo = require("./mongo")
const prefix = require("./prefix")
const PrefixSchema = require('./schemas/prefix-schema')

let PREFIX = "<"

const standardPrefix = "<"






module.exports = (client, aliases, callback) => {

    const cache = {} //user.id [prefiix]

    if (typeof aliases === 'string'){
        aliases = [aliases]
    }

    client.on('message', async (message) => {
        const { content } = message
        const { author } = message      
        if (message.author.bot) return

        cache[author.id]

        
       OnCommand(author)
       



       
        

        
        const lcontent = content.toLowerCase()

        console.log(PREFIX)

        cache[author.id] = PREFIX

        aliases.forEach((alias) => {
            const command = `${PREFIX}${alias}`.toLowerCase()   

            if (lcontent === command || lcontent.startsWith(`${command} `)){
                    console.log(`running the command ${command}`)
                    callback(message)
            }
        })
    })
}

const OnCommand = async author => {
    
    let data = cache[author.id]

    if (!data) {
        
        console.log('FETCHHING FROM DATABASE')

        await mongo().then(async mongoose => {
            try {
                const result = await PrefixSchema.findOne({ _id: author.id})

                cache[author.id] = data = [result.prefix]
            }finally {
                mongoose.connection.close()
            }
        })
    }

    PREFIX = data[0]

}

