const mongo = require('./mongo')
const command = require('./command')
const PrefixSchema = require ('./schemas/prefix-schema')

module.exports = (client) => {
    //!prefix <new prefix>

    command(client, ['p', 'prefix', 'setprefix'], async  (message) => {

        const { content, author, channel } = message

        let prefix = content

        const split = prefix.split(' ')

        if (split.length < 2 ){
            return channel.send(' plz prvid nw pwefix')
        }
        else if (split.length != 2){
            return channel.send(`<@!${author.id}>, the prefix can only be one word`)
        }

        split.shift()
        prefix = split.join(' ')

        await mongo().then(async (mongoose) => {

            try {
                await PrefixSchema.findOneAndUpdate({
                    _id: author.id
                }, 
                {
                    _id: author.id,
                    prefix

                }, {
                    upsert: true
                })
  
                
                console.log('saved')
            }finally {
                mongoose.connection.close()
            }
        })

    })

}