import { createContext } from "react";
import { Diagnose } from "./types";

const DiagnosesContext = createContext<Diagnose[]>([]);

export default DiagnosesContext;
