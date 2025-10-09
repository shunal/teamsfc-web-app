const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(__dirname));

// Route for the reset password page
app.get('/auth/reset-password', (req, res) => {
  res.sendFile(path.join(__dirname, 'reset-password.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Reset password page available at http://localhost:${port}/auth/reset-password`);
}); 