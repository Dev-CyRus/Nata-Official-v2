module.exports = {
    name: 'rule',
    description: "Sends all command list of poison as embed",
    execute(client, message, args, Discord) {
        const newEmbed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Rules')
        .setDescription('This is a rules embed')
        .addFields(
            {name: 'Rule 1', value: ' @everyone / @here শুধু স্টাফদের ব্যাবহারের জন্য.'},
            {name: 'Rule 2', value: ' কোনো রকমের NSFW কন্টেন্ট পাঠানো সম্পূর্ণ নিষিদ্ধ।'},
            {name: 'Rule 3', value: 'ঘৃণামূলক কথা,গালি,অপমানজনক কথা কিংবা খারাব ব্যবহার করা নিষিদ্ধ।'},
            {name: 'Rule 4', value: 'স্প্যাম,অতিরিক্ত mention এই সার্ভারে নিষিদ্ধ।'},
            {name: 'Rule 5', value: 'Self Promote ছাড়া কোনো চ্যানেল এ কোনো লিংক পাঠানো যাবে না।'},
            {name: 'Rule 6', value: 'কোনো ধরনের ধার্মিক, রাজনৈতিক বিষয় নিয়ে কথা বলা নিষিদ্ধ।'},
            {name: 'Rule 7', value: 'কোনো রকমের পার্সোনাল বিষয় পাঠানো নিষিদ্ধ যেমন - email,password, গোপন তথ্য ইত্যাদি।'},
          {name: 'Rule 8', value: 'কোনো রকমের নোংরা ভাষা ব্যবহার করা নিষিদ্ধ।'}
        )

        message.channel.send(newEmbed);
            
    }
    

}