// api/send-telegram.js
export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get secrets from environment variables
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    const { message } = req.body;

    // Validate
    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    if (!BOT_TOKEN || !CHAT_ID) {
        return res.status(500).json({ error: 'Missing Telegram configuration' });
    }

    try {
        // Send to Telegram
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();

        if (data.ok) {
            res.status(200).json(data);
        } else {
            res.status(400).json({ error: data.description });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
