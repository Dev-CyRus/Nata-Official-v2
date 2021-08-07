const db = require('quick.db');

module.exports = {
  name: "warn",
  description: "Warn a member",
  permissions: ["MANAGE_GUILD"],

  async execute(client, message, args, Discord) {

    if (message.member.hasPermission("MANAGE_GUILD")) {
      const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

      if (!user) return message.channel.send('Please specify a user, via mention or ID');

      if (user.bot) return message.channel.send('You can\'t warn bots');

      if (message.author.id === user.id) return message.channel.send('You can\'t warn yourself');

      if (message.guild.owner.id === user.id) return message.channel.send('You can\'t warn the server\'s owner');

      let reason = args.slice(1).join(" ");

      if (!reason) reason = 'Unspecified';

      let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

      if (warnings === 20) return message.channel.send(`${user} has already reached three warnings`);

      const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#f70000')
      .setTitle('**You got warned in `Nata Family` by a staff.**')
      .setAuthor('You got warned!', 'https://media.discordapp.net/attachments/789770879508414467/873471826758610944/817506535591772250.gif')
      .addFields(
            {name: 'Rason:', value: `\`${reason}\``}
      )
      .setTimestamp()
      .setFooter(`Nata's Family`, `${message.guild.iconURL()}`)

      if (warnings === null) {
        db.set(`warnings_${message.guild.id}_${user.id}`, 1);
        user.send(exampleEmbed)
        await message.channel.send(`**${user.username}** has been warned`)
      }

      if (warnings !== null) {
        db.add(`warnings_${message.guild.id}_${user.id}`, 1)
        user.send(exampleEmbed)
        await message.channel.send(`**${user.username}** has been warned`)
      }
    } else {
      message.reply("You don't have permission to warn")
    }
  }
}