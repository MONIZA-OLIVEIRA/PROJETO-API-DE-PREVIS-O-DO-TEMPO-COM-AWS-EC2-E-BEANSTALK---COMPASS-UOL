const axios = require('axios');


const descricaoEmPortugues = {
  "clear sky": "céu limpo",
  "few clouds": "poucas nuvens",
  "scattered clouds": "nuvens dispersas",
  "broken clouds": "nuvens quebradas",
  "shower rain": "chuva de banho",
  "rain": "chuva",
  "thunderstorm": "tempestade",
  "snow": "neve",
  "mist": "névoa"
};

async function getPrevisao(cidade, bairro) {
  try {
    const apiKey = '5030f75610c84ab3325fd152ad7fd932'; // Substitua pela sua chave válida
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade},${bairro}&appid=${apiKey}&units=metric`;

    const response = await axios.get(apiUrl);
    const previsao = response.data;

    const previsoesFiltradas = previsao.list.slice(0, 9); // Exemplo: pegando as primeiras 9 previsões

    // Traduz as descrições do tempo para português
    previsoesFiltradas.forEach(previsao => {
      previsao.weather[0].description = descricaoEmPortugues[previsao.weather[0].description] || previsao.weather[0].description;
    });

    return {
      cidade: previsao.city.name,
      previsoes: previsoesFiltradas
    };
  } catch (error) {
    console.error('Erro ao obter os dados da API:', error.response?.data || error);
    throw error;
  }
}

module.exports = {
  getPrevisao
};