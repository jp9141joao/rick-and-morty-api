import express from 'express';
import cors from 'cors';
import { routes } from './routes';


const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = [
  'https://rick-and-morty-api-jp9141joao.netlify.app',
  'https://outro-dominio.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'A política CORS do servidor não permite acesso a partir desta origem.';
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

