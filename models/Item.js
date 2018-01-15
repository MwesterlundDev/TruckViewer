var keystone = require('keystone');
var Types = keystone.Field.Types;

var Item = new keystone.List('Item', {
	autokey: { from: 'name', path: 'slug' },
	searchFields: 'description',
});

Item.add({
	retailId: { type: String, initial: true, default: '', required: true },
	name: { type: String, initial: true, default: '', required: true },
	quantity: { type: Types.Number, initial: true, default: '', required: true },
	price: { type: Types.Money, format: '$0,0.00' },
	tags: { type: Types.Relationship, ref: 'Tag', many: true },
	createdAt: { type: Types.Datetime, default: Date.now },
});

Item.defaultSort = '-createdAt';

Item.relationship({ ref: 'Truck', refPath: 'items', path: 'items' });

// Call to register finalizes the model with any attirbutes and options we set.
Item.register();
