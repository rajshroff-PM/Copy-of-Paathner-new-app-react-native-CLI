
import React, { useRef } from 'react';
import { MALL_STORES } from '../constants';
import { Store } from '../types';
import { ArrowLeft, Flame, Tag, Clock, Navigation, PlusCircle, CheckCircle } from 'lucide-react';

interface HotOffersViewProps {
  onBack: () => void;
  onNavigate: (store: Store) => void;
  onAddToTrip: (store: Store) => void;
  tripStoreIds: Set<string>;
}

const HotOffersView: React.FC<HotOffersViewProps> = ({ onBack, onNavigate, onAddToTrip, tripStoreIds }) => {
  // Filter stores that have offers
  const storesWithOffers = MALL_STORES.filter(store => store.offer);

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
      className="h-full flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Header */}
      <div className="flex items-center gap-4 p-4 pt-safe-area border-b border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 sticky top-0 z-10 transition-colors">
         <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white transition">
            <ArrowLeft size={24} />
         </button>
         <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Flame className="text-orange-500 fill-orange-500" /> Hot Offers
         </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-32">
        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 h-56 border border-orange-500/30 shadow-xl group">
            <img 
              src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1200&q=80" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 to-transparent flex flex-col justify-center px-8">
                <div className="bg-white text-orange-600 text-xs font-black px-3 py-1 rounded-full w-fit mb-3 shadow-sm uppercase tracking-wider">Limited Time Offer</div>
                <h3 className="text-4xl font-black text-white italic drop-shadow-md mb-1">FLASH SALE</h3>
                <p className="text-orange-100 text-lg mb-6 font-medium drop-shadow">Up to 70% off on top brands</p>
                <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold text-sm w-fit hover:bg-orange-50 transition shadow-lg active:scale-95 transform">
                   Explore Deals
                </button>
            </div>
        </div>

        {/* Offers Grid */}
        <h3 className="text-gray-900 dark:text-white font-bold mb-4 text-lg">Active Deals</h3>
        <div className="grid gap-6">
            {storesWithOffers.map((store, idx) => {
                const isInTrip = tripStoreIds.has(store.id);
                return (
                    <div 
                      key={store.id}
                      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md dark:shadow-lg animate-slide-up transition-all group"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                        {/* Store Image Header */}
                        <div className="h-40 relative overflow-hidden">
                           <img src={store.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                           
                           <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase shadow-sm">
                              {store.category}
                           </div>

                           <div className="absolute bottom-3 left-3 text-white">
                              <h4 className="font-bold text-xl leading-none mb-1">{store.name}</h4>
                              <div className="text-gray-300 text-xs">{store.floor}</div>
                           </div>
                        </div>

                        <div className="p-4">
                           <div className="flex items-start gap-3 mb-4">
                              <div className="bg-green-100 dark:bg-green-500/20 p-2 rounded-lg text-green-600 dark:text-green-400">
                                 <Tag size={20} />
                              </div>
                              <div>
                                 <p className="text-gray-900 dark:text-white font-bold text-lg leading-tight">{store.offer}</p>
                                 <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs mt-1">
                                    <Clock size={12} /> Valid today until 10 PM
                                 </div>
                              </div>
                           </div>
                        
                           {/* Actions */}
                           <div className="flex gap-3">
                               <button 
                                 onClick={() => onAddToTrip(store)}
                                 className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors ${isInTrip ? 'text-green-600 dark:text-green-500 bg-green-100 dark:bg-green-500/10 border border-green-500/20' : 'bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'}`}
                               >
                                  {isInTrip ? <CheckCircle size={16} /> : <PlusCircle size={16} />}
                                  {isInTrip ? 'Saved' : 'Save'}
                               </button>
                               <button 
                                 onClick={() => onNavigate(store)}
                                 className="flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/20 transition-colors"
                               >
                                  <Navigation size={16} /> Navigate
                               </button>
                           </div>
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  );
};

export default HotOffersView;
