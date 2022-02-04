function accessoryGet(req, res) {
    res.locals = {
        title: "Create accessory",
    }
    res.render('createAccessory');
}

function accessoryPost(req, res) {
    res.redirect('/');
}

module.exports = {
    accessoryGet,
    accessoryPost,
}