var trafficLayer = new naver.maps.TrafficLayer({
  interval: 1000 * 60 * 1, // 1 minutes
})

trafficLayer.startAutoRefresh()

naver.maps.Event.once(map, 'init', function () {
  trafficLayer.setMap(map)
})

function onTraffic(obj) {
  if (trafficLayer.getMap()) {
    trafficLayer.setMap(null)
  } else {
    trafficLayer.setMap(map)
  }
}
