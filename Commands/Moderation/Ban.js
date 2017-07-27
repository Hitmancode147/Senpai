const Discord = require('discord.js');
const rethink = require('rethinkdb');
const config  = require('../../config/config.json')
exports.run = (client, msg, args) => {
     async function ban(member, reason, channel) {
        const message = await channel.send(`trying to ban ${member.user.tag}`)
        try{
        await member.ban({
                reason,
                "days": 7
        })
        await message.edit(`successfully banned ${member.user.tag}`)
        const embed = new Discord.RichEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setColor(0x00AE86)
            .setTimestamp()
            .addField("Command", "Ban")
            .addField("Member", `${member.user.tag} (${member.user.id})`)
            .addField("Reason", reason)

        const connection = await rethink.connect()
        connection.use('Discord')
        rethink.table('guildConfig')
            .get(msg.guild.id)
            .run(connection, (err, result) => {
                if (err) throw err
                if (result.ModlogID !== "None") {
                    let prefix
                    if(result.customPrefix === "None") {
                        prefix = config.prefix
                    } else {
                        prefix = result.customPrefix
                    }
                    msg.guild.defaultChannel.send(`You didn't added a Modlog so i write my Logs in the default Channel\nadd one with ${prefix}setmodlog, so my logs are seperated`, {embed})
                }else{
                    msg.guild.channels.get(result.ModlogID).send({embed})
                }
            })
        }catch(error) {
            message.edit(`i had an error while trying to ban the member if this happens often & i have the needed permissions you should contact my DEV!`)
        }
    }

    if(msg.channel.type != "text") return msg.channel.send("You can run this command only on a Server!")
    if(!msg.member.hasPermission(4)) return msg.reply("*You need a role that provide the right to ban People!*")
    if (msg.mentions.members.size < 1) return msg.reply('You must mention someone for this Command.')
    let member   = msg.mentions.members.first()
    if (!member.bannable) return msg.reply('I have no rights to ban that User');
    let reason = args.slice(1).join(' ');
    if (reason.length < 1) return msg.reply('You must supply a reason for the ban.');

    ban(member, reason, msg.channel)
}

exports.help = {
    'name': 'ban',
    'description': 'bans the mentioned user',
    'usage': 'ban [@user] [reason]'
}

exports.alias = ["banne", "banhammer"]
