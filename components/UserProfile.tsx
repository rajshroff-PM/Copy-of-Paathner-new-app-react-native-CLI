
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, Edit2, Moon, Sun, Bell, User, HelpCircle, 
  MessageSquare, MessageCircle, Share2, Info, LogOut, 
  ChevronRight, Star, Shield, Camera, X, CheckCircle, Lock, 
  ChevronDown, ChevronUp, Send, Trash2, ExternalLink, Copy, Phone, Search, Smartphone, ArrowRight, Gift
} from 'lucide-react';
import Logo from './Logo';

interface UserProfileProps {
  onClose: () => void;
  userPoints: number;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
}

type ProfileView = 'main' | 'faqs' | 'chat' | 'feedback' | 'notifications' | 'account' | 'share' | 'about';

// Full Paathner Logo Component (SVG)
const PaathnerLogo = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 146.81 32.17">
    <g>
      <path fill="currentColor" d="M37.89,7.09h8.27c3.99,0,6.65,2.66,6.65,6.65s-2.66,6.78-6.65,6.78h-5.01v4.82h-3.26V7.09ZM49.55,13.85c0-2.29-1.46-3.76-3.68-3.76h-4.72v7.43h4.72c2.22,0,3.68-1.46,3.68-3.68Z"/>
      <path fill="currentColor" d="M66.68,18.88v6.47h-3.13v-1.25c-.63.81-1.96,1.49-3.86,1.49-3.78,0-6.49-2.71-6.49-6.75s2.71-6.7,6.73-6.7,6.75,2.71,6.75,6.75ZM59.95,14.99c-2.19,0-3.62,1.43-3.62,3.86s1.43,3.86,3.62,3.86,3.6-1.43,3.6-3.86-1.43-3.86-3.6-3.86Z"/>
      <path fill="currentColor" d="M81.33,18.88v6.47h-3.13v-1.25c-.63.81-1.96,1.49-3.86,1.49-3.78,0-6.49-2.71-6.49-6.75s2.71-6.7,6.73-6.7,6.75,2.71,6.75,6.75ZM74.6,14.99c-2.19,0-3.62,1.43-3.62,3.86s1.43,3.86,3.62,3.86,3.6-1.43,3.6-3.86-1.43-3.86-3.6-3.86Z"/>
      <path fill="currentColor" d="M89.2,25.53c-4.28,0-6.54-2.16-6.54-6.18V7.09h3.13v5.21h2.97v2.87h-2.97v4.15c0,2.37.96,3.34,3.42,3.34v2.87Z"/>
      <path fill="currentColor" d="M93.4,13.22c.76-.7,1.83-1.15,3.29-1.15,3.89,0,5.58,3.23,5.58,5.5v7.77h-3.13v-7.69c0-1.85-1.36-2.69-2.87-2.69s-2.87.83-2.87,2.69v7.69h-3.13V7.09h3.13v6.13Z"/>
      <path fill="currentColor" d="M115.82,17.58v7.77h-3.13v-7.69c0-1.85-1.36-2.69-2.87-2.69s-2.87.83-2.87,2.69v7.69h-3.13v-7.77c0-2.27,1.7-5.5,6-5.5s6,3.23,6,5.5Z"/>
      <path fill="currentColor" d="M126.69,21.31h3.42c-.86,2.63-3.18,4.28-6.34,4.28-4.04,0-6.75-2.71-6.75-6.75s2.71-6.7,6.75-6.7,6.73,2.69,6.73,6.7c0,.37-.03.7-.05,1.04h-10.2c.34,1.8,1.64,2.84,3.5,2.84,1.3,0,2.32-.5,2.95-1.41ZM127.03,17c-.55-1.28-1.72-2.01-3.29-2.01s-2.71.73-3.26,2.01h6.54Z"/>
      <path fill="currentColor" d="M138.16,12.07v2.87c-2.09,0-3.34,1.02-3.34,3.1v7.3h-3.13v-7.3c0-3.96,2.5-5.97,6.47-5.97Z"/>
    </g>
    <g>
      <rect fill="#9ca3af" x="3.7" y="3" width="26.16" height="26.16" rx="4.65" ry="4.65" className="text-gray-400"/>
      <g>
        <path fill="#fff" d="M16.27,21.77h0c0,2-1.62,3.61-3.61,3.61h-1.63v-10.85l4.85.41.22,2.66c.12,1.38.17,2.77.17,4.16Z"/>
        <path fill="#fff" d="M21.78,8.42l-10.72,4.92v-.03c0-3.6,2.92-6.52,6.52-6.52,1.64,0,3.14.61,4.28,1.6-.02,0-.05.02-.08.03Z"/>
        <path fill="#fff" d="M24.09,13.3s0,.1,0,.14c-.04,2.11-1.08,3.96-2.67,5.12-1.11.81-2.48,1.28-3.95,1.25l4.94-10.77s.02-.06.03-.09c1.03,1.16,1.66,2.67,1.66,4.34Z"/>
      </g>
    </g>
    <polygon fill="#9ca3af" points="143.1 13.41 138.16 18.35 138.16 8.47 143.1 13.41"/>
  </svg>
);

const UserProfile: React.FC<UserProfileProps> = ({ onClose, userPoints, isDarkMode, onToggleTheme, onLogout }) => {
  const [currentView, setCurrentView] = useState<ProfileView>('main');
  const [isEditing, setIsEditing] = useState(false);
  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);
  
  // --- Main Profile Data ---
  const [userInfo, setUserInfo] = useState({
    name: 'Raj Shroff',
    email: 'rajshroff52@gmail.com',
    phone: '+91 7987819652',
    image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    state: 'Maharashtra',
    city: 'Pune'
  });

  // --- Feedback State ---
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  // --- Chat State ---
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'support', text: 'Hi Raj! How can we help you today?', time: '10:00 AM' }
  ]);

  // --- Notification Settings State ---
  const [notifSettings, setNotifSettings] = useState({
    push: true,
    email: false,
    promo: true,
    orders: true
  });

  // --- Helper: Header for Sub-screens ---
  const SubHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-4 p-4 pt-safe-area bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-white/5 shrink-0 sticky top-0 z-10 transition-colors duration-300">
      <button 
        onClick={() => setCurrentView('main')} 
        className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded-full transition-colors"
      >
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
    </div>
  );

  // --- VIEW: FAQs ---
  const FAQView = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const faqs = [
      { q: "How do I manage all the notifications on the App?", a: "Go to Notification Settings in the profile menu to customize your preferences for push, email, and promotional notifications." },
      { q: "How can I add/modify the payment method?", a: "You can manage payment methods during checkout or in the 'Payments' section of the main menu." },
      { q: "Which modes of payment are available?", a: "We support Credit/Debit cards, UPI (GPay, PhonePe), Net Banking, and Mall Reward Points." },
      { q: "Can I change my birthday/Anniversary on the App?", a: "Yes, navigate to 'Edit Profile' to update your personal dates." },
      { q: "Why do I have to input a state for the Invoice?", a: "State information is required for GST calculation and accurate billing." }
    ];

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 animate-slide-in-right transition-colors duration-300">
        <SubHeader title="All support tickets" />
        <div className="p-4 flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 px-2">How can we help you?</h2>
          
          <div className="relative mb-8">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Search size={18} className="text-gray-500" />
             </div>
             <input 
               type="text" 
               placeholder="Search for FAQs" 
               className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-primary transition-colors"
             />
          </div>

          <h3 className="text-gray-500 dark:text-gray-400 font-bold mb-4 px-2">All Questions</h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-white/5 overflow-hidden transition-colors">
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-4 text-left"
                >
                  <span className="font-medium text-gray-900 dark:text-white text-sm pr-4">{faq.q}</span>
                  {openIndex === idx ? <ChevronUp size={18} className="text-gray-400 shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
                </button>
                {openIndex === idx && (
                  <div className="px-4 pb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Footer Chat Button */}
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-white/10 transition-colors">
           <button 
             onClick={() => setCurrentView('chat')}
             className="w-full bg-white dark:bg-white text-black font-bold py-3 rounded-xl border border-gray-200 shadow-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
           >
             <MessageSquare size={18} /> Chat with us
           </button>
        </div>
      </div>
    );
  };

  // --- VIEW: Chat ---
  const ChatView = () => {
    const chatEndRef = useRef<HTMLDivElement>(null);
    
    const handleSend = (e: React.FormEvent) => {
      e.preventDefault();
      if (!chatMessage.trim()) return;
      setChatHistory([...chatHistory, { id: Date.now(), sender: 'user', text: chatMessage, time: 'Now' }]);
      setChatMessage('');
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    };

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 animate-slide-in-right transition-colors duration-300">
        <SubHeader title="Chat with us" />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
           {chatHistory.map(msg => (
             <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-white rounded-tr-none' 
                    : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-white/5 rounded-tl-none'
                }`}>
                   <p>{msg.text}</p>
                   <span className={`text-[10px] block mt-1 ${msg.sender === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>{msg.time}</span>
                </div>
             </div>
           ))}
           <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSend} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-white/10 flex gap-3 transition-colors">
           <input 
             value={chatMessage}
             onChange={(e) => setChatMessage(e.target.value)}
             placeholder="Type a message..."
             className="flex-1 bg-gray-100 dark:bg-gray-800 border-none rounded-xl px-4 focus:outline-none focus:ring-1 focus:ring-primary text-gray-900 dark:text-white transition-colors"
           />
           <button type="submit" disabled={!chatMessage.trim()} className="bg-primary disabled:opacity-50 text-white p-3 rounded-xl">
              <Send size={20} />
           </button>
        </form>
      </div>
    );
  };

  // --- VIEW: Feedback ---
  const FeedbackView = () => {
    const handleSubmitFeedback = () => {
      setFeedbackText('');
      setRating(0);
      setShowFeedbackSuccess(true);
      setTimeout(() => {
        setShowFeedbackSuccess(false);
        setCurrentView('main');
      }, 2000);
    };

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 animate-slide-in-right transition-colors duration-300 relative">
        {showFeedbackSuccess && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
             <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl transform scale-110 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                   <CheckCircle size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Thank You!</h3>
                <p className="text-gray-500 dark:text-gray-400">Your feedback helps us improve.</p>
             </div>
          </div>
        )}

        <SubHeader title="Share feedback" />
        <div className="p-6 flex-1">
           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-white/5 shadow-sm mb-6 transition-colors">
              <h3 className="text-center text-gray-900 dark:text-white font-bold mb-4">Enjoying Paathner so far?</h3>
              <div className="flex justify-center gap-4 mb-2">
                 {[1, 2, 3, 4, 5].map((star) => (
                   <button key={star} onClick={() => setRating(star)} className="transition-transform active:scale-110 hover:scale-110">
                      <Star
                        size={36} 
                        className={`${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"} transition-colors`} 
                      /> 
                   </button>
                 ))}
              </div>
           </div>
  
           <h3 className="font-bold text-gray-900 dark:text-white mb-2">Tell us more</h3>
           <textarea 
             value={feedbackText}
             onChange={(e) => setFeedbackText(e.target.value)}
             placeholder="Eg: The event I liked was not listed..."
             className="w-full h-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-2xl p-4 text-gray-900 dark:text-white focus:outline-none focus:border-primary resize-none transition-colors"
           />
        </div>
        <div className="p-6">
           <button 
             onClick={handleSubmitFeedback}
             disabled={!feedbackText.trim() || rating === 0}
             className="w-full bg-primary disabled:opacity-50 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold py-4 rounded-xl shadow-lg transition-colors"
           >
              Submit feedback
           </button>
        </div>
      </div>
    );
  };

  // --- VIEW: Notifications ---
  const NotificationSettingsView = () => {
    const Toggle = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-white/5 transition-colors">
         <span className="font-medium text-gray-900 dark:text-white">{label}</span>
         <button 
           onClick={onChange}
           className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${checked ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
         >
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
         </button>
      </div>
    );

    return (
      <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 animate-slide-in-right transition-colors duration-300">
        <SubHeader title="Notification settings" />
        <div className="p-6 space-y-4">
           <Toggle label="Push Notifications" checked={notifSettings.push} onChange={() => setNotifSettings(s => ({...s, push: !s.push}))} />
           <Toggle label="Email Notifications" checked={notifSettings.email} onChange={() => setNotifSettings(s => ({...s, email: !s.email}))} />
           <Toggle label="Promotional Offers" checked={notifSettings.promo} onChange={() => setNotifSettings(s => ({...s, promo: !s.promo}))} />
           <Toggle label="Order Updates" checked={notifSettings.orders} onChange={() => setNotifSettings(s => ({...s, orders: !s.orders}))} />
        </div>
      </div>
    );
  };

  // --- VIEW: Account Settings ---
  const AccountSettingsView = () => (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 animate-slide-in-right transition-colors duration-300">
      <SubHeader title="Account settings" />
      <div className="p-6">
         <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
            <div className="flex items-center gap-3 text-red-500">
               <Trash2 size={20} />
               <span className="font-medium">Delete account</span>
            </div>
            <ChevronRight size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
         </button>
         <p className="text-xs text-gray-500 mt-4 px-2">
            Deleting your account will remove all your data, points, and history permanently. This action cannot be undone.
         </p>
      </div>
    </div>
  );

  // --- VIEW: Share App ---
  const ShareAppView = () => (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 animate-slide-in-right transition-colors duration-300">
      <SubHeader title="Refer & Earn" />
      <div className="flex-1 p-6 flex flex-col items-center text-center">
         <div className="bg-white p-6 rounded-3xl shadow-xl mb-8">
            {/* Placeholder QR */}
            <div className="w-48 h-48 bg-gray-900 rounded-xl flex items-center justify-center text-white">
               <Gift size={64} />
            </div>
         </div>
         
         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Invite your friends</h2>
         <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">
            Earn <span className="text-primary font-bold">100 points</span> when your friend downloads the app and makes their first visit.
         </p>

         <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
            <button className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-primary/50 transition-all">
               <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg">
                  <MessageCircle size={24} />
               </div>
               <span className="text-xs font-bold text-gray-700 dark:text-gray-300">WhatsApp</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-primary/50 transition-all">
               <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                  <Camera size={24} />
               </div>
               <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Instagram</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-white/5 hover:border-primary/50 transition-all">
               <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-white shadow-lg">
                  <Copy size={24} />
               </div>
               <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Copy Link</span>
            </button>
         </div>
      </div>
    </div>
  );

  // --- VIEW: About Us ---
  const AboutUsView = () => (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 animate-slide-in-right transition-colors duration-300">
      <SubHeader title="About us" />
      <div className="flex-1 p-6 flex flex-col items-center text-center justify-center -mt-20">
         <div className="w-32 h-32 bg-transparent flex items-center justify-center mb-6">
            <Logo className="w-full h-full text-primary animate-glow" />
         </div>
         <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-1">Paathner</h2>
         <p className="text-gray-500 dark:text-gray-400 text-sm font-mono mb-8">Version 2.23.3</p>

         <div className="w-full max-w-sm space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
               <span className="font-medium text-gray-900 dark:text-white">Terms of Service</span>
               <ExternalLink size={16} className="text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
               <span className="font-medium text-gray-900 dark:text-white">Privacy Policy</span>
               <ExternalLink size={16} className="text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
               <span className="font-medium text-gray-900 dark:text-white">Open Source Licenses</span>
               <ExternalLink size={16} className="text-gray-400" />
            </button>
         </div>
      </div>
      <div className="p-6 text-center text-xs text-gray-400">
         © 2025 Paathner Inc. All rights reserved.
      </div>
    </div>
  );

  // --- VIEW: Edit Profile (Overlay) ---
  const EditProfileView = () => {
    const [tempInfo, setTempInfo] = useState(userInfo);
    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState('');
    
    // Calculate if there are changes
    const hasChanges = JSON.stringify(tempInfo) !== JSON.stringify(userInfo);
    const isPhoneDifferent = tempInfo.phone !== userInfo.phone;

    const handleSave = () => {
      if (hasChanges) {
        setUserInfo(tempInfo);
        setIsEditing(false);
      }
    };

    const handleGetOtp = () => {
        if (tempInfo.phone.length > 9) {
            setShowOtpInput(true);
        }
    };

    const handleVerifyOtp = () => {
        // Mock verification
        if (otp.length === 4) {
            setShowOtpInput(false);
            // Commit the phone change immediately or mark as verified
            setUserInfo(prev => ({ ...prev, phone: tempInfo.phone }));
            // Reset temp info's tracking so it doesn't re-trigger verify
        }
    };

    return (
      <div className="fixed inset-0 z-[120] bg-gray-50 dark:bg-gray-900 flex flex-col animate-fade-in transition-colors duration-300">
        {/* Edit Header */}
        <div className="bg-white dark:bg-gray-900 p-4 pt-safe-area flex items-center justify-between border-b border-gray-200 dark:border-white/10 transition-colors">
           <button onClick={() => setIsEditing(false)} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded-full">
              <ArrowLeft size={24} />
           </button>
           <h3 className="font-bold text-lg text-gray-900 dark:text-white">Edit Profile</h3>
           <div className="w-6"></div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
           <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                 <img src={tempInfo.image} className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-2xl" alt="Profile" />
                 <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera size={24} className="text-white" />
                 </div>
                 <button className="absolute bottom-0 right-0 bg-primary text-white p-2.5 rounded-full shadow-lg border-4 border-white dark:border-gray-900">
                    <Edit2 size={14} />
                 </button>
              </div>
           </div>

           <div className="space-y-6">
              <div>
                 <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Basic information</h4>
                 <div className="space-y-4">
                    <div>
                       <label className="text-gray-500 dark:text-gray-400 text-sm font-bold mb-2 block">Name</label>
                       <input 
                         type="text" 
                         value={tempInfo.name}
                         onChange={(e) => setTempInfo({...tempInfo, name: e.target.value})}
                         className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white focus:border-primary outline-none transition-colors"
                       />
                    </div>
                    <div>
                       <label className="text-gray-500 dark:text-gray-400 text-sm font-bold mb-2 block">Phone number</label>
                       <div className="relative">
                           <input 
                             type="tel" 
                             value={tempInfo.phone}
                             onChange={(e) => setTempInfo({...tempInfo, phone: e.target.value})}
                             className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl p-4 pr-24 text-gray-900 dark:text-white focus:border-primary outline-none transition-colors"
                           />
                           {isPhoneDifferent && !showOtpInput && (
                               <button 
                                 onClick={handleGetOtp}
                                 className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold bg-primary/10 text-primary px-3 py-2 rounded-lg hover:bg-primary hover:text-white transition-all"
                               >
                                   Verify
                               </button>
                           )}
                       </div>
                       
                       {showOtpInput && (
                           <div className="mt-3 animate-slide-up">
                               <label className="text-xs font-bold text-primary block mb-1">Enter OTP sent to {tempInfo.phone}</label>
                               <div className="flex gap-2">
                                   <input 
                                     type="text" 
                                     placeholder="XXXX" 
                                     maxLength={4}
                                     value={otp}
                                     onChange={(e) => setOtp(e.target.value)}
                                     className="flex-1 bg-gray-100 dark:bg-gray-900 border border-primary rounded-lg p-3 text-center tracking-widest font-mono text-gray-900 dark:text-white"
                                   />
                                   <button 
                                     onClick={handleVerifyOtp}
                                     className="bg-primary text-white px-4 rounded-lg font-bold text-sm"
                                   >
                                       Confirm
                                   </button>
                               </div>
                           </div>
                       )}
                    </div>
                    <div>
                       <label className="text-gray-500 dark:text-gray-400 text-sm font-bold mb-2 block">Email</label>
                       <input 
                         type="email" 
                         value={tempInfo.email}
                         onChange={(e) => setTempInfo({...tempInfo, email: e.target.value})}
                         className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white focus:border-primary outline-none transition-colors"
                       />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="text-gray-500 dark:text-gray-400 text-sm font-bold mb-2 block">State</label>
                          <div className="relative">
                             <select 
                                value={tempInfo.state}
                                onChange={(e) => setTempInfo({...tempInfo, state: e.target.value})}
                                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white focus:border-primary outline-none appearance-none transition-colors"
                             >
                                <option value="">Select State</option>
                                <option value="Maharashtra">Maharashtra</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Tamil Nadu">Tamil Nadu</option>
                             </select>
                             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                          </div>
                       </div>
                       <div>
                          <label className="text-gray-500 dark:text-gray-400 text-sm font-bold mb-2 block">City</label>
                          <div className="relative">
                             <select 
                                value={tempInfo.city}
                                onChange={(e) => setTempInfo({...tempInfo, city: e.target.value})}
                                className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white focus:border-primary outline-none appearance-none transition-colors"
                             >
                                <option value="">Select City</option>
                                <option value="Pune">Pune</option>
                                <option value="Mumbai">Mumbai</option>
                                <option value="New Delhi">New Delhi</option>
                                <option value="Bangalore">Bangalore</option>
                                <option value="Chennai">Chennai</option>
                             </select>
                             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-white/10 transition-colors">
           <button 
             onClick={handleSave}
             disabled={!hasChanges}
             className={`w-full font-bold py-4 rounded-xl transition-all duration-300 ${
                 hasChanges 
                 ? 'bg-primary text-white shadow-lg hover:shadow-primary/30 transform active:scale-95' 
                 : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
             }`}
           >
              Update profile
           </button>
        </div>
      </div>
    );
  };

  // --- VIEW: Main Profile List ---
  const MainView = () => (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white animate-fade-in transition-colors duration-300">
       {/* Header */}
       <div className="flex items-center gap-4 p-4 pt-safe-area bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-white/5 shrink-0 transition-colors">
          <button onClick={onClose} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-full transition-colors">
             <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Profile</h1>
       </div>

       <div className="flex-1 overflow-y-auto px-4 pb-8">
          {/* Profile Card */}
          <div className="flex items-center justify-between mb-8 py-4">
             <div className="flex items-center gap-4">
                <div className="relative">
                   <img src={userInfo.image} className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700" alt="User" />
                </div>
                <div>
                   <h2 className="text-xl font-bold text-gray-900 dark:text-white">{userInfo.name}</h2>
                   <p className="text-gray-500 dark:text-gray-400 text-sm">{userInfo.phone}</p>
                </div>
             </div>
             <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-primary transition-colors p-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-white/10 shadow-sm">
                <Edit2 size={20} />
             </button>
          </div>

          {/* Appearance Toggle Row */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden mb-8 border border-gray-200 dark:border-white/5 shadow-sm transition-colors">
             <div className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                      <Sun size={18} />
                   </div>
                   <span className="font-medium text-gray-900 dark:text-white">Appearance</span>
                </div>
                <div className="flex items-center gap-3">
                   {/* Animated Sun/Moon Toggle */}
                   <button 
                     onClick={onToggleTheme}
                     className={`relative w-14 h-8 rounded-full transition-colors duration-500 flex items-center px-1 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-100'}`}
                   >
                      <div className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-500 flex items-center justify-center ${isDarkMode ? 'translate-x-6 bg-gray-900' : 'translate-x-0 bg-white'}`}>
                         {isDarkMode ? <Moon size={12} className="text-white" /> : <Sun size={14} className="text-yellow-500" />}
                      </div>
                   </button>
                </div>
             </div>
          </div>

          {/* Section: Support */}
          <h3 className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-wider mb-3 px-1">Support</h3>
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden mb-8 border border-gray-200 dark:border-white/5 shadow-sm transition-colors">
             <button onClick={() => setCurrentView('faqs')} className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-3">
                   <HelpCircle size={20} className="text-gray-400" />
                   <span className="font-medium text-gray-900 dark:text-white">Frequently asked questions</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
             </button>
             <button onClick={() => setCurrentView('chat')} className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-3">
                   <MessageSquare size={20} className="text-gray-400" />
                   <span className="font-medium text-gray-900 dark:text-white">Chat with us</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
             </button>
             <button onClick={() => setCurrentView('feedback')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-3">
                   <MessageCircle size={20} className="text-gray-400" />
                   <span className="font-medium text-gray-900 dark:text-white">Share feedback</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
             </button>
          </div>

          {/* Section: More */}
          <h3 className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-wider mb-3 px-1">More</h3>
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden mb-8 border border-gray-200 dark:border-white/5 shadow-sm transition-colors">
             <button onClick={() => setCurrentView('notifications')} className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-3">
                   <Bell size={20} className="text-gray-400" />
                   <span className="font-medium text-gray-900 dark:text-white">Notification settings</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
             </button>
             <button onClick={() => setCurrentView('account')} className="w-full flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-3">
                   <User size={20} className="text-gray-400" />
                   <span className="font-medium text-gray-900 dark:text-white">Account settings</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
             </button>
             <button onClick={() => setCurrentView('about')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center gap-3">
                   <Info size={20} className="text-gray-400" />
                   <span className="font-medium text-gray-900 dark:text-white">About us</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
             </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden mb-8 border border-gray-200 dark:border-white/5 shadow-sm transition-colors">
             <button onClick={onLogout} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                <div className="flex items-center gap-3">
                   <LogOut size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                   <span className="font-medium text-gray-900 dark:text-white group-hover:text-red-500 transition-colors">Logout</span>
                </div>
                <ChevronRight size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
             </button>
          </div>

          {/* Footer Branding */}
          <div className="pb-10 px-4 flex flex-col items-start opacity-60 hover:opacity-100 transition-opacity">
             <PaathnerLogo className="h-8 w-auto text-gray-400 dark:text-gray-600" />
             <div className="text-xs font-mono mt-2 text-gray-400 dark:text-gray-600">v2.23.3</div>
          </div>
       </div>
    </div>
  );

  // --- RENDER DISPATCHER ---
  const renderView = () => {
    if (isEditing) return <EditProfileView />;
    
    switch(currentView) {
      case 'faqs': return <FAQView />;
      case 'chat': return <ChatView />;
      case 'feedback': return <FeedbackView />;
      case 'notifications': return <NotificationSettingsView />;
      case 'account': return <AccountSettingsView />;
      case 'share': return <ShareAppView />;
      case 'about': return <AboutUsView />;
      default: return <MainView />;
    }
  };

  return (
    <div className="fixed inset-0 z-[90] bg-gray-50 dark:bg-gray-900 flex flex-col animate-fade-in overflow-hidden transition-colors duration-300">
       {renderView()}
    </div>
  );
};

// Memoize to prevent re-renders from parent step counters
export default React.memo(UserProfile);
