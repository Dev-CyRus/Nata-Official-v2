module.exports = {
    name: 'invite',
    description: "Sends the invite link of LMS",
    execute(message, args){
        message.channel.send('https://discord.gg/ZCvxvH6rhE');
    }
}