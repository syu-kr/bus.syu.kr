let busPosition = {
  '서울71나1010': null,
  '71저1221': null,
  '71저1220': null,
  '71버1637': null,
  '71저1210': null,
  '1701': null,
  '70라8517': null,
}

let busNames = {
  '서울71나1010': null,
  '71저1221': null,
  '71저1220': null,
  '71버1637': null,
  '71저1210': null,
  '1701': null,
  '70라8517': null,
}

let busPositions = {
  '서울71나1010': null,
  '71저1221': null,
  '71저1220': null,
  '71버1637': null,
  '71저1210': null,
  '1701': null,
  '70라8517': null,
}

var mapOptions = {
  //center: new naver.maps.LatLng(37.6293065, 127.086812),
  center: new naver.maps.LatLng(37.6153065, 127.096812),
  zoom: 13,
}

var map = new naver.maps.Map('map', mapOptions)

// naver.maps.Event.addListener(map, 'zoom_changed', function (zoom) {})

setInterval(function () {
  getRequest().then(function (data) {
    jsondata = data
    let html = ''
    for (let datas in data['data']) {
      if (data['data'][datas]['status'] == '0') {
        continue
      }
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
      if (busPosition[data['data'][datas]['name']] != null) busPosition[data['data'][datas]['name']].setMap(null)
      busPosition[data['data'][datas]['name']] = marker
      html += '<div style="display: flex; align-items: center">'
      html += setBusIcon(data['data'][datas], 24)
      html += '<span style="font-size: 8px">'
      html += ' [' + data['data'][datas]['name'] + '] '
      html += setBusName(data['data'][datas]) + ' 방면'
      html += '</span>'
      const nearestBusStop = nearBusStop(data['data'][datas])
      html += '<span style="font-size: 14px">(' + nearestBusStop
      if (
        nearestBusStop == '삼육대' ||
        nearestBusStop == '화랑대역' ||
        nearestBusStop == '태릉입구역' ||
        nearestBusStop == '석계역' ||
        nearestBusStop == '별내역'
      ) {
        html += ' 곧도착)'
      } else {
        html += ' 접근중)'
      }
      html += '</span></div>'
      busNames[data['data'][datas]['name']] = setBusName(data['data'][datas])
      busPositions[data['data'][datas]['name']] = nearestBusStop
    }
    for (let busName in busPosition) {
      let busMarker = busPosition[busName]
      if (busMarker == null) {
        continue
      }
      let businfowindow = new naver.maps.InfoWindow({
        content:
          '<div style="font-weight: bold">' +
          ' [' +
          busName +
          '] ' +
          busNames[busName] +
          ' 방면' +
          '</div>' +
          '<div style="font-weight: bold">' +
          busPositions[busName] +
          ' 부근' +
          '</div>',
        anchor: new naver.maps.Point(32, 52),
      })
      naver.maps.Event.addListener(busMarker, 'mouseover click', function (event) {
        if (businfowindow.getMap()) {
          businfowindow.close()
        } else {
          businfowindow.open(map, busMarker)
        }
      })
    }
    // console.log(busPosition)
    if (html == '') html = '<div>운행 정보 없음</div>'
    if (new Date().getHours() < 12) {
      html += '<div>※ 12시 전까지는 <strong>화랑대역 셔틀버스</strong>가 운행됩니다.</div>'
    } else if (new Date().getHours() < 18) {
      html += '<div>※ 18시 전까지는 <strong>석계역, 태릉입구역</strong> 셔틀버스가 운행됩니다.</div>'
    }
    document.getElementById('busStatus').innerHTML = html
    //console.log(jsondata)
  })
}, 2000)

function setBusIcon(datas, size) {
  let routeid = datas['routeid']
  let status = datas['status']

  if (status == 0) return '<div></div>'
  else if (status == 2) return '<img src="/icon/삼육대.png" width="' + size + '" height="' + size + '" alt="">'
  else if (routeid == 1) return '<img src="/icon/화랑대.png" width="' + size + '" height="' + size + '" alt="">'
  else if (routeid == 2) return '<img src="/icon/석계.png" width="' + size + '" height="' + size + '" alt="">'
  else if (routeid == 3) return '<img src="/icon/별내.png" width="' + size + '" height="' + size + '" alt="">'
  else if (routeid == 4) return '<img src="/icon/구리.png" width="' + size + '" height="' + size + '" alt="">'
  else return '<div></div>'
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

function nearBusStop(pos) {
  let meter = {}
  for (let index in busStop) {
    meter[index] = getDistance(pos, busStop[index])
  }
  const sorted = Object.fromEntries(Object.entries(meter).sort((a, b) => a[1] - b[1]))
  //console.log(sorted)
  return Object.keys(sorted)[0]
}
