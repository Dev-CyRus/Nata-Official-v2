module.exports = {
    name: 'ping',
    description: "Sends Latency",
    execute(client, message, args, Discord){
        message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    }
}