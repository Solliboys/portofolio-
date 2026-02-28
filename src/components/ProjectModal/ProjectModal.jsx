import React, { useState, useEffect } from 'react';
import { FiX, FiGithub, FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Install react-icons jika belum: npm install react-icons

const CarouselImages = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const next = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  // Auto-play effect
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      next();
    }, 3000); // Ganti gambar setiap 3 detik

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <div className="relative w-full h-full group">
      <img
        src={images[currentIndex]}
        alt={`${title} - image ${currentIndex + 1}`}
        className="w-full h-auto max-h-[35vh] sm:max-h-[60vh] object-contain transition-all duration-500 bg-zinc-800"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-violet-600/80 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-violet-600/80 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
          >
            <FiChevronRight size={20} />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 p-1.5 bg-black/30 backdrop-blur-md rounded-full">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-violet-400 w-3' : 'bg-zinc-500'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const ProjectModal = ({ isOpen, onClose, project }) => {
  // State untuk mengontrol animasi penutupan
  const [isClosing, setIsClosing] = useState(false);

  // Fungsi untuk menangani penutupan dengan animasi
  const handleClose = () => {
    setIsClosing(true);
    // Tunggu animasi selesai (300ms) sebelum memanggil onClose dari props
    setTimeout(() => {
      onClose();
      setIsClosing(false); // Reset state untuk pembukaan berikutnya
    }, 300);
  };

  // Mencegah scroll di background saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    // Overlay
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik di dalam
        className={`bg-zinc-900 border border-violet-500/50 rounded-2xl shadow-2xl shadow-violet-500/20 w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-transform duration-300 scrollbar-hide ${isClosing ? 'animate-out' : 'animate-in'}`}
      >
        {/* --- GAMBAR PROYEK / SERTIFIKAT / ORGANISASI --- */}
        <div className="relative group/img bg-zinc-800 rounded-t-2xl overflow-hidden min-h-[200px] flex items-center justify-center">
          {project.images && project.images.length > 0 ? (
            <div className="relative w-full h-full">
              {/* Image Carousel State */}
              <CarouselImages images={project.images} title={project.title} />
            </div>
          ) : (
            <img
              src={project.image || project.certificate}
              alt={project.title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          )}
        </div>

        <div className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
          <div className="flex justify-between items-start gap-3">
            <h2 className="text-lg sm:text-2xl font-bold text-white leading-tight">{project.title}</h2>
            <button
              onClick={handleClose}
              className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700 -mt-1.5 -mr-1.5"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* --- DESKRIPSI LENGKAP (Tampilkan hanya jika bukan sertifikat saja) --- */}
          {project.fullDescription && (
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {project.fullDescription}
            </p>
          )}

          {/* --- LINK GITHUB (Hanya untuk Proyek) --- */}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 font-semibold bg-violet-600 p-3 px-5 rounded-full w-full cursor-pointer border border-transparent hover:bg-violet-700 transition-colors"
            >
              <FiGithub />
              <span>Source Code</span>
            </a>
          )}

          {/* --- INFO TAMBAHAN (Hanya untuk Prestasi) --- */}
          {project.year && (
            <div className="flex items-center justify-between text-zinc-400 text-sm mt-2">
              <span>Achievement Milestone</span>
              <span className="text-violet-500 font-bold">{project.year}</span>
            </div>
          )}
        </div>
      </div>
      {/* CSS untuk animasi */}
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.95); opacity: 0; }
        }
        .animate-out {
          animation: scaleOut 0.3s ease-in forwards;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
