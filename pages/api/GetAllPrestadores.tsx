import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const result = await sql`SELECT * FROM prestador ;`;
    
    const usuarios = result.rows;

    return response.status(200).json( usuarios );
  } catch (error) {
    return response.status(500).json({ error });
  }
}