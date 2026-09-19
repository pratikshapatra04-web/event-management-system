import React from 'react';
import { Link } from 'react-router-dom';
import { RiArrowRightLine } from 'react-icons/ri';

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#E5E5E7] font-sans selection:bg-[#D4AF37] selection:text-[#0E0E10] transition-colors duration-500 overflow-x-hidden">

      {/* Decorative Grid Lines Overlay (Luxury Portfolio style) */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-16 opacity-[0.03]">
        <div className="w-[1px] h-full bg-[#E5E5E7]"></div>
        <div className="w-[1px] h-full bg-[#E5E5E7] hidden md:block"></div>
        <div className="w-[1px] h-full bg-[#E5E5E7] hidden md:block"></div>
        <div className="w-[1px] h-full bg-[#E5E5E7] hidden lg:block"></div>
        <div className="w-[1px] h-full bg-[#E5E5E7]"></div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Ken Burns background zoom */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/65 z-10"></div>
          <img
            src="/wedding-bg.jpg"
            alt="Luxury Wedding Floral Setup"
            className="w-full h-full object-cover"
            style={{
              animation: 'kenburns 25s ease-out infinite alternate',
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block text-[#D4AF37] text-xs font-semibold tracking-[0.3em] uppercase mb-4 animate-pulse">
            Evenza Smart Event Management
          </span>

          <h1 className="font-serif text-5xl md:text-8xl font-light tracking-tight text-white mb-6 leading-tight">
            Plan Your Dream <br />
            <span className="font-serif italic font-normal text-[#D4AF37]">Event Perfectly</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-300 font-light leading-relaxed tracking-wide mb-10">
            Welcome to Evenza. Harness our smart recommendation model to instantly match your budget with premium local venues, caterers, decorators, and rental items tailored directly to your event theme.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              to="/events"
              className="group flex items-center justify-center gap-2.5 px-8 py-3.5 w-full sm:w-auto font-medium text-[#0E0E10] bg-[#D4AF37] hover:bg-[#C5A880] tracking-wider rounded-none uppercase transition-all duration-300 shadow-xl cursor-pointer"
            >
              Get AI Recommendations
              <RiArrowRightLine className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/buy-products"
              className="flex items-center justify-center gap-2.5 px-8 py-3.5 w-full sm:w-auto font-medium text-white border border-[#D4AF37]/50 hover:border-[#D4AF37] tracking-wider rounded-none uppercase bg-transparent hover:bg-[#D4AF37]/5 transition-all duration-300 cursor-pointer"
            >
              Rent Equipment & Products
            </Link>
          </div>
        </div>

        {/* Decorative Grid Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent animate-bounce"></div>
        </div>
      </section>

      {/* ================= THE PHILOSOPHY (WHAT EVENZA CAN DO) ================= */}
      <section className="relative py-24 md:py-32 border-y border-[#D4AF37]/10 bg-[#0E0E10] z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
              About the Platform
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white leading-tight">
              Smart Event <br />
              <span className="font-serif italic text-[#D4AF37]">Management</span>
            </h2>
          </div>
          <div className="lg:col-span-7 border-l border-[#D4AF37]/20 pl-0 lg:pl-10">
            <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed tracking-wide">
              Evenza takes the stress out of event planning by combining advanced recommendation systems with a complete full-stack database. By specifying your target city (such as Kolkata), budget size, and guest limits, our AI model distributes your finances dynamically (allocating 40% for venues, 30% for catering, 20% for decor, and 10% for rental products). It searches vendor databases using TF-IDF matching to recommend the highest-rated providers fitting your description.
            </p>
          </div>
        </div>
      </section>

      {/* ================= THE ARCHETYPE PORTFOLIO (SERVICES WE SUPPORT) ================= */}
      <section className="relative py-24 md:py-32 bg-[#0C0C0E] z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
                Events Supported
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-white">
                Our Categories
              </h2>
            </div>
            <Link
              to="/events"
              className="text-[#D4AF37] hover:text-[#C5A880] text-xs font-semibold tracking-[0.2em] uppercase mt-4 md:mt-0 flex items-center gap-2 transition-all group cursor-pointer"
            >
              Launch Smart Search <RiArrowRightLine className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Wedding Card */}
            <div className="group relative h-[450px] overflow-hidden border border-white/5 transition-all duration-500">
              <div className="absolute inset-0 bg-black/45 z-10 group-hover:bg-black/30 transition-all duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000"
                alt="Floral Indian Wedding Mandap Stage"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-6 bottom-8 z-20">
                <span className="text-[#D4AF37] text-xs font-medium tracking-widest uppercase mb-1 block">Weddings</span>
                <h3 className="font-serif text-xl font-light text-white group-hover:text-[#D4AF37] transition-colors">Floral Mandaps & Halls</h3>
              </div>
              <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/35 z-20 pointer-events-none transition-all duration-500"></div>
            </div>

            {/* Birthday Party Card */}
            <div className="group relative h-[450px] overflow-hidden border border-white/5 transition-all duration-500">
              <div className="absolute inset-0 bg-black/45 z-10 group-hover:bg-black/30 transition-all duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=1000"
                alt="Birthday Party Balloon Setup"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-6 bottom-8 z-20">
                <span className="text-[#D4AF37] text-xs font-medium tracking-widest uppercase mb-1 block">Birthdays</span>
                <h3 className="font-serif text-xl font-light text-white group-hover:text-[#D4AF37] transition-colors">Theme Celebrations</h3>
              </div>
              <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/35 z-20 pointer-events-none transition-all duration-500"></div>
            </div>

            {/* Engagements Card */}
            <div className="group relative h-[450px] overflow-hidden border border-white/5 transition-all duration-500">
              <div className="absolute inset-0 bg-black/45 z-10 group-hover:bg-black/30 transition-all duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1000"
                alt="Intimate Engagement Table Decor"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-6 bottom-8 z-20">
                <span className="text-[#D4AF37] text-xs font-medium tracking-widest uppercase mb-1 block">Engagements</span>
                <h3 className="font-serif text-xl font-light text-white group-hover:text-[#D4AF37] transition-colors">Social Gatherings</h3>
              </div>
              <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/35 z-20 pointer-events-none transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= THE STEPS (HOW EVENZA WORKS) ================= */}
      <section className="relative py-24 md:py-32 border-t border-[#D4AF37]/10 bg-[#0E0E10] z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
              How It Works
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white">
              Planning Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 border border-white/5 bg-[#0C0C0E]/40 hover:bg-[#0C0C0E]/90 hover:border-[#D4AF37]/20 transition-all duration-300">
              <span className="text-[#D4AF37] font-serif text-3xl block mb-4">01.</span>
              <h3 className="font-serif text-lg text-white mb-2">Input Needs</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Provide your overall budget, guest count, city, and event description in our AI search engine.
              </p>
            </div>

            <div className="p-6 border border-white/5 bg-[#0C0C0E]/40 hover:bg-[#0C0C0E]/90 hover:border-[#D4AF37]/20 transition-all duration-300">
              <span className="text-[#D4AF37] font-serif text-3xl block mb-4">02.</span>
              <h3 className="font-serif text-lg text-white mb-2">AI Recommendation</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Evenza analyzes descriptions and returns scored lists of venues, caterers, decorators, and accessories.
              </p>
            </div>

            <div className="p-6 border border-white/5 bg-[#0C0C0E]/40 hover:bg-[#0C0C0E]/90 hover:border-[#D4AF37]/20 transition-all duration-300">
              <span className="text-[#D4AF37] font-serif text-3xl block mb-4">03.</span>
              <h3 className="font-serif text-lg text-white mb-2">Book Package</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Add rental catalog items to your cart, or book the whole curated event package with one click.
              </p>
            </div>

            <div className="p-6 border border-white/5 bg-[#0C0C0E]/40 hover:bg-[#0C0C0E]/90 hover:border-[#D4AF37]/20 transition-all duration-300">
              <span className="text-[#D4AF37] font-serif text-3xl block mb-4">04.</span>
              <h3 className="font-serif text-lg text-white mb-2">Pay & Invoicing</h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Finalize payment using Razorpay, track order history in your dashboard, and print confirmation receipts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PREVIOUS WORKS (IMAGES GALLERY) ================= */}
      <section className="relative py-24 md:py-32 bg-[#0C0C0E] border-t border-[#D4AF37]/10 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
              Gallery
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white">
              Our Previous Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gallery Item 1 */}
            <div className="group relative h-[300px] overflow-hidden border border-white/5">
              <div className="absolute inset-0 bg-black/30 z-10 group-hover:bg-black/10 transition-all duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
                alt="Premium Stage Pillar Garlands"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/25 z-20 pointer-events-none transition-all duration-500"></div>
            </div>

            {/* Gallery Item 2 */}
            <div className="group relative h-[300px] overflow-hidden border border-white/5">
              <div className="absolute inset-0 bg-black/30 z-10 group-hover:bg-black/10 transition-all duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800"
                alt="Luxury Banquet Table Settings"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/25 z-20 pointer-events-none transition-all duration-500"></div>
            </div>

            {/* Gallery Item 3 */}
            <div className="group relative h-[300px] overflow-hidden border border-white/5">
              <div className="absolute inset-0 bg-black/30 z-10 group-hover:bg-black/10 transition-all duration-500"></div>
              <img
                src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800"
                alt="Gold Centerpiece Wedding Flowers"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 border border-[#D4AF37]/0 group-hover:border-[#D4AF37]/25 z-20 pointer-events-none transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="relative py-24 md:py-32 bg-[#0C0C0E] border-t border-[#D4AF37]/10 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase block mb-3">
              Feedback
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-white">
              Client Endorsements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-8 border border-white/5 bg-[#0E0E10] relative">
              <span className="absolute top-6 right-8 text-4xl font-serif text-[#D4AF37]/10">“</span>
              <p className="text-sm text-slate-300 italic font-light mb-6 leading-relaxed">
                "Evenza transformed our event curation. By inputting our target budget, the recommendation system compiled a perfect alignment of vendors and spaces. The luxury design matches their mathematical precision."
              </p>
              <div>
                <h5 className="text-sm font-semibold text-white tracking-wide">Aishwarya Ray</h5>
                <span className="text-xs text-[#D4AF37] tracking-wider uppercase font-semibold">Corporate Gala Host</span>
              </div>
            </div>

            <div className="p-8 border border-white/5 bg-[#0E0E10] relative">
              <span className="absolute top-6 right-8 text-4xl font-serif text-[#D4AF37]/10">“</span>
              <p className="text-sm text-slate-300 italic font-light mb-6 leading-relaxed">
                "Finding banquet space in Kolkata was incredibly simple. The location capacity filtering coupled with immediate Razorpay confirmations made it a flawless booking experience."
              </p>
              <div>
                <h5 className="text-sm font-semibold text-white tracking-wide">Priya Chatterjee</h5>
                <span className="text-xs text-[#D4AF37] tracking-wider uppercase font-semibold">Wedding Coordinator</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="relative py-24 md:py-32 bg-[#0E0E10] z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative border border-[#D4AF37]/20 p-12 md:p-20 bg-gradient-to-b from-[#161619] to-[#0E0E10] text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.02),transparent)] pointer-events-none"></div>

            <span className="text-[#D4AF37] text-xs font-semibold tracking-[0.2em] uppercase block mb-4">
              Get Started
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-white mb-6 leading-tight">
              Ready to Plan Your Next Event?
            </h2>
            <p className="max-w-lg mx-auto text-sm text-slate-400 font-light mb-10 leading-relaxed tracking-wide">
              Initiate a smart recommendation query to calculate matched vendors and manage reservations instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/events"
                className="px-8 py-3.5 font-medium text-[#0E0E10] bg-[#D4AF37] hover:bg-[#C5A880] tracking-wider rounded-none uppercase transition-all duration-300 shadow-lg cursor-pointer"
              >
                Book Now
              </Link>
              <Link
                to="/register"
                className="px-8 py-3.5 font-medium text-white border border-white/20 hover:border-white/40 tracking-wider rounded-none uppercase bg-transparent hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Adding custom keyframes dynamically in JSX style tag */}
      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.06) translate(-1%, -0.5%); }
        }
      `}</style>

    </div>
  );
};

export default Home;
