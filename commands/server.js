module.exports = {
  name: 'server',
  minArgs: 0,
  description: 'shows this server\'s information',
  execute(message, args){
    message.channel.send(`Server name: ${message.guild.name}\n` +
                         `Total members: ${message.guild.memberCount}\n` +
                         `Created at: ${message.guild.createdAt}\n` +
                         `joinedAt: ${message.guild.joinedAt}\n` +
                         `position: ${message.guild.position}\n` +
                         `Owner: ${message.guild.owner}\n` +
                         `NameAcronym: ${message.guild.nameAcronym}\n` +
                         `presences: ${message.guild.presences}\n` +
                         `Icon: ${message.guild.iconURL}\n`);
  }
};
