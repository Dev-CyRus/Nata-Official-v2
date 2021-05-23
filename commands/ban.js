module.exports = {
    name: 'ban',
    description: "Bans a user",
    execute(message, args){

        if(message.member.roles.cache.has('8726912980863942808')){
            const target = message.mentions.users.first();
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.ban();
            message.channel.send("User got banned");
        }else{
            message.channel.reply(`You don't have permission`);
            message.member.roles.add('8726912980863942808').catch(console.error);
        }
        }
        
    }
}