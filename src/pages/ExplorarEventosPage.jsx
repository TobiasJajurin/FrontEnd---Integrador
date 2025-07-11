import { useState } from 'react';
import { Search, Calendar, MapPin, Tag, ChevronLeft, ChevronRight, Users } from 'lucide-react';

const TAGS = ['Música', 'Tecnología', 'Arte', 'Deportes', 'Cine', 'Educación'];

const eventosSimulados = [
  {
    id: 1,
    nombre: 'Concierto de Rock',
    fecha: '2024-07-15',
    lugar: 'Estadio Luna Park',
    precio: 150,
    tags: ['Música'],
    imagen: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=220&fit=crop',
    descripcion: 'Vive la mejor experiencia de rock en vivo.'
  },
  {
    id: 2,
    nombre: 'Feria de Tecnología',
    fecha: '2024-08-10',
    lugar: 'Centro de Convenciones',
    precio: 0,
    tags: ['Tecnología', 'Educación'],
    imagen: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=220&fit=crop',
    descripcion: 'Descubre las últimas tendencias en tecnología.'
  },
  {
    id: 3,
    nombre: 'Exposición de Arte',
    fecha: '2024-09-01',
    lugar: 'Museo Nacional',
    precio: 80,
    tags: ['Arte'],
    imagen: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=220&fit=crop',
    descripcion: 'Obras de artistas nacionales e internacionales.'
  },
  {
    id: 4,
    nombre: 'Maratón Ciudad',
    fecha: '2024-10-05',
    lugar: 'Parque Central',
    precio: 50,
    tags: ['Deportes'],
    imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=220&fit=crop',
    descripcion: 'Participa en la maratón más grande de la ciudad.'
  },
  {
    id: 5,
    nombre: 'Festival de Cine',
    fecha: '2024-11-20',
    lugar: 'Cinepolis',
    precio: 120,
    tags: ['Cine'],
    imagen: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=220&fit=crop',
    descripcion: 'Proyecciones de películas internacionales.'
  },
  {
    id: 6,
    nombre: 'Charla de IA',
    fecha: '2024-12-01',
    lugar: 'Auditorio ORT',
    precio: 0,
    tags: ['Tecnología', 'Educación'],
    imagen: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=220&fit=crop',
    descripcion: 'Aprende sobre inteligencia artificial.'
  },
];

const PAGE_SIZE = 3;

export default function ExplorarEventosPage() {
  const [filtros, setFiltros] = useState({ nombre: '', tag: '', fecha: '' });
  const [pagina, setPagina] = useState(1);

  // Filtrado
  const eventosFiltrados = eventosSimulados.filter(ev => {
    const matchNombre = filtros.nombre === '' || ev.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
    const matchTag = filtros.tag === '' || ev.tags.includes(filtros.tag);
    const matchFecha = filtros.fecha === '' || ev.fecha === filtros.fecha;
    return matchNombre && matchTag && matchFecha;
  });

  // Paginación
  const totalPaginas = Math.ceil(eventosFiltrados.length / PAGE_SIZE);
  const eventosPagina = eventosFiltrados.slice((pagina - 1) * PAGE_SIZE, pagina * PAGE_SIZE);

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
    setPagina(1);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary mb-8 flex items-center gap-2">
        <Search className="w-7 h-7" /> Explorar eventos
      </h1>
      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              name="nombre"
              value={filtros.nombre}
              onChange={handleFiltroChange}
              className="input-field pl-10"
              placeholder="Buscar por nombre..."
            />
          </div>
          <div className="relative w-full md:w-1/3">
            <Tag className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <select
              name="tag"
              value={filtros.tag}
              onChange={handleFiltroChange}
              className="input-field pl-10"
            >
              <option value="">Todos los tags</option>
              {TAGS.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          <div className="relative w-full md:w-1/3">
            <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="date"
              name="fecha"
              value={filtros.fecha}
              onChange={handleFiltroChange}
              className="input-field pl-10"
            />
          </div>
        </div>
      </div>
      {/* Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {eventosPagina.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">No se encontraron eventos.</div>
        )}
        {eventosPagina.map(ev => (
          <div key={ev.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
            <div className="h-32 w-full overflow-hidden">
              <img src={ev.imagen} alt={ev.nombre} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-secondary mb-1 truncate">{ev.nombre}</h3>
                <div className="flex items-center text-gray-500 text-xs mb-2 gap-2">
                  <Calendar className="w-4 h-4" /> {ev.fecha}
                  <MapPin className="w-4 h-4 ml-4" /> {ev.lugar}
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {ev.tags.map(tag => (
                    <span key={tag} className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-2 text-xs line-clamp-2">{ev.descripcion}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-primary text-base">{ev.precio === 0 ? 'Gratis' : `$${ev.precio}`}</span>
                <button className="btn-primary flex items-center gap-1 text-sm px-4 py-2">
                  <Users className="w-4 h-4" /> Unirse
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            className="btn-secondary px-3 py-1"
            disabled={pagina === 1}
            onClick={() => setPagina(pagina - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPaginas }, (_, i) => (
            <button
              key={i}
              className={`btn-secondary px-3 py-1 ${pagina === i + 1 ? 'bg-primary text-white' : ''}`}
              onClick={() => setPagina(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="btn-secondary px-3 py-1"
            disabled={pagina === totalPaginas}
            onClick={() => setPagina(pagina + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
} 