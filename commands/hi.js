module.exports = {
    name: 'hi',
    description: "A greeting command which replies hi",
    execute(message, args){
        message.channel.send('Hello dear, How are you?');
    }
}