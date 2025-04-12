const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


let votes = {
    "JavaScript": 0,
    "Python": 0,
    "Java": 0,
    "CSharp": 0
};


app.post('/api/vote', (req, res) => {
    const { language } = req.body;
    if (votes.hasOwnProperty(language)) {
        votes[language]++;
        return res.json({ success: true, message: "Glas je zabilježen!" });
    } else {
        return res.status(400).json({ success: false, message: "Nepoznata opcija." });
    }
});

app.get('/api/results', (req, res) => {
    res.json(votes);
});

app.listen(PORT, () => {
    console.log(`Server je pokrenut na portu ${PORT}`);
});
