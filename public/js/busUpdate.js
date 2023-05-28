let busPosition = {
  '서울71나1010': null,
  '71저1221': null,
  '71저1210': null,
  '1701': null,
  '70라8517': null,
}

var mapOptions = {
  //center: new naver.maps.LatLng(37.6293065, 127.086812),
  center: new naver.maps.LatLng(37.6293065, 127.096812),
  zoom: 14,
}

var map = new naver.maps.Map('map', mapOptions)

// naver.maps.Event.addListener(map, 'zoom_changed', function (zoom) {})

setInterval(function () {
  getRequest().then(function (data) {
    jsondata = data
    let html = ''
    for (let datas in data['data']) {
      var position = new naver.maps.LatLng(data['data'][datas]['lat'], data['data'][datas]['lon'])
      var markerOptions = {
        position: position,
        map: map,
        icon: {
          content: setBusIcon(data['data'][datas], 56),
          anchor: new naver.maps.Point(28, 52), // zoom base 14
        },
      }
      var marker = new naver.maps.Marker(markerOptions)
      if (busPosition[data['data'][datas]['name']] != null)
        busPosition[data['data'][datas]['name']].setMap(null)
      busPosition[data['data'][datas]['name']] = marker
      html += '<div style="display: flex; align-items: center">'
      html += setBusIcon(data['data'][datas], 24)
      html += setBusName(data['data'][datas]) + ' 방면'
      html += '</div>'
    }
    if (html == '') html = '운행 정보 없음'
    document.getElementById('busStatus').innerHTML = html
    console.log(jsondata)
  })
}, 2000)

function setBusIcon(datas, size) {
  let routeid = datas['routeid']
  let status = datas['status']

  if (status == 2)
    return '<img src="/icon/삼육대.png" width="' + size + '" height="' + size + '" alt="">'
  else if (routeid == 1)
    return '<img src="/icon/화랑대.png" width="' + size + '" height="' + size + '" alt="">'
  else if (routeid == 2)
    return '<img src="/icon/석계.png" width="' + size + '" height="' + size + '" alt="">'
  else if (routeid == 3)
    return '<img src="/icon/별내.png" width="' + size + '" height="' + size + '" alt="">'
  else if (routeid == 4)
    return '<img src="/icon/구리.png" width="' + size + '" height="' + size + '" alt="">'
  else return '알 수 없음'
}

function setBusName(datas) {
  let routeid = datas['routeid']
  let status = datas['status']

  if (status == 2) return '삼육대'
  else if (routeid == 1) return '화랑대'
  else if (routeid == 2) return '석계'
  else if (routeid == 3) return '별내'
  else if (routeid == 4) return '구리'
  else return '알 수 없음'
}
