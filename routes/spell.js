module.exports = function (app) {

    app.get('/spell', function (req, res) {
        res.render('spell/index', { title: 'List of spell ' })
    });

    app.get('/spell/find/:id', function (req, res) {
        res.render('spell/find', { title: 'Spell Name ' })
    });

    app.get('/spell/create', function (req, res) {
        res.render('spell/create', { title: 'Create new spell ' })
    });

}
