module.exports = {
    name: 'say',
    description: "Announcement command",
    permissions: ["MANAGE_MESSAGES"],
   async execute(client, message, args){
                if (message.author.bot) return;
        const SayMessage = message.content.slice(4).trim();
        const msg = await message.channel.send("**" + SayMessage + "**")
       await msg.react('<a:welcome:829043646170136666>')
       await msg.react('<a:flower:839762104383045653>')
      message.delete()
    }
}