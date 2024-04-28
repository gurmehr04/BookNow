const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// POST to handle booking
app.post('/confirm-booking', (req, res) => {
    
    const { numTickets, movieName, selectedCity } = req.body;

    console.log('Received booking confirmation request:', req.body);

    const bookingDetails = {
        numTickets,
        movieName,
        selectedCity,
        confirmationNumber: Math.floor(Math.random() * 1000000)
    };

    const doc = new PDFDocument();

    
    doc.text('Booking Confirmation');
    doc.moveDown();
    doc.text(`Movie: ${bookingDetails.movieName}`);
    doc.moveDown();
    doc.text(`Number of Tickets: ${bookingDetails.numTickets}`);
    doc.moveDown();
    doc.text(`Selected City: ${bookingDetails.selectedCity}`);
    doc.moveDown();
    doc.text(`Confirmation Number: ${bookingDetails.confirmationNumber}`);

    // Sending PDF back
    res.status(200).json({ bookingConfirmation });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="booking_confirmation.pdf"');
    doc.pipe(res);
    doc.end();

    console.log('Booking confirmed:', bookingDetails);
});
// GET to download  PDF
app.get('/download-pdf', (req, res) => {
    const pdfPath = `${__dirname}/booking_confirmation.pdf`;
    
    fs.readFile(pdfPath, (err, data) => {
        if (err) {
            console.error('Error reading PDF file:', err);
            return res.status(500).send('Error reading PDF file');
        }
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="booking_confirmation.pdf"');
        res.send(data);
    });


});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
