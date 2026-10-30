import type { VercelRequest, VercelResponse } from '@vercel/node';

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_NAME = 'gemini-3.5-flash-lite';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Manejo de CORS si es necesario
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Solo POST.' });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'La variable de entorno GEMINI_API_KEY no está configurada en el servidor.' });
  }

  try {
    const { messages, systemInstruction } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'El formato de mensajes no es válido.' });
    }

    const contents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

    const payload = {
      system_instruction: {
        parts: [{ text: systemInstruction }],
      },
      contents,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 800,
      },
    };

    const googleRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!googleRes.ok) {
      const errData = await googleRes.json().catch(() => ({}));
      return res.status(googleRes.status).json({
        error: errData?.error?.message || `Error en la API de Gemini: ${googleRes.statusText}`,
      });
    }

    const data = await googleRes.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({ error: 'No se recibió respuesta válida del modelo.' });
    }

    return res.status(200).json({ text });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Error interno del servidor.' });
  }
}
