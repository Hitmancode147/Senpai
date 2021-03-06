const { ShardingManager } = require('discord.js');
const { bottoken } = require('./config/config.json');
const Economy = require('./structures/new/Economy.js');
const Manager = new ShardingManager('./main.js',
	{
		totalShards: 'auto',
		respawn: true,
		token: bottoken
	});
// Spawn shards
Manager.spawn();

// Economy Bank update
Economy.bankUpdate();


Manager.on('launch', shard => {
	console.log(`Shard spawned with ID ${shard.id}`);
});

// When the shard sends a message with process.send, this will get it.
Manager.on('message', (Shard, message) => {
	console.log('[TO MANAGER]:', require('util').inspect(message));
	if (!message.b) { Shard.send('Welcome! -manager'); } else {
		Shard.send({
			obj: 'hi all',
			b: message.b
		});
	}
});
