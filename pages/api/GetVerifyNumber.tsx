import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
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

    return response.status(200).json( result.rows );
  } catch (error) {
    return response.status(500).json({ error });
  }
}
