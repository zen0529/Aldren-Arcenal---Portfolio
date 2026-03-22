import { useState } from "react";
import { ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: "BloomScope — Bloom’s Taxonomy Difficulty Analyzer",
    description: "BloomScope is an NLP-powered question difficulty classifier that predicts the cognitive level of a question using Bloom’s Taxonomy. The system evaluates text using TF-IDF semantics, readability scores, vocabulary richness, and linguistic structure to estimate five difficulty tiers: Very Easy → Very Hard.", 
    images: [
      "/assets/difficulty_class/diff1.png",
      "/assets/difficulty_class/diff2.png",
      "/assets/difficulty_class/diff3.png",
    ],
    link: "https://difficultyclassification-nstf8uznr3djorj6w6yark.streamlit.app/",
  },
  {
    id: 2,
    title: "MoodIQ",
    description:
      "MoodIQ turns your daily emotional check-ins into meaningful, personalized insights. Track your feelings, energy, and reflections — then let the system analyze your patterns, highlight trends, and reveal the emotional shifts you usually miss. Every entry contributes to a richer understanding of your emotional journey.",
    images: [
      "/assets/moodIQ/m1.png",
      "/assets/moodIQ/m2.png",
      "/assets/moodIQ/m3.png",
      "/assets/moodIQ/m3.png"
    ],
    link: "https://zen0529-moodiq-main-w9rl9h.streamlit.app/",
  },
  {
    id: 3,
    title: "SpeakUp",
    description:
      "A communication platform empowering voice-based interactions with AI-powered speech recognition and natural language processing for accessibility.",
    images: [
      "/assets/speakup/speakup0.png",
     "/assets/speakup/speakup1.png",
     "/assets/speakup/speakup2.png",
     "/assets/speakup/speakup3.png",
    ],
    link: "https://example.com/speakup",
  },
  {
    id: 4,
    title: "NLP based Crypto Sentiment Analyzer",
    description:
      "Real-time cryptocurrency sentiment analysis using NLP to aggregate social media, news, and forum data for trading insights.",
    images: [
      "https://via.placeholder.com/600x400/4A5568/FFFFFF?text=Crypto+Analyzer",
      "https://via.placeholder.com/600x400/4A5568/FFFFFF?text=Sentiment+Charts",
    ],
    link: "https://example.com/crypto-analyzer",
  },
  {
    id: 5,
    title: "Spine Saver - Posture Corrector and Notifier",
    description:
      "Computer vision-based posture monitoring system that provides real-time feedback and notifications to prevent back pain and improve ergonomics.",
    images: [
      "https://via.placeholder.com/600x400/4A5568/FFFFFF?text=Spine+Saver+App",
      "https://via.placeholder.com/600x400/4A5568/FFFFFF?text=Posture+Detection",
    ],
    link: "https://example.com/spine-saver",
  },
  {
    id: 6,
    title: "Gainz Grind - Workout Recommender and Tracker",
    description:
      "Personalized fitness companion that recommends workouts based on your goals, tracks progress, and adapts to your performance with ML-driven insights.",
    images: [
      "https://via.placeholder.com/600x400/4A5568/FFFFFF?text=Gainz+Grind+Home",
      "https://via.placeholder.com/600x400/4A5568/FFFFFF?text=Workout+Tracker",
    ],
    link: "https://example.com/gainz-grind",
  },
];

export default function Projects() {
  const [flippedId, setFlippedId] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState<typeof projectsData[0] | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const handleFlip = (id: number) => {
    setFlippedId(flippedId === id ? null : id);
    if (!currentImageIndex[id]) {
      setCurrentImageIndex(prev => ({ ...prev, [id]: 0 }));
    }
  };

  const nextImage = (projectId: number, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (projectId: number, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const openModal = (project: typeof projectsData[0], imageIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setModalProject(project);
    setModalImageIndex(imageIndex);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalProject(null);
  };

  const nextModalImage = () => {
    if (modalProject) {
      setModalImageIndex((prev) => (prev + 1) % modalProject.images.length);
    }
  };

  const prevModalImage = () => {
    if (modalProject) {
      setModalImageIndex((prev) => (prev - 1 + modalProject.images.length) % modalProject.images.length);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <h2 className="text-[#75C310] text-4xl md:text-5xl font-bold mb-12 self-start ml-4 md:ml-20">
          Projects
        </h2>
        
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="relative h-64 md:h-80 cursor-pointer"
              style={{ perspective: '1000px' }}
              onClick={() => handleFlip(project.id)}
            >
              <div
                className="relative w-full h-full transition-transform duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedId === project.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Front Face */}
                <div
                  className="absolute w-full h-full bg-gradient-to-br from-[#545454] to-[#3a3a3a] rounded-2xl p-6 flex items-center justify-center border-2 border-[#75C310]/20 hover:border-[#75C310]/60 transition-all duration-300 shadow-lg hover:shadow-[#75C310]/20 overflow-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {/* Blurred background image */}
                  <img
                    src={project.images[0]}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm scale-110"
                  />
                  <div className="text-center relative z-10">
                    <div className="text-[#75C310] text-5xl font-bold mb-4">
                      {index + 1}
                    </div>
                    <h3 className="text-white text-lg font-semibold leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-xs mt-3">Click to explore</p>
                  </div>
                </div>

                {/* Back Face */}
                <div 
                  className="absolute w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-2xl p-4 border-2 border-[#75C310]/60 shadow-xl overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="flex flex-col h-full">
                    {/* Carousel with fixed height */}
                    <div className="relative h-32 md:h-40 mb-3 group flex-shrink-0">
                      <img
                        src={project.images[currentImageIndex[project.id] || 0]}
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={(e) => openModal(project, currentImageIndex[project.id] || 0, e)}
                      />
                      
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => prevImage(project.id, project.images.length, e)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={(e) => nextImage(project.id, project.images.length, e)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronRight size={20} />
                          </button>
                          
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {project.images.map((_, idx) => (
                              <div
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full ${
                                  idx === (currentImageIndex[project.id] || 0)
                                    ? 'bg-[#75C310]'
                                    : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-white/80 text-xs mb-3 line-clamp-4 flex-grow">
                      {project.description}
                    </p>

                    {/* Link */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-2 bg-[#75C310] hover:bg-[#65b310] text-black font-semibold py-2 px-4 rounded-lg transition-colors flex-shrink-0"
                    >
                      View Project
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && modalProject && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-[#75C310] transition-colors z-10"
          >
            <X size={32} />
          </button>

          <div 
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row gap-6 bg-[#1a1a1a] rounded-xl p-6 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section */}
            <div className="relative flex-1 flex items-center justify-center min-h-0">
              <img
                src={modalProject.images[modalImageIndex]}
                alt={`${modalProject.title} screenshot ${modalImageIndex + 1}`}
                className="max-w-full max-h-[60vh] md:max-h-[75vh] object-contain rounded-lg"
              />

              {modalProject.images.length > 1 && (
                <>
                  <button
                    onClick={prevModalImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={nextModalImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                  >
                    <ChevronRight size={28} />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 px-4 py-2 rounded-full">
                    {modalProject.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                          idx === modalImageIndex ? 'bg-[#75C310]' : 'bg-white/50 hover:bg-white/70'
                        }`}
                        onClick={() => setModalImageIndex(idx)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Description Section */}
            <div className="w-full md:w-80 flex flex-col gap-4 overflow-y-auto">
              <div>
                <h3 className="text-[#75C310] text-2xl font-bold mb-2">{modalProject.title}</h3>
                <p className="text-sm text-white/50">
                  Image {modalImageIndex + 1} of {modalProject.images.length}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-white/90 text-sm leading-relaxed">
                  {modalProject.description}
                </p>
              </div>

              <a
                href={modalProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#75C310] hover:bg-[#65b310] text-black font-semibold py-3 px-4 rounded-lg transition-colors mt-auto"
              >
                View Project
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}