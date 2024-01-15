import patientData from '../data/patients';
import {Patient, NoSsnPatient, NewPatient, EntryWithoutId, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patientData
}

const getNoSsnPatient = (): NoSsnPatient[] => {
    return patientData;
};



const getOnePatient = (id: string): Patient | undefined => {
    return patientData.find(p => p.id === id);
};


const addPatient = ( entry: NewPatient ): Patient => {
    const id = uuid();
    const newPatient = {
        id,
        ...entry
    };

    patientData.push(newPatient);
    return newPatient;
};

const addEntry = ( patient: Patient, entry: EntryWithoutId ): Entry => {
    const id = uuid();
    const newEntry = {
        id,
        ...entry
    };

    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    getPatients,
    addPatient,
    getNoSsnPatient,
    getOnePatient,
    addEntry
};