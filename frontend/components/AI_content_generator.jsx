import React, { useState } from "react";

function AI_content_generator() {
    const [userPromt, setuserPromt] = useState("");
    const [contentGenerated, setcontentGenerated] = useState("");
    const [receiverEmail, setreceiverEmail] = useState("");
    const [subject, setsubject] = useState("");
    const [emailStatus, setEmailStatus] = useState(null); // success / fail

    const handleGeneratePromt = async () => {
        const response = await fetch("http://localhost:5000/api/generate-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput: userPromt }),
        });

        const content = await response.json();
        setcontentGenerated(content.response);
    };

    const handleSendEmail = async () => {
        if (contentGenerated.length === 0 || receiverEmail.length === 0) return;

        const response = await fetch("http://localhost:5000/api/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                to: receiverEmail,
                subject: subject,
                emailContent: contentGenerated,
            }),
        });

        const res = await response.json();
        console.log(res)
        if (res.success) {
            setEmailStatus("success");
        } else {
            setEmailStatus("error");
        }

        setTimeout(() => setEmailStatus(null), 3000); // hide after 3 sec
    };

    return (
        <div className="ai-box">

            <h2 className="title">AI agent for Email Generating and sending</h2>

            {emailStatus === "success" && (
                <div className="alert success">Email Sent Successfully ✅</div>
            )}

            {emailStatus === "error" && (
                <div className="alert error">Failed to send email ❌</div>
            )}

            {/* Prompt Input */}
            <textarea
                className="prompt-box"
                value={userPromt}
                onChange={(e) => setuserPromt(e.target.value)}
                placeholder="Enter the prompt to generate the email..."
            />

            <button className="btn generate" onClick={handleGeneratePromt}>
                Generate Email
            </button>

            {/* Receiver Email */}
            <input
                className="input-field"
                type="email"
                placeholder="Receiver Email"
                value={receiverEmail}
                onChange={(e) => setreceiverEmail(e.target.value)}
            />

            {/* Subject */}
            <input
                className="input-field"
                type="text"
                placeholder="Email Subject"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}
            />

            {/* Generated Email */}
            <textarea
                className="generated-box"
                value={contentGenerated}
                onChange={(e) => setcontentGenerated(e.target.value)}
                placeholder="Generated email will appear here..."
            />

            <button className="btn send" onClick={handleSendEmail}>
                Send Email
            </button>
        </div>
    );
}

export default AI_content_generator;
