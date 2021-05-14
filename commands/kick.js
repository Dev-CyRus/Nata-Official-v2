module.exports = {
    name: 'kick',
    description: "get kicked",
    execute(message, args){

        if(message.member.roles.cache.has('8726912980863942808')){
            const target = message.mentions.users.first();
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.kick();
            message.channel.send("User got kicked");
        }else{
            message.channel.reply(`You don't have permission`);
            message.member.roles.add('726912980863942808').catch(console.error);
        }
        }
        
    }
}