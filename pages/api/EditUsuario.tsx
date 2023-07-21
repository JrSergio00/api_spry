import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { id }: any = request.query;
    const result = await sql`
      SELECT 
        * 
      FROM 
        usuario
      WHERE
        id = ${id}
      ;`;

    // result.rows.map((item: any) => {
    // });

    return response.status(200).json(result.rows);
  } catch (error) {
    return response.status(500).json({ error });
  }
}
