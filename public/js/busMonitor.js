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
getRequest().then((data) => {
  let table_tag = ''
  for (let busname in data) {
    let tbody_tag = ''
    let busstop = ''
    for (let info of data[busname]) {
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
      <strong>${busname}</strong>
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
})
