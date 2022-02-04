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
    }
    res.redirect('/');
    await req.storage.createAccessory(accessory);
}

module.exports = {
    accessoryGet,
    accessoryPost,
}