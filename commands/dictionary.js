const snekfetch = require('snekfetch');

module.exports = {
  name: 'dictionary',
  aliases: ['urban', 'dict'],
  minArgs: 1,
  usage: '[term]',
  description: 'Search\'s the definition for a term in Urban Dictionary',
  cooldown: 5,
  async execute(message, args){
    const { body } = await snekfetch.get('https://api.urbandictionary.com/v0/define').query({ term: args.join(' ') });

    if (body.result_type === 'no_results'){
      message.channel.send(`No results found for **${args.join(' ')}**`);
    }else{
      message.channel.send(body.list[0].definition);
    }
  }
};
