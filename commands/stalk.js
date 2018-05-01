module.exports = {
  name: 'stalk',
  aliases: ['info', 'user'],
  minArgs: 0,
  usage: '[user]',
  description: 'information about the users mentioned (if no user is mentioned, then the bot will show information about you)',
  execute(message, args){
    if (!message.mentions.users.size) {
      return message.channel.send(`Name: ${message.author.username}\n`               +
                                  `Discriminator: ${message.author.discriminator}\n` +
                                  `Birthday: ${message.author.createdAt}\n`          +
                                  `Last Message: ${message.author.lastMessage}\n`    +
                                  `Presence: ${message.author.presence}\n`           +
                                  `Icon: ${message.author.displayAvatarURL}`
                                 );
    }

    const avatarList = message.mentions.users.map(user => {
        return (`Name: ${user.username}\n`               +
                `Discriminator: ${user.discriminator}\n` +
                `Birthday: ${user.createdAt}\n`          +
                `Last Message: ${user.lastMessage}\n`    +
                `Presence: ${user.presence}\n`           +
                `Icon: ${user.displayAvatarURL}`
               );
    });

    message.channel.send(avatarList);
  }
};
