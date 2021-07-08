module.exports = {
  name: 'ban',
  description: "Bans specific user if author have perm",
  permissions: ["BAN_MEMBERS"],
  async execute(client, message, args, Discord) {
      if (!message.mentions.users.size) {
        return message.reply('You need to mention a user');
      }

      else {

        let member = message.mentions.members.first();
        let reason = message.content.split(" ").slice(2).join(' ')

        if (member.bannable == false) {
          message.channel.send("That user cannot be banned!");
          return;
        }

        else {


          if (reason == ``) {
            reason = (`No reason provided.`)
          }


          await member.send(`:-<a:ban:846642896845144111>
  You have been banned from **${message.guild.name}** with the reason: **${reason}**`)
            .catch(err => message.channel.send(`⚠ Unable to contact **${member}**.`));

          await member.ban({reason: `${reason}`});
          await message.channel.send(`<a:verified:829047749756321854> ${member} has been banned for ${reason}`).then(msg => msg.delete({timeout: 10000}));
          message.delete()
                  
                    console.log(`${message.author.tag} banned ${member.user.tag} from '${message.guild.name}' with the reason '${reason}'.`);
}
 
 
            }
  }
}