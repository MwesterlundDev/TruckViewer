var keystone = require('keystone');
var Types = keystone.Field.Types;

var Truck = new keystone.List('Truck', {
	autokey: { from: 'name', path: 'slug', unique: true },
	searchFields: 'description',
});

Truck.add({
	name: { type: String, initial: true, default: '', required: true },
	description: { type: Types.Textarea },
	price: { type: Types.Money, format: '$0,0.00' },
	tags: { type: Types.Relationship, ref: 'Tag', many: true },
	items: { type: Types.Relationship, ref: 'Item', many: true },
	createdAt: { type: Types.Datetime, default: Date.now },
});

Truck.defaultSort = '-createdAt';

Truck.schema.virtual('url').get(function () {
	return '/trucks/' + this.slug;
});

// Call to register finalizes the model with any attirbutes and options we set.
Truck.register();
