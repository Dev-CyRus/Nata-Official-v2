module.exports = {
    name: 'git',
    description: "Sends the github profile link of CyRus",
    permission: ["MANAGE_MESSAGES"],
    execute(client, message, args){
        message.channel.send('https://github.com/Dev-CyRus');
    }
}