module.exports = (Discord, client) =>{
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
        status: "dnd",
        activity: {
            name: `${client.users.cache.size} Members | #help | FB: Nata Gaming` ,
            type: "LISTENING"
        }
    });
}