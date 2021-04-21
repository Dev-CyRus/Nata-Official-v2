module.exports = {
    name: 'mc',
    description: "Sends the minecraft IP address of Poison Lab",
    execute(message, args){
        message.channel.send('poisonslab.aternos.me');
    }
}