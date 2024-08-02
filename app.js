const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const user_id = 'Zaid_20/06/2002';
    const email = 'zaidkhanmbad@gmail.com'; 
    const roll_number = 'RA2111026030195'; 

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid input' });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && typeof item === 'string');

    const highest_alphabet = alphabets.length ? [alphabets.sort((a, b) => b.localeCompare(a))[0]] : [];

    return res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_alphabet
    });
});

app.get('/bfhl', (req, res) => {
    return res.status(200).json({ operation_code: 1 });
});
