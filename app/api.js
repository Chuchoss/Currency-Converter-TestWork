import { getAllInfoByISO } from '../resources/currency.js';

export async function getData() {
  const response = await fetch(
  `https://www.cbr-xml-daily.ru/daily_json.js`
  );
  const result = await response.json();

  return result;
};

export function determineCurrency() {
  let language = window.navigator ? (window.navigator.language ||
  window.navigator.systemLanguage ||
  window.navigator.userLanguage) : 'ru';
  const languageAndCountryArray = language.split('-');
  const country = languageAndCountryArray.at(-1).toUpperCase();
  const currency = getAllInfoByISO(country).currency;

  return currency;
};