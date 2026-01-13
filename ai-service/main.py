from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
import uvicorn

app = FastAPI(title="MedTranslate AI Service")

print("Carregando modelo Biomedical NER... isso pode demorar na primeira vez...")

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
        text = request.text
        results = ner_pipeline(text)
        
        merged_entities = []

        for item in results:
            start = item['start']
            end = item['end']
            category = item['entity_group']
            score = float(item['score'])
            
            if merged_entities:
                last = merged_entities[-1]
                
                if last['category'] == category and (start - last['end'] <= 2):
                    last['end'] = end
                    last['confidence'] = (last['confidence'] + score) / 2
                    continue 

            merged_entities.append({
                "start": start,
                "end": end,
                "category": category,
                "confidence": score
            })

        final_terms = []
        seen_terms = set() 
        
        IGNORE_TERMS = {
            "nation", "ing", "tion", "ment", "ism", "ity", 
            "result", "results", "conclusion", "study", "aim", "background", 
            "year", "years", "month", "months", "day", "days",
            "high", "low", "positive", "negative", "significantly", 
            "group", "groups", "level", "levels", "rate",
            "va", "p", "a", "b", "c" 
        }

        for item in merged_entities:
            term_text = text[item['start']:item['end']].strip()
            
            clean_term = term_text.lower().replace(".", "").replace(",", "")

            if len(clean_term) < 3 and clean_term not in ['ph', 'o2', 'bp', 'iv']:
                continue
            
            if clean_term in IGNORE_TERMS:
                continue
                
            if clean_term.isdigit():
                continue

            if not any(c.isalpha() for c in term_text):
                continue

            if clean_term not in seen_terms:
                final_terms.append({
                    "term": term_text, 
                    "category": item['category'],
                    "confidence": round(item['confidence'], 4)
                })
                seen_terms.add(clean_term)

        return {"terms": final_terms}

    except Exception as e:
        print(f"Erro no processamento: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)