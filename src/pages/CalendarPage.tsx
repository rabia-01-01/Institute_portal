import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Calendar, Plus, X, Trash2 } from 'lucide-react';

export default function CalendarPage() {
  const { calendarEvents, addCalendarEvent, deleteCalendarEvent } = useData();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '', endDate: '', type: 'event' as const, description: '' });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    addCalendarEvent({ ...formData, createdBy: user.id });
    setFormData({ title: '', date: '', endDate: '', type: 'event', description: '' });
    setShowForm(false);
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = { exam: 'bg-red-100 text-red-700 border-red-200', holiday: 'bg-green-100 text-green-700 border-green-200', event: 'bg-purple-100 text-purple-700 border-purple-200', deadline: 'bg-amber-100 text-amber-700 border-amber-200', academic: 'bg-blue-100 text-blue-700 border-blue-200' };
    return colors[type] || colors.event;
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-r from-[#1a2744] to-[#0d4a4a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Academic Calendar</h1>
          <p className="text-gray-300">Important dates and events</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {(user?.role === 'admin' || user?.role === 'faculty') && (
            <div className="mb-6">
              <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg">
                {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {showForm ? 'Cancel' : 'Add Event'}
              </button>
            </div>
          )}
          {showForm && (
            <form onSubmit={handleAdd} className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Event title" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white">
                  <option value="event">Event</option>
                  <option value="exam">Exam</option>
                  <option value="holiday">Holiday</option>
                  <option value="deadline">Deadline</option>
                  <option value="academic">Academic</option>
                </select>
                <input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
                <input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none" />
              </div>
              <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none resize-none" rows={3} />
              <button type="submit" className="mt-4 px-6 py-2 bg-[#1a2744] hover:bg-[#2a3a5c] text-white rounded-lg">Add Event</button>
            </form>
          )}
          {calendarEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No events added yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {calendarEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(event => (
                <div key={event.id} className={`border rounded-xl p-5 ${getTypeColor(event.type)}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>{event.date}</span>
                        {event.endDate && <span>to {event.endDate}</span>}
                        <span className="capitalize">{event.type}</span>
                      </div>
                    </div>
                    {(user?.role === 'admin' || user?.id === event.createdBy) && (
                      <button onClick={() => deleteCalendarEvent(event.id)} className="p-1.5 hover:bg-white/50 rounded text-gray-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
