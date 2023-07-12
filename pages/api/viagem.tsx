import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const result = await sql`SELECT * FROM viagem ;`;

    return response.status(200).json( result.rows );
  } catch (error) {
    return response.status(500).json({ error });
  }
}