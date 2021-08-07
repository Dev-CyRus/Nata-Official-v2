const db = require('quick.db');

module.exports = {
    name: "warnings",
    aliases: ["checkwarns"],
    description: "Check a users warnings",
    permissions: ["MANAGE_GUILD"],

    async execute (client, message, args){
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;


        let warnings = await db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === null) warnings = 0;

        message.channel.send(`**${user.username}** has *${warnings}* warning(s)`);
    }
}