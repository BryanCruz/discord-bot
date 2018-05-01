module.exports = {
  name: 'ping',
  minArgs: 0,
  description: 'Checks if the bot is online',
  execute(message, args){
    message.channel.send('pong!');
  }
};
