module.exports = {
    name: 'youtube',
    aliases: ["yt"],
    description: "Sends the youtube link of Chat Nixon",
    execute(client, message, args){
        message.channel.send(`<a:arrow2:839762125181419520>|<a:pin:829041339932999710> https://youtube.com/channel/UCJyN2eo60QusWSmzfcFR2zA`);
    }
}