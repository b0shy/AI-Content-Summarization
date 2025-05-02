const { validationResult } = require('express-validator');
const { getSummaryFromText } = require('../services/azureService');
const axios = require('axios');
const sanitizeHtml = require('sanitize-html');
const logAnalytics = async (...args) => {
    const { logRequest } = await import('../db/analytics.mjs');
    return logRequest(...args);
  };
  

exports.summarizeText = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { text } = req.body;

  try {
    const summary = await getSummaryFromText(text);

    await logAnalytics({
        type: 'text',
        inputLength: text.length,
        summaryLength: summary.length,
        ip: req.ip,
      });
      
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to summarize text', details: error.message });
  }
};

exports.summarizeUrl = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { url } = req.body;

  try {
    const response = await axios.get(url);
    const rawText = sanitizeHtml(response.data, { allowedTags: [], allowedAttributes: {} });
    const text = rawText.slice(0, 4000);
    const summary = await getSummaryFromText(text);

    await logAnalytics({
        type: 'url',
        inputLength: text.length,
        summaryLength: summary.length,
        ip: req.ip,
      });
      

    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch or summarize URL', details: error.message });
  }
};
