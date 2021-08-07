const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Project is okay!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const Discord = require('discord.js');

const DisTube = require('distube')

const client = new Discord.Client();

const prefix = '#';

const fs = require ('fs');
const guildInvites = new Map();
const Canvas = require('canvas');

const { registerFont } = require('canvas');

registerFont("Roboto-Bold.ttf", { family: "Roboto"});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord);
})

client.on('message', msg => {
   if (msg.author.bot) return;

   if (msg.content.toLowerCase() === "hi") {
     msg.reply("<a:hi:829041394584387624>, How are you?")
   }
});

const https = require('https-proxy-agent');
const proxy = 'http://123.123.123.123:8080';
const agent = https(proxy);
const thecookie = (process.env.realcookie);
client.distube = new DisTube(client, {
    youtubeCookie: thecookie,
    requestOptions: {
        agent
    }
})

client.on("inviteCreate",async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
client.on("ready",() =>{
    client.guilds.cache.forEach(guild => {
        guild.fetchInvites()
        .then(invites => guildInvites.set(guild.id, invites))
        .catch(err => console.log(err));


    });
});

client.on("guildMemberAdd", async member => {
    const cachedInvites = guildInvites.get(member.guild.id);
    const newInvites = await member.guild.fetchInvites();
    guildInvites.set(member.guild.id, newInvites);

    try{
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
        const embed = new Discord.MessageEmbed()
        .setColor('#ff001e')
        .setTitle(`<a:astar:829041429568553050>|<a:arrow2:839762125181419520>${member.user.tag} Joined the server`)
        .setDescription(`<a:welcome:829043646170136666> He was invited by **${usedInvite.inviter.username}**`)
        .setTimestamp()

        const joinChannel = member.guild.channels.cache.find(channel => channel.id === "726916623772024892")
        if(joinChannel) {
            joinChannel.send(embed).catch(err => console.log(err))

        }
    }
    catch(err) {console.log(err);}
})

client.DisTube = new DisTube(client, {
  youtubeCookie: (process.env.realcookie)
})

const distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: false, leaveOnFinish: true, leaveOnEmpty: true, leaveOnStop: true, updateYouTubeDL: true });

distube.on("initQueue", queue => {
    queue.autoplay = false;
   queue.volume = 100;
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();

    if (command.toLowerCase() == "play" || command.toLowerCase() == "p")
        distube.play(message, args.join(" "));

    if (["repeat", "loop" || "lp"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));

    if (command.toLowerCase() == "stop" || command.toLowerCase() == "leave") {
        distube.stop(message);
        message.channel.send("Stopped the music!");
    }

    if (command.toLowerCase() == "skip")
        distube.skip(message);

    if (command == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }
    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter || 
        "Off"));
    }
});

// Queue status template
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user.username}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user.username}`
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

// var welcomeCanvas = {};
// welcomeCanvas.create = Canvas.createCanvas(1024, 500)
// welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
// welcomeCanvas.context.font = '72px sans-serif';
// welcomeCanvas.context.fillStyle = '#f700ff';

// Canvas.loadImage("./welcome.png").then(async (img) => {
//     welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500)
//     welcomeCanvas.context.fillText("WELCOME", 360, 360);
//     welcomeCanvas.context.beginPath();
//     welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
//     welcomeCanvas.context.stroke()
//     welcomeCanvas.context.fill()
// })

// client.on('guildMemberAdd', async member => {
//     const welcomechannel = client.channels.cache.get('726916623772024892')
//     let canvas = welcomeCanvas;
//     canvas.context.font = '42px sans-serif',
//     canvas.context.textAlign = 'center';
//     canvas.context.fillText( member.user.tag.toUpperCase(), 512, 410)
//     canvas.context.font = '32px sans serif'
//     // canvas.context.fillText(`You are the ${member.guild.memberCount}th Member`, 512, 455)
//     canvas.context.beginPath()
//     canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
//     canvas.context.closePath()
//     canvas.context.clip()
//     await Canvas.loadImage(member.user.displayAvatarURL({format: 'png', size: 1024}))
//     .then(img => {
//         canvas.context.drawImage(img, 393, 47, 238, 238);
//     })
//     let atta = new Discord.MessageAttachment(canvas.create.toBuffer(), `WELCOME-${member.id}.png`)
//     try {
//         welcomechannel.send(`
// <a:astar2:829041416600289320>──────────────────────<a:astar2:829041416600289320>
//   <a:welcome:829043646170136666><a:welcome:829043646170136666><a:welcome:829043646170136666><a:welcome:829043646170136666><a:firre:829044261214617640>**${member.guild.name}**<a:firre:829044261214617640><a:welcome:829043646170136666><a:welcome:829043646170136666><a:welcome:829043646170136666><a:welcome:829043646170136666>
// ────────────────────────────

//                           <a:hi:829041394584387624>,${member}
//      <a:astar:829041429568553050> Welcome to ${member.guild.name} <a:astar:829041429568553050>

// <a:pin:829041339932999710> | <a:arrow2:839762125181419520> Please read <#726916751094317097>

// <a:pin:829041339932999710> | <a:arrow2:839762125181419520> Also check <#726917469331259403>

// <a:astar2:829041416600289320> | <a:arrow2:839762125181419520> Use <#838784125271277588> for **chatting**

//         <a:heart2:864066503301005342> Have fun and enjoy! <a:heart2:864066503301005342>

// <a:verified:829047749756321854>You are the ${member.guild.memberCount}th Member of the Server<a:verified:829047749756321854>`, atta)
//     } catch (error) {
//         console.log(error)
//     }
// })

client.login(process.env.TOKEN);