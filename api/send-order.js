// api/send-order.js
// This is a placeholder - the actual sending happens via GitHub Actions

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ ok: false, error: 'Missing message' });
  }

  // For GitHub Pages, we use a different approach
  // See: .github/workflows/send-order.yml

  return res.status(200).json({ 
    ok: true, 
    message: 'Order received! Please use GitHub Actions to send.' 
  });
}
