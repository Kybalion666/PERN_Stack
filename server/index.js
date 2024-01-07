import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import express from 'express'
import cors from'cors'
import sequelize from './database.js';
import router from './routes/main.js';
import models from './models/models.js';
import errorHandler from './middleware/errorMiddleware.js';
import fileUpload from 'express-fileupload';
import { dirname } from 'path'
import { fileURLToPath } from 'url';
import path from 'path'


    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename)
    const app = express()
    const PORT = 3000
app.use(express.json());
app.use(fileUpload({}))
app.use(cors())
app.use(express.static(path.resolve(__dirname,'static')))
app.use('/api',router)


app.use(errorHandler)

app.get('/',(req,res) => {
    res.status(200).json('working')
})
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};



start();





// const webAppUrl = 'https://1379-82-215-108-49.ngrok-free.app';
// const token = process.env.TELEGRAMM_BOT_TOKEN;

// const bot = new TelegramBot(token, { polling: true });

// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     const text = msg.text;
//     console.log(webAppUrl);
//     bot.sendMessage(chatId, 'hello', {
//         reply_markup: {
//             keyboard: [
//                 [
//                     {
//                         text: 'Запуск',
//                         web_app:{url:webAppUrl}
//                     }
//                 ]
//             ],
//             resize_keyboard: true // Добавлен параметр resize_keyboard для корректного отображения клавиатуры
//         }
//     });
// });
