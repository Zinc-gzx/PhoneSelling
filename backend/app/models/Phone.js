const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserProfileSchema =  new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		brand: {
			required: true,
			type: String,
		},
		image: {
			type: String,
			default: "",
		},
		stock: {
			type: Number,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
		},
		seller: {
			type: String,
			default: "",
		},

		reviews: [],
		
		// reviews: {
		// 	type: [
		// 		{
		// 			reviewer: {
		// 				type: String,
		// 				required: true
		// 			},

		// 			rating: {
		// 				type: Number,
		// 				required: true
		// 			},

		// 			comment: {
		// 				type: String,
		// 				required: true
		// 			},

		// 			hidden: {
		// 				type: String,
		// 				required: false
		// 			}

		// 		}
		// 	],
		// 	required: false
		// },
			
	
		disabled: {
			type: String,
			required: false,

		},
		enabled: {
			type: String,
			required: false,

		},
	},
)
    
UserProfileSchema.statics.getPhoneById = async function (id, cb) {
	return this.find({ 
		seller: id,
	}).exec(cb);
};

UserProfileSchema.statics.getPhoneByPhoneId = async function (id, cb) {
	return this.findOne({ 
		_id: id,
	}).exec(cb);
};

UserProfileSchema.statics.deletePhone = async function (id, cb) {
	this.deleteOne({ 
		_id: id
    }).exec((err, instance) => {
        if (instance) {
			cb(null, instance);
			return;
        }
        cb(err);
    });
};

UserProfileSchema.statics.enablePhone = async function (instance, cb) {
	instance.enabled = '';
	instance.disabled = undefined;
    instance.save(cb);
};

UserProfileSchema.statics.disablePhone = async function (instance, cb) {
	instance.disabled = '';
	instance.enabled = undefined;
    instance.save(cb);
};


UserProfileSchema.statics.hideComment = async function (instance, index, cb) {
	instance.reviews[index].hidden = '';
    instance.save(cb);
};

UserProfileSchema.statics.showComment = async function (instance, index, cb) {
	instance.reviews[index].hidden = undefined;
    instance.save(cb);
};

UserProfileSchema.statics.insertPhone = async function(id, title, brand, image, stock, price, cb) {
    let phone = new this({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        brand: brand,
        image: image,
		stock: stock,
		seller: id,
        price: price,
        reviews: []
    });
    phone.save();
    cb(null, phone);
};


const Phone = mongoose.model("userProfile", UserProfileSchema);

module.exports = Phone;