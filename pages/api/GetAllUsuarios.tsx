import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const result = await sql`SELECT * FROM usuario ;`;
    
    const usuarios = result.rows;
    
    usuarios.map( (item) => { 
      const nomeDoUsuário = item.nome.toLowerCase();
      const nome = nomeDoUsuário.split(' ')[0];
      if(nomeDoUsuário.split(' ')[1] === "da" || nomeDoUsuário.split(' ')[1] === "de" || nomeDoUsuário.split(' ')[1] === "do"){
        const sobrenome = nomeDoUsuário.split(' ')[1] + nomeDoUsuário.split(' ')[2];
      } else{
        const sobrenome = nomeDoUsuário.split(' ')[1];
        item.nome = nome;
        item.sobrenome = sobrenome;
      }
    })

    return response.status(200).json( usuarios );
  } catch (error) {
    return response.status(500).json({ error });
  }
}