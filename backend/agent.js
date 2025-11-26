const fs = require("fs");
const readlineSync = require("readline-sync");
const dotenv = require("dotenv");
const groqSDK = require("groq-sdk");

const { sendEmail } = require("./Nodemailer");

dotenv.config();

const groq = new groqSDK({
	apikey: process.env.GROQ_API_KEY,
});

exports.generateEmail = async (req, res, userInput) => {
	try {
		

		// const userInput = readlineSync.question("Your input: ");

		// console.log("Generating...");
		const response = await groq.chat.completions.create({
			model: "llama-3.1-8b-instant",
			messages: [
				{
					role: "system",
					content:
						"You are an expert professional email writer. Write clear and polite emails.",
				},
				{
					role: "user",
					content: `Write a complete email based on this idea: ${userInput} and do not write subject.`,
				},
			],
		});

		const generatedEmailContent = response.choices[0].message.content;
		
		return generatedEmailContent;
		// return res.status(200).json({
		// 	success: true,
		// 	message: "Email content is generated.",
		// 	generatedEmailContent,
		// });



	} catch (e) {
		return res.status(500).json({
			success: false,
			message: "Internal server error.",
		});
	}
};
