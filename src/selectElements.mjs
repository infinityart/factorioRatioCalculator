const producedFromContainerElement = document.querySelector('#producedFromContainer');

export function createDesiredProductOption(product) {
    const desiredProductElement = document.querySelector('#desiredProduct');
    const option = document.createElement('option');

    option.innerText = product.name;
    option.value = product.id;

    desiredProductElement.append(option);
}

export const createProducedFromSelect = assemblies => {
    const producedFromSelectElement = document.createElement('select');

    const defaultOption = document.createElement('option');
    defaultOption.selected = true;
    defaultOption.disabled = true;
    defaultOption.innerText = 'Kies een assembly';

    producedFromSelectElement.append(defaultOption);

    assemblies.forEach(assembly => createProducedFromOption(producedFromSelectElement, assembly));

    producedFromContainerElement.append(producedFromSelectElement);

    return producedFromSelectElement;
}

export function clearProducedFromContainer() {
    producedFromContainerElement.childNodes.forEach(child => child.remove());
}

function createProducedFromOption(parent, assembly) {
    const option = document.createElement('option');

    option.innerText = assembly.name;
    option.value = assembly.id;

    parent.append(option)
}
