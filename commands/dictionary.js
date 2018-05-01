const snekfetch = require('snekfetch');
const Discord   = require('discord.js');

module.exports = {
  name: 'dictionary',
  aliases: ['urban', 'dict'],
  minArgs: 1,
  usage: '<term> [number : *]',
  description: 'Search\'s the definition for a term in Urban Dictionary.' +
               'You can specify a number to choose which definition you want to see ' +
               'or * to select a random one.',
  cooldown: 3,
  async execute(message, args){
    try{
      const lastArg = args[args.length-1];

      const option = args.length > 1 && (!isNaN(lastArg) || lastArg === '*');
      if(option) args.pop();

      const { body } = await snekfetch.get('https://api.urbandictionary.com/v0/define').query({ term: args.join(' ') });

      if (body.result_type === 'no_results'){
        message.channel.send(`No results found for **${args.join(' ')}**`);
      }else{
        //message.channel.send(body.list[0].definition);const [answer] = body.list;

        var which;
        if(option){
          if(lastArg === '*'){
            which = Math.floor(Math.random()*body.list.length);
          }else{
            if(lastArg < 1){
              which = 0;
            }else if(lastArg > body.list.length){
              which = body.list.length-1;
            }else{
              which = Math.floor(lastArg-1);
            }
          }
        }else{
          which = 0;
        }

        const answer = body.list[which];

        const embed = new Discord.RichEmbed()
            .setColor('#EFFF00')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addField('Definition', answer.definition.trim())
            .addField('Example', answer.example.trim())
            .addField('Rating', `${answer.thumbs_up} thumbs up.\n${answer.thumbs_down} thumbs down.`)
            .setFooter(`Tags: ${body.tags.join(', ')}`);

        message.channel.send(embed);
      }
    }catch(error){
      message.channel.send("Sorry, there was an error in the execution of that command");
      console.log(error);
    }
  }
};
