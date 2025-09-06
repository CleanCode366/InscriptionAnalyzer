import React, { useState, useEffect } from 'react';
import { Search, Upload, Users, Globe, BookOpen, Heart, Eye, MessageCircle, Calendar, MapPin, ChevronRight, Star, Award, TrendingUp, Camera } from 'lucide-react';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Featured inscriptions data
  const featuredInscriptions = [
    {
      id: 1,
      title: "Ancient Sanskrit Stone Tablet",
      location: "Hampi, Karnataka",
      period: "14th Century",
      image: "/api/placeholder/400/300",
      description: "Detailed Vijayanagara empire inscription with royal decrees",
      likes: 234,
      views: 1542,
      comments: 45
    },
    {
      id: 2,
      title: "Tamil Copper Plate Inscription",
      location: "Thanjavur, Tamil Nadu",
      period: "11th Century",
      image: "/api/placeholder/400/300",
      description: "Chola dynasty land grant inscription with detailed genealogy",
      likes: 189,
      views: 987,
      comments: 32
    },
    {
      id: 3,
      title: "Medieval Persian Script",
      location: "Delhi",
      period: "13th Century",
      image: "/api/placeholder/400/300",
      description: "Sultanate period architectural inscription from Qutub complex",
      likes: 156,
      views: 743,
      comments: 28
    }
  ];

  const recentDiscoveries = [
    { title: "Kushana Era Inscription", location: "Mathura, UP", contributor: "Dr. Priya Sharma", date: "2 days ago" },
    { title: "Chalukya Temple Inscription", location: "Badami, Karnataka", contributor: "Prof. Rajesh Kumar", date: "1 week ago" },
    { title: "Mughal Garden Marker", location: "Srinagar, J&K", contributor: "Sarah Ahmed", date: "2 weeks ago" },
    { title: "Maratha Victory Stone", location: "Pune, Maharashtra", contributor: "Vikram Patil", date: "3 weeks ago" }
  ];

  const statistics = [
    { icon: BookOpen, label: "Inscriptions", value: "12,456", color: "text-blue-400" },
    { icon: Users, label: "Contributors", value: "3,892", color: "text-green-400" },
    { icon: Globe, label: "Locations", value: "1,234", color: "text-purple-400" },
    { icon: Award, label: "Translations", value: "8,765", color: "text-yellow-400" }
  ];

  // Auto-rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredInscriptions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-lg">
                C
              </div>
              <div>
                <h1 className="text-xl font-bold">Archaeological Inscriptions</h1>
                <p className="text-sm text-slate-400">C-DAC Bengalore</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-blue-400 transition-colors">Explore</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Contribute</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Research</a>
              <a href="#" className="hover:text-blue-400 transition-colors">About</a>
            </div>
            <div className="flex space-x-3">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Decode Ancient Wisdom Together
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Join the world's largest collaborative platform for archaeological inscriptions. 
              Discover, transcribe, translate, and preserve humanity's written heritage.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search inscriptions, locations, or time periods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
                <Upload className="inline mr-2 w-5 h-5" />
                Upload Inscription
              </button>
              <button className="bg-slate-800/50 border border-slate-600 hover:bg-slate-700/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all backdrop-blur-sm">
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statistics.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center p-6 bg-slate-800/50 rounded-xl backdrop-blur-sm border border-slate-700/50">
                  <IconComponent className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-slate-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Inscriptions Carousel */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Featured Discoveries</h3>
            <p className="text-slate-400 text-lg">Explore remarkable inscriptions recently added to our collection</p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredInscriptions.map((inscription, index) => (
                  <div key={inscription.id} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2 gap-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                      <div className="relative group">
                        <img 
                          src="/api/placeholder/500/400" 
                          alt={inscription.title}
                          className="w-full h-80 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-2xl font-bold mb-3">{inscription.title}</h4>
                        <div className="flex items-center text-slate-400 mb-2">
                          <MapPin className="w-4 h-4 mr-2" />
                          {inscription.location}
                        </div>
                        <div className="flex items-center text-slate-400 mb-4">
                          <Calendar className="w-4 h-4 mr-2" />
                          {inscription.period}
                        </div>
                        <p className="text-slate-300 mb-6 leading-relaxed">{inscription.description}</p>
                        
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex space-x-6 text-sm text-slate-400">
                            <span className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {inscription.likes}
                            </span>
                            <span className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {inscription.views}
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {inscription.comments}
                            </span>
                          </div>
                        </div>

                        <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center">
                          Explore Details
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredInscriptions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-blue-500' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">How Our Platform Works</h3>
            <p className="text-slate-400 text-lg">Collaborative archaeology made simple</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Discover & Upload</h4>
              <p className="text-slate-400 leading-relaxed">
                Find ancient inscriptions in the field and upload high-quality images with location details and initial observations.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Transcribe & Translate</h4>
              <p className="text-slate-400 leading-relaxed">
                Work together to decipher scripts, provide transcriptions, and offer translations in multiple languages.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Share Knowledge</h4>
              <p className="text-slate-400 leading-relaxed">
                Engage with experts and enthusiasts, share insights, and build collective understanding of our heritage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Recent Discoveries */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">Recent Discoveries</h3>
                <button className="text-blue-400 hover:text-blue-300 flex items-center">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              <div className="space-y-4">
                {recentDiscoveries.map((discovery, index) => (
                  <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-colors cursor-pointer backdrop-blur-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg mb-2">{discovery.title}</h4>
                        <div className="flex items-center text-slate-400 text-sm mb-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {discovery.location}
                        </div>
                        <p className="text-slate-400 text-sm">Contributed by {discovery.contributor}</p>
                      </div>
                      <div className="text-slate-500 text-sm">{discovery.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Highlights */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Community Highlights</h3>
              
              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-6 mb-6 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <Star className="w-6 h-6 text-yellow-400 mr-2" />
                  <h4 className="font-semibold">Top Contributor</h4>
                </div>
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold">
                    DR
                  </div>
                  <div>
                    <p className="font-medium">Dr. Rajesh Mehta</p>
                    <p className="text-sm text-slate-400">89 contributions this month</p>
                  </div>
                </div>
                <p className="text-sm text-slate-300">
                  "Specializing in Gupta period inscriptions with expertise in ancient Brahmi script."
                </p>
              </div>

              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
                  <h4 className="font-semibold">Trending This Week</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Chola Inscriptions</span>
                    <span className="text-green-400 text-sm">+24%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Mauryan Scripts</span>
                    <span className="text-green-400 text-sm">+18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Rock Edicts</span>
                    <span className="text-green-400 text-sm">+15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4">Why Join Our Community?</h3>
            <p className="text-slate-400 text-lg">Be part of preserving and understanding our shared heritage</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-colors backdrop-blur-sm">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Global Impact</h4>
              <p className="text-slate-400">
                Contribute to a worldwide effort to digitally preserve archaeological treasures for future generations.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-colors backdrop-blur-sm">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Expert Community</h4>
              <p className="text-slate-400">
                Connect with archaeologists, linguists, historians, and passionate enthusiasts from around the world.
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 hover:border-green-500/50 transition-colors backdrop-blur-sm">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Recognition</h4>
              <p className="text-slate-400">
                Gain recognition for your contributions and build a reputation in the archaeological community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-12 border border-slate-700/50 backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-4">Ready to Make History?</h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Every inscription tells a story. Every translation unlocks wisdom. 
              Every contribution helps preserve our shared human heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg">
                Start Contributing
              </button>
              <button className="border border-slate-600 hover:bg-slate-800/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold">
                  C
                </div>
                <div>
                  <h4 className="font-bold">C-DAC Archaeological Platform</h4>
                  <p className="text-sm text-slate-400">Centre for Development of Advanced Computing</p>
                </div>
              </div>
              <p className="text-slate-400 mb-4">
                Empowering collaborative archaeological research through technology and community engagement.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Platform</h5>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Explore</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Upload</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Research Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Access</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Community</h5>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Forums</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 Centre for Development of Advanced Computing (C-DAC). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;