# 🧠 AI Content Summarization - By: Bashar Shabani

AI Content Summarization is a Node.js REST API that uses Microsoft Azure’s AI Language service to generate extractive summaries from long-form text or web pages. It features analytics logging, live Swagger documentation, and full deployment with PM2 on DigitalOcean.

## 🌐 Live Demo

**Swagger UI (test the API in your browser):**  
🔗 http://157.245.90.220:3000/api-docs

## 🚀 Features

- ✨ Automatically summarizes text using Azure AI  
- 🌐 Can also summarize the content of a webpage via URL  
- 📊 Logs each request (timestamp, IP, word counts)  
- 📄 Built-in Swagger API documentation for testing  
- ☁️ Deployed on a public server using PM2 and DigitalOcean  

## 🧪 How to Test with Postman

You can test the API using [Postman](https://www.postman.com/downloads/) by following these steps:

### 🔹 Summarize Raw Text

- **Method:** `POST`  
- **URL:** `http://157.245.90.220:3000/api/summarize-text`  
- **Headers:**  
  `Content-Type: application/json`  
- **Body (raw JSON):**

```json
{
  "text": "Artificial Intelligence is a field of study focused on the creation of intelligent machines that work and react like humans. It includes learning, reasoning, and language understanding."
}
```

### 🔹 Summarize from URL

- **Method:** `POST`  
- **URL:** `http://157.245.90.220:3000/api/summarize-url`  
- **Headers:**  
  `Content-Type: application/json`  
- **Body (raw JSON):**

```json
{
  "url": "https://en.wikipedia.org/wiki/Artificial_intelligence"
}
```

### ✅ Example Response

```json
{
  "summary": "Artificial intelligence (AI) refers to the simulation of human intelligence processes by machines..."
}
```

You can also access the Swagger UI for in-browser testing:  
📄 http://157.245.90.220:3000/api-docs

## 🛠 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/AI-Content-Summarization.git
cd AI-Content-Summarization
```

### 2. Install Required Packages

```bash
npm install
```

### 3. Create a `.env` File

```env
AZURE_KEY=your-azure-key
AZURE_ENDPOINT=https://your-resource.cognitiveservices.azure.com/
AZURE_REGION=eastus
PORT=3000
```

> You'll need an Azure Language resource. You can create one at https://portal.azure.com.

### 4. Start the Server

```bash
node index.js
```

Once running, open your browser to:  
📄 http://localhost:3000/api-docs

## 📑 API Endpoints

### `POST /api/summarize-text`

Summarizes a block of plain text.

**Example Request:**

```json
{
  "text": "Artificial Intelligence is the field of study focused on the creation of intelligent machines..."
}
```

**Example Response:**

```json
{
  "summary": "Artificial Intelligence is the field of study focused on the creation of intelligent machines..."
}
```

### `POST /api/summarize-url`

Summarizes the main readable content from a given URL.

**Example Request:**

```json
{
  "url": "https://en.wikipedia.org/wiki/Artificial_intelligence"
}
```

**Example Response:**

```json
{
  "summary": "Artificial intelligence (AI) refers to the simulation of human intelligence..."
}
```

## 📊 Request Analytics

Each request is logged to `analytics.json` using `lowdb`.  
The log includes:  
- Type: `text` or `url`  
- Input length and summary length  
- Timestamp  
- IP address  

**Example Log Entry:**

```json
{
  "timestamp": "2025-05-01T22:17:10.000Z",
  "type": "text",
  "inputLength": 915,
  "summaryLength": 281,
  "ip": "::1"
}
```

## 🚀 Deploying to a Live Server with PM2

### 1. Upload or Clone to Your Droplet

```bash
git clone git@github.com:your-username/AI-Content-Summarization.git
cd AI-Content-Summarization
npm install
```

Create a `.env` file as shown above and add your Azure credentials.

### 2. Run the Server with PM2

```bash
pm2 start index.js --name smart-summary
pm2 save
pm2 startup
```

### 3. Open Firewall Port 3000

```bash
ufw allow 3000
```

You can now visit the deployed API at:  
🌐 http://157.245.90.220:3000/api-docs

## 🧰 Tech Stack

- **Node.js** – JavaScript runtime  
- **Express.js** – RESTful routing  
- **Azure AI Language** – Summarization engine  
- **Swagger UI** – Live documentation  
- **lowdb** – Request logging (JSON)  
- **PM2** – Background process manager  
- **DigitalOcean** – Hosting platform  
