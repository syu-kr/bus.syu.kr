let jsondata = {}

async function getRequest() {
  const getResponse = await fetch('https://bus.syu.kr/api', {method: 'get'})
  const getJson = await getResponse.json()
  return getJson
}
