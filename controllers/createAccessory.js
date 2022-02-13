function accessoryGet(req, res) {
    res.locals = {
        title: "Create accessory",
        userStatus: res.userStatus,
    }
    res.render('createAccessory');
}

async function accessoryPost(req, res) {
    const accessory = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: Number(req.body.price),
        owner: req.session.user.id,
    };

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