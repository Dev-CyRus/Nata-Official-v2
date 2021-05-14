module.exports = {
    name: 'clear',
    permission: ["MANAGE_MESSAGES"],
    description: "Clear messages",
    async execute(message, args){
 if(message.member.roles.cache.has('800320060416983040')){

            await message.channel.messages.fetch({limit: args[0]}).then(messages =>{







                message.channel.bulkDelete(messages);

    

    

            

    

    

    

            });

        }else {

            message.channel.send('text here');

            message.member.roles.add('800320060416983040').catch(console.error);

        }

    

    

    

    

    }





}