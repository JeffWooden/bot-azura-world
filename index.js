const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});

// Connection du bot:
// https://discordapp.com/oauth2/authorize?client_id=496008333812301825&permissions=8&scope=bot

bot.on('ready', async () => {
    console.log(`${bot.user.username} est connecté !`);
    bot.user.setActivity("trier vos idées !", {type: "PLAYING"});
});

bot.on("message", async msg => {
    if(msg.author.bot) return;
    let prefix = "proposition";
    let messageArray = msg.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(msg.channel.id == "496005265242456075"){
      if(cmd == "proposition"){
        if(!args[0]){
          let sender = msg.author;
          msg.delete(0);
          let correctsyntax = new Discord.RichEmbed()
          .setTitle("Erreur syntaxique")
          .setDescription(`Proposition manquante !\nEssayez avec **\`proposition [votre idée/proposition]\`**`)
          .setColor("#f90000")
          sender.send(correctsyntax).then(msg => msg.delete(10000));
          return;
        }
        else{
          let sender = msg.author;
          let sayargs = args.join(" ");
          msg.delete(0);
          msg.channel.send(`${sender}... Envoie de la commande en cours <a:loading:496022340367417344>`).then(msg => msg.delete(3000));
          setTimeout(function(){
            let succesful = new Discord.RichEmbed()
            .setDescription("Votre proposition a été envoyée avec succès, merci de votre contribution")
            .setColor("#38ff4b");
            sender.send(succesful).then(msg => msg.delete(10000));
            let embed = new Discord.RichEmbed()
            .setTitle("Nouvelle proposition")
            .addField("Auteur", sender)
            .addField("Proposition", sayargs)
            .setColor("#28a8e2");
            bot.channels.get("496006589040558083").send(embed);
          }, 3000);
          return;
        }
      }
      else{
        let sender = msg.author;
        msg.delete(0);
        let correctsyntax = new Discord.RichEmbed()
        .setTitle("Erreur syntaxique")
        .setDescription(`Argument **${cmd}** incorrect !\nEssayez plutôt avec: \`proposition\``)
        .setColor("#f90000")
        sender.send(correctsyntax).then(msg => msg.delete(10000));
        return;
      }
    }
});

bot.login("NDk2MDA4MzMzODEyMzAxODI1.DpKYpg.UffecN9SovTzxoRZyiUb4DR-BXs");
