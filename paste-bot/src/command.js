prefix = "?"

module.exports = (client, aliases, callback) => {
    if (typeof aliases === 'string'){
        aliases = [aliases]
    }

    client.on('message', (message) => {
        const { content } = message

        aliases.forEach((alias) => {
            const command = `${prefix}${alias}`   

            if (content === command || content.startsWith(`${command} `)){
                    console.log(`runnning the command ${command}`)
                    callback(message)
            }
        })
    })
}
