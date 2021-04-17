module.exports={
    name:'ping',
    description: "Sends the api latency of bot",
    execute(message, args){
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms`);
        }
      };