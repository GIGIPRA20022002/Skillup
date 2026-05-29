from fastapi import FastAPI
from pydantic import BaseModel
from src.controllers.analysis_controller import procesar_peticion
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite que cualquier frontend se conecte
    allow_credentials=True,
    allow_methods=["*"],  # Permite peticiones POST, GET, etc.
    allow_headers=["*"],
)

class PeticionCodigo(BaseModel): 
    codigo : str

@app.post ("/analizar")
def endpoint_analizar (peticion :PeticionCodigo): 
    texto_estudiante = peticion.codigo
    respuesta_final = procesar_peticion(texto_estudiante)
    return(respuesta_final)