import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse,
    ) {

    const data = [
      {
        "partida": "Rua Parque das Rosas",
        "destino": "Avenida Salgado Filho",
        "valor": 20.5,
        "tp_veiculo": "G",
        "tp_pagamento": "P",
        "status": "F",
        "id": 1,
        "dt_inicio": "2023-07-11T00:00:00.000Z",
        "dt_fim": "2023-07-11T00:00:00.000Z",
        "distancia": "12km",
        "id_usuario": 1,
        "id_prestador": 1
      },
      {
        "partida": "Avenida Abel Cabral",
        "destino": "Natal Shopping",
        "valor": 19.12,
        "tp_veiculo": "P",
        "tp_pagamento": "E",
        "status": "C",
        "id": 2,
        "dt_inicio": "2023-07-12T00:00:00.000Z",
        "dt_fim": "2023-07-12T00:00:00.000Z",
        "distancia": "7km",
        "id_usuario": 2,
        "id_prestador": 2
      }
    ]
    if(request.method === 'GET'){
      return response.status(200).json(data)
    }

  }