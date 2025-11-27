import React, { useState, useMemo, useRef } from 'react';
import { Store } from '../types';
import { X, MapPin, Clock, Navigation, Heart, PlusCircle, Star, Phone, Share2, CheckCircle, ShoppingBag, Filter, User, ChevronDown, ThumbsUp } from 'lucide-react';

interface StoreProfileProps {
  store: Store;
  onClose: () => void;
  onNavigate: (store: Store) => void;
  onAddToTrip: (store: Store) => void;
  isInTrip: boolean;
}

// Mock Reviews Data
const MOCK_REVIEWS = [
  { id: 1, user: 'Rahul M.', rating: 5, comment: 'Excellent service and great collection! Found exactly what I was looking for.', date: '2 days ago', timestamp: 1728000000000, likes: 12 },
  { id: 2, user: 'Priya S.', rating: 4, comment: 'Good store, but quite crowded on weekends. Staff is helpful though.', date: '1 week ago', timestamp: 1727400000000, likes: 5 },
  { id: 3, user: 'Amit K.', rating: 5, comment: 'Loved the ambiance and the new stock is amazing.', date: '3 weeks ago', timestamp: 1726000000000, likes: 8 },
  { id: 4, user: 'Sneha P.', rating: 3, comment: 'Staff was a bit slow to respond during rush hour.', date: '1 month ago', timestamp: 1724000000000, likes: 2 },
  { id: 5, user: 'Vikram R.', rating: 1, comment: 'Did not have the size I wanted.', date: '2 months ago', timestamp: 1720000000000, likes: 0 },
];

type SortOption = 'newest' | 'highest' | 'lowest';

const StoreProfile: React.FC<StoreProfileProps> = ({ store, onClose, onNavigate, onAddToTrip, isInTrip }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'menu' | 'offers' | 'reviews'>('about');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const sortedReviews = useMemo(() => {
    return [...MOCK_REVIEWS].sort((a, b) => {
      if (sortBy === 'newest') return b.timestamp - a.timestamp;
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest') return a.rating - b.rating;
      return 0;
    });
  }, [sortBy]);

  // Swipe Logic to Close (Vertical & Horizontal)
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    
    const diffY = e.changedTouches[0].clientY - touchStartY.current; // +ve is down
    const diffX = e.changedTouches[0].clientX - touchStartX.current; 

    // Vertical Swipe Down to Close
    if (diffY > 75) {
       if (!contentRef.current || contentRef.current.scrollTop <= 0) {
          onClose();
          return;
       }
    }

    // Horizontal Swipe to Close (Back)
    if (Math.abs(diffX) > 50) {
        onClose();
        return;
    }

    touchStartY.current = null;
    touchStartX.current = null;
  };

  return (
    <div 
      className="fixed inset-x-0 bottom-0 z-[70] h-[90dvh] bg-white dark:bg-gray-900 flex flex-col rounded-t-3xl shadow-2xl animate-slide-up overflow-hidden border-t border-gray-200 dark:border-white/10 transition-colors duration-300"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      
      {/* Drag Handle Area */}
      <div className="absolute top-0 left-0 right-0 h-6 z-20 flex justify-center items-center pointer-events-none">
         <div className="w-12 h-1.5 bg-white/50 dark:bg-white/20 rounded-full"></div>
      </div>

      {/* Header Image & Controls */}
      <div className="relative h-64 shrink-0">
        <img src={store.image} alt={store.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-white/40 dark:via-gray-900/40 to-transparent" />
        
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 mt-2">
          <button onClick={onClose} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition">
             <ChevronDown size={24} />
          </button>
          <div className="flex gap-3">
             <button onClick={() => { /* Share logic */ }} className="w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition">
                <Share2 size={20} />
             </button>
             <button onClick={toggleBookmark} className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center transition ${isBookmarked ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/40' : 'bg-black/40 text-white hover:bg-white/20'}`}>
                <Heart size={20} className={isBookmarked ? 'fill-white' : ''} />
             </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
           <div className="flex justify-between items-end mb-2">
              <div className="bg-primary px-3 py-1 rounded-lg text-xs font-bold text-white uppercase tracking-wide shadow-lg">
                 {store.category}
              </div>
              {store.rating && (
                 <div className="flex items-center gap-1 bg-yellow-400/20 dark:bg-yellow-500/20 backdrop-blur-md px-2 py-1 rounded-lg border border-yellow-500/30">
                    <Star size={14} className="text-yellow-600 dark:text-yellow-400 fill-yellow-600 dark:fill-yellow-400" />
                    <span className="text-gray-900 dark:text-white font-bold">{store.rating}</span>
                    <span className="text-xs text-gray-700 dark:text-gray-300">(120+)</span>
                 </div>
              )}
           </div>
           <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 leading-none drop-shadow-sm">{store.name}</h1>
           <div className="flex items-center gap-4 text-sm text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-1"><MapPin size={14} className="text-primary" /> {store.floor}</span>
              <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full"></span>
              <span className="flex items-center gap-1"><Clock size={14} className="text-green-600 dark:text-green-400" /> Open Now</span>
           </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
         {/* Tabs */}
         <div className="flex border-b border-gray-100 dark:border-white/5 px-6 overflow-x-auto no-scrollbar shrink-0 bg-white dark:bg-gray-900 z-10 sticky top-0">
            {['about', 'menu', 'offers', 'reviews'].map(tab => {
               if (tab === 'menu' && !(store.menu || ['Restaurant', 'Cafe', 'Food'].includes(store.category))) return null;
               
               const isActive = activeTab === tab;
               return (
                  <button 
                     key={tab}
                     onClick={() => setActiveTab(tab as any)}
                     className={`py-4 px-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap capitalize ${isActive ? 'text-gray-900 dark:text-white border-primary' : 'text-gray-500 dark:text-gray-500 border-transparent hover:text-gray-700 dark:hover:text-gray-300'}`}
                  >
                     {tab === 'menu' ? 'Menu & Order' : tab}
                  </button>
               )
            })}
         </div>

         {/* Scrollable Content */}
         <div 
            ref={contentRef}
            className="flex-1 overflow-y-auto p-6 pb-32"
         >
            
            {activeTab === 'about' && (
               <div className="space-y-6 animate-fade-in">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-100 dark:border-white/5">
                     <h3 className="text-gray-900 dark:text-white font-bold mb-2">Description</h3>
                     <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                        {store.description || `Experience the best of ${store.category} at ${store.name}. Visit us on the ${store.floor} for exclusive collections and premium service.`}
                     </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-gray-50 dark:bg-gray-800/30 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                        <div className="text-gray-500 text-xs uppercase mb-1">Opening Hours</div>
                        <div className="text-gray-900 dark:text-white font-medium">{store.hours}</div>
                     </div>
                     <div className="bg-gray-50 dark:bg-gray-800/30 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                        <div className="text-gray-500 text-xs uppercase mb-1">Contact</div>
                        <div className="text-gray-900 dark:text-white font-medium flex items-center gap-2">
                           <Phone size={14} className="text-primary" /> Call Store
                        </div>
                     </div>
                  </div>

                  <div>
                     <h3 className="text-gray-900 dark:text-white font-bold mb-4">Gallery</h3>
                     <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                        <img src={store.image} className="w-40 h-28 object-cover rounded-xl border border-gray-200 dark:border-white/5" />
                        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&q=80" className="w-40 h-28 object-cover rounded-xl opacity-80 border border-gray-200 dark:border-white/5" />
                        <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=300&q=80" className="w-40 h-28 object-cover rounded-xl opacity-80 border border-gray-200 dark:border-white/5" />
                     </div>
                  </div>
               </div>
            )}

            {activeTab === 'menu' && (
               <div className="space-y-4 animate-fade-in">
                  {store.menu && store.menu.length > 0 ? (
                     store.menu.map(item => (
                        <div key={item.id} className="flex gap-4 bg-gray-50 dark:bg-gray-800/30 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                           <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                           </div>
                           <div className="flex-1">
                              <h4 className="text-gray-900 dark:text-white font-bold">{item.name}</h4>
                              <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 my-1">{item.description}</p>
                              <div className="text-primary font-bold">₹{item.price}</div>
                           </div>
                           <button className="self-end bg-gray-200 dark:bg-white text-black p-2 rounded-lg hover:bg-gray-300 transition">
                              <PlusCircle size={18} />
                           </button>
                        </div>
                     ))
                  ) : (
                     <div className="text-center py-10 text-gray-400 dark:text-gray-500">
                        <ShoppingBag size={40} className="mx-auto mb-2 opacity-20" />
                        <p>Menu not available online.</p>
                     </div>
                  )}
               </div>
            )}

            {activeTab === 'offers' && (
               <div className="space-y-4 animate-fade-in">
                  {store.offer ? (
                     <div className="bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl p-6 relative overflow-hidden shadow-lg">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10">
                           <div className="bg-white/20 backdrop-blur-md inline-block px-3 py-1 rounded-lg text-xs font-bold text-white mb-2">
                              LIMITED TIME
                           </div>
                           <h3 className="text-2xl font-black text-white mb-1">SPECIAL DEAL</h3>
                           <p className="text-white/90 font-medium text-lg mb-4">{store.offer}</p>
                           <button className="bg-white text-pink-600 px-6 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-gray-100 transition">
                              Claim Offer
                           </button>
                        </div>
                     </div>
                  ) : (
                     <div className="text-center py-10 text-gray-500">
                        No active offers at the moment.
                     </div>
                  )}
               </div>
            )}

            {activeTab === 'reviews' && (
               <div className="space-y-6 animate-fade-in">
                  {/* Rating Summary */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-100 dark:border-white/5 flex items-center justify-between">
                     <div className="flex flex-col">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{store.rating}</span>
                        <div className="flex text-yellow-400 text-sm">
                           {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} className={i < Math.round(store.rating || 0) ? 'fill-yellow-400' : 'text-gray-300 dark:text-gray-600'} />
                           ))}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Based on 120+ reviews</span>
                     </div>
                     <button className="bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-900 dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                        Write Review
                     </button>
                  </div>

                  {/* Sort Controls */}
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                     <Filter size={14} className="text-gray-500 mr-1" />
                     <button 
                       onClick={() => setSortBy('newest')}
                       className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${sortBy === 'newest' ? 'bg-primary border-primary text-white' : 'bg-transparent border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}
                     >
                        Newest
                     </button>
                     <button 
                       onClick={() => setSortBy('highest')}
                       className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${sortBy === 'highest' ? 'bg-primary border-primary text-white' : 'bg-transparent border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}
                     >
                        Highest Rated
                     </button>
                     <button 
                       onClick={() => setSortBy('lowest')}
                       className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${sortBy === 'lowest' ? 'bg-primary border-primary text-white' : 'bg-transparent border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400'}`}
                     >
                        Lowest Rated
                     </button>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4">
                     {sortedReviews.map((review) => (
                        <div key={review.id} className="bg-gray-50 dark:bg-gray-800/30 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                           <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                 <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                                    <User size={14} />
                                 </div>
                                 <div>
                                    <div className="text-gray-900 dark:text-white font-bold text-sm">{review.user}</div>
                                    <div className="flex items-center gap-1">
                                       {[...Array(5)].map((_, i) => (
                                          <Star key={i} size={10} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'} />
                                       ))}
                                    </div>
                                 </div>
                              </div>
                              <span className="text-[10px] text-gray-500">{review.date}</span>
                           </div>
                           <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{review.comment}</p>
                           <div className="flex items-center gap-4 text-gray-400 text-xs">
                              <button className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition">
                                 <ThumbsUp size={12} /> Helpful ({review.likes})
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-white/10 flex gap-3 shrink-0 pb-safe-area">
         <button 
            onClick={() => onAddToTrip(store)}
            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
               isInTrip 
               ? 'bg-green-100 dark:bg-green-500/10 border-green-500 text-green-600 dark:text-green-500' 
               : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
         >
            {isInTrip ? <CheckCircle size={18} /> : <PlusCircle size={18} />}
            {isInTrip ? 'Added' : 'Add to Trip'}
         </button>
         
         <button 
            onClick={() => onNavigate(store)}
            className="flex-[2] bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-transform"
         >
            <Navigation size={18} /> Navigate Now
         </button>
      </div>
    </div>
  );
};

export default StoreProfile;