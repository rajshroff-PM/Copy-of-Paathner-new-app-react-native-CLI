import React, { useState, useRef } from 'react';
import { Store, MenuItem } from '../types';
import { ArrowLeft, Star, Clock, ShoppingBag, Plus, Minus, CreditCard, CheckCircle, X, IndianRupee, Coins } from 'lucide-react';

interface RestaurantOrderingProps {
  store: Store;
  onBack: () => void;
}

const RestaurantOrdering: React.FC<RestaurantOrderingProps> = ({ store, onBack }) => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [selectedPayment, setSelectedPayment] = useState<'upi' | 'card' | 'coins'>('upi');

  // Swipe to back logic
  const touchStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(diff) > 50) onBack(); // Swipe left or right to back
    touchStart.current = null;
  };

  const menuItems = store.menu || [];

  const getItemCount = (id: string) => cart[id] || 0;

  const updateCart = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalItems = (Object.values(cart) as number[]).reduce((a: number, b: number) => a + b, 0);
  const totalPrice = Object.entries(cart).reduce((sum: number, [id, qty]: [string, number]) => {
    const item = menuItems.find(i => i.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const handlePayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  const handleClosePayment = () => {
      setIsPaymentOpen(false);
      setPaymentStatus('idle');
      setCart({});
      setIsCartOpen(false);
  };

  return (
    <div 
      className="fixed inset-0 z-[60] bg-gray-900 flex flex-col overflow-hidden animate-fade-in"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 shrink-0">
         <img 
           src={store.image} 
           alt={store.name} 
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
         <div className="absolute inset-0 bg-black/30" />
         
         <button 
           onClick={onBack}
           className="absolute top-6 left-6 bg-black/40 backdrop-blur text-white p-3 rounded-full hover:bg-white/20 transition-colors"
         >
           <ArrowLeft size={24} />
         </button>

         <div className="absolute bottom-6 left-6 right-6">
           <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">{store.name}</h1>
           <div className="flex items-center gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 text-white font-bold border border-white/10">
                 <Star size={14} className="text-yellow-400 fill-yellow-400" /> {store.rating}
              </div>
              <div className="flex items-center gap-1 text-gray-200 bg-black/40 px-2 py-1 rounded-lg backdrop-blur">
                 <Clock size={14} className="text-primary" /> 30-40 mins
              </div>
              <div className="text-gray-300">
                 {store.category} • {store.floor}
              </div>
           </div>
         </div>
      </div>

      {/* Menu Content */}
      <div className="flex-1 overflow-y-auto p-6 pb-32 bg-gray-900">
        <h2 className="text-xl font-bold text-white mb-6">Full Menu</h2>
        
        <div className="space-y-6">
           {menuItems.map((item) => (
             <div key={item.id} className="flex gap-4 bg-gray-800/40 border border-white/5 p-4 rounded-2xl hover:bg-gray-800/60 transition-colors">
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-1">
                      {/* Veg/Non-veg indicator simulated */}
                      <div className="w-4 h-4 border border-green-500 flex items-center justify-center rounded-sm">
                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <h3 className="font-bold text-white text-lg">{item.name}</h3>
                   </div>
                   <div className="text-white font-mono font-bold mb-2">₹{item.price}</div>
                   <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{item.description}</p>
                   {item.rating && (
                       <div className="mt-2 flex items-center gap-1 text-xs text-yellow-500">
                           <Star size={10} className="fill-yellow-500" /> {item.rating}
                       </div>
                   )}
                </div>
                <div className="flex flex-col items-center gap-2 relative">
                   <div className="w-28 h-28 rounded-xl overflow-hidden bg-gray-700">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                   </div>
                   
                   {getItemCount(item.id) === 0 ? (
                       <button 
                         onClick={() => updateCart(item.id, 1)}
                         className="absolute -bottom-3 bg-white text-primary font-bold px-6 py-2 rounded-lg shadow-lg text-sm hover:bg-gray-100 active:scale-95 transition-transform uppercase tracking-wide"
                       >
                         ADD
                       </button>
                   ) : (
                       <div className="absolute -bottom-3 bg-white text-black font-bold rounded-lg shadow-lg flex items-center overflow-hidden border border-white/10 h-9">
                          <button onClick={() => updateCart(item.id, -1)} className="px-3 h-full hover:bg-gray-200 text-primary"><Minus size={14} /></button>
                          <span className="px-2 text-sm">{getItemCount(item.id)}</span>
                          <button onClick={() => updateCart(item.id, 1)} className="px-3 h-full hover:bg-gray-200 text-primary"><Plus size={14} /></button>
                       </div>
                   )}
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Bottom Cart Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none z-40">
           <div className="pointer-events-auto max-w-3xl mx-auto bg-primary text-white rounded-2xl p-4 shadow-2xl shadow-primary/30 flex items-center justify-between cursor-pointer hover:bg-primary-hover transition-colors"
                onClick={() => setIsCartOpen(true)}>
              <div className="flex flex-col">
                 <span className="text-xs uppercase font-bold opacity-80">{totalItems} ITEMS</span>
                 <span className="text-xl font-bold">₹{totalPrice}</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider">
                 View Cart <ShoppingBag size={18} />
              </div>
           </div>
        </div>
      )}

      {/* Cart Sheet / Modal */}
      {isCartOpen && (
         <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-end md:items-center p-0 md:p-4 animate-fade-in">
            <div className="bg-gray-900 w-full max-w-md rounded-t-3xl md:rounded-3xl border border-white/10 overflow-hidden flex flex-col max-h-[80vh]">
               <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gray-800/50">
                  <h3 className="text-xl font-bold text-white">Your Cart</h3>
                  <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
               </div>
               <div className="p-6 overflow-y-auto space-y-4 flex-1">
                  {Object.entries(cart).map(([id, qty]) => {
                     const item = menuItems.find(i => i.id === id);
                     if(!item) return null;
                     return (
                        <div key={id} className="flex justify-between items-center">
                           <div className="flex items-center gap-3">
                              <div className="w-2 h-2 border border-green-500 flex items-center justify-center rounded-full">
                                <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                              </div>
                              <div className="text-white text-sm md:text-base">
                                 <div className="font-medium">{item.name}</div>
                                 <div className="text-xs text-gray-400">₹{item.price} x {qty}</div>
                              </div>
                           </div>
                           <div className="flex items-center bg-gray-800 rounded-lg border border-white/10 h-8">
                              <button onClick={() => updateCart(id, -1)} className="px-2 h-full text-gray-400 hover:text-white"><Minus size={12} /></button>
                              <span className="px-2 text-white text-sm font-mono">{qty}</span>
                              <button onClick={() => updateCart(id, 1)} className="px-2 h-full text-green-500 hover:text-green-400"><Plus size={12} /></button>
                           </div>
                        </div>
                     );
                  })}
                  
                  <div className="border-t border-white/10 border-dashed my-4 pt-4">
                     <div className="flex justify-between text-gray-400 text-sm mb-2">
                        <span>Item Total</span>
                        <span>₹{totalPrice}</span>
                     </div>
                     <div className="flex justify-between text-gray-400 text-sm mb-2">
                        <span>Taxes & Charges</span>
                        <span>₹{Math.floor(totalPrice * 0.18)}</span>
                     </div>
                     <div className="flex justify-between text-white font-bold text-lg mt-4">
                        <span>Grand Total</span>
                        <span>₹{Math.floor(totalPrice * 1.18)}</span>
                     </div>
                  </div>
               </div>
               <div className="p-4 bg-gray-800/50 border-t border-white/10">
                  <button 
                    onClick={() => { setIsCartOpen(false); setIsPaymentOpen(true); }}
                    className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-600/20 flex items-center justify-center gap-2"
                  >
                     Proceed to Pay ₹{Math.floor(totalPrice * 1.18)}
                  </button>
               </div>
            </div>
         </div>
      )}

      {/* Payment Modal */}
      {isPaymentOpen && (
         <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex justify-center items-center p-4 animate-fade-in">
            <div className="bg-gray-900 w-full max-w-sm rounded-3xl border border-white/10 overflow-hidden relative">
               {paymentStatus === 'idle' && (
                  <>
                     <div className="p-6 text-center">
                        <h3 className="text-xl font-bold text-white mb-1">Payment Options</h3>
                        <p className="text-gray-400 text-sm">Amount to pay: ₹{Math.floor(totalPrice * 1.18)}</p>
                     </div>
                     <div className="px-6 pb-6 space-y-3">
                        <button 
                          onClick={() => setSelectedPayment('upi')}
                          className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${selectedPayment === 'upi' ? 'bg-white/10 border-primary text-white' : 'bg-transparent border-white/10 text-gray-400'}`}
                        >
                           <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white"><IndianRupee size={20} /></div>
                           <div className="flex-1 text-left font-medium">UPI / GPay / PhonePe</div>
                           {selectedPayment === 'upi' && <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_#EC4899]"></div>}
                        </button>
                        
                        <button 
                          onClick={() => setSelectedPayment('card')}
                          className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${selectedPayment === 'card' ? 'bg-white/10 border-primary text-white' : 'bg-transparent border-white/10 text-gray-400'}`}
                        >
                           <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white"><CreditCard size={20} /></div>
                           <div className="flex-1 text-left font-medium">Credit / Debit Card</div>
                           {selectedPayment === 'card' && <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_#EC4899]"></div>}
                        </button>

                        <button 
                          onClick={() => setSelectedPayment('coins')}
                          className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${selectedPayment === 'coins' ? 'bg-white/10 border-primary text-white' : 'bg-transparent border-white/10 text-gray-400'}`}
                        >
                           <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white"><Coins size={20} /></div>
                           <div className="flex-1 text-left font-medium">Mall Points (Balance: 200)</div>
                           {selectedPayment === 'coins' && <div className="w-4 h-4 bg-primary rounded-full shadow-[0_0_10px_#EC4899]"></div>}
                        </button>
                     </div>
                     <div className="p-4 border-t border-white/10">
                        <button 
                           onClick={handlePayment}
                           className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition"
                        >
                           Pay Now
                        </button>
                        <button onClick={handleClosePayment} className="w-full text-center text-gray-500 text-sm mt-4 hover:text-white">Cancel Transaction</button>
                     </div>
                  </>
               )}

               {paymentStatus === 'processing' && (
                  <div className="p-10 flex flex-col items-center justify-center text-center min-h-[300px]">
                     <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-6"></div>
                     <h3 className="text-xl font-bold text-white animate-pulse">Processing Payment...</h3>
                     <p className="text-gray-400 text-sm mt-2">Do not close the app</p>
                  </div>
               )}

               {paymentStatus === 'success' && (
                  <div className="p-10 flex flex-col items-center justify-center text-center min-h-[300px] animate-fade-in">
                     <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)] animate-bounce">
                        <CheckCircle size={40} />
                     </div>
                     <h3 className="text-2xl font-bold text-white mb-2">Order Placed!</h3>
                     <p className="text-gray-400 text-sm mb-6">Order #ORD-8829 confirmed. <br/>Pick up in 40 mins.</p>
                     <button 
                       onClick={handleClosePayment}
                       className="bg-gray-800 hover:bg-gray-700 border border-white/10 text-white px-8 py-3 rounded-full font-medium transition-colors"
                     >
                        Done
                     </button>
                  </div>
               )}
            </div>
         </div>
      )}
    </div>
  );
};

export default RestaurantOrdering;