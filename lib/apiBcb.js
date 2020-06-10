const axios = require("axios")

const getToday = () => {
  today = new Date()
  return ((today.getMonth()+1)+'-' + today.getDate()+'-'+today.getFullYear())
}

const getUrl = data => {
//  console.log(data)
  return `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=%27${ data }%27&$top=10&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
}

const getCotacaoAPI = data => {
  return axios.get(getUrl(data)) 
}

const extractCotacao = res => res.data.value[0].cotacaoVenda

const getCotacao = async () => {
  try {
    const today = getToday()
    const res = await getCotacaoAPI(today)
    const cotacao = extractCotacao(res)
    return cotacao
  } catch (err) {
    return ''
  }
}

module.exports = {
  getCotacao,
  extractCotacao,
  extractCotacao
}