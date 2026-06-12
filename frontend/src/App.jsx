import React, { useState } from 'react';
import { Sparkles, MapPin, Camera, Utensils, Heart, ArrowRight, X, Map as MapIcon } from 'lucide-react';

const AVAILABLE_CITIES = [
  "Srinagar", "Gulmarg", "Manali", "Amritsar", "Delhi", 
  "Agra", "Jaipur", "Varanasi", "Kolkata", "Mumbai", 
  "Hyderabad", "Mysore", "Ooty", "Madurai", "Alleppey"
];

// --- THE DATA DICTIONARY ---
const CITY_ASSETS = {
  "Agra": {
    views: ["agra-view(1).jpg", "agra-view(2).jpg", "agra-view(3).jpg"],
    foods: [
      { file: "agra-food-bedai.jpg", name: "Bedai" },
      { file: "agra-food-petha.jpg", name: "Petha" },
      { file: "agra-food-rubriwithjalebi.jpg", name: "Rubri with Jalebi" }
    ]
  },
  "Alleppey": {
    views: ["alleppey-view(1).jpg", "alleppey-view(2).jpg", "alleppey-view(3).jpg"],
    foods: [
      { file: "alleppey-food-egghoppers.jpg", name: "Egg Hoppers" },
      { file: "alleppey-food-pazhampori.jpg", name: "Pazhampori" },
      { file: "alleppey-food-puttuandkadala.jpg", name: "Puttu & Kadala" }
    ]
  },
  "Amritsar": {
    views: ["amritsar-view(1).jpg", "amritsar-view(2).jpg", "amritsar-view(3).jpg"],
    foods: [
      { file: "amritsar-food-amritsarikulcha.jpg", name: "Amritsari Kulcha" },
      { file: "amritsar-food-kulfi.jpg", name: "Kulfi" },
      { file: "amritsar-food-lassi.jpg", name: "Lassi" }
    ]
  },
  "Delhi": {
    views: ["delhi-view(1).jpg", "delhi-view(2).jpg", "delhi-view(3).jpg"],
    foods: [
      { file: "delhi-food-alootikki.jpg", name: "Aloo Tikki" },
      { file: "delhi-food-cholebhature.jpg", name: "Chole Bhature" },
      { file: "delhi-food-golgappa.jpg", name: "Golgappa" }
    ]
  },
  "Gulmarg": {
    views: ["gulmarg-view(1).jpg", "gulmarg-view(2).jpg", "gulmarg-view(3).jpg"],
    foods: [
      { file: "gulmarg-food-bakarkhani.jpg", name: "Bakarkhani" },
      { file: "gulmarg-food-kahwatea.jpg", name: "Kahwa Tea" },
      { file: "gulmarg-food-noonchai.jpg", name: "Noon Chai" }
    ]
  },
  "Hyderabad": {
    views: ["hyderabad-view(1).jpg", "hyderabad-view(2).jpg", "hyderabad-view(3).jpg"],
    foods: [
      { file: "hyderabad-food-iranichai&osmanibiscuits.jpg", name: "Irani Chai & Osmani Biscuits" },
      { file: "hyderabad-food-lukhmi.jpg", name: "Lukhmi" },
      { file: "hyderabad-food-hyderabadihaleem.jpg", name: "Hyderabadi Haleem" }
    ]
  },
  "Jaipur": {
    views: ["jaipur-view(1).jpg", "jaipur-view(2).jpg", "jaipur-view(3).jpg"],
    foods: [
      { file: "jaipur-food-ghewar.jpg", name: "Ghewar" },
      { file: "jaipur-food-kulhadlassi.jpg", name: "Kulhad Lassi" },
      { file: "jaipur-food-pyaazkachori.jpg", name: "Pyaaz Kachori" }
    ]
  },
  "Kolkata": {
    views: ["kolkata-view(1).jpg", "kolkata-view(2).jpg", "kolkata-view(3).jpg"],
    foods: [
      { file: "kolkata-food-dalerbora.jpg", name: "Daler Bora" }, 
      { file: "kolkata-food-dimerdevil.jpg", name: "Dimer Devil" }, 
      { file: "kolkata-food-fishkabiraji.jpg", name: "Fish Kabiraji" }  
    ]
  },
  "Ooty": {
    views: ["ooty-view(1).jpg", "ooty-view(2).jpg", "ooty-view(3).jpg"],
    foods: [
      { file: "ooty-food-dahipuri.jpg", name: "Dahi Puri" },
      { file: "ooty-food-ootyvarkey.jpg", name: "Ooty Varkey" },
      { file: "ooty-food-tibetanmomos.jpg", name: "Tibetan Momos" }
    ]
  },
  "Mysore": {
    views: ["mysore-view(1).jpg", "mysore-view(2).jpg", "mysore-view(3).jpg"],
    foods: [
      { file: "mysore-food-churmuri.jpg", name: "Churmuri" },
      { file: "mysore-food-masaladosa.jpg", name: "Masala Dosa" },
      { file: "mysore-food-mysorepak.jpg", name: "Mysore Pak" }
    ]
  },
  "Mumbai": {
    views: ["mumbai-view(1).jpg", "mumbai-view(2).jpg", "mumbai-view(3).jpg"],
    foods: [
      { file: "mumbai-food-bombaysandwich.jpg", name: "Bombay Sandwich" },
      { file: "mumbai-food-pavbhaji.jpg", name: "Pav Bhaji" },
      { file: "mumbai-food-vadapav.jpg", name: "Vada Pav" }
    ]
  },
  "Varanasi": {
    views: ["varanasi-view(1).jpg", "varanasi-view(2).jpg", "varanasi-view(3).jpg"],
    foods: [
      { file: "varanasi-food-banarasipaan.jpg", name: "Banarasi Paan" },
      { file: "varanasi-food-malaiyo.jpg", name: "Malaiyo" },
      { file: "varanasi-food-tamatarchaat.jpg", name: "Tamatar Chaat" }
    ]
  },
  "Manali": {
    views: ["manali-view(1).jpg", "manali-view(2).jpg", "manali-view(3).jpg"],
    foods: [
      { file: "manali-food-himachalibabru.jpg", name: "Himachali Babru" },
      { file: "manali-food-laphing.jpg", name: "Laphing" },
      { file: "manali-food-siddu.jpg", name: "Siddu" }
    ]
  },
  "Madurai": {
    views: ["madurai-view(1).jpg", "madurai-view(2).jpg", "madurai-view(3).jpg"],
    foods: [
      { file: "madurai-food-jigarthanda.jpg", name: "Jigarthanda" },
      { file: "madurai-food-karidosi.jpg", name: "Kari Dosa" },
      { file: "madurai-food-kothuparotta.jpg", name: "Kothu Parotta" }
    ]
  },
  "Srinagar": {
    views: ["srinagar-view(1).jpg", "srinagar-view(2).jpg", "srinagar-view(3).jpg"],
    foods: [
      { file: "srinagar-food-harissa.jpg", name: "Harissa" }, 
      { file: "srinagar-food-nadrumonje.jpg", name: "Nadru Monje" }, 
      { file: "srinagar-food-tandoorikebabs.jpg", name: "Tandoori Kebabs" }
    ]
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [showNudge, setShowNudge] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Quiz State
  const [vibe, setVibe] = useState('');
  const [crowd, setCrowd] = useState('');
  const [activity, setActivity] = useState('');
  const [result, setResult] = useState(null);

  const fetchPersonality = async (searchDNA) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchDNA)
      });
      const data = await response.json();
      setResult(data);
      setCurrentView('result');
      setShowNudge(false);
    } catch (error) {
      console.error("Failed to fetch:", error);
      alert("Oops! Is your FastAPI server awake?");
    }
    setIsLoading(false);
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setShowNudge(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] font-sans text-gray-900 overflow-x-hidden selection:bg-pink-300 relative">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed top-20 left-10 text-6xl opacity-20 transform -rotate-12 pointer-events-none">✨</div>
      <div className="fixed bottom-20 right-10 text-6xl opacity-20 transform rotate-12 pointer-events-none">✈️</div>
      <div className="fixed top-40 right-20 text-6xl opacity-20 transform rotate-45 pointer-events-none">🌸</div>

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-6 bg-[#F4F1EA]/80 backdrop-blur-md sticky top-0 z-40 border-b-2 border-black/5">
        <h1 onClick={() => setCurrentView('home')} className="text-3xl font-black tracking-tighter cursor-pointer flex items-center gap-2 hover:text-pink-600 transition-colors transform hover:rotate-2">
          🗺️ vibe.check
        </h1>
        <button onClick={() => setCurrentView('quiz')} className="bg-black text-white px-8 py-3 rounded-xl font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          Play the Quiz
        </button>
      </nav>

      {/* NUDGE MODAL */}
      {showNudge && selectedCity && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] p-8 rounded-3xl max-w-md w-full shadow-2xl relative border-4 border-black transform rotate-1">
            <button onClick={() => setShowNudge(false)} className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full border-2 border-black hover:scale-110 transition-transform">
              <X className="w-6 h-6" />
            </button>
            <img src={`/images/${selectedCity.toLowerCase()}-main.jpg`} alt={selectedCity} className="w-full h-48 object-cover rounded-2xl mb-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" onError={(e) => e.target.src = "https://via.placeholder.com/400x200?text=Missing"}/>
            <h2 className="text-4xl font-black mb-2">Hold up, bestie 🛑</h2>
            <p className="text-gray-700 mb-6 font-medium text-lg leading-relaxed">
              So you picked <span className="font-bold border-b-4 border-pink-400">{selectedCity}</span>. Valid. BUT, take our vibe check and let our AI find your <strong>true</strong> soulmate city.
            </p>
            <div className="flex flex-col gap-4">
              <button onClick={() => { setShowNudge(false); setCurrentView('quiz'); }} className="bg-pink-500 text-white w-full py-4 rounded-xl font-black text-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex justify-center items-center gap-2">
                <Sparkles className="w-6 h-6" /> Take the Quiz
              </button>
              <button onClick={() => fetchPersonality({ vibe: "general", crowd: "general", activity: selectedCity })} className="w-full py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all underline decoration-wavy underline-offset-4">
                Nah, just show me {selectedCity}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto p-6 md:p-12 z-10 relative">
        
        {/* HOME VIEW: Polaroid Grid */}
        {currentView === 'home' && (
          <div className="animate-in fade-in duration-500 py-10">
            
            <div className="text-center max-w-4xl mx-auto mb-20 relative">
              <div className="absolute -top-10 left-0 bg-yellow-300 px-4 py-1 text-xl font-black transform -rotate-12 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                POV: You need a vacation
              </div>
              <h1 className="text-7xl md:text-9xl font-black tracking-tight leading-[1] mb-8">
                Find your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 italic font-serif">aesthetic.</span>
              </h1>
              <p className="text-2xl text-gray-600 font-medium max-w-2xl mx-auto bg-white/50 p-4 rounded-2xl">
                Ditch the boring travel blogs. Play the game to find out which city matches your exact energy right now.
              </p>
            </div>

            {/* The Pinterest Polaroid Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 mb-16">
              {AVAILABLE_CITIES.map((city, index) => (
                <div 
                  key={city} 
                  onClick={() => handleCityClick(city)}
                  className={`group cursor-pointer relative transition-all duration-300 hover:z-20 hover:scale-105 ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}
                >
                  <div className="bg-white p-3 pb-12 border-2 border-gray-200 shadow-xl relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/60 backdrop-blur-sm border border-gray-200 transform -rotate-2 z-10 opacity-70"></div>
                    <img src={`/images/${city.toLowerCase()}-main.jpg`} alt={city} className="w-full h-48 object-cover border border-gray-100 filter group-hover:brightness-110 transition-all" onError={(e) => e.target.src = "https://via.placeholder.com/300x300?text=Missing"} />
                    <span className="absolute bottom-3 left-0 w-full text-center font-serif text-2xl font-bold text-gray-800 tracking-wide">
                      {city}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QUIZ VIEW */}
        {currentView === 'quiz' && (
          <div className="max-w-2xl mx-auto py-8 animate-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-6xl font-black mb-12 text-center transform -rotate-2">Your Vibe Check 🔮</h2>
            <div className="bg-white border-4 border-black p-8 md:p-12 rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-12">
              <div>
                <h3 className="text-2xl font-black mb-4"><Heart className="inline text-pink-500 fill-pink-500 mr-2"/> 1. Main character energy?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[{ val: "peaceful and quiet", label: "Zen & Chill", emoji: "🧘‍♀️" }, { val: "fast-paced and energetic", label: "Fast & Loud", emoji: "⚡" }, { val: "bohemian and artistic", label: "Artsy Boho", emoji: "🎨" }, { val: "traditional and cultural", label: "Deep Roots", emoji: "🛕" }].map(opt => (
                    <button key={opt.val} onClick={() => setVibe(opt.val)} className={`p-4 rounded-xl font-bold border-2 text-left transition-all ${vibe === opt.val ? 'border-black bg-pink-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1' : 'border-gray-200 hover:border-black'}`}>
                      <span className="text-3xl block mb-2">{opt.emoji}</span> {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-4"><MapPin className="inline text-blue-500 fill-blue-500 mr-2"/> 2. Thoughts on crowds?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[{ val: "very few people", label: "Ghost Town", emoji: "🏜️" }, { val: "moderate crowds are fine", label: "A Few Locals", emoji: "🚶" }, { val: "I love a bustling, crowded city", label: "Pack Me In", emoji: "🎪" }].map(opt => (
                    <button key={opt.val} onClick={() => setCrowd(opt.val)} className={`p-4 rounded-xl font-bold border-2 text-center transition-all ${crowd === opt.val ? 'border-black bg-blue-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1' : 'border-gray-200 hover:border-black'}`}>
                      <span className="text-3xl block mb-2">{opt.emoji}</span> {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-4"><MapIcon className="inline text-green-500 fill-green-500 mr-2"/> 3. Today's side quest?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[{ val: "exploring hidden gems and art", label: "Hidden Gems", emoji: "🗺️" }, { val: "enjoying nature and scenery", label: "Nature Lover", emoji: "🌲" }, { val: "visiting famous historical landmarks", label: "Tourist Stuff", emoji: "📸" }, { val: "trying local street food and nightlife", label: "Food & Vibes", emoji: "🍜" }].map(opt => (
                    <button key={opt.val} onClick={() => setActivity(opt.val)} className={`p-4 rounded-xl font-bold border-2 text-left transition-all ${activity === opt.val ? 'border-black bg-green-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1' : 'border-gray-200 hover:border-black'}`}>
                      <span className="text-3xl block mb-2">{opt.emoji}</span> {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => fetchPersonality({ vibe, crowd, activity })} disabled={isLoading || !vibe || !crowd || !activity} className="w-full bg-black text-white py-6 rounded-2xl font-black text-2xl flex justify-center items-center gap-3 hover:bg-pink-500 transition-all disabled:bg-gray-300 disabled:text-gray-500 shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] hover:translate-y-1 hover:shadow-none">
                {isLoading ? "Reading your mind..." : "Reveal My Match"} {!isLoading && <ArrowRight className="w-8 h-8" />}
              </button>
            </div>
          </div>
        )}

        {/* RESULT VIEW: The Mega Scrapbook */}
        {currentView === 'result' && result && (
          <div className="py-8 animate-in zoom-in-95 duration-500 max-w-5xl mx-auto">
            
            <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
               <div className="bg-white p-4 pb-16 border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-3 w-full md:w-1/2 relative">
                  <div className="absolute -top-4 right-1/4 w-16 h-8 bg-pink-500/50 backdrop-blur-sm border border-pink-200 transform rotate-6 z-10"></div>
                  <img src={`/images/${result.matched_city.toLowerCase()}-main.jpg`} alt={result.matched_city} className="w-full h-80 object-cover border-2 border-black" onError={(e) => e.target.src = "https://via.placeholder.com/400x300?text=Missing"}/>
                  <span className="absolute bottom-4 left-6 font-serif text-4xl font-bold text-black uppercase">{result.matched_city}</span>
               </div>
               
               <div className="w-full md:w-1/2">
                 <div className="inline-block bg-black text-white px-6 py-2 rounded-full font-bold text-xl mb-6 transform rotate-2">Your 100% Match 🎯</div>
                 <h1 className="text-7xl font-black tracking-tighter uppercase mb-6 leading-none">Welcome to <br/> <span className="text-pink-500">{result.matched_city}</span></h1>
                 <p className="text-2xl text-gray-700 font-medium font-serif italic border-l-4 border-pink-500 pl-6">"{result.vibe_summary}"</p>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-[#FFFDF9] border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                <div className="absolute -top-6 -right-6 text-6xl transform rotate-12">📸</div>
                <h3 className="text-3xl font-black mb-6 border-b-4 border-black pb-2 inline-block">The Hype</h3>
                <ul className="space-y-6">
                  {result.famous_for.map((item, i) => (
                    <li key={i} className="font-bold text-xl flex items-center gap-4 bg-yellow-100 p-4 rounded-xl border-2 border-black transform hover:scale-105 transition-transform">
                      <span className="text-3xl bg-white rounded-full p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">⭐</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F0E6D2] border-4 border-black p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden bg-[radial-gradient(#d4c5b0_1px,transparent_1px)] [background-size:20px_20px]">
                <h3 className="text-3xl font-black mb-8 font-serif tracking-widest uppercase flex items-center gap-3">
                  <MapIcon className="w-10 h-10" /> Secret Spots
                </h3>
                <div className="space-y-8 relative z-10">
                  {result.hidden_gems.map((item, i) => (
                    <div key={i} className="relative">
                      {i !== result.hidden_gems.length - 1 && (
                        <div className="absolute left-6 top-10 w-1 h-16 border-l-4 border-dashed border-red-800/50"></div>
                      )}
                      <li className="font-bold text-xl flex items-start gap-4">
                        <span className="text-4xl text-red-600 font-black drop-shadow-md transform -rotate-12">X</span>
                        <div className="bg-[#FFFDF9] p-4 rounded-lg border-2 border-dashed border-gray-800 shadow-md transform rotate-1">
                          {item}
                        </div>
                      </li>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {CITY_ASSETS[result.matched_city] && (
              <div className="mb-16">
                <h3 className="text-4xl font-black mb-8 flex items-center gap-3"><Camera className="w-10 h-10" /> The Views</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {CITY_ASSETS[result.matched_city].views.map((fileName, idx) => (
                    <div key={idx} className={`bg-white p-3 pb-12 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${idx % 2 === 0 ? 'transform rotate-2' : 'transform -rotate-2'}`}>
                       <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-5 bg-white/60 backdrop-blur-sm border border-gray-200 transform -rotate-2 z-10"></div>
                       <img src={`/images/${fileName}`} alt="View" className="w-full h-48 object-cover border-2 border-black" onError={(e) => e.target.src = "https://via.placeholder.com/300x200?text=View+Missing"}/>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {CITY_ASSETS[result.matched_city] && (
              <div className="mb-16 bg-[#FFFDF9] border-4 border-black p-8 md:p-12 rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-4xl font-black mb-8 flex items-center gap-3 text-orange-600"><Utensils className="w-10 h-10" /> Must-Try Local Eats</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {CITY_ASSETS[result.matched_city].foods.map((foodObj, idx) => (
                    <div key={idx} className="relative group overflow-hidden border-4 border-black rounded-2xl">
                       <img src={`/images/${foodObj.file}`} alt={foodObj.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => e.target.src = "https://via.placeholder.com/300x300?text=Food+Missing"}/>
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                         <span className="text-white font-black text-2xl tracking-wide">{foodObj.name}</span>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-pink-100 border-4 border-black p-8 md:p-12 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1 relative mt-12 mb-16">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-2 font-black text-xl rounded-full transform -rotate-2 border-2 border-white">
                THE LOCAL VIBE 🍜
              </div>
              <p className="text-2xl font-medium leading-relaxed text-center mt-6">
                {result.lifestyle}
              </p>
            </div>
            
            <div className="mt-16 text-center">
              <button onClick={() => setCurrentView('home')} className="bg-white border-4 border-black px-8 py-4 rounded-full font-black text-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                🔄 Run it back
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}