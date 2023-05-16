const phoneModel = require("../models/Phone");

const userModel = require("../models/User");

const getPhoneUserData = async phoneList => {
	// Initially define a empty obj
	const list1 = [];

	// Iterate through all the data in the phone table to get seller to match the id in the user table to get all the information about the user
	for (const phone of phoneList) {
		// seller id to find user table
		const user = await userModel.findOne(
			{ _id: phone.seller },
			{ password: 0 }
		);
		list1.push({
			...phone._doc,
			seller: user,
		});
	}

	// store reviewer information
	const list2 = [];

	// Iterate through the list1 array from the first for loop, querying the user table in order to get the reviewer's information
	for (const phone of list1) {
		// obtain every phone's information
		const reviews = [];
	
		//reviews array including every comment, and every comment matches with a user id, literate throgh
		//this array and find user id(matching ecery comment), then to find user table gaining user information

		for (const review of phone.reviews) {
			// gain user id to find user table
			const user = await userModel.findOne(
				{ _id: review.reviewer },
				{ password: 0 }
			);
			reviews.push({
				...review,
				reviewer: user,
			});
		}
		list2.push({
			...phone,
			reviews,
		});

	
	}

	return list2;
};

class Controller {
	async getPhoneListAndBrands(req, res) {
		try {
			// Obtain all Phones
			const phoneList = await phoneModel.find({});
			
			// Gain user data
			const list = await getPhoneUserData(phoneList);
            
			// Gain brand
			const brands = phoneList.map(ele => ele.brand);
			const set = new Set(brands);

			const phoneListSoldOut = await phoneModel
                .find({
                    stock: { $gt: 0 },
                    disabled: null,
                })
                //Use the sort method to sort by stock in ascending order.
				// {stock: 1} indicates sorting in ascending inventory order.
                .sort({ stock: 1 })
                //Use the limit method to limit the number of results returned. 
				//the number of results returned is limited to 5, meaning that only the five phones with the least inventory are returned
                .limit(5);
			const listSoldOut = await getPhoneUserData(phoneListSoldOut);
			

			const phoneListBest = await phoneModel.find({
				disabled: null,
				stock: { $gt: 0 },
				reviews: { $exists: true },
				$where: "this.reviews.length>=2",
			});
			const list1 = [];
			
			const listWithUser = await getPhoneUserData(phoneListBest);


			for(let i = 0; i < listWithUser.length; i++) {
				let phone = listWithUser[i];
				let totalRating = 0;
				
				for(let j = 0; j < phone.reviews.length; j++) {
					totalRating += phone.reviews[j].rating;
				}
			
				let averageRating = totalRating / phone.reviews.length;

				averageRating = Number(averageRating.toFixed(2)); // rounding to 2 decimal places
			
				let phoneWithAverage = Object.assign({}, phone); // copying the phone object
				
				phoneWithAverage.average = averageRating; // adding the average rating
				
				list1.push(phoneWithAverage);
			}

			
			const list2 = list1.sort((a, b) => {
				return -(a.average - b.average);
			});

			
			const listBest = list2.slice(0,5);

			
			res.json({
				code: 200,
				msg: "ok",
				data: { 
					list,
					brands: Array.from(set),
					listSoldOut,
					listBest,
				},
			});
		} catch (err) {
			console.error(err);
			res.json({
				code: 500,
				msg: "error",
				data: {},
			});
		}
	}

    async updateComment(req, res) {
		try {
            let comment = req.body.comments;
            let rating = req.body.ratings;
            let reviewer = req.body.reviewers;
            let phoneID = req.body.phoneID;


            let phone = await phoneModel.findByIdAndUpdate(
                phoneID, 
                { $push: { reviews: { reviewer, rating, comment } } }, 
                { new: true, useFindAndModify: false } 
            );
    
            if (!phone) {
                return res.status(404).json({
                    code: 404,
                    msg: "Phone not found",
                    data: {},
                });
            }
        } catch (err) {
			console.error(err);
			req.json({
				code: 500,
				msg: "error",
				data: {},
			});
		}
    }


	async updateHide(req, res) {
		try {
            let reviewers_id = req.body.reviewers;
            let phoneID = req.body.phoneID;
			// if true set a hidden varible.
			let commentHide = req.body.commentHide;
           

			let phone = await phoneModel.findById(phoneID);

			if (!phone) {
				// Handle the case where the phone is not found
				return;
			}
           
	
			// Find the review
			let review = phone.reviews.find(review => review.reviewer.toString() === reviewers_id);
	
			if (!review) {
				// Handle the case where the review is not found
				return;
			}
			
			if (commentHide === true && !review.hasOwnProperty('hidden')) {
				// If commentHide is true and the review doesn't have a hidden property, add it
				review.hidden = '';
			} else if (commentHide === false && review.hasOwnProperty('hidden')) {
				// If commentHide is false and the review has a hidden property, remove it
				delete review.hidden;
			}

			phone.markModified('reviews');

	
			// Save the phone document
			await phone.save();

            
        } catch (err) {
			console.error(err);
			req.json({
				code: 500,
				msg: "error",
				data: {},
			});
		}
    }


async updateStock(req, res) {
	        try {
	            // Get from frontend
	            let phoneFromFrontEnd = req.body.phone;
	
	            let updatePromises = phoneFromFrontEnd.map(async (phone) => {
	                return phoneModel.findByIdAndUpdate(
	                    phone._id, //id of update reocrd
	                    { $set: { stock: phone.stock - phone.quantity} }, //what should be updated
	                    { new: true, useFindAndModify: false } 
	                );
	            });
	            
	            let updatedPhones = await Promise.all(updatePromises);
	            res.json({ code: 200, msg: "Success" });
	    
	        } catch (err) {
	            console.error(err);
	            req.json({
	                code: 500,
	                msg: "error",
	                data: {},
	            });
	        }
	    }
}

module.exports = new Controller();