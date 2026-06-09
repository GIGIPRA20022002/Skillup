from fastapi import FastAPI
from pydantic import BaseModel , Field
from src.controllers.analysis_controller import procesar_peticion
from fastapi.middleware.cors import CORSMiddleware
import json
import random
from src.core.ia_service import generar_feedback_ia
import ast


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite que cualquier frontend se conecte
    allow_credentials=True,
    allow_methods=["*"],  # Permite peticiones POST, GET, etc.
    allow_headers=["*"],
)

class PeticionCodigo(BaseModel): 
    student_id: str
    module: str
    code : str = Field(...,min_length=5, max_length=5000)
@app.post ("/analizar")
def endpoint_analizar (peticion :PeticionCodigo): 
    texto_estudiante = peticion.code

    try :
        ast.parse(texto_estudiante)

    except SyntaxError as e :
        return {
            "estado":"error general",
            "tutor_message": f"Tu codigo tiene un error de sintaxis y Python no puede leerlo .Revisa la linea {e.lineno} .Detalle {e.msg}",
            "datos" : {}
        }
    except Exception as e : 
        return {
            "estado": "error_general",
            "tutor_message": f"Ocurrió un error inesperado: {str(e)}",
            "datos": {}
        }
    
    respuesta_final = procesar_peticion(texto_estudiante)
    texto_feedback = generar_feedback_ia(respuesta_final["datos"], texto_estudiante)
    respuesta_final["tutor_message"] = texto_feedback
    return(respuesta_final)


@app.get("/ejercicios")
async def obtener_ejercicios():
    with open ("ejercicios.json","r",encoding="utf-8")as archivo :
        datos = json.load(archivo)
    lista_completa = datos["ejercicios"]   
    cantiadad_a_devolver = min(5, len(lista_completa))
    ejercicios_seleccionados = random.sample(lista_completa, cantiadad_a_devolver)
    return {"ejercicios": ejercicios_seleccionados}
