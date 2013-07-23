module.exports = function (app) {
    var mongoose = require('mongoose')
       , Class = mongoose.model('Class')
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
                    title: 'Classes ',
                    classes: classes,
                    page: page + 1,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
    });

    app.get('/class/find/:id', function (req, res) {
        res.render('class/find', { title: 'Class Name ' })
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
