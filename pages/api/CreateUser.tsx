import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import cors from 'cors';

const corsMiddleware = cors({
    origin: 'http://localhost:5173',
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    await new Promise<void>((resolve, reject) => {
        corsMiddleware(request, response, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });

    try {
        const { nome, sobrenome, contato, senha }: any = request.body
        const nomeSemEspacos = nome.trim().toLowerCase()

        const result = await sql`
            INSERT INTO 
                usuario 
                (
                    id,
                    nome, 
                    contato,
                    senha
                ) 
            VALUES 
                (
                    (SELECT MAX(id) + 1 FROM usuario),
                    ${nomeSemEspacos}, 
                    ${contato},
                    ${senha}
                )
            ;`

        // Se houver pelo menos um resultado, retorna true, senão, retorna false
        return response.status(200).json(result.rows.length > 0);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Erro interno do servidor' });
    }

}
