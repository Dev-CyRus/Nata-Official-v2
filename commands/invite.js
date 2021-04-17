module.exports = {
    name: 'invite',
    description: "Sends the invite link of Poison Lab",
    execute(message, args){
        message.channel.send('https://discord.gg/6G4bSMzaw4');
    }
}