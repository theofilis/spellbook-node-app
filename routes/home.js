module.exports = function (app) {

    // home page
    app.get('/', function (req, res) {
        res.render('index', { title: 'Home Page ' })
    });

    // about page
    app.get('/about', function (req, res) {
        res.render('about', { title: 'About Me.  ' })
    });
}
