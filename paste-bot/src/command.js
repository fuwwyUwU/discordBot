prefix = "?"

module.exports = (client, aliases, callback) => {
    if (typeof aliases === 'string'){
        aliases = [aliases]
    }

    client.on('message', (message) => {
        const { content } = message
        
        const lcontent = content.toLowerCase()

        aliases.forEach((alias) => {
            const command = `${prefix}${alias}`.toLowerCase()   

            if (lcontent === command || lcontent.startsWith(`${command} `)){
                    console.log(`runing the command ${command}`)
                    callback(message)
            }
        })
    })
}
