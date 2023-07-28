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
  response: NextApiResponse
) {
    await cors(corsOptions)(request, response, async () => {
      try {
    
        const { id }: any = request.query;
        const { nome, sobrenome, contato } = request.body;
        const nomeCompleto = nome + " " + sobrenome;
    
        const result = await sql`
        UPDATE 
          usuario
        SET 
          nome = ${nomeCompleto},
          contato = ${contato}
        WHERE 
          id =  ${id}
        ;`;
    
        // result.rows.map((item: any) => {
        // });
    
        return response.status(200).json(result.rows);
      } catch (error) {
        return response.status(500).json({ error });
      }
    });
}
