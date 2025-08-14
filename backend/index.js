const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Enable CORS
app.use(cors());

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Optional: Static files (CSS, JS for EJS if needed)
app.use(express.static(path.join(__dirname, 'public')));

// In-memory packages data
const packages = [
  {
    id: '1',
    slug: 'goa-beach-retreat',
    title: 'Goa Beach Retreat',
    description: '3 nights in Goa with luxury resort stay',
    price: 18999,
    deeplink: 'https://holidayz.makemytrip.com/holidays/india/search?packageIds=58865'
  },
  {
    id: '2',
    slug: 'kerala-backwater-tour',
    title: 'Kerala Backwater Tour',
    description: 'Houseboat tour in Kerala with nature view',
    price: 22999,
    deeplink: 'https://holidayz.makemytrip.com/holidays/india/search?packageIds=60765'
  },
];

// SSR route - renders full HTML using EJS
app.get('/package/:slug', (req, res) => {
  const pkg = packages.find(p => p.slug === req.params.slug);
  if (!pkg) return res.status(404).send('Package not found');
  res.render('package', { pkg });
});

app.get('/', (req, res) => {
  res.send('Welcome to Backend');
});

// JSON APIs
app.get('/api/package/:slug', (req, res) => {
  const pkg = packages.find(p => p.slug === req.params.slug);
  if (pkg) res.json(pkg);
  else res.status(404).json({ error: 'Package not found' });
});

app.get('/api/random-package', (req, res) => {
  const randomPackage = packages[Math.floor(Math.random() * packages.length)];
  res.json(randomPackage);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
