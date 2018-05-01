module.exports = {
  name: 'beep',
  minArgs: 2,
  usage: '<a> <b> [c]',
  description: 'boop',
  execute(message, args){
    message.channel.send('boop');
  }
};
