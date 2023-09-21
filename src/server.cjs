const express = require('express');
const app = express();
const port = 3001;

app.get('/fetch-website', async (req, res) => {
  try {
    const websiteUrl = 'https://www.sapo.pt'; // Replace with the target website URL
    const response = await axios.get(websiteUrl);
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching HTML:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});