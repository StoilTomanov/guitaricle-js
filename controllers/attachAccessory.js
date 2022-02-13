async function attachGet(req, res) {
    const id = req.params.id;

    try {
        const [guitar, accessories] = await Promise.all([
            req.storage.getById(id),
            req.storage.getAllAccessories()
        ]);

        const exitstingId = guitar.accessories.map(a => a.id.toString())
        const availableAccessories = accessories.filter(a => exitstingId.includes(a.id.toString()) == false)

        res.locals = {
            guitar,
            accessories: availableAccessories,
            title: "Attach accessory",
            userStatus: res.userStatus,
        };

        res.render('attachAccessory');
    } catch (error) {
        res.redirect('/404');
    }
}

async function attachPost(req, res) {
    const guitarId = req.params.id;
    const accessoryId = req.body.accessory;

    try {
        req.storage.attachAccessory(guitarId, accessoryId)
        res.redirect('/');
    } catch (error) {
        console.error('Error occure when creating the accessory');
        console.error(error.message);
        res.redirect('/attach/' + guitarId);
    }

}

module.exports = {
    attachGet,
    attachPost,
}