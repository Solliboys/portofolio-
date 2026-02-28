import React, { useState } from 'react';
import { FiMusic, FiX } from 'react-icons/fi';

const MusicPlayer = () => {
    const [isOpen, setIsOpen] = useState(true);

    // Link Spotify Track yang diubah menjadi format Embed dengan Autoplay
    // Catatan: Spotify Embed saat ini tidak mendukung parameter untuk mulai di detik tertentu (seperti t=20)
    const spotifyUrl = "https://open.spotify.com/embed/track/5WOSNVChcadlsCRiqXE45K?utm_source=generator&autoplay=1";

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
            {/* Widget Spotify (Hanya muncul jika isOpen true) */}
            {isOpen && (
                <div className="animate__animated animate__fadeInUp bg-black/80 backdrop-blur-lg p-2 rounded-2xl border border-violet-500/50 shadow-2xl overflow-hidden shadow-violet-500/20">
                    <iframe
                        src={spotifyUrl}
                        width="300"
                        height="152"
                        frameBorder="0"
                        allowFullScreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-xl"
                    ></iframe>
                </div>
            )}

            {/* Tombol Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center w-14 h-14 rounded-full bg-zinc-900 border-2 border-violet-500 shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-violet-500/40`}
                title={isOpen ? "Close Player" : "Open Spotify Player"}
            >
                {isOpen ? (
                    <FiX size={24} className="text-violet-500" />
                ) : (
                    <div className="relative">
                        <FiMusic size={24} className="text-violet-500" />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
                        </span>
                    </div>
                )}
            </button>
        </div>
    );
};

export default MusicPlayer;
