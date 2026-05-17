import { useState, useEffect } from 'react';

export interface InvitationData {
  nombre: string;
  pases: number;
  telefono: string;
}

export const useInvitationData = () => {
  const [data, setData] = useState<InvitationData>({
    nombre: '',
    pases: 1, // Valores por defecto seguros
    telefono: '',
  });

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const invParam = searchParams.get('inv');

      if (invParam) {
        // En caso de que haya espacios codificados en la URL, los reemplazamos por '+' (útil para base64 en URLs)
        const sanitizedParam = invParam.replace(/ /g, '+');

        // Decodificar desde Base64
        const decodedString = decodeURIComponent(escape(atob(sanitizedParam)));

        let finalNombre = '';
        let finalPases = 1;
        let finalTelefono = '';

        try {
          // Intentamos leer el formato antiguo JSON
          const parsedData = JSON.parse(decodedString);
          if (parsedData && typeof parsedData === 'object') {
            finalNombre = typeof parsedData.nombre === 'string' ? parsedData.nombre : '';
            finalPases = typeof parsedData.pases === 'number' ? parsedData.pases : 1;
            finalTelefono = typeof parsedData.telefono === 'string' ? parsedData.telefono : '';
          }
        } catch {
          // Si falla, es el formato nuevo ultracorto: nombre|pases|telefono
          const parts = decodedString.split('|');
          if (parts.length >= 2) {
            finalNombre = parts[0] || '';
            finalPases = parseInt(parts[1], 10) || 1;
            finalTelefono = parts[2] || '';
          }
        }

        setData({
          nombre: finalNombre,
          pases: finalPases,
          telefono: finalTelefono,
        });
      }
    } catch (error) {
      // Capturar silenciosamente (o con advertencia) para que la app no crashee
      // y mantener el estado por defecto.
      console.warn('URL base64 parameter invalid or malformed JSON, using default values.');
    }
  }, []);

  return data;
};
