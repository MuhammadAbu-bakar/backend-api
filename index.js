const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(express.json());

// === DIRECTLY HARDCODED TWILIO CREDENTIALS ===
const accountSid = 'AC2be917b1fe6b58d1ec24a68bd2b4447d';
const authToken = '1b890839696cf850dd94ca857d1c67cf';
const fromNumber = 'whatsapp:+14155238886'; // Twilio sandbox number

const client = twilio(accountSid, authToken);

// === DIRECTLY HARDCODEED PORT ===
const PORT = 4000;
app.post('/send-whatsapp', async (req, res) => {
    console.log(req.body);
    try {
      const { phone, message } = req.body;
      if (!phone || !message) {
        return res.status(400).json({ error: 'Missing phone or message' });
      }
  
      const response = await client.messages.create({
        from: fromNumber,
        to: `whatsapp:${phone}`,
        body: message,
      });
  
      res.json({ success: true, sid: response.sid });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));