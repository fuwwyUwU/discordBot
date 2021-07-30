prefix = "?"

module.exports = (client, aliases, callback) => {
    if (typeof aliases === 'string'){
        aliases = [aliases]
    }

    client.on('message', (message) => {
        const { content} = message

        aliases.foreach((alias) => {
            const command = `${prefix}${alias}`   
            if (content.starsWith(`${command} ` || content === command)){
                    console.log(`running the command ${command}`)
                    callback(message)
            }
        })
    })
}
