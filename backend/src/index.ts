import express from 'express'; // Importa o Express para criar o servidor.
import cors from 'cors'; // Importa o middleware CORS para controlar quem pode acessar a API.
import { routes } from './routes'; // Importa as rotas definidas em outro arquivo.

const app = express(); // Cria uma instancia do Express.
const porta = process.env.PORT || 3000; // Define a porta do servidor caso ela nao exista define por padrao a 3000.

// Lista de origens permitidas para acessar a API.
const allowedOrigins = [
  'https://rick-and-morty-api-jp9141joao.netlify.app',
];

app.use(cors({
  origin: function(origin, callback) {
    // Se não houver origem, permite o acesso.
    if (!origin) return callback(null, true);

    // Se a origem não estiver na lista de permitidos, retorna um erro.
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'A política CORS do servidor não permite acesso a partir desta origem.';
      return callback(new Error(msg), false);
    }

    // Se a origem estiver permitida, permite o acesso
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP que podem ser usados.
  allowedHeaders: ['Content-Type', 'Authorization'] // Cabecalhos permitidos nas requisicaes.
}));

app.use(express.json()); // Faz o Express entender o JSON enviado no corpo das requisições.
app.use(routes); // Usa as rotas importadas para responder às requisições.

// Inicia o servidor na porta definida e exibe uma mensagem no console.
app.listen(porta, () => {
  console.log(`Server running on port ${porta}`);
});
