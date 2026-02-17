import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown, Send } from 'lucide-react';
import { useState, useRef } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// Hero Section Component
function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);

  const scrollToForest = () => {
    document.getElementById('forest')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1713545396351-b848e4707cb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbWlzdHklMjBmb3Jlc3QlMjBpbmRpYSUyMGF0bW9zcGhlcmljfGVufDF8fHx8MTc3MTA5MzU5NHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Misty Forest"
          className="w-full h-full object-cover blur-sm"
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-20 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.h1 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Aranya Interactive
        </motion.h1>
        
        <motion.p 
          className="text-3xl md:text-4xl mb-6 italic"
          style={{ color: '#C6A45B' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          A Forest of Stories.
        </motion.p>
        
        <motion.p 
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto opacity-80"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          We build culturally resonant games across platforms.
        </motion.p>
        
        <motion.button
          onClick={scrollToForest}
          className="px-8 py-4 border-2 rounded-lg transition-all duration-300 hover:scale-105"
          style={{ 
            borderColor: '#C6A45B',
            color: '#C6A45B',
            backgroundColor: 'rgba(198, 164, 91, 0.1)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          whileHover={{ backgroundColor: 'rgba(198, 164, 91, 0.2)' }}
        >
          Explore the Forest
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={32} style={{ color: '#C6A45B' }} />
      </motion.div>
    </section>
  );
}

// Division Card Component
interface DivisionCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

function DivisionCard({ icon, title, description, index }: DivisionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative p-8 rounded-xl border transition-all duration-300 cursor-pointer group"
      style={{
        backgroundColor: isHovered ? 'rgba(198, 164, 91, 0.05)' : 'rgba(14, 47, 38, 0.2)',
        borderColor: isHovered ? '#C6A45B' : 'rgba(198, 164, 91, 0.2)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Glow Effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'radial-gradient(circle at center, rgba(198, 164, 91, 0.1) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="relative z-10">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="mb-3">{title}</h3>
        <p className="opacity-70 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// Forest Divisions Section
function ForestDivisions() {
  const divisions = [
    {
      icon: '🐅',
      title: 'Aranya Apex',
      description: 'Premium PC & Console Titles — Crafting immersive AAA experiences that blend cutting-edge technology with deep cultural narratives.',
    },
    {
      icon: '🐿',
      title: 'Aranya Pocket',
      description: 'Mobile Cultural Experiences — Bringing the richness of Indian traditions to mobile platforms with accessible, engaging gameplay.',
    },
    {
      icon: '🦉',
      title: 'Aranya Works',
      description: 'Porting & Co-Development Services — Expert technical solutions for studios looking to expand their reach across platforms.',
    },
    {
      icon: '🐘',
      title: 'Aranya Legacy',
      description: 'Publishing & Long-Term IP — Nurturing and preserving game worlds that grow beyond single releases into lasting franchises.',
    },
  ];

  return (
    <section id="forest" className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black opacity-95" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="mb-6">The Forest</h2>
          <p className="text-xl max-w-3xl mx-auto opacity-80">
            Four distinct paths through Aranya, each representing our commitment to excellence and cultural authenticity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {divisions.map((division, index) => (
            <DivisionCard key={index} {...division} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Aranya Apex Section
function ApexSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0E2F26]/30 to-black z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1558641445-766a7c7036d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBtb3JuaW5nJTIwbGlnaHQlMjByYXlzJTIwbWlzdHxlbnwxfHx8fDE3NzEwOTM1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Forest light rays"
          className="w-full h-full object-cover blur-md opacity-30"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(198, 164, 91, 0.1)', borderColor: '#C6A45B', border: '1px solid' }}>
            <span style={{ color: '#C6A45B' }}>🐅 ARANYA APEX</span>
          </div>
          
          <h2 className="mb-8 max-w-3xl">Premium PC & Console Titles</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="mb-4" style={{ color: '#C6A45B' }}>Featured: Arjun</h3>
              <p className="text-lg mb-6 leading-relaxed opacity-90">
                A dark narrative-driven action adventure following the journey of a warrior torn between duty and destiny. 
                Set in a reimagined ancient India, Arjun weaves together mythology, moral complexity, and visceral combat.
              </p>
              <p className="mb-6 opacity-80">
                Built on Unreal Engine 5, featuring photorealistic environments, advanced motion capture, and a deeply branching narrative system that responds to player choices.
              </p>
              <div className="flex gap-4">
                <span className="px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: 'rgba(14, 47, 38, 0.5)', color: '#E8E4DA' }}>
                  Action RPG
                </span>
                <span className="px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: 'rgba(14, 47, 38, 0.5)', color: '#E8E4DA' }}>
                  Single Player
                </span>
                <span className="px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: 'rgba(14, 47, 38, 0.5)', color: '#E8E4DA' }}>
                  PC / Console
                </span>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-xl overflow-hidden"
              style={{ boxShadow: '0 20px 60px rgba(198, 164, 91, 0.3)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0E2F26] to-[#1a3a2f] flex items-center justify-center">
                <span className="text-6xl">🐅</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Aranya Pocket Section
function PocketSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a3a2f]/20 to-black z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1702943546945-9ea68200e74d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3ZWRkaW5nJTIwY2VsZWJyYXRpb24lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzEwOTM1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Indian Wedding"
          className="w-full h-full object-cover blur-lg opacity-20"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: '#F59E0B', border: '1px solid' }}>
            <span style={{ color: '#F59E0B' }}>🐿 ARANYA POCKET</span>
          </div>
          
          <h2 className="mb-8 max-w-3xl">Mobile Cultural Experiences</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-[9/16] max-w-sm mx-auto rounded-3xl overflow-hidden"
              style={{ boxShadow: '0 20px 60px rgba(245, 158, 11, 0.3)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B] to-[#d97706] flex items-center justify-center">
                <span className="text-7xl">🐿</span>
              </div>
            </motion.div>

            <div>
              <h3 className="mb-4" style={{ color: '#F59E0B' }}>Indian Wedding Planner Simulator</h3>
              <p className="text-lg mb-6 leading-relaxed opacity-90">
                Experience the joy, chaos, and magic of planning authentic Indian weddings. From coordinating with the pandit 
                to managing family dynamics, every decision shapes your couple's special day.
              </p>
              <p className="mb-6 opacity-80">
                Features real regional customs, traditional music, mini-games for rituals, and a heartfelt story that celebrates 
                the diversity of Indian wedding traditions across cultures and communities.
              </p>
              <div className="flex gap-4 flex-wrap">
                <span className="px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B' }}>
                  Simulation
                </span>
                <span className="px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B' }}>
                  Casual
                </span>
                <span className="px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B' }}>
                  iOS / Android
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Aranya Works Section
function WorksSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(198, 164, 91, 0.1)', borderColor: '#C6A45B', border: '1px solid' }}>
            <span style={{ color: '#C6A45B' }}>🦉 ARANYA WORKS</span>
          </div>
          
          <h2 className="mb-8">Porting & Co-Development Services</h2>
          <p className="text-xl max-w-3xl mx-auto opacity-80">
            Expert technical partnership for studios expanding their reach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Platform Porting',
              description: 'Seamless transitions between PC, console, and mobile platforms with optimized performance.',
            },
            {
              title: 'Co-Development',
              description: 'Collaborative production support from pre-production through launch and beyond.',
            },
            {
              title: 'Technical Optimization',
              description: 'Performance tuning, graphics optimization, and platform-specific enhancements.',
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-xl border"
              style={{
                backgroundColor: 'rgba(14, 47, 38, 0.2)',
                borderColor: 'rgba(198, 164, 91, 0.2)',
              }}
            >
              <h4 className="mb-4" style={{ color: '#C6A45B' }}>{service.title}</h4>
              <p className="opacity-80">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Aranya Legacy Section
function LegacySection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0E2F26]/20 to-black z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1759520582331-8b62a819a452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMHNpbGhvdWV0dGUlMjBwZWFjZWZ1bCUyMG5hdHVyZXxlbnwxfHx8fDE3NzEwOTM1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Elephant in nature"
          className="w-full h-full object-cover blur-md opacity-20"
        />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(198, 164, 91, 0.1)', borderColor: '#C6A45B', border: '1px solid' }}>
            <span style={{ color: '#C6A45B' }}>🐘 ARANYA LEGACY</span>
          </div>
          
          <h2 className="mb-8">Publishing & Long-Term IP</h2>
          
          <p className="text-xl mb-8 leading-relaxed opacity-90">
            Like the elephant — steady, wise, and built to endure — Aranya Legacy nurtures game worlds 
            that transcend single releases and grow into lasting cultural touchstones.
          </p>
          
          <p className="text-lg mb-12 opacity-80">
            We partner with creators to build franchises that honor their vision while reaching global audiences. 
            Our publishing approach combines creative freedom with strategic support for long-term growth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="p-8 rounded-xl" style={{ backgroundColor: 'rgba(14, 47, 38, 0.3)' }}>
              <h4 className="mb-3" style={{ color: '#C6A45B' }}>Creator-First Publishing</h4>
              <p className="opacity-80">Fair deals, transparent processes, and respect for creative vision.</p>
            </div>
            <div className="p-8 rounded-xl" style={{ backgroundColor: 'rgba(14, 47, 38, 0.3)' }}>
              <h4 className="mb-3" style={{ color: '#C6A45B' }}>Franchise Building</h4>
              <p className="opacity-80">Strategic expansion across sequels, spin-offs, and transmedia opportunities.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// About Founder Section
function AboutSection() {
  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#111111] to-black" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(198, 164, 91, 0.1)', border: '2px solid #C6A45B' }}>
            <div className="w-full h-full flex items-center justify-center text-5xl">
              🌳
            </div>
          </div>
          
          <h2 className="mb-6">Rooted in Vision</h2>
          
          <p className="text-xl mb-6 leading-relaxed opacity-90">
            Aranya Interactive was founded on a simple belief: that games can be both globally ambitious and deeply rooted in cultural truth.
          </p>
          
          <p className="text-lg opacity-80 max-w-3xl mx-auto leading-relaxed">
            We're building a studio where Indian stories aren't sidelines — they're center stage. Where mythology meets modernity. 
            Where every project, whether a mobile game or a AAA console title, carries the weight of authenticity and the polish of world-class craft.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    alert('Thank you for reaching out. We will get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section className="relative py-32 px-6">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="mb-6">Enter the Forest</h2>
          <p className="text-xl opacity-80">
            Interested in partnering, publishing, or just want to say hello?
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="block mb-2" style={{ color: '#E8E4DA' }}>Name</label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 focus:border-[#C6A45B]"
              style={{
                backgroundColor: 'rgba(14, 47, 38, 0.3)',
                borderColor: 'rgba(198, 164, 91, 0.2)',
                color: '#E8E4DA',
              }}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2" style={{ color: '#E8E4DA' }}>Email</label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 focus:border-[#C6A45B]"
              style={{
                backgroundColor: 'rgba(14, 47, 38, 0.3)',
                borderColor: 'rgba(198, 164, 91, 0.2)',
                color: '#E8E4DA',
              }}
            />
          </div>

          <div>
            <label htmlFor="company" className="block mb-2" style={{ color: '#E8E4DA' }}>Company (Optional)</label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 focus:border-[#C6A45B]"
              style={{
                backgroundColor: 'rgba(14, 47, 38, 0.3)',
                borderColor: 'rgba(198, 164, 91, 0.2)',
                color: '#E8E4DA',
              }}
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2" style={{ color: '#E8E4DA' }}>Message</label>
            <textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border outline-none transition-all duration-300 focus:border-[#C6A45B] resize-none"
              style={{
                backgroundColor: 'rgba(14, 47, 38, 0.3)',
                borderColor: 'rgba(198, 164, 91, 0.2)',
                color: '#E8E4DA',
              }}
            />
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
            style={{
              backgroundColor: '#C6A45B',
              color: '#111111',
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Send Message</span>
            <Send size={18} />
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t" style={{ borderColor: 'rgba(198, 164, 91, 0.2)' }}>
      <div className="absolute inset-0 bg-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Aranya Interactive</h3>
            <p className="opacity-60">A Forest of Stories</p>
          </div>
          
          <div className="flex gap-8">
            <a href="#forest" className="opacity-80 hover:opacity-100 transition-opacity" style={{ color: '#C6A45B' }}>
              The Forest
            </a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" style={{ color: '#C6A45B' }}>
              Careers
            </a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" style={{ color: '#C6A45B' }}>
              Press
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center opacity-60" style={{ borderColor: 'rgba(198, 164, 91, 0.1)' }}>
          <p>© 2026 Aranya Interactive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0a' }}>
      <HeroSection />
      <ForestDivisions />
      <ApexSection />
      <PocketSection />
      <WorksSection />
      <LegacySection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
