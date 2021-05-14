module.exports = {
    name: 'clear',
    permission: ["MANAGE_MESSAGES"],
    description: "Clear messages",
    async execute(message, args){
 if(message.member.roles.cache.has('726912980863942808')){

            await message.channel.messages.fetch({limit: args[0]}).then(messages =>{







                message.channel.bulkDelete(messages);

    

    

            

    

    

    

            });

        }else {

            message.channel.send(`You don't have permission to use that`);

            message.member.roles.add('800320060416983040').catch(console.error);

        }

    

    

    

    

    }





}