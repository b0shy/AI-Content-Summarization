import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

// Handle __dirname in ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ensure db directory exists
const dbDir = path.join(__dirname)
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir)

// Define file path and adapter
const file = path.join(__dirname, 'analytics.json')
const adapter = new JSONFile(file)

// ✅ FIX: Pass defaultData into Low constructor
const defaultData = { logs: [] }
const db = new Low(adapter, defaultData)

await db.read()
await db.write()

export async function logRequest({ type, inputLength, summaryLength, ip }) {
  await db.read()
  db.data.logs.push({
    timestamp: new Date().toISOString(),
    type,
    inputLength,
    summaryLength,
    ip,
  })
  await db.write()
}
