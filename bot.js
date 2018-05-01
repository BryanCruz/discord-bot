// main library
const Discord = require('discord.js');
const client  = new Discord.Client();

// configuration
const {token, prefix} = require('./config.json')

// node js file system
const fs = require('fs');

// cooldowns
const cooldowns = new Discord.Collection();
// commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands');

for(const file of commandFiles){
  const command = require(`./commands/${file}`);

  // set a new item in the Collection
  // with the key as the command name and the value as the exported module
  client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
  console.log(message.content);

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  // retrieves the required command
  const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  // checks if command exists in database
  if (!command) return;

  // checks if the args lenght matches the minimum amount that is required
  // if not, shows the usage of that command
  if(command.minArgs > args.length) {
    message.channel.send(`You didn\'t provided enough arguments, ${message.author}!\n` +
                         `To see how to use this command, use *!help ${command.name}*`);
    return;
  }

  // cooldown management
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (!timestamps.has(message.author.id)) {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  } else {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  }

  // try to execute the command
  try{
    command.execute(message, args, client);

  } catch(error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }

});

client.login(token);
