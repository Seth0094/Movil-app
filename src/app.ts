import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport'; // Modulo passport
import passportMiddleware from './middlewares/passport' // Middleware passport
import authRoutes from './routes/auth.routes';
import specialRoutes from './routes/special.routes';

// initializations
const app = express()

const corsOptions = {
  origin: 'http://localhost:8081', // Asegúrate de que este sea el origen correcto
  optionsSuccessStatus: 200 // Para navegadores que no soportan 204
};

//settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:8081', // Ajusta según sea necesario
  credentials: true, // Para permitir el envío de cookies y headers de autenticación
  methods: ['GET', 'POST', 'OPTIONS'], // Métodos permitidos
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

// routes
app.get('/', (req, res) =>{
  res.send(`THE API is at http://localhost:${app.get('port')}`);
})

app.use(authRoutes);
app.use(specialRoutes)

export default app;
