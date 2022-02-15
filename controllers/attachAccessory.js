async function attachGet(req, res) {
    const id = req.params.id;

    try {
        const [guitar, accessories] = await Promise.all([
            req.storage.getById(id),
            req.storage.getAllAccessories()
        ]);

        if (guitar.owner != req.session.user.id) {
            return res.redirect('login')
        }

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
        console.error(error);
        res.redirect('/404');
    }
}

async function attachPost(req, res) {
    const guitarId = req.params.id;
    const accessoryId = req.body.accessory;

    try {
        if (await req.storage.attachAccessory(guitarId, accessoryId, req.session.user.id)) {
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
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