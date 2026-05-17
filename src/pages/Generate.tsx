import { useState } from 'react';

const Generate = () => {
  const [nombre, setNombre] = useState('');
  const [pases, setPases] = useState<number | string>(1);
  const [telefono, setTelefono] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleGenerate = () => {
    if (!nombre.trim()) return;
    
    const numeroPases = Number(pases) || 1;
    
    // Usamos el formato ultracorto: nombre|pases|telefono
    const shortString = `${nombre.trim()}|${numeroPases}|${telefono.trim()}`;
    
    // Convertimos a base64 asegurando compatibilidad con UTF-8
    const base64 = btoa(unescape(encodeURIComponent(shortString)));
    
    // Obtenemos el origen de la URL actual
    const link = `${window.location.origin}/?inv=${base64}#rsvp`;
    setGeneratedLink(link);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('¡Link copiado al portapapeles!');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', background: '#fff', color: '#000', minHeight: '100vh' }}>
      <h1>Generador de Enlaces</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Genera enlaces ofuscados para las invitaciones.</p>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nombre del invitado(s):</label>
        <input 
          type="text" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Familia Sinsel Guardado"
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Número de pases asignados:</label>
        <input 
          type="number" 
          min="1"
          value={pases}
          onChange={(e) => setPases(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Número de teléfono (Opcional):</label>
        <input 
          type="tel" 
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Ej: 5512345678"
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
        />
      </div>

      <button 
        onClick={handleGenerate}
        style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold' }}
      >
        Generar Link
      </button>

      {generatedLink && (
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px' }}>
          <p style={{ margin: '0 0 1rem 0', fontWeight: 'bold' }}>Tu link ha sido generado con éxito:</p>
          <a href={generatedLink} target="_blank" rel="noopener noreferrer" style={{ wordBreak: 'break-all', display: 'block', marginBottom: '1rem', color: '#0066cc' }}>
            {generatedLink}
          </a>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={handleCopy}
              style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', background: '#ccc', border: 'none', borderRadius: '4px', fontWeight: 'bold', color: '#000' }}
            >
              Copiar Link
            </button>
            {telefono && (
              <a 
                href={`https://wa.me/${telefono.replace(/\D/g, '')}?text=${encodeURIComponent(`¡Hola! Te compartimos la invitación a nuestra boda: ${generatedLink}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '0.75rem 1.5rem', cursor: 'pointer', background: '#25D366', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block' }}
              >
                Enviar por WhatsApp
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Generate;
