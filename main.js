const Discord = require('discord.js');

const DisTube = require('distube')

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
    "The prefix is #", 
    "Looking for clan members"
    ]; // creates an arraylist containing phrases you want your bot to switch through.

const distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });


client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();

    if (command == "play")
        distube.play(message, args.join(" "));

    if (["repeat", "loop"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));

    if (command == "stop") {
        distube.stop(message);
        message.channel.send("Stopped the music!");
    }

    if (command == "skip")
        distube.skip(message);

    if (command == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }

    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter || "Off"));
    }
});

// Queue status template
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// DisTube event listeners, more in the documentation page
distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 1000); // Runs this every 10 seconds.
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

client.on('guildMemberRemove', guildMember =>{
    guildMember.guild.channels.cache.get('726916955650392176').send(`${guildMember.user.tag} **আমাদের সার্ভার থেকে পালাইছে। তার জন্যে ১ মিনিটের নিরবতা!**<a:pepe:838367553478066196>`)
});


client.on('message', message => {
    if (message.content.startsWith(prefix + 'say')) {
        if (message.author.bot) return;
        const SayMessage = message.content.slice(4).trim();
        message.channel.send("**" + SayMessage + "**")
      message.delete()
    }
});

client.on("message", async message =>{
let command = message.content.toLowerCase().split(" ")[0]
command = command.slice(prefix.length)
if(message.content.startsWith(prefix + "avatar")){
let args = message.content.split(" ")
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
});

client.on("message", async message =>{
let command = message.content.toLowerCase().split(" ")[0]
command = command.slice(prefix.length)
if(message.content.startsWith(prefix + "av")){
let args = message.content.split(" ")
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
    } else if (command == 'hello'){
      client.commands.get('hello').execute(message, args, client, Discord)
    } else if (command == 'kick'){
      client.commands.get('kick').execute(message, args)
    } else if (command == 'help'){
      client.commands.get('help').execute(message, args, Discord)
    } else if (command == 'ban'){
      client.commands.get('ban').execute(message, args)
    }
});


client.login(process.env.TOKEN);