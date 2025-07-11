import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Calendar, MapPin, Tag, Users, ArrowLeft, XCircle, User, Star } from 'lucide-react';

const eventosSimulados = [
  {
    id: 1,
    nombre: 'Concierto de Rock',
    fecha: '2024-07-15',
    lugar: 'Estadio Luna Park',
    precio: 150,
    tags: ['Música'],
    imagen: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=350&fit=crop',
    descripcion: 'Vive la mejor experiencia de rock en vivo. Con bandas invitadas y un show de luces espectacular. No te lo pierdas.'
  },
  {
    id: 2,
    nombre: 'Feria de Tecnología',
    fecha: '2024-08-10',
    lugar: 'Centro de Convenciones',
    precio: 0,
    tags: ['Tecnología', 'Educación'],
    imagen: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=350&fit=crop',
    descripcion: 'Descubre las últimas tendencias en tecnología. Charlas, workshops y stands de las empresas más innovadoras.'
  },
  {
    id: 3,
    nombre: 'Exposición de Arte',
    fecha: '2024-09-01',
    lugar: 'Museo Nacional',
    precio: 80,
    tags: ['Arte'],
    imagen: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=350&fit=crop',
    descripcion: 'Obras de artistas nacionales e internacionales. Recorridos guiados y actividades para toda la familia.'
  },
  {
    id: 4,
    nombre: 'Maratón Ciudad',
    fecha: '2024-10-05',
    lugar: 'Parque Central',
    precio: 50,
    tags: ['Deportes'],
    imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=350&fit=crop',
    descripcion: 'Participa en la maratón más grande de la ciudad. Inscripción abierta para todas las edades.'
  },
  {
    id: 5,
    nombre: 'Festival de Cine',
    fecha: '2024-11-20',
    lugar: 'Cinepolis',
    precio: 120,
    tags: ['Cine'],
    imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=350&fit=crop',
    descripcion: 'Proyecciones de películas internacionales. Charlas con directores y actores invitados.'
  },
  {
    id: 6,
    nombre: 'Charla de IA',
    fecha: '2024-12-01',
    lugar: 'Auditorio ORT',
    precio: 0,
    tags: ['Tecnología', 'Educación'],
    imagen: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&h=350&fit=crop',
    descripcion: 'Aprende sobre inteligencia artificial. Paneles de expertos y networking.'
  },
];

const participantesSimulados = [
  {
    id: 1,
    username: 'jdoe',
    first_name: 'Juan',
    last_name: 'Doe',
    attended: true,
    rating: 5,
    comentario: '¡Excelente evento!'
  },
  {
    id: 2,
    username: 'maria.p',
    first_name: 'María',
    last_name: 'Pérez',
    attended: false,
    rating: null,
    comentario: null
  },
  {
    id: 3,
    username: 'lucasg',
    first_name: 'Lucas',
    last_name: 'Gómez',
    attended: true,
    rating: 4,
    comentario: 'Muy bueno, volvería.'
  },
];

export default function DetalleEventoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const evento = eventosSimulados.find(ev => ev.id === Number(id));
  const [unido, setUnido] = useState(false);

  if (!evento) {
    return <div className="max-w-2xl mx-auto py-16 text-center text-gray-500">Evento no encontrado.</div>;
  }

  const handleUnirse = () => setUnido(true);
  const handleCancelar = () => setUnido(false);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <button className="flex items-center gap-2 text-primary mb-6 hover:underline" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4" /> Volver
      </button>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <img src={evento.imagen} alt={evento.nombre} className="w-full h-56 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-secondary mb-2">{evento.nombre}</h1>
          <div className="flex items-center text-gray-500 text-sm mb-2 gap-4">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {evento.fecha}</span>
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {evento.lugar}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {evento.tags.map(tag => (
              <span key={tag} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                <Tag className="w-3 h-3 inline mr-1" />{tag}
              </span>
            ))}
          </div>
          <div className="mb-4">
            <span className="font-bold text-primary text-lg">{evento.precio === 0 ? 'Gratis' : `$${evento.precio}`}</span>
          </div>
          <p className="text-gray-700 mb-6 text-base leading-relaxed">{evento.descripcion}</p>
          {unido ? (
            <button className="btn-secondary flex items-center gap-2 text-lg px-8 py-3 text-red-600 border-red-400 hover:bg-red-50" onClick={handleCancelar}>
              <XCircle className="w-5 h-5" /> Cancelar inscripción
            </button>
          ) : (
            <button className="btn-primary flex items-center gap-2 text-lg px-8 py-3" onClick={handleUnirse}>
              <Users className="w-5 h-5" /> Unirse
            </button>
          )}
        </div>
      </div>

      {/* Participantes */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mt-8 p-6">
        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
          <User className="w-6 h-6" /> Participantes
        </h2>
        {participantesSimulados.length === 0 ? (
          <div className="text-gray-500 text-center py-8">Aún no hay participantes en este evento.</div>
        ) : (
          <ul className="space-y-4">
            {participantesSimulados.map(p => (
              <li key={p.id} className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <User className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-semibold text-secondary">{p.first_name} {p.last_name} <span className="text-xs text-gray-400">({p.username})</span></div>
                    <div className="text-xs text-gray-500">
                      {p.attended ? 'Asistió' : 'No asistió'}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:items-end mt-2 md:mt-0">
                  {p.rating && (
                    <div className="flex items-center gap-1 text-yellow-500 mb-1">
                      {Array.from({ length: p.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-600 ml-2">{p.rating}/5</span>
                    </div>
                  )}
                  {p.comentario && (
                    <div className="text-xs text-gray-700 italic">“{p.comentario}”</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 