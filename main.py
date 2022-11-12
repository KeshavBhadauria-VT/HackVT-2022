# bot.py
import os
import discord
from discord.ext import commands

# from dotenv import load_dotenv

# load_dotenv()
# TOKEN = os.getenv('DISCORD_TOKEN')

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'We have logged in as {client.user}')

@client.event
async def on_ready():
    print('Connected to bot: {}'.format(client.user.name))
    print('Bot ID: {}'.format(client.user.id))

@client.command()
async def helloworld(ctx):
    await ctx.send('Hello World!')

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$hello'):
        await message.channel.send('Hello!')



client.run('MTA0MDc4NDQ0MzYzNzQ5Nzg4Ng.GQCLyi._BHhJnAQITVSxm53Q_doLB0gusFMJd_Wc9cCLs')