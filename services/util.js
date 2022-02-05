function guitarViewModel(guitar) {
    const model = {
        id: guitar._id,
        name: guitar.name,
        description: guitar.description,
        price: guitar.price,
        imageUrl: guitar.imageUrl,
        accessories: guitar.accessories,
    }
    if (model.accessories.length > 0 && model.accessories[0].name) {
        model.accessories = model.accessories.map(accessoryViewModel);
    }
    return model;

}

function accessoryViewModel(accessory) {
    return {
        id: accessory._id,
        name: accessory.name,
        description: accessory.description,
        imageUrl: accessory.imageUrl,
        price: accessory.price,
    }
}

module.exports = {
    guitarViewModel,
    accessoryViewModel,
}