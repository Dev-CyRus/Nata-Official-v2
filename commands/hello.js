module.exports = {
    name: 'hello',
    description: "Greets",
    execute(message, args){
        message.channel.send('Hi whats up?');
    }
}