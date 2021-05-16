
const express = require('express')

const app = express()

const PORT = 3000

const fs = require('fs')

const reqTime = Date.now()
let saveData = ''
app.use('/', (req, res, next) => {
  const date = new Date()
  const reqTime = Date.now()
  const currentTime = getFormatTime(date)
  saveData = `${currentTime} | ${req.method} from ${req.url}`
  next()
})

app.get('/', async (req, res) => {
  const resTime = Date.now()
  await fs.appendFile('./server.log', `${saveData} | total time: ${(resTime - reqTime) / 1000}ms` + '\n', 'utf8', (err, data) => {
    if (err) throw err
    console.log('The file saved by req /')
  });
  res.end('GET /')
})


app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`)
})


function getFormatTime(date) {
  const yearCurrent = date.getFullYear()
  const monthCurrent = date.getMonth() + 1
  const dateCurrent = date.getDate()
  const hourCurrent = date.getHours()
  const minuteCurrent = date.getMinutes()
  const secondCurrent = date.getSeconds()
  return `${yearCurrent}-${monthCurrent}-${dateCurrent} ${hourCurrent}:${minuteCurrent}:${secondCurrent}`
}