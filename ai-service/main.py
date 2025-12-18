from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
import uvicorn

app = FastAPI(title="MedTranslate AI Service")

ner_pipeline = pipeline("ner", model="d4data/biomedical-ner-all", aggregation_strategy="simple")

print("Modelo carregado e pronto!")

class TextRequest(BaseModel):
    text: str

@app.get("/")
def home():
    return {"status": "AI Service Online", "model": "Biomedical NER"}

@app.post("/extract-terms")
def extract_terms(request: TextRequest):
    try:
        text_sample = request.text[:1000] 
        results = ner_pipeline(text_sample)
        
        final_terms = []
        
        for item in results:
            word = item['word']
            category = item['entity_group']
            confidence = float(round(item['score'], 4))

            if word.startswith("##"):
                if final_terms:
                    final_terms[-1]["term"] += word.replace("##", "")
            else:
                final_terms.append({
                    "term": word,
                    "category": category,
                    "confidence": confidence
                })

        return {"terms": final_terms}

    except Exception as e:
        print(f"Erro: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)