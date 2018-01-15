var keystone = require('keystone');

var debug = true;

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.data = {
		trucks: [],
	};

	view.on('init', function (next) {

		var q = keystone.list('Truck').paginate({
			page: req.query.page || 1,
			perPage: 5,
			maxPages: 5,
		}).populate('tags');

		q.exec(function (err, results) {
			if (debug) console.log('load trucks: ', results);
			locals.data.trucks = results;
			next(err);
		});
	});

	view.render('trucks/trucklist');

};
