let times = {
  '08:10': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '08:15': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '08:20': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '08:25': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '08:30': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '08:35': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '08:40': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '08:45': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '08:50': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '08:55': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '09:00': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '09:05': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '09:10': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '09:15': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '09:20': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '09:25': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '09:30': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '09:35': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '09:40': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '09:45': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '09:50': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '09:55': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '10:00': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '10:20': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '10:40': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '11:00': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '11:20': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '11:40': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '12:00': '화랑대역에서 출발 (화랑대역 -> 삼육대)',
  '12:00 ': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
  '12:25': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
  '12:50': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
  '13:15': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
  '13:40': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
  '14:05': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
  '14:30': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
  '14:55': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
  '15:20': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
  '15:45': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
  '16:10': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
  '16:35': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
  '17:00': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
  '17:25': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
  '17:50': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
  '18:15': '학교에서 출발 (삼육대 -> 화랑대역 -> 태릉입구역 -> 석계역 -> 태릉입구역 -> 삼육대)',
}
let html = ''
html += '<div class="table-responsive"><table class="table"><tbody>'
for (let time in times) {
  html += `
  <tr>
    <td>${time}</td>
    <td>${times[time]}</td>
  </tr>`
}
html += '</tbody></table><div>'
document.getElementById('busTime').innerHTML = html
