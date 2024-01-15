import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnosesRouter'
import patientesRouter from './routes/patientsRouter'

const app = express();
app.use(cors())
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter); 
app.use('/api/patients', patientesRouter); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});