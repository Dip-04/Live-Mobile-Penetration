import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const App = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [message, setMessage] = useState("");
    const [whatsappLink, setWhatsappLink] = useState("");
    const [smsStatus, setSmsStatus] = useState("");
    const [callStatus, setCallStatus] = useState("");

    // Generate WhatsApp link
    const generateWhatsAppLink = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/generate_whatsapp_link", {
                phone_number: phoneNumber,
                message: message,
            });
            setWhatsappLink(response.data.link);
        } catch (error) {
            console.error("Error generating WhatsApp link", error);
        }
    };

    // Send SMS
    const sendSms = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/send_sms", {
                phone_number: phoneNumber,
                message: message,
            });
            setSmsStatus("SMS sent successfully! SID: " + response.data.sid);
        } catch (error) {
            setSmsStatus("Error sending SMS.");
            console.error("Error sending SMS", error);
        }
    };

    // Make a phone call
    const makeCall = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/make_call", {
                phone_number: phoneNumber,
            });
            setCallStatus("Call initiated successfully! SID: " + response.data.sid);
        } catch (error) {
            setCallStatus("Error initiating call.");
            console.error("Error initiating call", error);
        }
    };

    return (
        <div
            style={{
                padding: "20px",
                backgroundColor: "#121212",
                color: "#00FF00",
                fontFamily: "'Courier New', Courier, monospace",
                minHeight: "100vh", // Ensures footer stays at the bottom
                display: "flex",
                flexDirection: "column",
            }}
        >
            <h1 className="text-center">Live Mobile Penetration</h1>
            <div className="mb-3">
                <label className="form-label">Phone Number:</label>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone number"
                    className="form-control"
                    style={{
                        backgroundColor: "#1E1E1E",
                        borderColor: "#00FF00",
                        color: "#00FF00",
                    }}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Message:</label>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message"
                    className="form-control"
                    style={{
                        backgroundColor: "#1E1E1E",
                        borderColor: "#00FF00",
                        color: "#00FF00",
                    }}
                />
            </div>
            <div className="d-grid gap-2">
                <button
                    onClick={generateWhatsAppLink}
                    className="btn btn-outline-success"
                    style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                    }}
                >
                    Generate WhatsApp Link
                </button>
            </div>
            {whatsappLink && (
                <div className="mt-3">
                    <p>WhatsApp Link:</p>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-success"
                    >
                        {whatsappLink}
                    </a>
                </div>
            )}

            <div className="mt-3">
                <button
                    onClick={sendSms}
                    className="btn btn-outline-warning"
                    style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                    }}
                >
                    Send SMS
                </button>
                {smsStatus && (
                    <p className="text-warning mt-2">{smsStatus}</p>
                )}
            </div>

            <div className="mt-3">
                <button
                    onClick={makeCall}
                    className="btn btn-outline-danger"
                    style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                    }}
                >
                    Make Phone Call
                </button>
                {callStatus && (
                    <p className="text-danger mt-2">{callStatus}</p>
                )}

            </div>

            {/* Footer */}
            <div
                className="mt-auto text-center py-3"
                style={{
                    backgroundColor: "#1E1E1E",
                    color: "#00FF00",
                    fontFamily: "'Courier New', Courier, monospace",
                }}
            >
                <p>© Diptish-World 2024</p>
            </div>
        </div>
    );
};

export default App;
