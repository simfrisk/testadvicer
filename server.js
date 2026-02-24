const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const ADSERVER_URL = process.env.ADSERVER_URL || 'https://simonsteam-testadserver.eyevinn-test-adserver.auto.prod.osaas.io';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Proxy: get VAST XML
app.get('/api/vast', async (req, res) => {
  const params = new URLSearchParams(req.query);
  try {
    const response = await fetch(`${ADSERVER_URL}/api/v1/vast?${params}`);
    const text = await response.text();
    res.set('Content-Type', 'application/xml');
    res.send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Proxy: get VMAP XML
app.get('/api/vmap', async (req, res) => {
  const params = new URLSearchParams(req.query);
  try {
    const response = await fetch(`${ADSERVER_URL}/api/v1/vmap?${params}`);
    const text = await response.text();
    res.set('Content-Type', 'application/xml');
    res.send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Proxy: list sessions
app.get('/api/sessions', async (req, res) => {
  try {
    const response = await fetch(`${ADSERVER_URL}/api/v1/sessions`);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Proxy: get session
app.get('/api/sessions/:id', async (req, res) => {
  try {
    const response = await fetch(`${ADSERVER_URL}/api/v1/sessions/${req.params.id}`);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Proxy: get session events
app.get('/api/sessions/:id/events', async (req, res) => {
  try {
    const response = await fetch(`${ADSERVER_URL}/api/v1/sessions/${req.params.id}/events`);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Proxy: get session VAST
app.get('/api/sessions/:id/vast', async (req, res) => {
  try {
    const response = await fetch(`${ADSERVER_URL}/api/v1/sessions/${req.params.id}/vast`);
    const text = await response.text();
    res.set('Content-Type', 'application/xml');
    res.send(text);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Ad server: ${ADSERVER_URL}`);
});
