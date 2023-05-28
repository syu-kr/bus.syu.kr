// function getDistance(pos1, pos2) {
//   var lat1 = pos1['lat']
//   var lon1 = pos1['lon']
//   var lat2 = pos2['lat']
//   var lon2 = pos2['lon']
//   if (lat1 == lat2 && lon1 == lon2) return 0

//   var radLat1 = (Math.PI * lat1) / 180
//   var radLat2 = (Math.PI * lat2) / 180
//   var theta = lon1 - lon2
//   var radTheta = (Math.PI * theta) / 180
//   var dist =
//     Math.sin(radLat1) * Math.sin(radLat2) +
//     Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta)
//   if (dist > 1) dist = 1

//   dist = Math.acos(dist)
//   dist = (dist * 180) / Math.PI
//   dist = dist * 60 * 1.1515 * 1.609344 * 1000
//   if (dist < 100) dist = Math.round(dist / 10) * 10
//   else dist = Math.round(dist / 100) * 100

//   return dist
// }

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

let d1 = getDistance(busStop['석계역'], busStop['태릉입구역'])
let d2 = getDistance(busStop['태릉입구역'], busStop['화랑대역'])
let d3 = getDistance(busStop['석계역'], busStop['삼육대'])
let d4 = getDistance(busStop['태릉입구역'], busStop['삼육대'])
let d5 = getDistance(busStop['화랑대역'], busStop['삼육대'])

document.getElementById('d1').innerHTML = '(' + d1 + 'm)'
document.getElementById('d2').innerHTML = '(' + d2 + 'm)'
document.getElementById('d3').innerHTML = '(' + d3 + 'm)'
document.getElementById('d4').innerHTML = '(' + d4 + 'm)'
document.getElementById('d5').innerHTML = '(' + d5 + 'm)'
