import { createForm } from './view.js';
import { getData, determineCurrency } from './api.js';

export function createApp() {
	(async () => {
		const locale = determineCurrency();
		let data = await getData();
		let valutes = data.Valute;

		createForm(valutes, ['USD', 'EUR', 'KZT'], locale);

		const selectFrom = document.getElementById('selectFrom');
		const selectTo = document.getElementById('selectTo');
		const inputFrom = document.getElementById('inputFrom');
		const inputTo = document.getElementById('inputTo');

		let selectFromValue = selectFrom.value;
		let selectToValue = selectTo.value;
		let value = inputFrom.value;	

		//Функция для нахождения в объекте валюты в рублях
		function findValue(value) {
			for (let key in valutes) {
				if (key === value){
					return valutes[key].Value.toFixed(3);
				};
			};
		};

		//Рассчитваем кросс курс по отношению к рублю
		function calcCrossCourse(value) {
			const firstValute = findValue(selectFromValue);
			const secondValute = findValue(selectToValue);
			const crossCourse = (value * firstValute / secondValute).toFixed(2);
			inputTo.value = crossCourse;
			return crossCourse;
		};

		//Функция расчёта валюты
		function calcValue() {
			selectFromValue = selectFrom.value;
			selectToValue = selectTo.value;
			value = inputFrom.value;
			return calcCrossCourse(value);
		};

		//Ставим задержу на отображение value
		function debounce(func, timeout = 300){
			let timer;
			return (...args) => {
			  clearTimeout(timer);
			  timer = setTimeout(() => { func.apply(this, args); }, timeout);
			};
		  };

		function saveInput(){
			calcCrossCourse(inputFrom.value);
		};

		const processChange = debounce(() => saveInput());

		selectFrom.addEventListener('change', calcValue);
		selectTo.addEventListener('change', calcValue);
		inputFrom.addEventListener('input', processChange);

		//Подключение библиотеки choices
		const multiDefault = () => {
			const elements = document.querySelectorAll('.js-choice');
			elements.forEach(el => {
			  const choices = new Choices(el, {
				searchEnabled: true,
				noResultsText: 'Валюта не найдена',
				position: 'bottom',
			  });
			});
		  };
		  multiDefault();
	})();
  };


