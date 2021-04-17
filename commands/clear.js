module.exports = {
    name: 'clear',
    permission: ["MANAGE_MESSAGES"],
    description: "Clear messages",
    async execute(message, args){
        if(!args[0]) return message.reply("please enter the amount of messages that you want to clear");
        if(isNaN(args [0])) return message.reply("Please enter a real number");

        if(args[0] > 100) return message.reply("You canno't delete more than 100 messages");
        if(args[0] < 1) return message.reply("You must delete at least one messages");

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
        });
    }
}