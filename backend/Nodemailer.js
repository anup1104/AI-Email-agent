const nodemailer = require("nodemailer");

exports.sendEmail = async (to, subject, message, req, res) => {
	try{
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.GMAIL_USER,
			pass: process.env.GMAIL_PASS,
		},
	});
	const mailDetails = {
		from: process.env.GMAIL_USER,
		to: to,
		subject: subject,
		text: message,
	};
	console.log("Nodemailer file reached")
	await transporter.sendMail(mailDetails);
	console.log("After the nodemailer senmail function")
	// console.log("Email sent");
}
	catch(e){
		console.log("SMTP error");
	}
};
