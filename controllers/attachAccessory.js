const { getAllAccessories } = require("../services/accessories");

async function attachGet(req, res) {
    const id = req.params.id;
    const allAccessories = await await getAllAccessories();
    console.log(allAccessories);

    try {
        const guitar = await req.storage.getById(id);
        res.locals = {
            guitar,
            allAccessories,
            title: "Attach accessory",
        };

        res.render('attachAccessory');
    } catch (error) {
        res.redirect('/404');
    }
}

async function attachPost(req, res) {
    res.redirect('/');

}

module.exports = {
    attachGet,
    attachPost,
}