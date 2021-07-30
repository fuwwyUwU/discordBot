const { mongoose } = require("mongoose")
const mongo = require("./mongo")
const prefix = require("./prefix")
const PrefixSchema = require('./schemas/prefix-schema')

let PREFIX = "?"

const cache = {} //user.id [prefiix]


module.exports = (client, aliases, callback) => {

    
    if (typeof aliases === 'string'){
        aliases = [aliases]
    }

    client.on('message', async (message) => {
        const { content } = message

        await OnCommand(message.author)

        cache[message.author.id] = [prefix]

        
        const lcontent = content.toLowerCase()

        console.log(PREFIX)

        aliases.forEach((alias) => {
            const command = `${PREFIX}${alias}`.toLowerCase()   

            if (lcontent === command || lcontent.startsWith(`${command} `)){
                    console.log(`runing the command ${command}`)
                    callback(message)
            }
        })
    })
}


const OnCommand = async author => {


    let data = cache[author.id]
    console.log(cache[author.id] + 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
    console.log(cache + 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

    if (!data){
        console.log('FETCHIng FROM DATABASE')
        await mongo().then(async mongoose => {
            try {
                const result = await PrefixSchema.findOne({_id: author.id})
                console.log(result)
                
                if (result === 'undefined') {
                    return
                }
                cache[author.id] = data = [result.prefix]
            }finally{
                mongoose.connection.close()
                if (result === 'undefined'){
                    PREFIX = '<'
                }
                else {
                    
                    PREFIX = result.prefix
                }
            }

        })
    }else {
        PREFIX = data.prefix
    }



}
