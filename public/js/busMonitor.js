async function getRequest() {
  const getResponse = await fetch('/api/monitor', {
    method: 'get',
  })
  const getJson = await getResponse.json()
  return getJson
}
function getTaereungDirection(prev, pres) {
  if (prev == '화랑대사거리' && pres == '태릉입구역') return false
  return true
}
function getHwarangdaeDirection(prev, pres) {
  if (prev == '화랑대사거리' && pres == '화랑대역') return false
  return true
}
function getSahmyookDirection(prev, pres) {
  if (prev == '태릉선수촌' && pres == '삼육대 정문') return false
  if (prev == '별내역' && pres == '삼육대 정문') return false
  if (prev == '' && pres == '삼육대 정문') return false
  return true
}
function convertStation(prev, pres) {
  let station = pres
  if (prev == '삼육대' && pres == '삼육대 정문') station = '삼육대 (출발)'
  else if (prev == '삼육대 정문' && pres == '삼육대') station = '삼육대 (도착)'
  else if (prev == '') station = station + ' (이전 위치 확인 안됨)'
  else station = station + ' (도착)'
  return station
}
function convertName(name) {
  let busname = name
  if (busname == '서울71나1010') busname = '71나 1010'
  else if (busname == '71저1221') busname = '71저 1221'
  else if (busname == '71저1220') busname = '71저 1220'
  else if (busname == '71버1637') busname = '71버 1637'
  else if (busname == '71저1244') busname = '71저 1244'
  else if (busname == '71저1210') busname = '71저 1210'
  else if (busname == '1701') busname = '71버 1701'
  else if (busname == '70라8517') busname = '70라 8517'
  return busname
}
function dateFormat(date) {
  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  let week = WEEKDAY[date.getDay()]
  month = month >= 10 ? month : '0' + month
  day = day >= 10 ? day : '0' + day
  hour = hour >= 10 ? hour : '0' + hour
  minute = minute >= 10 ? minute : '0' + minute
  second = second >= 10 ? second : '0' + second
  return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + ' ' + week
  // return date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute + ' ' + week
}
function dayCount(d1, d2) {
  const date = new Date(d1).getTime() - new Date(d2).getTime()
  return Math.abs(date / (1000 * 60 * 60 * 24))
}
function createTable(busstop) {
  let table_tag = ''
  let date = ''
  for (const info of busstop) {
    if (date == dateFormat(new Date(info['time'] * 1000)).split(' ')[0]) {
      continue
    }
    if (date == '') {
      date = dateFormat(new Date(info['time'] * 1000)).split(' ')[0]
    }
    // console.log(
    //   dayCount(
    //     dateFormat(new Date(info["time"] * 1000)).split(" ")[0] +
    //       " " +
    //       dateFormat(new Date(info["time"] * 1000)).split(" ")[1],
    //     new Date()
    //   )
    // );
    if (dayCount(dateFormat(new Date(info['time'] * 1000)).split(' ')[0] + ' ' + '08:00:00', new Date()) >= 7) {
      continue
    }
    table_tag += `
    <table class="table table-dark" style="width: 20%; float: left;">
      <thead>
        <tr>
          <th scope="col" style="color: yellow; text-align: center;" nowrap>
          ${
            dateFormat(new Date(info['time'] * 1000))
              .split(' ')[0]
              .substring(5) +
            ' (' +
            dateFormat(new Date(info['time'] * 1000)).split(' ')[2] +
            ')'
          }
          </th>
        </tr>
      </thead>
      <tbody>
        ${createTbody(busstop, dateFormat(new Date(info['time'] * 1000)).split(' ')[0])}
      </tbody>
    </table>
    `
    date = dateFormat(new Date(info['time'] * 1000)).split(' ')[0]
  }
  return table_tag
}
function createTbody(busstop, date) {
  let tbody_tag = ''
  for (const info of busstop) {
    let time = dateFormat(new Date(info['time'] * 1000))
    if (date == time.split(' ')[0]) {
      tbody_tag += `
      <tr>
        <td style="text-align: center;" nowrap><span style="color: white;">${time.split(' ')[1]}</span></td>
      </tr>
      `
    }
  }
  return tbody_tag
}
getRequest().then((data) => {
  let station = {
    화랑대역: [],
    태릉입구역: [],
    석계역: [],
  }
  let table_tag = ''
  for (const busname in data) {
    let tbody_tag = ''
    let busstop = ''
    for (const info of data[busname]) {
      if (!getTaereungDirection(busstop, info['busstop'])) {
        continue
      }
      if (!getHwarangdaeDirection(busstop, info['busstop'])) {
        continue
      }
      if (!getSahmyookDirection(busstop, info['busstop'])) {
        continue
      }
      let convert = convertStation(busstop, info['busstop'])
      busstop = info['busstop']
      if (
        info['busstop'] != '석계역' &&
        info['busstop'] != '태릉입구역' &&
        info['busstop'] != '화랑대역' &&
        info['busstop'] != '별내역' &&
        info['busstop'] != '삼육대' &&
        info['busstop'] != '삼육대 정문'
      ) {
        continue
      }
      if (info['busstop'] == '화랑대역' || info['busstop'] == '태릉입구역' || info['busstop'] == '석계역') {
        station[info['busstop']].push({
          time: Math.floor(new Date(info['time']).getTime() / 1000),
          name: convertName(busname),
        })
      }
      tbody_tag += `
      <tr>
        <td nowrap><span style="color: white;">${convert}</span></td>
        <td nowrap><span style="color: white;">${info['time'].split(' ')[0]}</span></td>
        <td nowrap><span style="color: white;">${info['time'].split(' ')[1]}</span></td>
      </tr>
      `
    }
    table_tag += `
    <span style="font-size: 1.7rem">
      <img src="/icon/bus.png" width="32" height="32" style="vertical-align: text-bottom" alt="">
      <strong>${convertName(busname)}</strong>
    </span>
    <div class="table-responsive">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col" nowrap>위치</th>
            <th scope="col" nowrap>날짜</th>
            <th scope="col" nowrap>시간</th>
          </tr>
        </thead>
        <tbody>
          ${tbody_tag}
        </tbody>
      </table>
    </div>
    `
  }
  document.getElementById('info').innerHTML = table_tag
  let hwarangdae = station['화랑대역'].sort((a, b) => a.time - b.time)
  let taereung = station['태릉입구역'].sort((a, b) => a.time - b.time)
  let seokgye = station['석계역'].sort((a, b) => a.time - b.time)
  let test_tag = `
  <span style="font-size: 1.7rem">
    <img src="/icon/bus.png" width="32" height="32" style="vertical-align: text-bottom" alt="">
    <strong>화랑대역 (5번 출구)</strong>
  </span>
  <div class="table-responsive">
    ${createTable(hwarangdae)}
  </div>
  <span style="font-size: 1.7rem">
    <img src="/icon/bus.png" width="32" height="32" style="vertical-align: text-bottom" alt="">
    <strong>태릉입구역 (7번 출구)</strong>
  </span>
  <div class="table-responsive">
    ${createTable(taereung)}
  </div>
  <span style="font-size: 1.7rem">
    <img src="/icon/bus.png" width="32" height="32" style="vertical-align: text-bottom" alt="">
    <strong>석계역 (4번 출구)</strong>
  </span>
  <div class="table-responsive">
    ${createTable(seokgye)}
  </div>
  `
  document.getElementById('test').innerHTML = test_tag
})
