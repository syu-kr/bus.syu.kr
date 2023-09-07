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

app.use('/', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.status(200).sendFile(__dirname + '/page/index.html')
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
})

app.get('*', (req, res) => {
  res.status(404).json({statusCode: 404, message: 'unknown request.'})
})

http.createServer(app).listen(4747, '0.0.0.0')
