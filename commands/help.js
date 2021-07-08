module.exports = {
    name: 'help',
    description: "help command",
    execute(client, message, args, Discord) {
      message.react('<a:welcome:829043646170136666>');
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#ff001e')
        .setTitle('Commands list')
        .setDescription('The prefix is `#`')
        .addFields(
            {name: '⨠ **__Information__**:', value: `
            **#fb** - Sends get Nata Gaming's page
            **#avatar** - Sends avatar of user
            **#rule** - Sends the server rules of Nata's Server
            **#invite** - Sends the server link of Nata's Server's Invite Link
            **#ping** - Sends the latency of Nata Official`},
            {name: '⨠ **__Administration__**:', value: `
            **#kick** - Kicks a mentioned user
            **#ban** - Bans a user
            **#clear** - clears message
            **#say** - Sends message
            **#dm** - DM mentioned user any message`},
          {name: '⨠ **__Music Commands__**:', value: `
          **#play / #p** - Plays a music
          **#stop** - Stops the music
          **#skip** - To Skip the music
          **#filter** - For adding filter
          **loop / lp / repeat** - for repeating the music` }
        )

        message.channel.send(newEmbed);
            
    }
    

}