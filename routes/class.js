module.exports = function (app) {
    var mongoose = require('mongoose')
       , Class = mongoose.model('Class')
       , Spell = mongoose.model('Spell')
       , _ = require('underscore');

    app.get('/class', function (req, res) {
        var page = (req.param('page') > 0 ? req.param('page') : 1) - 1
        var perPage = 30
        var options = {
            perPage: perPage,
            page: page
        }

        Class.list(options, function (err, classes) {
            if (err) return res.render('500')

            Class.count().exec(function (err, count) {
                res.render('class/index', {
                    title: 'List of all Classes',
                    classes: classes,
                    page: page + 1,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
    });

    app.get('/class/find/:id', function (req, res, next) {
        var id = req.params.id;

        Class.load(id, function (err, dnclass) {
            if (err) return res.render('500');
            if (!dnclass) return res.render('500');
            var options = {};
            Spell.list(options, function (err, classes) {

                var zeros = _.filter(classes, function (cl) { return new RegExp(dnclass.code + " 0", "i").test(cl.level); });
                var first = _.filter(classes, function (cl) { return new RegExp(dnclass.code + " 1", "i").test(cl.level); });
                var seconds = _.filter(classes, function (cl) { return new RegExp(dnclass.code + " 2", "i").test(cl.level); });
                var thirds = _.filter(classes, function (cl) { return new RegExp(dnclass.code + " 3", "i").test(cl.level); });
                var fourths = _.filter(classes, function (cl) { return new RegExp(dnclass.code + " 4", "i").test(cl.level); });
                var fifth = _.filter(classes, function (cl) { return new RegExp(dnclass.code + " 5", "i").test(cl.level); });
                var sixth = _.filter(classes, function (cl) { return new RegExp(dnclass.code + " 6", "i").test(cl.level); });
                var seventh = _.filter(classes, function (cl) { return new RegExp(dnclass.code + " 7", "i").test(cl.level); });
                var eighth = _.filter(classes, function (cl) { return new RegExp(dnclass.code + " 8", "i").test(cl.level); });
                var nineth = _.filter(classes, function (cl) { return new RegExp(dnclass.code + " 9", "i").test(cl.level); });

                res.render('class/find', {
                    title: dnclass.name,
                    dndclass: dnclass,
                    zeros: zeros,
                    first: first,
                    seconds: seconds,
                    thirds: thirds,
                    fourths: fourths,
                    fifth: fifth,
                    sixth: sixth,
                    seventh: seventh,
                    eighth: eighth,
                    nineth: nineth
                });
            });
        })
    });

    app.get('/class/delete/:id', function (req, res, next) {
        var id = req.params.id;

        Class.findByIdAndRemove(id, function (error) {
            res.redirect('/class');
        });

    });

    app.get('/class/create', function (req, res) {
        res.render('class/create', { title: 'Create new class ' })
    });

    app.post('/class/create', function (req, res) {
        var dndclass = new Class(req.body);

        dndclass.save();
        return res.redirect('/class');
    });

}
