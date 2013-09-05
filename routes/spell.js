module.exports = function (app) {
    var mongoose = require('mongoose')
       , Spell = mongoose.model('Spell')
       , path = require('path')
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
                title: spell.name,
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

    app.get('/spell/edit/:id', function (req, res) {
        var id = req.params.id;

        Spell.load(id, function (err, spell) {
            if (err) return res.render('500');
            if (!spell) return res.render('500');

            res.render('spell/update', {
                title: 'Update spell ' + spell.name,
                spell: spell
            })
        })
    });

    app.post('/spell/edit/:id', function (req, res) {
        var id = req.params.id;

        Spell.load(id, function (err, spell) {
            if (err) return res.render('500');
            if (!spell) return res.render('500');

            spell.name = req.body.name;
            spell.school = req.body.school;
            spell.level = req.body.level;
            spell.components = req.body.components;
            spell.castingTime = req.body.castingTime;
            spell.range = req.body.range;
            spell.target = req.body.target;
            spell.effect = req.body.effect;
            spell.area = req.body.area;
            spell.duration = req.body.duration;
            spell.materialComponent = req.body.materialComponent;
            spell.xpcost = req.body.xpcost;
            spell.savingThrow = req.body.savingThrow;
            spell.spellResistance = req.body.spellResistance;
            spell.shortdescription = req.body.shortdescription;
            spell.references = req.body.references;

            spell.save(function (err) {
                if (err) { return res.render('500'); }

                return res.redirect('/spell/find/' + id);
            })
        })

    });
}
