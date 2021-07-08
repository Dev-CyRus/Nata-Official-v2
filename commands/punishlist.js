module.exports = {
    name: 'punishlist',
    description: "Sends the punishments list of warnings",
    execute(client, message, args){
        message.channel.send(`
**Beyadopiz- 1 = Maf
Beyadopiz- 2 = Awesome names
Beyadopiz- 3 = Special Role
Beyadopiz- 4 = mute for 10 minute (VC+Chat)
Beyadopiz- 5 = mute for 25 minute (VC+Chat)
Beyadopiz- 6 = mute for 45 minute (VC+Chat)
Beyadopiz- 7 = mute for 1 hour
Beyadopiz- 8 = mute for 1 day
Beyadopiz- 9 = 1 day 4 hour mute
Beyadopiz- 10 = 5 Days mute (Chat Only-VC Mute 20 minute)
Beyadopiz- 11 = Role remove for 20 minute
Beyadopiz- 12 = Role remove for 40 minute
Beyadopiz 13 = 1 Day Role remove
Beyadopiz 14 = Kick (Beyadopi Reason will be mentioned in reason)
Beyadopiz 15 = Ban
Beyadopiz 16 = 10 Minute Ban
Beyadopiz 17 = 30 Minute Ban
Beyadopiz 18 = 1 hour ban
Beyadopiz 19 = 4 hour ban
Beyadopiz 20 = 1 Day Ban.**`);
    }
};