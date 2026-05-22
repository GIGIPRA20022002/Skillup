from fastapi import FastAPI
from pydantic import BaseModel
from src.controllers.analysis_controller import procesar_peticion


app = FastAPI()

class PeticionCodigo(BaseModel): 
    codigo : str

@app.post ("/analizar")
def endpoint_analizar (peticion :PeticionCodigo): 
    texto_estudiante = peticion.codigo
    respuesta_final = procesar_peticion(texto_estudiante)
    return(respuesta_final)