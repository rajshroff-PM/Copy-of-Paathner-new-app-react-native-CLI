
import React, { useState, useRef } from 'react';
import { MALL_EVENTS } from '../constants';
import { Calendar, Clock, MapPin, Plus, Check, ArrowLeft } from 'lucide-react';

interface EventsViewProps {
  onBack: () => void;
}

const EventsView: React.FC<EventsViewProps> = ({ onBack }) => {
  // Track joined events by ID
  const [joinedEvents, setJoinedEvents] = useState<Set<string>>(new Set());

  const toggleJoin = (eventId: string) => {
    setJoinedEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
      } else {
        newSet.add(eventId);
      }
      return newSet;
    });
  };

  // Swipe to back logic
  const touchStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(diff) > 50) onBack(); 
    touchStart.current = null;
  };

  return (
    <div 
      className="w-full h-full flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Header */}
      <div className="flex items-center gap-4 p-4 pt-safe-area border-b border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 z-10 sticky top-0 transition-colors">
         <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white transition">
            <ArrowLeft size={24} />
         </button>
         <h2 className="text-xl font-bold text-gray-900 dark:text-white">Events</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-32 md:pb-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Upcoming Events</h2>
            <p className="text-gray-500 dark:text-gray-400">Don't miss out on exclusive happenings at Amanora.</p>
          </div>

          <div className="grid gap-6">
            {MALL_EVENTS.map((event) => {
              const isJoined = joinedEvents.has(event.id);
              return (
                <div 
                  key={event.id} 
                  className="relative group overflow-hidden rounded-2xl border border-gray-200 dark:border-white/5 hover:border-primary/30 dark:hover:border-white/20 transition-all duration-300 bg-white dark:bg-gray-800/40 backdrop-blur-xl flex flex-col md:flex-row shadow-sm hover:shadow-lg dark:shadow-none"
                >
                  {/* Event Image */}
                  {event.image && (
                    <div className="h-56 md:h-auto md:w-1/3 relative shrink-0 overflow-hidden">
                       <img 
                         src={event.image} 
                         alt={event.title} 
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r"></div>
                       <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-bold text-xs shadow-lg">
                          {event.date.split(' ')[0]} {event.date.split(' ')[1]}
                       </div>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1 gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{event.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">{event.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/5">
                          <Clock size={14} className="text-primary" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/5">
                          <MapPin size={14} className="text-primary" />
                          {event.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
                      <button 
                        onClick={() => toggleJoin(event.id)}
                        className={`w-full md:w-auto px-6 py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium border ${
                          isJoined 
                            ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(6,108,228,0.4)]' 
                            : 'bg-gray-50 dark:bg-white/5 hover:bg-primary hover:text-white text-primary border-primary/30'
                        }`}
                      >
                        {isJoined ? <Check size={18} /> : <Plus size={18} />}
                        <span className="">{isJoined ? 'Joined' : 'Join Event'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsView;
