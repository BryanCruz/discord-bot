const { prefix } = require('../config.json');

module.exports = {
  name: 'help',
  aliases: ['commands'],
  minArgs: 0,
  usage: '[command]',
  description: 'Shows a list of all available commands or information about a specific command',
  cooldown: 1,
  execute(message, args, client){
    const data = [];

    if(args.length > 0){
      const commandName = args[0].toLowerCase();

      if(client.commands.has(commandName)){
        const command = client.commands.get(commandName);

        data.push(`**Name:** ${command.name}`);
        if(command.aliases) data.push(`**Aliases**: ${command.aliases}`);
        if(command.description) data.push(`**Description:** ${command.description}`);
        data.push(`**Usage:** ${prefix}${command.name} ${command.usage? command.usage : ''}`);
        data.push(`**Cooldown: ** ${command.cooldown || 3} second(s)`);
      }else{
        data.push(`Command "${commandName}" not found!`);
      }
    }else{
      data.push(`This is a list of all available commands. Use "${prefix}help *command*" to see more about a spefic command.`);
      data.push(client.commands.map(command => `**${command.name}:** ${command.description}`).join('\n\n'));
    }

    message.channel.send(data, {split: true});
  }
};
