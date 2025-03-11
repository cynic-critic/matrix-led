const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.post('/update-matrix', async (req, res) => {
    try {
        const response = await axios.post(`${process.env.PI_API}/update-matrix`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error updating matrix:', error.message);
        res.status(500).send({ error: 'Failed to push matrix configuration to the Pi.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
