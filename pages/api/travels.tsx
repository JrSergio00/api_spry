import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'cors';

const corsOptions = {
  origin: '*', // Ou defina a origem permitida específica
  methods: ['GET'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  // Configurar o CORS usando o middleware 'cors'
  cors(corsOptions)(request, response, () => {
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
      "destino": "Via Diesel",
      "valor": 175.00,
      "tp_veiculo": "M",
      "tp_pagamento": "E",
      "status": "C",
      "id": 3,
      "dt_inicio": "2023-07-12T00:00:00.000Z",
      "dt_fim": "2023-07-08T00:00:00.000Z",
      "distancia": "12.4km",
      "id_usuario": 2,
      "id_prestador": 2
    },
    {
      "partida": "Avenida Hermes da Fonseca",
      "destino": "Oficina do Dudu",
      "valor": 250.00,
      "tp_veiculo": "M",
      "tp_pagamento": "E",
      "status": "C",
      "id": 4,
      "dt_inicio": "2023-07-12T00:00:00.000Z",
      "dt_fim": "2023-07-08T00:00:00.000Z",
      "distancia": "20.4km",
      "id_usuario": 2,
      "id_prestador": 2
    },
    {
      "partida": "Avenida Hermes da Fonseca",
      "destino": "National Veiculos",
      "valor": 143.00,
      "tp_veiculo": "M",
      "tp_pagamento": "E",
      "status": "C",
      "id": 5,
      "dt_inicio": "2023-07-12T00:00:00.000Z",
      "dt_fim": "2023-07-08T00:00:00.000Z",
      "distancia": "10.4km",
      "id_usuario": 2,
      "id_prestador": 2
    }
  ]

    if (request.method === 'GET') {
      return response.status(200).json(data);
    }
  });
}
  