module.exports = {
    name: 'git',
    description: "Sends the github profile link of CyRus",
    execute(message, args){
        message.channel.send('https://github.com/Dev-CyRus');
    }
}