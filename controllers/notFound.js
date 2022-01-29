function notFound(req, res) {
    res.locals = {
        title: "Guitaricle",
    }
    res.render('404');
}

module.exports = {
    notFound,
}