var keystone = require('keystone');

var Tag = new keystone.List('Tag', {
	autokey: { from: 'name', path: 'slug', unique: true },
});

Tag.add({
	name: { type: String, required: true },
});

Tag.relationship({ ref: 'Truck', refPath: 'tags', path: 'tags' });
Tag.relationship({ ref: 'Item', refPath: 'tags', path: 'tags' });
Tag.register();
