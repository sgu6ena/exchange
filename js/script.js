const $giveMoney = document.querySelector('#giveMoney');
const $getMoney = document.querySelector('#getMoney');
const $buttonChange = document.querySelector('.button-change');
const $giveCurrency = document.querySelector('#giveCurrency');
const $getCurrency = document.querySelector('#getCurrency');


const $modal = document.getElementById("myModal");
const $close = document.getElementsByClassName("close")[0];

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

//открывается модальное окно
$buttonChange.addEventListener('click', () => {
    $modal.style.display = "block";
});

//закрытие модалки
window.addEventListener('click', (event) => {
    if (event.target == $modal || event.target == $close) {
        $modal.style.display = "none";
    }
});

//обмен валюты: сумма, валютаИЗ, валютаВ, комиссия
const changeMoney = (giveMoney, giveCurrency, getCurrency, commission) => {
    if (giveMoney) {
        return (giveMoney * currency[giveCurrency][getCurrency] * commission).toFixed(2);
    } else {
        return '';

    }
}


//заполняем валюты из курсов валют
addOptions(currency, $giveCurrency);
addOptions(currency, $getCurrency);

//пересчет при вводе суммы в вы отдаете
$giveMoney.addEventListener('input', () => {
    $getMoney.value = changeMoney($giveMoney.value, $giveCurrency.value, $getCurrency.value, (1 - commission))
});
//пересчет при смене валют
$giveCurrency.addEventListener('input', () => {
    $getMoney.value = changeMoney($giveMoney.value, $giveCurrency.value, $getCurrency.value, (1 - commission))
});

$getCurrency.addEventListener('input', () => {
    $getMoney.value = changeMoney($giveMoney.value, $giveCurrency.value, $getCurrency.value, (1 - commission))
});
//пересчет при вводе суммы в вы получаете
$getMoney.addEventListener('input', () => {
    $giveMoney.value = changeMoney($getMoney.value, $getCurrency.value, $giveCurrency.value, (1 + commission))
});





const getCurrency = () => {
    curencyURL = 'https://www.cbr-xml-daily.ru/daily_json.js';
    fetch(curencyURL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });


}
getCurrency();