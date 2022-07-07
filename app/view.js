function createFormTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.classList.add('title')
  appTitle.innerHTML = title;
  return appTitle;
}

function createSelectItem(valutes, selectId, localeInfo) {
  const select = document.createElement('select');
  const locale = localeInfo;
  select.classList.add('form-select');
  select.classList.add('js-choice');
  select.setAttribute('data-simplebar', true)
  select.id = selectId;

  for (let key in valutes) {
    const option = document.createElement('option');
    option.value = key;
    option.innerHTML = `${valutes[key].Name} ${key}`
    if (valutes[key].CharCode === locale)  {
      option.selected = true;
    };
    select.append(option);
  };

  return select;
};

function createInputItem(disabled, inputId) {
  const input = document.createElement('input');
  input.type = 'number';
  input.id = inputId;
  input.disabled = disabled;
  input.classList.add('form-control');
  
  return input;
}

function createRatesItem(valute, value) {
  const rate = document.createElement('div');
  const p = document.createElement('p');
  const span = document.createElement('span');

  p.classList.add('rate-text-top')
  rate.classList.add('rate', `rate-${valute}`);

  p.textContent = `Курс ${valute}`;
  span.textContent = `${value} руб.`;

  rate.append(p);
  rate.append(span)

  return rate;
};

function createInputControl(
  valutes, 
  disabled,
  selectId,
  inputId,
  controlText,
  locale,
) {
  const div = document.createElement('div');
  const span = document.createElement('span');
  const select = createSelectItem(valutes, selectId, locale);
  const input = createInputItem(disabled, inputId);

  span.textContent = controlText;

  span.classList.add('input-control-text');
  div.classList.add('input-control');
  div.append(span);
  div.append(select);
  div.append(input);

  return div;
};

function createForm(
  valutes, 
  ratesValute = ['USD', 'EUR', 'AZN'],
  locale
) {
  const container = document.querySelector('.container');
  const contentWrapper = document.createElement('div');
  const exchangeRates = document.createElement('div');
  const ratesWrapper = document.createElement('div');
  const inputsWrapper = document.createElement('div');
  const convertWrapper = document.createElement('div');


  const inputControlFrom = createInputControl(
    valutes, 
    false,
    'selectFrom',
    'inputFrom',
    'Отдаю:',
    locale,
  );
  const inputControlTo = createInputControl(
    valutes, 
    true,
    'selectTo',
    'inputTo',
    'Получаю:',
  );
  const ratesTitle = createFormTitle('Курсы валюты на сегодня')
  const convertTitle = createFormTitle('Конвертер валют')

  contentWrapper.classList.add('content-wrapper');
  convertWrapper.classList.add('converter-wrapper');
  exchangeRates.classList.add('exchange-rates');
  ratesWrapper.classList.add('rates-blocks');
  inputsWrapper.classList.add('inputs-wrapper');

  container.append(contentWrapper);
  contentWrapper.append(exchangeRates);
  exchangeRates.append(ratesTitle)
  exchangeRates.append(ratesWrapper)
  
  ratesValute.map(valute => {
    for (let key in valutes) {
      if (valute === key) {
        const value = valutes[key].Value.toFixed(3);
        const rateBlock = createRatesItem(valute, value);
        ratesWrapper.append(rateBlock);
      }
    }
  })

  contentWrapper.append(convertWrapper);
  convertWrapper.append(convertTitle);
  convertWrapper.append(inputsWrapper);
  inputsWrapper.append(inputControlFrom);
  inputsWrapper.append(inputControlTo);
};

export { createForm };
