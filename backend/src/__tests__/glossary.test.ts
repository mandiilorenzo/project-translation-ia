import { describe, it, expect } from "@jest/globals";
import request from 'supertest';
import app from '../server'; 

describe('Glossary API Integration', () => {

    it('should extract terms from a valid medical text', async () => {

        const payload = {
            text: "The patient was diagnosed with severe Diabetes and treated with Metformin."
        };

        const response = await request(app)
            .post('/api/ai/glossary')
            .send(payload);

        expect(response.status).toBe(200);
        
        expect(response.body).toHaveProperty('terms');
        
        expect(Array.isArray(response.body.terms)).toBe(true);

        if (response.body.terms.length > 0) {
            console.log("Terms found:", response.body.terms); 
        }
    });

    it('should return 400 if no text is provided', async () => {
        const response = await request(app)
            .post('/api/ai/glossary')
            .send({}); 

        expect(response.status).toBe(400);
        
        expect(response.body).toHaveProperty('error');
    });
});