function accessoryGet(req, res) {
    res.locals = {
        title: "Create accessory",
    }
    res.render('createAccessory');
}

async function accessoryPost(req, res) {
    const accessory = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
    }
    try {
        await req.storage.createAccessory(accessory);
        res.redirect('/');
    } catch (error) {
        console.error('Error occure when creating the accessory');
        console.error(error.message);
        res.redirect('/accessory');
    }

}

module.exports = {
    accessoryGet,
    accessoryPost,
}