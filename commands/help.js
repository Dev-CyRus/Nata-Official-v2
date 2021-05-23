module.exports = {
    name: 'help',
    description: "help command",
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#ff001e')
        .setTitle('Commands list')
        .setDescription('The prefix is `#`')
        .addFields(
            {name: '⨠ **__Information__**:', value: `
            **#fb** - Sends get Nata Gaming's page
            **#avatar** - Sends avatar of user
            **#rule** - Sends the server rules of LMS
            **#invite** - Sends the server link of LMS
            **#ping** - Sends the latency of LMS Official`},
            {name: '⨠ **__Administration__**:', value: `
            **#kick** - Kicks a mentioned user
            **#ban** - Bans a user
            **#clear** - clears message
            **#say** - Sends message`},
          {name: '⨠ **__Music Commands__**:', value: `
          **#play** - Plays a music
          **#stop** - Leaves the VC
          **#skip** - To Skip the music
          **#filter** - For adding filter` }
        )

        message.channel.send(newEmbed);
            
    }
    

}