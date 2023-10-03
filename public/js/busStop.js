var markers = []
var infowindows = []

let busStop = {
  '삼육대': {
    lat: 37.64349,
    lon: 127.105649,
  },
  '화랑대역': {
    lat: 37.619984,
    lon: 127.085462,
  },
  '태릉입구역': {
    lat: 37.617969,
    lon: 127.077054,
  },
  '석계역': {
    lat: 37.615088,
    lon: 127.067217,
  },
  '별내역': {
    lat: 37.642239,
    lon: 127.126747,
  },
  '월릉교': {
    lat: 37.6162,
    lon: 127.07129,
  },
  '태릉입구역 1번출구': {
    lat: 37.617421,
    lon: 127.074648,
  },
  '화랑대역 1번출구': {
    lat: 37.619892,
    lon: 127.083249,
  },
  '경춘선숲길, 토끼굴앞': {
    lat: 37.619227,
    lon: 127.079875,
  },
  '봉화산역': {
    lat: 37.61745,
    lon: 127.091115,
  },
  '두산대림아파트': {
    lat: 37.61895,
    lon: 127.087818,
  },
  '화랑대사거리': {
    lat: 37.62158,
    lon: 127.087228,
  },
  '경춘선숲길': {
    lat: 37.623846,
    lon: 127.090894,
  },
  '서울여대, 육군사관학교': {
    lat: 37.626043,
    lon: 127.09468,
  },
  '태릉': {
    lat: 37.630241,
    lon: 127.098309,
  },
  '태릉선수촌': {
    lat: 37.633423,
    lon: 127.103218,
  },
  '삼육대 정문': {
    lat: 37.638211,
    lon: 127.107558,
  },
}

const busIcon = `
  <img src="/icon/정류장.png" width="56" height="56" alt="">
`
for (let index in busStop) {
  if (
    index == '월릉교' ||
    index == '태릉입구역 1번출구' ||
    index == '경춘선숲길, 토끼굴앞' ||
    index == '화랑대역 1번출구' ||
    index == '봉화산역' ||
    index == '두산대림아파트' ||
    index == '화랑대사거리' ||
    index == '경춘선숲길' ||
    index == '서울여대, 육군사관학교' ||
    index == '태릉' ||
    index == '태릉선수촌' ||
    index == '삼육대 정문'
  ) {
    continue
  }
  if (new Date().getHours() < 12) {
    if (index == '태릉입구역' || index == '석계역') {
      continue
    }
  }
  if (new Date().getHours() < 19) {
    if (index == '화랑대역') {
      continue
    }
  }

  var position = new naver.maps.LatLng(busStop[index]['lat'], busStop[index]['lon'])
  var markerOptions = {
    position: position,
    map: map,
    icon: {
      content: busIcon,
      anchor: new naver.maps.Point(28, 52), // zoom base 14
    },
  }
  var marker = new naver.maps.Marker(markerOptions)
  markers.push(marker)
  let name = index
  if (name == '화랑대역') name = '화랑대역 (5번 출구)'
  else if (name == '태릉입구역') name = '태릉입구역 (7번 출구)'
  else if (name == '석계역') name = '석계역 (4번 출구)'
  let infowindow = new naver.maps.InfoWindow({
    content: '<div style="font-weight: bold">' + name + '</div>',
    anchor: new naver.maps.Point(32, 52),
  })
  infowindows.push(infowindow)
}

for (let i = 0; i < markers.length; i++) {
  naver.maps.Event.addListener(markers[i], 'mouseover click', function (event) {
    if (infowindows[i].getMap()) {
      infowindows[i].close()
    } else {
      infowindows[i].open(map, markers[i])
    }
  })
}
