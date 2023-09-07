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
      busstop = info['busstop']
      if (
        info['busstop'] != '석계역' &&
        info['busstop'] != '태릉입구역' &&
        info['busstop'] != '화랑대역' &&
        info['busstop'] != '별내역'
      ) {
        continue
      }
      tbody_tag += `
      <tr>
        <td nowrap><span style="color: white;">${info['busstop'] + ' (삼육대 방면)'}</span></td>
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
