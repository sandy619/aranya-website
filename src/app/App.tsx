import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Menu, X, ChevronLeft, ChevronRight, Linkedin, Mail } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logo from 'figma:asset/21907fc2bd55e5c719da2d178be4eb942c6efa46.png';
import arjunImage1 from 'figma:asset/e25bfc74380740af00076d8c728bf8b6ac670ff6.png';
import arjunImage2 from 'figma:asset/eea01c541d182f2ec65f93e947fb3e2f667a5b69.png';
import arjunImage3 from 'figma:asset/f8ffae8e3d7922ae2f5b64ef8e74163d0cf66cda.png';
import tholubommalataImage from 'figma:asset/28127803f97cc25a849b3b3ee327c32e9efd6d62.png';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gamesDropdownOpen, setGamesDropdownOpen] = useState(false);
  const [offeringsDropdownOpen, setOfferingsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
      setGamesDropdownOpen(false);
      setOfferingsDropdownOpen(false);
    }
  };

  const navLinks = [
    { label: 'The Forest', id: 'forest' },
    { label: 'Philosophy', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const games = [
    { label: 'Apex', id: 'apex', icon: '🐅' },
    { label: 'Pocket', id: 'pocket', icon: '🐿' },
  ];

  const offerings = [
    { label: 'Works', id: 'works', icon: '🦉' },
    { label: 'Guild', id: 'guild', icon: '🐘' },
  ];

  return (
    <div className="min-h-screen bg-[#0E2F26] text-[#E8E4DA]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-[rgba(14,47,38,0.95)] backdrop-blur-md border-[rgba(198,164,91,0.2)] ${
          isScrolled ? 'shadow-lg' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Aranya Interactive Logo" className="w-10 h-10" />
            
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('forest')}
              className="text-[#E8E4DA] hover:text-[#C6A45B] transition-colors duration-200"
            >
              The Forest
            </button>
            
            {/* Games Dropdown */}
            <div className="relative">
              <button
                onClick={() => setGamesDropdownOpen(!gamesDropdownOpen)}
                className="text-[#E8E4DA] hover:text-[#C6A45B] transition-colors duration-200 flex items-center gap-1"
              >
                Games
                <ChevronDown size={16} className={`transition-transform duration-200 ${gamesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {gamesDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[rgba(14,47,38,0.98)] backdrop-blur-md border border-[rgba(198,164,91,0.3)] rounded-lg shadow-xl overflow-hidden">
                  {games.map((game) => (
                    <button
                      key={game.id}
                      onClick={() => scrollToSection(game.id)}
                      className="w-full px-4 py-3 text-left text-[#E8E4DA] hover:bg-[rgba(198,164,91,0.2)] hover:text-[#C6A45B] transition-colors duration-200 flex items-center gap-2"
                    >
                      <span>{game.icon}</span>
                      <span>{game.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Offerings Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOfferingsDropdownOpen(!offeringsDropdownOpen)}
                className="text-[#E8E4DA] hover:text-[#C6A45B] transition-colors duration-200 flex items-center gap-1"
              >
                Offerings
                <ChevronDown size={16} className={`transition-transform duration-200 ${offeringsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {offeringsDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[rgba(14,47,38,0.98)] backdrop-blur-md border border-[rgba(198,164,91,0.3)] rounded-lg shadow-xl overflow-hidden">
                  {offerings.map((offering) => (
                    <button
                      key={offering.id}
                      onClick={() => scrollToSection(offering.id)}
                      className="w-full px-4 py-3 text-left text-[#E8E4DA] hover:bg-[rgba(198,164,91,0.2)] hover:text-[#C6A45B] transition-colors duration-200 flex items-center gap-2"
                    >
                      <span>{offering.icon}</span>
                      <span>{offering.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection('about')}
              className="text-[#E8E4DA] hover:text-[#C6A45B] transition-colors duration-200"
            >
              Philosophy
            </button>
            
            <button
              onClick={() => scrollToSection('contact')}
              className="text-[#E8E4DA] hover:text-[#C6A45B] transition-colors duration-200"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#C6A45B]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[rgba(14,47,38,0.98)] backdrop-blur-md border-t border-[rgba(198,164,91,0.2)]">
            <nav className="flex flex-col px-6 py-4">
              <button
                onClick={() => scrollToSection('forest')}
                className="text-[#E8E4DA] hover:text-[#C6A45B] py-3 text-left transition-colors duration-200"
              >
                The Forest
              </button>
              
              {/* Mobile Games Section */}
              <div className="border-t border-[rgba(198,164,91,0.2)] mt-2 pt-2">
                <button
                  onClick={() => setGamesDropdownOpen(!gamesDropdownOpen)}
                  className="text-[#E8E4DA] hover:text-[#C6A45B] py-3 text-left transition-colors duration-200 flex items-center gap-1 w-full"
                >
                  Games
                  <ChevronDown size={16} className={`transition-transform duration-200 ${gamesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {gamesDropdownOpen && (
                  <div className="pl-4">
                    {games.map((game) => (
                      <button
                        key={game.id}
                        onClick={() => scrollToSection(game.id)}
                        className="text-[#E8E4DA] hover:text-[#C6A45B] py-2 text-left transition-colors duration-200 flex items-center gap-2 w-full"
                      >
                        <span>{game.icon}</span>
                        <span>{game.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Offerings Section */}
              <div className="border-t border-[rgba(198,164,91,0.2)] mt-2 pt-2">
                <button
                  onClick={() => setOfferingsDropdownOpen(!offeringsDropdownOpen)}
                  className="text-[#E8E4DA] hover:text-[#C6A45B] py-3 text-left transition-colors duration-200 flex items-center gap-1 w-full"
                >
                  Offerings
                  <ChevronDown size={16} className={`transition-transform duration-200 ${offeringsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {offeringsDropdownOpen && (
                  <div className="pl-4">
                    {offerings.map((offering) => (
                      <button
                        key={offering.id}
                        onClick={() => scrollToSection(offering.id)}
                        className="text-[#E8E4DA] hover:text-[#C6A45B] py-2 text-left transition-colors duration-200 flex items-center gap-2 w-full"
                      >
                        <span>{offering.icon}</span>
                        <span>{offering.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => scrollToSection('about')}
                className="text-[#E8E4DA] hover:text-[#C6A45B] py-3 text-left transition-colors duration-200 border-t border-[rgba(198,164,91,0.2)] mt-2 pt-4"
              >
                Philosophy
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="text-[#E8E4DA] hover:text-[#C6A45B] py-3 text-left transition-colors duration-200"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1558641445-766a7c7036d3"
            alt="Forest Background"
            className="w-full h-full object-cover blur-md opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[rgba(14,47,38,0.4)] to-black" />
        </div>

        <div className="relative z-20 flex flex-col items-center text-center px-6">
          <motion.img
            src={logo}
            alt="Aranya Interactive Logo"
            className="w-64 h-64 ml-[-5px] mr-[0px] mt-[0px] mb-[-5px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />

          <motion.h1
            className="text-5xl md:text-7xl mb-6"
            style={{ fontFamily: 'Playfair Display, serif', color: '#C6A45B' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Aranya Interactive
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-3xl font-[Playfair_Display]"
            style={{ color: '#E8E4DA' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >We are an Indie Game Studio<br />Bringing Indian Mythology, Art, and Culture to Interactive Worlds</motion.p>

          <motion.button
            onClick={() => scrollToSection('forest')}
            className="px-8 py-4 border-2 border-[#2d5f4f] bg-[rgba(45,95,79,0.3)] text-[#C6A45B] rounded-lg hover:bg-[#2d5f4f] hover:border-[#3a7a62] transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore the Forest
          </motion.button>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#C6A45B]"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* The Forest Section */}
      <section id="forest" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black opacity-95" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#C6A45B' }}>The Forest (Aranya)</h2>
            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl md:text-3xl text-[#E8E4DA] p-[0px]" style={{ fontFamily: 'Playfair Display, serif' }}>Aranaya operates through four focused verticals:</h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: '🐅',
                title: 'Aranya Apex',
                subtitle: 'Premium PC & Console Titles',
                description: 'Crafting immersive experiences across platforms that blend cutting-edge technology with deep cultural narratives.',
              },
              {
                icon: '🐿',
                title: 'Aranya Pocket',
                subtitle: 'Mobile Cultural Experiences',
                description: 'Bringing the richness of Indian traditions to mobile platforms with accessible, engaging gameplay.',
              },
              {
                icon: '🦉',
                title: 'Aranya Works',
                subtitle: 'Porting & Co-Development Services',
                description: 'Expert technical solutions for studios looking to expand their reach across platforms.',
              },
              {
                icon: '🐘',
                title: 'Aranya Guild',
                subtitle: 'Creator Publishing & Partnerships',
                description: 'Partnering with small teams to bring culturally resonant games to global audiences through strategic, distribution and development support.',
              },
            ].map((division, index) => (
              <motion.div
                key={division.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(198, 164, 91, 0.4)' }}
                className="bg-[rgba(14,47,38,0.2)] backdrop-blur-md p-8 rounded-lg border border-transparent hover:border-[#C6A45B] transition-all duration-300"
              >
                <div className="text-5xl mb-4">{division.icon}</div>
                <h3 className="text-2xl md:text-3xl mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#C6A45B' }}>
                  {division.title}
                </h3>
                <p className="text-xl mb-4 text-[#E8E4DA]">{division.subtitle}</p>
                <p className="text-[#E8E4DA] opacity-80">{division.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Aranya Apex Section */}
      <section id="apex" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1558641445-766a7c7036d3"
            alt="Forest Background"
            className="w-full h-full object-cover blur-md opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[rgba(14,47,38,0.7)] to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="inline-block px-6 py-2 border border-[#C6A45B] rounded-full mb-6 text-[#C6A45B]">
              🐅 ARANYA APEX
            </div>
            <h2 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#C6A45B' }}>
              Premium Cross-Platform Titles
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#C6A45B' }}>
                Featured: Arjun: Drona's Ultimate Archer
              </h3>
              <p className="text-lg mb-4 leading-relaxed text-[#E8E4DA]">
                Arjun is a skill-based survival action game inspired by the Mahabharata. Players wield precision archery to survive escalating waves of enemies, unlock powerful upgrades, and face challenging boss encounters in a mythic reimagining of ancient India.
              </p>
              <p className="text-sm mb-6 text-[#E8E4DA] opacity-70">Currently under development, Alpha will be released on mobile first on September 2026</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-[rgba(198,164,91,0.2)] border border-[#C6A45B] rounded-full text-sm">
                  Action
                </span>
                <span className="px-4 py-2 bg-[rgba(198,164,91,0.2)] border border-[#C6A45B] rounded-full text-sm">
                  PvE Survival
                </span>
                <span className="px-4 py-2 bg-[rgba(198,164,91,0.2)] border border-[#C6A45B] rounded-full text-sm">
                  Skill-Based Combat
                </span>
                <span className="px-4 py-2 bg-[rgba(198,164,91,0.2)] border border-[#C6A45B] rounded-full text-sm">
                  Single Player
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-lg h-80 overflow-hidden border border-[rgba(198,164,91,0.3)]"
            >
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={false}
                arrows={true}
                prevArrow={<CustomPrevArrow />}
                nextArrow={<CustomNextArrow />}
                className="arjun-carousel"
              >
                <div className="h-80">
                  <ImageWithFallback
                    src={arjunImage1}
                    alt="Arjun Gameplay 1"
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="h-80">
                  <ImageWithFallback
                    src={arjunImage2}
                    alt="Arjun Gameplay 2"
                    className="w-full h-80 object-cover"
                  />
                </div>
                <div className="h-80">
                  <ImageWithFallback
                    src={arjunImage3}
                    alt="Arjun Gameplay 3"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </Slider>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Aranya Pocket Section */}
      <section id="pocket" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1702943546945-9ea68200e74d"
            alt="Indian Wedding Background"
            className="w-full h-full object-cover blur-lg opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[rgba(14,47,38,0.8)] to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="inline-block px-6 py-2 border border-[#C6A45B] rounded-full mb-6 text-[#C6A45B]">
              🐿 ARANYA POCKET
            </div>
            <h2 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#C6A45B' }}>
              Mobile Cultural Experiences
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[rgba(14,47,38,0.2)] backdrop-blur-md rounded-lg border border-transparent hover:border-[#C6A45B] transition-all duration-300 overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="overflow-hidden h-full">
                <ImageWithFallback
                  src={tholubommalataImage}
                  alt="Traditional shadow puppetry theater"
                  className="w-full h-full object-cover min-h-[300px]"
                />
              </div>
              <div className="p-8">
                <div className="inline-block px-4 py-1 bg-[#C6A45B] text-[#0E2F26] rounded-full text-sm font-semibold mb-4">
                  COMING SOON
                </div>
                <h3 className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#C6A45B' }}>
                  Tholubommalata: Tales in Shadow
                </h3>
                <p className="text-base md:text-lg mb-6 leading-relaxed text-[#E8E4DA]">
                  Design your stage, command intricate shadow puppets, and bring legendary stories to life in this interactive cultural theatre experience inspired by India's traditional leather puppetry.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[rgba(198,164,91,0.2)] border border-[#C6A45B] rounded-full text-sm text-[#C6A45B]">
                    Narrative
                  </span>
                  <span className="px-3 py-1 bg-[rgba(198,164,91,0.2)] border border-[#C6A45B] rounded-full text-sm text-[#C6A45B]">
                    Cultural
                  </span>
                  <span className="px-3 py-1 bg-[rgba(198,164,91,0.2)] border border-[#C6A45B] rounded-full text-sm text-[#C6A45B]">
                    iOS/Android
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Aranya Works Section */}
      <section id="works" className="relative py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="inline-block px-6 py-2 border border-[#C6A45B] rounded-full mb-6 text-[#C6A45B]">
              🦉 ARANYA WORKS
            </div>
            <h2 className="text-4xl md:text-6xl mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#C6A45B' }}>
              Porting & Co-Development Services
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Platform Porting',
                description: 'Expert porting services from PC to console, mobile to PC, and every platform in between. We ensure your game performs optimally across all target platforms.',
              },
              {
                title: 'Co-Development',
                description: 'Partner with us to expand your development capacity. Our experienced team integrates seamlessly with your workflow to help bring your vision to life.',
              },
              {
                title: 'Technical Optimization',
                description: 'Performance optimization, engine-specific expertise, and technical consultation to ensure your game runs smoothly and looks stunning.',
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="bg-[rgba(14,47,38,0.2)] backdrop-blur-md p-8 rounded-lg border border-transparent hover:border-[#C6A45B] transition-all duration-300"
              >
                <h3 className="text-2xl mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#C6A45B' }}>
                  {service.title}
                </h3>
                <p className="text-[#E8E4DA] opacity-80">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Aranya Guild Section */}
      <section id="guild" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759520582331-8b62a819a452"
            alt="Elephant Background"
            className="w-full h-full object-cover blur-md opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[rgba(14,47,38,0.8)] to-black" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="inline-block px-6 py-2 border border-[#C6A45B] rounded-full mb-6 text-[#C6A45B]">
              🐘 ARANYA GUILD
            </div>
            <h2 className="text-4xl md:text-6xl mb-8" style={{ fontFamily: 'Playfair Display, serif', color: '#C6A45B' }}>
              Creator Publishing & Partnerships
            </h2>
            <p className="text-base md:text-lg mb-8 text-[#C6A45B] italic">
              Aranya Guild is a planned publishing initiative that will launch in a future phase of our studio's growth.
            </p>
            <p className="text-lg md:text-xl max-w-3xl leading-relaxed text-[#E8E4DA]">
              Aranya Guild plans to partner with independent studios and small teams to bring culturally resonant games to global audiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-16"
          >
            <h3 className="text-2xl md:text-3xl mb-8" style={{ fontFamily: 'Playfair Display, serif', color: '#C6A45B' }}>
              To Support:
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[rgba(14,47,38,0.2)] backdrop-blur-md p-6 rounded-lg border border-[rgba(198,164,91,0.3)] hover:border-[#C6A45B] transition-all duration-300">
                <p className="text-base md:text-lg text-[#E8E4DA]">
                  Market positioning & launch strategy
                </p>
              </div>
              <div className="bg-[rgba(14,47,38,0.2)] backdrop-blur-md p-6 rounded-lg border border-[rgba(198,164,91,0.3)] hover:border-[#C6A45B] transition-all duration-300">
                <p className="text-base md:text-lg text-[#E8E4DA]">
                  Platform distribution & release readiness
                </p>
              </div>
              <div className="bg-[rgba(14,47,38,0.2)] backdrop-blur-md p-6 rounded-lg border border-[rgba(198,164,91,0.3)] hover:border-[#C6A45B] transition-all duration-300">
                <p className="text-base md:text-lg text-[#E8E4DA]">
                  Scalable IP growth beyond a single title
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#111111] to-black" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-[#C6A45B] flex items-center justify-center text-6xl bg-[rgba(14,47,38,0.3)] backdrop-blur-md">
              🌳
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl mb-8" style={{ fontFamily: 'Playfair Display, serif', color: '#C6A45B' }}>
              Rooted in Vision
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              At Aranya Interactive, we believe that the most compelling games are rooted in culture, identity, and authenticity. Like a forest ecosystem where each element supports the whole, our four divisions work in harmony to create, preserve, and share interactive experiences that matter.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              We are not just making games—we are building worlds where Indian mythology, art, and culture thrive in interactive form, reaching players across the globe while staying true to our roots.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl mb-8" style={{ fontFamily: 'Playfair Display, serif', color: '#C6A45B' }}>Let's Connect</h2>
            <p className="text-xl md:text-2xl mb-12 text-[#E8E4DA]">Let's create something extraordinary together</p>

            {/* Email Contact - Emphasized */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-8"
            >
              <p className="text-sm md:text-base mb-3 text-[#C6A45B] uppercase tracking-wider">Contact Us</p>
              <a
                href="mailto:hello@aranyainteractive.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[rgba(198,164,91,0.1)] border-2 border-[#C6A45B] rounded-lg hover:bg-[rgba(198,164,91,0.2)] hover:border-[#d4b46d] transition-all duration-300 group"
              >
                <Mail size={24} className="text-[#C6A45B]" />
                <span className="text-xl md:text-2xl text-[#C6A45B] group-hover:text-[#d4b46d] transition-colors duration-300" style={{ fontFamily: 'Playfair Display, serif' }}>
                  hello@aranyainteractive.com
                </span>
              </a>
            </motion.div>

            {/* LinkedIn Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <p className="text-sm mb-3 text-[#E8E4DA] opacity-70">Follow our journey</p>
              <a
                href="https://www.linkedin.com/company/aranya-interactive/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#E8E4DA] hover:text-[#C6A45B] transition-colors duration-300"
              >
                <Linkedin size={20} />
                <span className="text-lg">LinkedIn</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Custom Arrow Components for Slider
function CustomPrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <button
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[rgba(198,164,91,0.7)] hover:bg-[rgba(198,164,91,0.9)] flex items-center justify-center transition-all duration-300"
      onClick={onClick}
    >
      <ChevronLeft size={24} color="#E8E4DA" />
    </button>
  );
}

function CustomNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <button
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[rgba(198,164,91,0.7)] hover:bg-[rgba(198,164,91,0.9)] flex items-center justify-center transition-all duration-300"
      onClick={onClick}
    >
      <ChevronRight size={24} color="#E8E4DA" />
    </button>
  );
}