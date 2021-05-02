const $giveMoney = document.querySelector('#giveMoney');
const $getMoney = document.querySelector('#getMoney');
const $buttonChange = document.querySelector('.button-change');
const $giveCurrency = document.querySelector('#giveCurrency');
const $getCurrency = document.querySelector('#getCurrency');


const $modal = document.querySelector('#myModal');
const $close = document.querySelector('.close');
const $buttonModalChange = document.querySelector('.button-modal-change');
const $buttonCancel = document.querySelector('.button-cancel');
const $wallet = document.querySelector('.wallet');
const $name = document.querySelector('.name');
const $surname = document.querySelector('.surname');

//курсы валют
const currency = {
    EUR: {
        title: 'евро',
        USD: 1.21,
        RUB: 90.29,
        MLD: 21.39,
        RUP: 19.45,
        EUR: 1,
    },

    USD: {
        title: 'америкаснкий доллар',
        RUB: 74.36,
        EUR: 0.82,
        MLD: 17.80,
        RUP: 16.5,
        USD: 1,
    },

    RUB: {
        title: 'российский рубль',
        USD: 0.011,
        EUR: 0.013,
        MLD: 0.24,
        RUP: 0.2145,
        RUB: 1,
    },
    MLD: {
        title: 'молдавский лей',
        USD: 0.011,
        EUR: 0.013,
        RUB: 4.26,
        RUP: 0.92,
        MLD: 1,
    },
    RUP: {
        title: 'приднестровский рубль',
        USD: 0.06,
        EUR: 0.05,
        RUB: 4.66,
        MLD: 1.13,
        RUP: 1,
    }
}

const commission = 0.005;

//добавляем опции к селектам items - что добавляем, options - куда
const addOptions = (items, options) => {
    Object.entries(items).forEach(([key, value]) => options.insertAdjacentHTML('beforeend', `<option value="${key}" title="${value.title}">${key}</option> `));
};

//открывается модальное окно
$buttonChange.addEventListener('click', () => {
    if (getMoney.value) {
        $modal.style.display = "block";
    }

});

//закрытие модалки
window.addEventListener('click', (event) => {
    if (event.target == $modal || event.target == $close || event.target == $buttonCancel) {
        $modal.style.display = "none";
    }
    if (event.target == $buttonModalChange) {
        if ($wallet.value && $name.value && $surname.value) {
            alert('Обмен произведен!');
            $giveMoney.value = '';
            $getMoney.value = '';
            $modal.style.display = "none";
        } else {
            alert('Заполните все поля для обмена');
        }

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