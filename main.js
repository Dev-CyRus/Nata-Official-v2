const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '#';

const fs = require ('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () =>{
    console.log('LMS is ready!')
});

const activities_list = [
    "Looking players for LMS", 
    "FB - Nata Gaming",
    "No Requirement", 
    "DM @LMS乛CyRus if you want to join"
    ]; // creates an arraylist containing phrases you want your bot to switch through.

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});

client.on('guildMemberAdd', member => {
   member.send(`ɢʀᴇᴇᴛɪɴɢs ${member} <a:ruse:839762112720666644>

ᴡᴇ ᴀʀᴇ ᴠᴇʀʏ ɢʟᴀᴅ ᴛᴏ sᴇᴇ ʏᴏᴜ ɪɴ LMS eSports ᴄᴏᴍᴍᴜɴɪᴛʏ sᴇʀᴠᴇʀ.

ʙᴇғᴏʀᴇ ᴍᴏᴠɪɴɢ ғᴏʀᴡᴀʀᴅ ʏᴏᴜ ᴡɪʟʟ ɴᴇᴇᴅ ᴛᴏ ғᴏʟʟᴏᴡ ʙᴇʟᴏᴡ sᴛᴇᴘs
<a:arrow2:839762125181419520>- ᴍᴜsᴛ ғᴏʟʟᴏᴡ ᴏᴜʀ <#726916751094317097>

sʜᴏᴡ ʏᴏᴜʀ ʟᴏᴠᴇ ᴀɴᴅ sᴜᴘᴘᴏʀᴛ ʙʏ ғᴏʟʟᴏᴡɪɴɢ ᴜs
<a:arrow2:839762125181419520>- Please check out: https://www.facebook.com/112841460459122
<a:arrow2:839762125181419520>- Also check: https://www.youtube.com/channel/UCqKJ0NnfNEk-j8pPzDe8CFw?view_as=subscriber

Thank You and Have a Great Time! <a:flower:839762104383045653>`);
});

client.on('message', msg => {
  if (msg.guild && msg.content.startsWith('/private')) {
    let text = msg.content.slice('/private'.length); // cuts off the /private part
    msg.guild.members.cache.forEach(member => {
      if (member.id != client.user.id && !member.user.bot) member.send(text);
    });
  }
});

client.on('message', message => {
    if (message.content.startsWith(prefix + 'say')) {
        if (message.author.bot) return;
        const SayMessage = message.content.slice(4).trim();
       message.channel.send("**" + SayMessage + "**")
      message.delete()
    }
});

client.on('message' , message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if (command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if (command == 'hi'){
        client.commands.get('hi').execute(message, args);
    } else if (command == 'youtube'){
        client.commands.get('youtube').execute(message, args);
    } else if (command =='invite'){
        client.commands.get('invite').execute(message, args);
    } else if (command == 'mc'){
        client.commands.get('mc').execute(message, args);
    } else if (command == 'rule'){
        client.commands.get('rule').execute(message, args, Discord);
    } else if (command == 'clear'){
        client.commands.get('clear').execute(message, args);
    } else if (command == 'mc2'){
        client.commands.get('mc2').execute(message, args);
    } else if (command == 'fb'){
        client.commands.get('fb').execute(message, args);
    } else if (command == 'git'){
        client.commands.get('git').execute(message, args)
    } else if (command == 'ticket'){
        client.commands.get('ticket').execute(message, args, client, Discord)
    } else if (command == 'pubgid'){
        client.commands.get('pubgid').execute(message, args)
    } else if (command == 'play'){
      client.commands.get('play').execute(message, args)
    } else if (command == 'leave'){
      client.commands.get('leave').execute(message, args)
    } else if (command == 'hello'){
      client.commands.get('hello').execute(message, args)
    }
});


client.login(process.env.TOKEN);