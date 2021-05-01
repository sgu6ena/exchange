const $giveMoney = document.querySelector('#giveMoney');
const $getMoney = document.querySelector('#getMoney');
const $buttonChange = document.querySelector('.button-change');
const $giveCurrency = document.querySelector('#giveCurrency');
const $getCurrency = document.querySelector('#getCurrency');

//курсы валют
const currency = {
    EUR: {
        USD: 1.21,
        RUB: 90.29,
        EUR: 1,
    },

    USD: {
        RUB: 74.36,
        EUR: 0.82,
        USD: 1,
    },

    RUB: {
        USD: 0.011,
        EUR: 0.013,
        RUB: 1,
    },
}

const commission = 0.005;

//добавляем опции к селектам items - что добавляем, options - куда
const addOptions = (items, options) => {
    Object.entries(items).forEach(([key]) => options.insertAdjacentHTML('beforeend', `<option value="${key}">${key}</option> `));
};
//заполняем валюты из курсов валют
addOptions(currency, $giveCurrency);
addOptions(currency, $getCurrency);

$giveMoney.addEventListener('input', () => {
    if ($giveMoney.value) {
        $getMoney.value = ($giveMoney.value * currency[$giveCurrency.value][$getCurrency.value] * (1 - commission)).toFixed(2);
    } else {
        $getMoney.value = '';
    }
})

$getMoney.addEventListener('input', () => {
    if ($getMoney.value) {
        $giveMoney.value = ($getMoney.value * currency[$getCurrency.value][$giveCurrency.value] * (1 + commission)).toFixed(2);
    } else {
        $giveMoney.value = '';
    }
})
