
const express = require('express')

const app = express()

const PORT = 3000

const fs = require('fs')

app.use('/', (req, res, next) => {
  console.log(req.url)
  console.log(req.method)
  const date = new Date()


  const currentTime = getFormatTime(date)
  const saveData = `${currentTime} | ${req.method} from ${req.url}`
  console.log(currentTime)
  fs.appendFile('./server.log', saveData + '\n', 'utf8', (err, data) => {
    if (err) throw err
    console.log('The file has been saved!')
  });

  // fs.readFile('./server.log', 'utf-8', (err, data) => {
  //   if (err) throw err;
  //   console.log(data);
  // });
  console.log('===================  before / GET  ===================')

  next()
})

app.get('/', (req, res) => {
  res.end('GET /')
})

app.use((req, res, next) => {
  console.log(currentTime)
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