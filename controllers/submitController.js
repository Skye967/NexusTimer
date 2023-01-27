const User = require("../models/User");
const CubeTime = require("../models/CubeTime");

exports.newTime_post = async (req, res) => {
	console.log(req.user)
	const { time, category } = req.body;
	const newTime = new CubeTime({
		time, 
		category, 
		author: req.user.id
	})
	await newTime.save()
	res.redirect("/profile")
}

exports.deleteTime = async (req, res) => {
	try {
		const { id } = req.params;
		
		const deleteTimeId = await CubeTime.findById(id);
		if (!deleteTimeId.author.equals(req.user.id)) {
			throw new Error("That is not your time")
		}
		await deleteTimeId.remove();
		res.redirect("/profile")
	} catch (error) {
		console.log(error)
		res.redirect("/profile")
	}
}