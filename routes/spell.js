module.exports = function (app) {
    var mongoose = require('mongoose')
       , Spell = mongoose.model('Spell')
       , _ = require('underscore');

    app.get('/spell', function (req, res) {
        var page = (req.param('page') > 0 ? req.param('page') : 1) - 1
        var perPage = 30
        var options = {
            perPage: perPage,
            page: page
        }

        Spell.list(options, function (err, spells) {
            if (err) return res.render('500')

            Spell.count().exec(function (err, count) {
                res.render('spell/index', {
                    title: 'List of all spell ',
                    spells: spells,
                    page: page + 1,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
    });

    app.get('/spell/find/:id', function (req, res) {
        var id = req.params.id;
        Spell.load(id, function (err, spell) {
            if (err) return next(err)
            if (!spell) return next(new Error('not found'))
            res.render('spell/find', {
                title: spell.name ,
                spell: spell
            })
        })
    });

    app.get('/spell/create', function (req, res) {
        res.render('spell/create', { title: 'Create new spell ' })
    });

    app.post('/spell/create', function (req, res) {
        var spell = new Spell(req.body);

        spell.save();
        return res.redirect('/spell');
    });

    app.get('/spell/delete/:id', function (req, res, next) {
        var id = req.params.id;

        Spell.findByIdAndRemove(id, function (error) {
            res.redirect('/spell');
        });

    });
}
