const MoneyGame = require("../../../../../models/money_game");
const fs = require('fs');

exports.post = async function (req, res) {
    try {

        let moneyGame = await MoneyGame.findOne({ pid_id: res.pidId }, { 'currency': 1, _id: 0 });
        let currencyPath = `./public/system_images/currency/${moneyGame.currency}`;
        let currentCurrency = {};

        // пройдемся по типам валюты (монеты/банкноты)
        fs.readdirSync(currencyPath).forEach(typeCurrency => {
            currentCurrency[`${typeCurrency}`] = [];

            // сформируем массивы для каждого типа
            fs.readdirSync(`${currencyPath}/${typeCurrency}`).forEach(currency => {

                let count = currency.split('.')[0];
                count = count.replace(',', '.');

                let currencyObject = {
                    count: Number(count),
                    image: `${req.headers.host}/system_images/currency/${moneyGame.currency}/${typeCurrency}/${currency}`
                }

                currentCurrency[`${typeCurrency}`].push(currencyObject);
            });
        });

        // отсортируем для каждого типа по возрастанию
        for (let typeCurrency in currentCurrency) {
            currentCurrency[`${typeCurrency}`].sort(function (a, b) {
                return a.count - b.count
            });
        }
   
        currentCurrency.currency = moneyGame.currency;

        res.status(200).send(
           currentCurrency
        );
    } catch (err) {
        throw err;
    }
}
