/**
 *    ____                  __________
 *   / __ \_   _____  _____/ __/ / __ \_      __
 *  / / / / | / / _ \/ ___/ /_/ / / / / | /| / /
 * / /_/ /| |/ /  __/ /  / __/ / /_/ /| |/ |/ /
 * \____/ |___/\___/_/  /_/ /_/\____/ |__/|__/
 *
 * The copyright indication and this authorization indication shall be
 * recorded in all copies or in important parts of the Software.
 *
 * @author 0verfl0w767
 * @link https://github.com/0verfl0w767
 * @license MIT LICENSE
 *
 */
const express = require('express')
const http = require('http')
const fs = require('fs')
const app = express()

function dayCount(d1, d2) {
  const date = new Date(d1).getTime() - new Date(d2).getTime()
  return Math.abs(date / (1000 * 60 * 60 * 24))
}

app.use('/', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/page/index.html')
})

app.get('/bus', (req, res) => {
  res.status(200).sendFile(__dirname + '/page/bus.html')
})

app.get('/monitor', (req, res) => {
  res.status(200).sendFile(__dirname + '/page/monitor.html')
})

app.get('/api', (req, res) => {
  if (!fs.existsSync(__dirname + '/../bus-api/api.json')) {
    res.status(401).json({statusCode: 401, message: 'data not found.'})
    return
  }
  const jsonData = JSON.parse(fs.readFileSync(__dirname + '/../bus-api/api.json', 'utf8'))
  res.status(200).json(jsonData)
})

app.get('/api/monitor', (req, res) => {
  if (!fs.existsSync(__dirname + '/../bus-api/monitor.json')) {
    res.status(401).json({statusCode: 401, message: 'data not found.'})
    return
  }
  const jsonData = JSON.parse(fs.readFileSync(__dirname + '/../bus-api/monitor.json', 'utf8'))
  res.status(200).json(jsonData)
  // let newData = {}
  // for (let index in jsonData) {
  //   newData[index] = []
  //   for (let info of jsonData[index]) {
  //     if (dayCount(info['time'], new Date()) >= 10) {
  //       continue
  //     }
  //     newData[index].push(info)
  //   }
  // }
  // res.status(200).json(newData)
})

app.get('*', (req, res) => {
  res.status(404).json({statusCode: 404, message: 'unknown request.'})
})

http.createServer(app).listen(4747, '0.0.0.0')
