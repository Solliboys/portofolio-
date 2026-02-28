import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import ScrambledText from "./components/ScrambledText/ScrambledText";
import SplitText from "./components/SplitText/SplitText";
import GlassIcons from "./components/GlassIcons/GlassIcons";
import { listTools, listProyek, listPrestasi, listOrganisasi } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal"; // <-- IMPORT MODAL
import Aurora from "./components/Aurora/Aurora";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null); // null = modal tertutup

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };
  // -------------------------

  useEffect(() => {
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isReload) {
      // Ambil path tanpa hash
      const baseUrl = window.location.origin + "/portofolio/";
      window.location.replace(baseUrl);
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-[#030014]">
        <Aurora
          colorStops={["#0a0020", "#3d007a", "#00474f"]}
          blend={0.5}
          amplitude={1.2}
          speed={0.4}
        />
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        {/* Floating Light Spots */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px]" style={{ willChange: 'opacity' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[120px]" style={{ willChange: 'opacity' }}></div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="hero grid md:grid-cols-2 items-center pt-10 xl:gap-0 gap-6 grid-cols-1">
          <div className="animate__animated animate__fadeInUp">
            <div className="flex items-center gap-3 mb-6 bg bg-zinc-800 w-fit p-4 rounded-2xl">
              <img src="./assets/icon.png" className="w-10 rounded-md" />
              <q>Grow better and be better</q>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <ShinyText text="Hi I'm Mohammad Solli" disabled={false} speed={3} className='custom-class' />
            </h1>
            <BlurText
              text="A passionate application and web developer dedicated to crafting modern, high-performance digital experiences through innovative and user-friendly solutions."
              delay={150}
              animateBy="words"
              direction="top"
              className=" mb-6"
            />
            <div className="flex flex-wrap items-center sm:gap-4 gap-3 py-2">
              <a
                href="./assets/CV.pdf"
                download="Faris_Edrik_Prayoga_CV.pdf"
                className="font-semibold bg-[#1a1a1a] p-3 sm:p-4 px-5 sm:px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors text-sm sm:text-base"
              >
                <ShinyText text="Download CV" disabled={false} speed={3} className="custom-class" />
              </a>

              <a href="#project" className="font-semibold bg-[#1a1a1a] p-3 sm:p-4 px-5 sm:px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors text-sm sm:text-base">
                <ShinyText text="Explore My Projects" disabled={false} speed={3} className="custom-class" />
              </a>
            </div>

          </div>
          <div className="md:ml-auto animate__animated animate__fadeInUp">
            <ProfileCard
              name=""
              title=""
              handle="Mohammad solli"
              status="Online"
              contactText="Contact Me"
              avatarUrl="./assets/solli.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log('Contact clicked')}
            />
          </div>
        </div>
        {/* tentang */}
        <div className="group mt-15 mx-auto w-full max-w-[1600px] rounded-3xl border-[5px] border-violet-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-6 transition-all duration-500 hover:shadow-[0_0_50px_rgba(168,85,247,0.6)] hover:border-violet-500/60" id="about">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-0 px-8" data-aos="fade-up" data-aos-duration="600" data-aos-once="true">
            <div className="basis-full md:basis-5/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-violet-500/30 flex justify-center">
              <img
                src="./assets/solli.png"
                alt="Mohammad Solli"
                className="w-full max-w-[350px] rounded-2xl shadow-2xl border-4 border-violet-500/30 object-cover transform transition-all duration-500 hover:scale-105 hover:border-violet-400 hover:shadow-[0_0_50px_rgba(167,139,250,0.7)] group-hover:shadow-[0_0_30px_rgba(167,139,250,0.4)]"
                data-aos="zoom-in"
                data-aos-duration="600"
              />
            </div>

            {/* Kolom kanan (Teks) */}
            <div className="basis-full md:basis-7/12 pl-0 md:pl-8 mt-5 md:mt-0">
              <div className="flex-1 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                  About Me
                </h2>

                <BlurText
                  text="Saya Mohammad Solli, seorang full-stack developer yang bersemangat dalam membangun aplikasi modern dengan performa tinggi serta pengalaman pengguna yang intuitif. Saya senang bekerja dengan teknologi terbaru seperti Artificial Intelligence (AI), Machine Learning, dan pengembangan berbasis cloud, dengan memadukan kreativitas dan ketelitian untuk menghasilkan solusi yang berdampak. Dengan pengalaman lebih dari tiga tahun dan lebih dari 20 proyek yang telah diselesaikan, saya berkomitmen membantu pengguna dan bisnis berkembang di era digital melalui produk digital yang fungsional, estetis, dan scalable."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-sm md:text-lg leading-relaxed mb-10 text-gray-300 text-justify px-2 md:px-0"
                />

                <div className="grid grid-cols-2 sm:flex sm:flex-row items-center sm:justify-between text-center sm:text-left gap-6 sm:gap-y-0 mb-4 w-full">
                  <div>
                    <h1 className="text-3xl md:text-4xl mb-1">
                      7<span className="text-violet-500">+</span>
                    </h1>
                    <p>Project Finished</p>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl mb-1">
                      3<span className="text-violet-500">+</span>
                    </h1>
                    <p>Years of Experience</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1" data-aos="fade-up" data-aos-duration="600" data-aos-delay="600" data-aos-once="true">
                    <h1 className="text-3xl md:text-4xl mb-1">
                      3.90<span className="text-violet-500">/4.00</span>
                    </h1>
                    <p>GPA</p>
                  </div>
                </div>

                <ShinyText
                  text="Working with heart, creating with mind."
                  disabled={false}
                  speed={3}
                  className="text-sm md:text-base text-violet-400"
                />
              </div>
            </div>
          </div>

        </div>
        <div className="tools mt-32 px-2 sm:px-0">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4" data-aos="fade-up" data-aos-duration="600" data-aos-once="true" >Tools & Technologies</h1>
          <p className="w-full md:w-2/5 text-base opacity-50" data-aos="fade-up" data-aos-duration="600" data-aos-delay="300" data-aos-once="true">My Profesional Skills</p>
          <div className="tools-box mt-14 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">

            {listTools.map((tool) => (
              <div
                key={tool.id} data-aos="fade-up" data-aos-duration="600" data-aos-delay={tool.dad} data-aos-once="true"
                className="flex items-center gap-4 p-4 border border-zinc-700 rounded-xl bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-800/80 transition-all duration-300 group shadow-lg"
              >
                <img
                  src={tool.gambar}
                  alt="Tools Image"
                  className="w-16 h-16 object-contain bg-zinc-800 p-2 rounded-lg group-hover:bg-zinc-900 transition-all duration-300"
                />
                <div className="flex flex-col overflow-hidden">
                  <div className="truncate">
                    <ShinyText
                      text={tool.nama}
                      disabled={false}
                      speed={3}
                      className="text-lg font-semibold block"
                    />
                  </div>
                  <p className="text-sm text-zinc-400 truncate">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* tentang */}

        {/* Proyek */}
        <div id="project" className="mt-20 py-10" data-aos="fade-up" data-aos-duration="600" data-aos-once="true">
          <h1 className="text-center text-4xl font-bold mb-2">Project</h1>
          <p className="text-base/loose text-center opacity-50 px-4">Showcasing a selection of projects that reflect my skills, creativity, and passion for building meaningful digital experiences.</p>
        </div>
        <div className="proyek-box mt-14" >

          <div style={{ height: 'auto', position: 'relative' }} data-aos="fade-up" data-aos-duration="600" data-aos-delay="400" data-aos-once="true" >
            <ChromaGrid
              items={listProyek}
              onItemClick={handleProjectClick} // Kirim fungsi untuk handle klik
              radius={500}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>
        {/* Proyek */}


        {/* Prestasi */}
        <div className="prestasi mt-20 sm:p-10 p-0" id="achievements">
          <h1
            className="text-3xl sm:text-4xl mb-2 font-bold text-center"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-once="true"
          >
            Achievements
          </h1>
          <p
            className="text-base/loose text-center mb-10 opacity-50"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="300"
            data-aos-once="true"
          >
            My milestones and recognition in the field of technology
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listPrestasi.map((prestasi) => (
              <div
                key={prestasi.id}
                onClick={() => handleProjectClick(prestasi)}
                className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700 hover:border-violet-500/50 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-violet-500/10"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={prestasi.delay}
                data-aos-once="true"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-900 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <i className={`${prestasi.icon} ri-2x text-violet-500`}></i>
                  </div>
                  <div>
                    <span className="text-violet-500 font-semibold text-sm">{prestasi.year}</span>
                    <h3 className="text-xl font-bold text-white mb-2">{prestasi.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{prestasi.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Prestasi */}

        {/* Organizational Experience */}
        <div className="organisasi mt-20 sm:p-10 p-0" id="experience">
          <h1
            className="text-3xl sm:text-4xl mb-2 font-bold text-center text-white"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-once="true"
          >
            Organizational Experience
          </h1>
          <p
            className="text-base/loose text-center mb-10 opacity-50 text-gray-400"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="300"
            data-aos-once="true"
          >
            My involvement and leadership in various professional organizations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listOrganisasi.map((org) => (
              <div
                key={org.id}
                onClick={() => handleProjectClick(org)}
                className="bg-zinc-800/10 p-6 rounded-2xl border border-zinc-700/50 hover:border-cyan-500/50 transition-all duration-300 group shadow-lg hover:shadow-cyan-500/5 backdrop-blur-sm cursor-pointer"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay={org.delay}
                data-aos-once="true"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-zinc-900 rounded-xl group-hover:scale-110 transition-transform duration-300 border border-zinc-700 group-hover:border-cyan-500/50">
                    <i className={`${org.icon} ri-xl text-cyan-500`}></i>
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-cyan-500 font-semibold text-xs tracking-wider uppercase">{org.year}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{org.title}</h3>
                    <p className="text-sm text-zinc-300 font-medium mb-3 italic">{org.organization}</p>
                    <p className="text-zinc-500 text-xs leading-relaxed">{org.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Organizational Experience */}
      </main >

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  )
}

export default App
