import models from "../models/models.js";
import ApiError from "../error/Error.js";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class ProductController { 
    async create(req, res, next) {
        let fileName = ''
        try {
            let { name, price, info } = req.body; // Извлекаем данные из запроса 
            if (req.files && req.files.img) {
                const { img } = req.files;
                fileName = uuidv4() + '.jpg'; // Добавляем расширение .jpg к имени файла
                const filePath = path.resolve(__dirname, '..','static', fileName); // Замените 'путь_к_static' на корректный путь
    
                img.mv(filePath)
                // Ваш код обработки файла img здесь
            } else {
                throw new Error("Файл img не был предоставлен в запросе.");
            }
           ;

            const product = await models.Product.create({ name, price, img: fileName });

            if (info) {
                info = JSON.parse(info);
                info.forEach(i => 
                    models.ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                );
            }

            return res.json(product);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        // Ваш код для получения всех продуктов
    }

    async getOne(req, res) {
        // Ваш код для получения одного продукта
    }
}
