function getDistance(pos1, pos2) {
  var lat1 = pos1['lat']
  var lng1 = pos1['lon']
  var lat2 = pos2['lat']
  var lng2 = pos2['lon']

  var R = 6371
  var dLat = deg2rad(lat2 - lat1)
  var dLon = deg2rad(lng2 - lng1)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  var convert = d.toFixed(5) * 1000 // convert km to m
  return convert
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

setInterval(function () {
  getRequest().then(function (data) {
    document.getElementById('bus').innerHTML = ''
    for (let datas in data['data']) {
      if (data['data'][datas]['status'] == '0') {
        continue
      }
      if (check == 'sahmyook' && data['data'][datas]['status'] == '2' && data['data'][datas]['routeid'] == '2') {
        // 삼육대 방면
        document.getElementById('bus').innerHTML += `
        <div id="${data['data'][datas]['name']}" class="bus">
          <div style="font-size: 6pt">삼육대 방면</div>
          <img src="bus-test.png" width="32" height="32" />
        </div>
        `
        let distance = getDistance(
          {lat: 37.64349, lon: 127.105649},
          {lat: data['data'][datas]['lat'], lon: data['data'][datas]['lon']},
        )
        document.getElementById(data['data'][datas]['name']).style.top = 525 - distance / 10 - 10 + 'px'
        console.log(data['data'][datas]['busstop'] + ' / 삼육대 방면: ' + distance)
      }
      if (check == 'seokgye' && data['data'][datas]['status'] != '2' && data['data'][datas]['routeid'] == '2') {
        // 석계 방면
        document.getElementById('bus').innerHTML += `
        <div id="${data['data'][datas]['name']}" class="bus">
          <div style="font-size: 6pt">석계 방면</div>
          <img src="bus-test.png" width="32" height="32" />
        </div>
        `
        let distance = getDistance(
          {lat: 37.615088, lon: 127.067217},
          {lat: data['data'][datas]['lat'], lon: data['data'][datas]['lon']},
        )
        document.getElementById(data['data'][datas]['name']).style.top = 505 - distance / 10 - 10 + 'px'
        console.log(data['data'][datas]['busstop'] + ' / 석계 방면: ' + distance)
      }
    }
  })
}, 2000)
