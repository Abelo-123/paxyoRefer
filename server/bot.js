// Import the Telegram Bot API library
const TelegramBot = require('node-telegram-bot-api');

// Replace '<YOUR_BOT_TOKEN>' with your bot's token from BotFather
const bot = new TelegramBot('7990081216:AAHDJ9rdWehJYM4iAakEub3O2082DsQla_M', { polling: true });

// Listen for /start commands with parameters
bot.onText(/\/start (.+)/, (msg, match) => {
    const chatId = msg.chat.id; // The ID of the user chatting with the bot
    const param = match[1]; // Extracted parameter from the deep link

    // Respond to the user
    bot.sendMessage(chatId, `You started with parameter: ${param}`);
});
