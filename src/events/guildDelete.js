const Events = require('../structures/new/Event.js');
const snekfetch = require('snekfetch');

class LeaveEvent extends Events {
	constructor(client) {
		super(client);
		this.name = 'guildDelete';
	}

	async run(guild) {
		try {
			const size = await guild.client.shard.fetchClientValues('guilds.size');
			const guildsizes = size.reduce((prev, val) => prev + val, 0);
			await snekfetch.post(`https://discordbots.org/api/bots/${guild.client.user.id}/stats`)
				.set('Authorization', this.client.config.dBotsToken)
				.send({ server_count: guildsizes }); // eslint-disable-line camelcase
			await snekfetch.post(`https://bots.discord.pw/api/bots/${guild.client.user.id}/stats`)
				.set('Authorization', this.client.config.discordBotsToken)
				.send({ server_count: guildsizes }); // eslint-disable-line camelcase
			this.client.log.info(`${guild.client.user.username} left the Guild ${guild.name} size is now ${guildsizes}`);
		} catch (error) {
			this.client.log.error(`tried to update stats due guildDelete but errored with following Error ${error.message}`);
		}
	}
}

module.exports = LeaveEvent;
