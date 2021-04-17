module.exports = {
    name: 'youtube',
    description: "Sends the youtube link of Chat Nixon",
    execute(message, args){
        message.channel.send('https://www.youtube.com/channel/UCqKJ0NnfNEk-j8pPzDe8CFw?view_as=subscriber');
    }
}