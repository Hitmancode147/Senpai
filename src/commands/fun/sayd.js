import discord  # noqa: F401
from discord.ext import commands

class sayd:
    """Sayyyyyy"""
	
	    def __init__(self, bot):
        self.bot = bot
	
    @checks.is_owner()
    @commands.command(name="sayd", pass_context=True)
    async def sayd(self, ctx, *, msg):
        """Ayyyy."""
		
            await self.bot.say(msg)
			
def setup(bot):
	bot.add_cog(sayd(bot))
