const express = require("express");
const cors = require("cors");

const { sendEmail } = require("./Nodemailer");
const { generateEmail } = require("./agent");

const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/send-email", async (req, res) => {
	const { to, subject, emailContent } = req.body;
	try {
		await sendEmail(to, subject, emailContent);
		return res.status(200).json({
			success: true,
			message: "Email sent",
		});
	} catch (e) {
		return res.status(500).json({
			success: false,
			message: "Server error occured.",
		});
	}
});

app.post("/api/generate-email", async (req, res) => {
	const { userInput } = req.body;
	try {
		const response = await generateEmail(req, res, userInput);
		return res.status(200).json({
			success: true,
			message: "Email content generated",
			response,
		});
	} catch (e) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

app.listen(process.env.PORT, () => {
	console.log("The server is running on Port: ", process.env.PORT);
});

