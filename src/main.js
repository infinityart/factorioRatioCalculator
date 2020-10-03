import './styles/style.scss';
import _ from 'lodash';
import { productsPromise, assembliesPromise } from './jsonContent';
import { createDesiredProductOption, createProducedFromSelect, clearProducedFromContainer } from './selectElements';

(async function () {
    const desiredProductElement = document.querySelector('#desiredProduct');
    const goalElement = document.querySelector('#goal');

    const products = await productsPromise;
    const assemblies = await assembliesPromise;

    let selectedProduct = null;
    let selectedProducedFrom = null;

    products.forEach(product => createDesiredProductOption(product));

    desiredProductElement.addEventListener('change', e => {
        const selectedProductId = parseInt(e.target.value);
        selectedProduct = _.find(products, ['id', selectedProductId]);

        clearProducedFromContainer();

        const producedFromSelectElement = createProducedFromSelect(assemblies);

        producedFromSelectElement.addEventListener('change', e => {
            const selectedProducedFromId = parseInt(e.target.value);
            selectedProducedFrom = _.find(assemblies, ['id', selectedProducedFromId]);

            render(selectedProduct, selectedProducedFrom);
        });

        tableReset();
    });

    goalElement.addEventListener('change', e => {
        render(selectedProduct, selectedProducedFrom);
    });

    function render(selectedProduct, selectedProducedFrom) {
        const { productsProduced, craftingTime } = selectedProduct;
        const { craftingSpeed } = selectedProducedFrom;
        const minuteInSeconds = 60;

        const itemsPerSecondElement = document.querySelector('#itemsPerSecond');
        const itemsPerMinuteElement = document.querySelector('#itemsPerMinute');

        const itemsPerSecond = productsProduced / craftingTime * craftingSpeed;
        const itemsPerMinute = itemsPerSecond * minuteInSeconds;

        itemsPerSecondElement.innerText = itemsPerSecond;
        itemsPerMinuteElement.innerText = itemsPerMinute;

        renderAssembliesNeeded(itemsPerMinute)
    }

    function renderAssembliesNeeded(itemsPerMinute) {
        const goalElement = document.querySelector('#goal');
        const assembliesNeededElement = document.querySelector('#assembliesNeeded')
        const goal = parseInt(goalElement.value);

        const assembliesNeeded = goal / itemsPerMinute;

        console.log(assembliesNeeded)

        assembliesNeededElement.innerText = assembliesNeeded.toFixed(2);
    }

    function tableReset() {
        const itemsPerSecondElement = document.querySelector('#itemsPerSecond');
        const itemsPerMinuteElement = document.querySelector('#itemsPerMinute');

        itemsPerSecondElement.innerText = '';
        itemsPerMinuteElement.innerText = '';
    }
}());