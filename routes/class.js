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
                    title: 'Classes ',
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

            var zeros = Spell.list({criteria: {'level': { $regex: '.*' + dnclass.code + '\s0.*', $options: 'i' }}});
            var first = Spell.list({criteria: {'level': { $regex: '.*' + dnclass.code + '\s1.*', $options: 'i' }}});
            var seconds = Spell.list({criteria: {'level': { $regex: '.*' + dnclass.code + '\s2.*', $options: 'i' }}});
            var thirds = Spell.list({criteria: {'level': { $regex: '.*' + dnclass.code + '\s3.*', $options: 'i' }}});
            var fourths = Spell.list({criteria: {'level': { $regex: '.*' + dnclass.code + '\s4.*', $options: 'i' }}});
            var fifth = Spell.list({criteria: {'level': { $regex: '.*' + dnclass.code + '\s5.*', $options: 'i' }}});
            var sixth = Spell.list({criteria: {'level': { $regex: '.*' + dnclass.code + '\s6.*', $options: 'i' }}});
            var seventh = Spell.list({criteria: {'level': { $regex: '.*' + dnclass.code + '\s7.*', $options: 'i' }}});
            var eighth = Spell.list({criteria: {'level': { $regex: '.*' + dnclass.code + '\s8.*', $options: 'i' }}});
            var nineth = Spell.list({criteria: {'level': { $regex: '.*' + dnclass.code + '\s9.*', $options: 'i' }}});


            res.render('class/find', {
                title: dnclass.name,
                zeros: zeros,
                first:  first,
                seconds: seconds,
                thirds: thirds,
                fourths: fourths,
                fifth: fifth,
                sixth: sixth,
                seventh: seventh,
                eighth: eighth,
                nineth: nineth
            })
        })
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
