const db = require('quick.db');

module.exports = {
    name: "warn",
    description: "Warn a member",
    permissions: ["MANAGE_GUILD"],

    async execute(client, message, args, Discord) {
          const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Please specify a user, via mention or ID');

        if(user.bot) return message.channel.send('You can\'t warn bots');

        if(message.author.id === user.id) return message.channel.send('You can\'t warn yourself nitwit');

        if(message.guild.owner.id === user.id) return message.channel.send('You can\'t warn the server\'s owner');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === 20) return message.channel.send(`${user} has already reached three warnings`);


        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
            await message.channel.send(`**${user.username}** has been warned`)
        }

        if(warnings !== null){
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
            await message.channel.send(`**${user.username}** has been warned`)
        }
    }
}