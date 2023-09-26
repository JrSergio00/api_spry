import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const corsMiddleware = cors(corsOptions);

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // Aplicar o middleware de CORS diretamente aqui
  corsMiddleware(request, response, async () => {
    try {
      const { number } = request.body;

      const result = await sql`
        SELECT 
          usuario.id,
          usuario.nome
        FROM
          usuario
        WHERE 
          usuario.contato =  ${number}
      ;`;

      return response.status(200).json(result.rows);
    } 
    catch (error) {
      return response.status(500).json({ error });
    }
  })
}
