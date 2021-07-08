module.exports = {
    name: 'avatar',
    description: "Sends avatar of mentioned user",
    execute(client, message, args, Discord){
        let user = message.mentions.users.first() || message.author || message.guild.member.cache.get(args[1])
message.channel.send( new Discord.MessageEmbed()
.setAuthor(user.username,user.avatarURL())
.setDescription(`**[Avatar Link](${user.avatarURL()})**`)
.setImage(user.avatarURL(
{dynamic : true,
format : 'png',
size : 1024}
))
);

    }
}