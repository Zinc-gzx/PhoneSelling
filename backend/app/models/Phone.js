const mongoose = require("mongoose");

module.exports = mongoose.model(
	"Phone",
	new mongoose.Schema(
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
			disabled: {
				type: String,
			},
		},
	)
);