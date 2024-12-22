from flask import Flask, request, jsonify
from flask_cors import CORS
from twilio.rest import Client
import urllib.parse



app = Flask(__name__)
CORS(app)

# Twilio configuration
TWILIO_ACCOUNT_SID = "ACb0e643cce1e546de6aa015bfc9459631"  # Replace with your actual SID
TWILIO_AUTH_TOKEN = "cd42484f8e3e753b9af99be1d782b670"    # Replace with your actual auth token
TWILIO_PHONE_NUMBER = "+13204414315"     # Your Twilio phone number

# WhatsApp Link Generator
@app.route('/generate_whatsapp_link', methods=['POST'])
def generate_whatsapp_link():
    try:
        data = request.json
        phone_number = data.get('phone_number')
        message = data.get('message')

        if not phone_number or not message:
            return jsonify({"error": "Phone number and message are required"}), 400

        # Encode message for URL
        encoded_message = urllib.parse.quote(message)
        whatsapp_link = f"https://wa.me/{phone_number}?text={encoded_message}"

        return jsonify({"link": whatsapp_link})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# SMS Sender
@app.route('/send_sms', methods=['POST'])
def send_sms():
    try:
        data = request.json
        phone_number = data.get('phone_number')
        message = data.get('message')

        if not phone_number or not message:
            return jsonify({"error": "Phone number and message are required"}), 400

        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body=message,
            from_=TWILIO_PHONE_NUMBER,
            to=phone_number
        )

        return jsonify({"status": "sent", "sid": message.sid})

    except Exception as e:
        return jsonify({"error": f"Error sending SMS: {str(e)}"}), 500

# Phone Caller
@app.route('/make_call', methods=['POST'])
def make_call():
    try:
        data = request.json
        phone_number = data.get('phone_number')

        if not phone_number:
            return jsonify({"error": "Phone number is required"}), 400

        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

        # Use a valid TwiML URL or create your own TwiML XML content
        call = client.calls.create(
            url="http://demo.twilio.com/docs/voice.xml",  # Placeholder for actual TwiML URL
            to=phone_number,
            from_=TWILIO_PHONE_NUMBER
        )

        return jsonify({"status": "calling", "sid": call.sid})

    except Exception as e:
        return jsonify({"error": f"Error initiating call: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
