import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    try {
        const { name, password }: any = request.body;
        const result = await sql`
        SELECT 
            id
        FROM 
            usuario
        WHERE
            nome = ${name}
            AND senha = ${password}
        ;`;

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return response.status(500).json({ error });
    }
}
