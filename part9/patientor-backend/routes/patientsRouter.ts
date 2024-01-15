import express from "express";
import patientsService from "../services/patientsService";
import toNewPatient from "../utils/toNewPatient";
import toNewEntry from "../utils/toNewEntry";

const router = express.Router();
 
router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
    res.send(patientsService.getOnePatient(req.params.id));
});


router.post('/', (req, res) => {
    try{
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    }catch(error: unknown){
        let errorMessage = 'Something went wrong.';
        if(error instanceof Error){
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    try{
        const patient = patientsService.getOnePatient(req.params.id);
        if( patient === undefined ){
            res.status(404).send(`patient not found`);
            return;
        }
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientsService.addEntry(patient, newEntry);
        res.json(addedEntry);

    }catch(error: unknown){
        let errorMessage = 'Something went wrong';
        if(error instanceof Error){
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;