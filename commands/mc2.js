module.exports = {
    name: 'mc2',
    description: "Sends the minecraft IP address of Poison Lab creative mode",
    execute(client, message, args){
        message.channel.send('serverofpoison.aternos.me');
    }
}