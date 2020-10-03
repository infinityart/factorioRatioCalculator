
async function getJSONContent(jsonFileName) {
    const dataFolder = './static/';
    const response = await fetch(dataFolder + jsonFileName + '.json');

    return response.json();
}

export const productsPromise = getJSONContent('products');
export const assembliesPromise = getJSONContent('assemblies')