module.exports = Object.freeze({
    PROTOCOL: 'http://', // протокол
    TIME_LIFE_TOKEN: 259200, // время жизни токена (72 часа)
    SECRET_STRING: "OJ5cIMkraDqoGfVv6dyYu7wDF", // секретная строка (для токена) - !!! нужно из переменной окружения
    MIN_LENGTH_CAREGIVER_PASSWORD: 5, // минимальная длина пароля caregiver
    MAX_LENGTH_CAREGIVER_PASSWORD: 30, // максимальная длина пароля caregiver
    MONEY_GAME_SETTINGS: {
        backBtn: "/applications/money_game/backBtn/1.png",
        progressBar: false,
        nextBtn: "/applications/money_game/nextBtn/1.png",
        againBtn: "/applications/money_game/againBtn/1.png",
        wallet: "/applications/money_game/wallet/1.png",
        basket: "/applications/money_game/basket/1.png"
    },
    MONEY_GAME_SECOND_SETTINGS: {
        backBtn: "/applications/money_game_second/backBtn/1.png",
        progressBar: false,
        nextBtn: "/applications/money_game_second/nextBtn/1.png",
        againBtn: "/applications/money_game_second/againBtn/1.png",
        wallet: "/applications/money_game_second/wallet/1.png",
        basket: "/applications/money_game_second/basket/1.png",
        correctChoice: "/applications/money_game_second/correctChoice/1.png",
        incorrectChoice: "/applications/money_game_second/incorrectСhoice/1.png",
        textChoice: "Some text",
        showTextChoise: false,
        backgroundColor: "#ffffff"
    },
});
