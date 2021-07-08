module.exports = {
  name: 'kick',
  description: "Kicks specific user if author have perm",
  permissions: ["KICK_MEMBERS"],
  async execute(client, message, args, Discord) {
      if (!message.mentions.users.size) {
        return message.reply('You must tag 1 user.');
      }

      else {

        let member = message.mentions.members.first();
        let reason = message.content.split(" ").slice(2).join(' ')

        if (member.kickable == false) {
          message.channel.send("That user cannot be kicked!");
          return;
        }

        else {


          if (reason == ``) {
            reason = (`No reason provided.`)
          }


          await member.send(`You have been kicked from **${message.guild.name}** with the reason: **${reason}**`)
            .catch(err => message.channel.send(`⚠ Unable to contact **${member}**.`));

          await member.kick(reason)
          await message.channel.send(`<a:verified:829047749756321854> ${member} has been kicked for ${reason}`).then(msg => msg.delete({timeout: 10000}));
          message.delete()
                  
                    console.log(`${message.author.tag} kicked ${member.user.tag} from '${message.guild.name}' with the reason '${reason}'.`);
}
 
 
            }
 
  }
}