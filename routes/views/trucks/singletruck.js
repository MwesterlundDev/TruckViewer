var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'trucks';
	locals.data = {
		truck: {},
	};

	view.on('init', function (next) {
		var q = keystone.list('Truck').model.findOne({ slug: req.params.truckslug })
			.populate('tags items');

		q.exec(function (err, result) {
			if (result != null) {
				console.log('single truck result: ', result);
				locals.data.truck = result;
			} else {
				return res.status(404).send(keystone.wrapHTMLError('Sorry, this is not the truck you are looking for! (404)'));
			}

			next(err);
		});
	});

	// render the view
	view.render('trucks/singletruck');
};
