import { useState } from 'react';
import { Pencil, Trash2, Plus, Users, Globe, Calendar, MapPin, LogOut, UserCheck, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const eventosCreadosInicial = [
  {
    id: 1,
    nombre: "Mi Recital",
    fecha: "2024-07-10",
    lugar: "Teatro Gran Rex",
    descripcion: "Un show inolvidable",
  },
  {
    id: 2,
    nombre: "Charla de Tecnología",
    fecha: "2024-08-01",
    lugar: "Auditorio ORT",
    descripcion: "Charlas sobre IA y futuro",
  },
];

const eventosUnidosInicial = [
  {
    id: 201,
    nombre: "Feria de Startups",
    fecha: "2024-09-05",
    lugar: "Centro de Convenciones",
    descripcion: "Networking y charlas de innovación",
  },
];

const eventosMundialesInicial = [
  {
    id: 101,
    nombre: "Concierto Global",
    fecha: "2024-09-15",
    lugar: "Estadio Wembley",
    descripcion: "Evento internacional de música",
  },
  {
    id: 102,
    nombre: "Hackathon Mundial",
    fecha: "2024-10-20",
    lugar: "Online",
    descripcion: "Competencia de programación global",
  },
];

export default function DashboardPage() {
  const [eventosCreados, setEventosCreados] = useState(eventosCreadosInicial);
  const [eventosUnidos, setEventosUnidos] = useState(eventosUnidosInicial);
  const [eventosMundiales, setEventosMundiales] = useState(eventosMundialesInicial);
  const navigate = useNavigate();

  const handleEliminar = (id) => {
    setEventosCreados(eventosCreados.filter(ev => ev.id !== id));
  };

  const handleEditar = (id) => {
    alert('Funcionalidad de edición simulada para el evento ID: ' + id);
  };

  const handleUnirse = (id) => {
    const evento = eventosMundiales.find(ev => ev.id === id);
    setEventosUnidos([...eventosUnidos, { ...evento, id: Date.now() }]);
    setEventosMundiales(eventosMundiales.filter(ev => ev.id !== id));
  };

  const handleNuevoEvento = () => {
    alert('Funcionalidad de creación de evento simulada');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-10 px-4">
      <header className="flex justify-between items-center mb-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-primary">Bienvenido, Usuario 👋</h1>
        <button className="btn-secondary flex items-center gap-2" onClick={handleLogout}>
          <LogOut className="w-4 h-4" /> Cerrar sesión
        </button>
      </header>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Mis eventos */}
        <section className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" /> Eventos creados por mí
              </h2>
              <button className="btn-primary flex items-center gap-2" onClick={handleNuevoEvento}>
                <Plus className="w-4 h-4" /> Nuevo evento
              </button>
            </div>
            <div className="space-y-4">
              {eventosCreados.length === 0 && (
                <div className="text-gray-500 text-center">No tienes eventos creados.</div>
              )}
              {eventosCreados.map(ev => (
                <div key={ev.id} className="flex justify-between items-center bg-blue-50/60 rounded-xl p-4 border border-blue-100">
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{ev.nombre}</h3>
                    <div className="text-gray-500 flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" /> {ev.fecha}
                      <MapPin className="w-4 h-4 ml-4" /> {ev.lugar}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{ev.descripcion}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-secondary flex items-center gap-1" onClick={() => handleEditar(ev.id)}>
                      <Pencil className="w-4 h-4" /> Editar
                    </button>
                    <button className="btn-secondary flex items-center gap-1 text-red-600 border-red-600 hover:bg-red-50" onClick={() => handleEliminar(ev.id)}>
                      <Trash2 className="w-4 h-4" /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-secondary flex items-center gap-2 mb-4">
              <UserPlus className="w-5 h-5 text-primary" /> Eventos a los que me uní
            </h2>
            <div className="space-y-4">
              {eventosUnidos.length === 0 && (
                <div className="text-gray-500 text-center">No te has unido a ningún evento.</div>
              )}
              {eventosUnidos.map(ev => (
                <div key={ev.id} className="flex justify-between items-center bg-green-50/60 rounded-xl p-4 border border-green-100">
                  <div>
                    <h3 className="text-lg font-semibold text-green-700">{ev.nombre}</h3>
                    <div className="text-gray-500 flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" /> {ev.fecha}
                      <MapPin className="w-4 h-4 ml-4" /> {ev.lugar}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{ev.descripcion}</p>
                  </div>
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Unido</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eventos mundiales */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-fit">
          <h2 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-primary" /> Eventos mundiales
          </h2>
          <div className="space-y-4">
            {eventosMundiales.length === 0 && (
              <div className="text-gray-500 text-center">No hay eventos mundiales disponibles.</div>
            )}
            {eventosMundiales.map(ev => (
              <div key={ev.id} className="flex justify-between items-center bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div>
                  <h3 className="text-lg font-semibold text-secondary">{ev.nombre}</h3>
                  <div className="text-gray-500 flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" /> {ev.fecha}
                    <MapPin className="w-4 h-4 ml-4" /> {ev.lugar}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{ev.descripcion}</p>
                </div>
                <button className="btn-primary flex items-center gap-1" onClick={() => handleUnirse(ev.id)}>
                  <Users className="w-4 h-4" /> Unirse
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 