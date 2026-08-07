# proxy.py - Secure proxy for Telegram orders
from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

# ===== LOAD FROM ENVIRONMENT VARIABLES (SECURE!) =====
BOT_TOKEN = os.environ.get("BOT_TOKEN")
if not BOT_TOKEN:
    raise ValueError("❌ BOT_TOKEN environment variable is not set!")

CHAT_ID = os.environ.get("CHAT_ID", "-1004377249202")

@app.route('/send', methods=['POST'])
def send_order():
    try:
        data = request.json
        message = data.get('message')
        
        if not message:
            return jsonify({"error": "No message provided"}), 400
        
        # Forward to Telegram
        url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
        payload = {
            "chat_id": CHAT_ID,
            "text": message,
            "parse_mode": "HTML"
        }
        
        response = requests.post(url, json=payload)
        return jsonify(response.json()), response.status_code
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"}), 200

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "service": "Hotpot Telegram Proxy",
        "status": "running",
        "endpoints": {
            "/send": "POST - Send message to Telegram",
            "/health": "GET - Check service health"
        }
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
