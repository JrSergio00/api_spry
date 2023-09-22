import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:5173', // Defina a origem permitida específica
  methods: ['POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  await cors(corsOptions)(request, response, async () => {
    try {
      const { number } = request.body;
      // const { id }: any = request.query;

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
