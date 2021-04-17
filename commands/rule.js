module.exports = {
    name: 'rule',
    description: "Sends all command list of poison as embed",
    execute(message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#1E90FF')
        .setTitle('Rules')
        .setDescription('This is a rules embed')
        .addFields(
            {name: 'Rule 1', value: 'Use of   @everyone/@here   tag is only for server staff.'},
            {name: 'Rule 2', value: 'Do not tag any fellow member of the server unnecessarily.'},
            {name: 'Rule 3', value: 'Sending any sort of NSFW explicit content is strictly prohibited.'},
            {name: 'Rule 4', value: 'Acts of Groupism, Racism, Harassment or Hate speech against any fellow member will not be tolerated'},
            {name: 'Rule 5', value: 'Spamming /Excessive tagging/ Vertical Chatting is strictly prohibited in the server.'},
            {name: 'Rule 6', value: 'Avoid making your chat highlighted by use of any other fonts / capital letters'},
            {name: 'Rule 7', value: 'Avoid any religious / political / sexual discussions that may lead to heated arguments'}
        )

        message.channel.send(newEmbed);
            
    }
    

}