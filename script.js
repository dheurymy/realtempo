   document.querySelector('form').addEventListener('submit', function(event) {
       event.preventDefault(); // Evita o envio do formulário padrão

       const cidade = document.querySelector('#cidade').value;
       const estado = document.querySelector('#estado').value;

       if (cidade && estado) {
           buscarDadosClimaticos(cidade, estado);
       } else {
           alert('Por favor, preencha a cidade e selecione o estado.');
       }
   });

   async function buscarDadosClimaticos(cidade, estado) {
       const apiKey = '7fd7a056bcab55de7b8ee592928d44ca'; // Chave da API
       const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade},${estado},BR&appid=${apiKey}&units=metric&lang=pt_br`; // Link da API

       console.log(url)
       
       try {
           const response = await fetch(url);
           if (!response.ok) {
               throw new Error('Erro ao buscar dados');
           }
           const dados = await response.json();
           exibirDadosClimaticos(dados);
       } catch (error) {
           console.error(error);
           alert('Não foi possível obter os dados meteorológicos.');
       }
   }

   function exibirDadosClimaticos(dados) {
    document.querySelector('.city').textContent = `Cidade: ${dados.name}`;
    document.querySelector('.temp').textContent = `Temperatura: ${dados.main.temp}°C`;
    document.querySelector('.secundario p:nth-child(1)').textContent = `Nascer do Sol: ${new Date(dados.sys.sunrise * 1000).toLocaleTimeString()} AM`;
    document.querySelector('.secundario p:nth-child(2)').textContent = `Pôr do Sol: ${new Date(dados.sys.sunset * 1000).toLocaleTimeString()} PM`;
    document.querySelector('.secundario p:nth-child(3)').textContent = `Velocidade do Vento: ${dados.wind.speed} m/s`;
}






