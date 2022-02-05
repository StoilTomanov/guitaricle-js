async function attachGet(req, res) {
    const id = req.params.id;

    try {
        const [guitar, accessories] = await Promise.all([
            req.storage.getById(id),
            req.storage.getAllAccessories(),
        ]);
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
    console.log(req.params.id);
    console.log(req.body);
    res.redirect('/');

}

module.exports = {
    attachGet,
    attachPost,
}