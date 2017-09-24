const Commands = require('../../structures/new/Command.js');
const info = {
	name: 'restart',
	description: 'restart this Bot (only the Bot Owner can use this command!)',
	aliases: [],
	examples: ['restart']
};

class RestartCommand extends Commands {
	constructor(client, group) {
		super(client, info, group);
	}

	async run(msg) {
		const { client } = this;
		const permissionLevel = await msg.member.getPermissionsLevel(client);
		if (permissionLevel !== 0) return msg.react(this.client.emojis.get('361218228103675905'));
		await msg.react(this.client.emojis.get('361218217605070858'));
		this.client.log.debug('Restarting All Shards!');
		this.client.shard.broadcastEval('process.exit()');
	}
}

module.exports = RestartCommand;
