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
       const apiKey = 'c843136b'; // Chave da API
       const url = `https://api.hgbrasil.com/weather?format=json-cors&key=${apiKey}&city_name=${cidade},${estado}`; // Link da API

       console.log(url)
       
       try {
           const response = await fetch( `https://api.hgbrasil.com/weather?key=${apiKey}&city_name=${cidade},${estado}`);
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
       document.querySelector('.city').textContent = `Cidade: ${dados.city}`;
       document.querySelector('.temp').textContent = `Temperatura: ${dados.temp}°C`;
       document.querySelector('.secundario p:nth-child(1)').textContent = `Nascer do Sol: ${dados.sunrise}`;
       document.querySelector('.secundario p:nth-child(2)').textContent = `Pôr do Sol: ${dados.sunset}`;
       document.querySelector('.secundario p:nth-child(3)').textContent = `Velocidade do Vento: ${dados.wind_speedy}`;
   }






