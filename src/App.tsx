/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  User, 
  FolderCode, 
  Mail, 
  Monitor, 
  Github, 
  Linkedin, 
  ExternalLink,
  Terminal,
  FileText,
  Image as ImageIcon,
  Music
} from 'lucide-react';
import { Window } from './components/Window';

interface AppWindow {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  content: React.ReactNode;
}

export default function App() {
  const [lang, setLang] = useState<'en' | 'pt'>('pt');

  const translations = {
    en: {
      about: 'About Me',
      projects: 'Projects',
      contact: 'Contact',
      cv: 'Resume',
      start: 'start',
      guest: 'Guest User',
      logoff: 'Log Off',
      turnoff: 'Turn Off',
      email: 'Email',
      internet: 'Internet',
      documents: 'My Documents',
      pictures: 'My Pictures',
      music: 'My Music',
      controlPanel: 'Control Panel',
      run: 'Run...',
      skills: 'Skills',
      experience: 'Professional Experience',
      education: 'Education',
      languages: 'Languages',
      summary: 'Professional Summary',
      send: 'Send Message',
      subject: 'Subject',
      to: 'To',
      placeholder: 'Type your message here...',
      aboutTitle: 'About Me - Notepad',
      projectsTitle: 'My Projects - Explorer',
      contactTitle: 'Contact - Outlook Express',
      cvTitle: 'Resume - WordPad',
      musicTitle: 'My Music - Windows Media Player',
    },
    pt: {
      about: 'Sobre Mim',
      projects: 'Projetos',
      contact: 'Contato',
      cv: 'Currículo',
      start: 'iniciar',
      guest: 'Usuário Convidado',
      logoff: 'Fazer Logoff',
      turnoff: 'Desligar',
      email: 'E-mail',
      internet: 'Internet',
      documents: 'Meus Documentos',
      pictures: 'Minhas Imagens',
      music: 'Minhas Músicas',
      controlPanel: 'Painel de Controle',
      run: 'Executar...',
      skills: 'Habilidades',
      experience: 'Experiência Profissional',
      education: 'Educação',
      languages: 'Idiomas',
      summary: 'Resumo Profissional',
      send: 'Enviar Mensagem',
      subject: 'Assunto',
      to: 'Para',
      placeholder: 'Digite sua mensagem aqui...',
      aboutTitle: 'Sobre Mim - Bloco de Notas',
      projectsTitle: 'Meus Projetos - Explorer',
      contactTitle: 'Contato - Outlook Express',
      cvTitle: 'Currículo - WordPad',
      musicTitle: 'Minhas Músicas - Windows Media Player',
    }
  };

  const t = translations[lang];

  const [windows, setWindows] = useState<AppWindow[]>([
    {
      id: 'about',
      title: 'About Me - Notepad',
      icon: <User size={16} />,
      isOpen: true,
      isMinimized: false,
      content: null
    },
    {
      id: 'projects',
      title: 'My Projects - Explorer',
      icon: <FolderCode size={16} />,
      isOpen: false,
      isMinimized: false,
      content: null
    },
    {
      id: 'contact',
      title: 'Contact - Outlook Express',
      icon: <Mail size={16} />,
      isOpen: false,
      isMinimized: false,
      content: null
    },
    {
      id: 'cv',
      title: 'Resume - WordPad',
      icon: <FileText size={16} />,
      isOpen: false,
      isMinimized: false,
      content: null
    },
    {
      id: 'music',
      title: 'My Music - Windows Media Player',
      icon: <Music size={16} />,
      isOpen: false,
      isMinimized: false,
      content: null
    }
  ]);

  useEffect(() => {
    setWindows(prev => prev.map(w => ({
      ...w,
      title: t[`${w.id}Title` as keyof typeof t] as string
    })));
  }, [lang]);

  const [activeWindowId, setActiveWindowId] = useState<string>('about');
  const [time, setTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isOpen: !w.isOpen, isMinimized: false } : w
    ));
    if (!windows.find(w => w.id === id)?.isOpen) {
      setActiveWindowId(id);
    }
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isOpen: false } : w
    ));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const focusWindow = (id: string) => {
    setActiveWindowId(id);
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: false } : w
    ));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#245edb] font-sans">
      {/* Desktop Background (Bliss) */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("https://picsum.photos/seed/xp-bliss/1920/1080")',
          filter: 'brightness(0.9)'
        }}
      />

      {/* Hidden YouTube Embed for Vibe (as requested) */}
      <iframe 
        src="https://www.youtube.com/embed/7nQ2oiVqKHw?autoplay=1&mute=0" 
        className="hidden" 
        allow="autoplay"
      />

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid grid-flow-col grid-rows-6 gap-6 z-10">
        <DesktopIcon 
          icon={<User size={32} className="text-white" />} 
          label={t.about} 
          onClick={() => toggleWindow('about')} 
        />
        <DesktopIcon 
          icon={<FolderCode size={32} className="text-white" />} 
          label={t.projects} 
          onClick={() => toggleWindow('projects')} 
        />
        <DesktopIcon 
          icon={<FileText size={32} className="text-white" />} 
          label={t.cv} 
          onClick={() => toggleWindow('cv')} 
        />
        <DesktopIcon 
          icon={<Mail size={32} className="text-white" />} 
          label={t.contact} 
          onClick={() => toggleWindow('contact')} 
        />
        <DesktopIcon 
          icon={<Terminal size={32} className="text-white" />} 
          label="Terminal" 
          onClick={() => {}} 
        />
        <DesktopIcon 
          icon={<Music size={32} className="text-white" />} 
          label={t.music} 
          onClick={() => toggleWindow('music')} 
        />
      </div>

      {/* Windows Layer */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {windows.filter(w => w.isOpen && !w.isMinimized).map((w, idx) => (
          <div key={w.id} className="pointer-events-auto">
            <Window
              id={w.id}
              title={w.title}
              icon={w.icon}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              isActive={activeWindowId === w.id}
              onFocus={focusWindow}
              initialX={100 + idx * 40}
              initialY={100 + idx * 40}
            >
              {w.id === 'about' && (
                <div className="space-y-4 font-mono">
                  <h1 className="text-2xl font-bold border-b pb-2">
                    {lang === 'en' ? "Hello, I'm Leonardo" : "Olá, eu sou o Leonardo"}
                  </h1>
                  <p>
                    {lang === 'en' 
                      ? "I'm a Fullstack Developer and UI/UX Designer passionate about creating intuitive and high-performance digital experiences."
                      : "Sou Desenvolvedor Fullstack e UI/UX Designer apaixonado por criar experiências digitais intuitivas e de alta performance."}
                  </p>
                  <div className="space-y-2">
                    <h2 className="font-bold text-blue-800 underline">{t.skills}:</h2>
                    <ul className="list-disc list-inside">
                      <li>React / TypeScript / Next.js</li>
                      <li>Tailwind CSS / Framer Motion</li>
                      <li>Node.js / Express / Python</li>
                      <li>UI/UX Design (Figma)</li>
                    </ul>
                  </div>
                  <p className="italic text-gray-600">
                    {lang === 'en' 
                      ? '"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs'
                      : '"Design não é apenas o que parece e o que se sente. Design é como funciona." - Steve Jobs'}
                  </p>
                </div>
              )}

              {w.id === 'projects' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { 
                      name: 'Password Generator', 
                      desc: lang === 'en' ? 'A robust tool for generating secure, customizable passwords.' : 'Uma ferramenta robusta para gerar senhas seguras e customizáveis.', 
                      tech: 'JavaScript',
                      url: 'https://github.com/cloudhadock-coder/Password'
                    },
                    { 
                      name: 'Python File Organizer', 
                      desc: lang === 'en' ? 'Automate your file management with this efficient Python script.' : 'Automatize seu gerenciamento de arquivos com este script Python eficiente.', 
                      tech: 'Python',
                      url: 'https://github.com/cloudhadock-coder/organizer'
                    }
                  ].map((p, i) => (
                    <div 
                      key={i} 
                      onClick={() => window.open(p.url, '_blank')}
                      className="border border-gray-300 p-3 hover:bg-blue-50 cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Monitor size={20} className="text-blue-600" />
                          <h3 className="font-bold group-hover:text-blue-700">{p.name}</h3>
                        </div>
                        <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-500" />
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{p.desc}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded border border-gray-200">{p.tech}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {w.id === 'contact' && (
                <div className="space-y-4">
                  <div className="bg-gray-100 p-2 border border-gray-300">
                    <div className="flex gap-2 text-xs mb-1">
                      <span className="font-bold w-12">{t.to}:</span>
                      <span>leoh.briones@gmail.com</span>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="font-bold w-12">{t.subject}:</span>
                      <span>{lang === 'en' ? "Let's collaborate!" : "Vamos colaborar!"}</span>
                    </div>
                  </div>
                  <textarea 
                    className="w-full h-32 border border-gray-300 p-2 text-sm focus:outline-blue-500"
                    placeholder={t.placeholder}
                  ></textarea>
                  <button className="bg-[#ece9d8] border-2 border-gray-400 px-4 py-1 text-sm hover:bg-gray-200 xp-button-active">
                    {t.send}
                  </button>
                  <div className="flex gap-4 pt-4 border-t">
                    <a href="https://github.com/cloudhadock-coder" target="_blank" className="flex items-center gap-1 text-blue-600 hover:underline">
                      <Github size={16} /> GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/leonardo-hernandez-briones-9b1aa7300/" target="_blank" className="flex items-center gap-1 text-blue-600 hover:underline">
                      <Linkedin size={16} /> LinkedIn
                    </a>
                  </div>
                </div>
              )}

              {w.id === 'cv' && (
                <div className="space-y-6 text-black">
                  <div className="text-center border-b-2 border-black pb-4">
                    <h1 className="text-2xl font-bold uppercase">Leonardo Hernandez Briones</h1>
                    <p className="text-sm font-semibold text-gray-700">
                      {lang === 'en' ? 'Fullstack Developer | UI/UX Designer' : 'Desenvolvedor Fullstack | UI/UX Designer'}
                    </p>
                    <p className="text-xs mt-1">Canoas/RS | +55 51 99228-0439 | leoh.briones@gmail.com</p>
                  </div>

                  <section>
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-2 uppercase">{t.summary}</h2>
                    <p className="text-sm leading-relaxed">
                      {lang === 'en' 
                        ? 'Developer and Designer with a solid foundation in Computer Science and previous experience as a Fullstack Developer. This technical background allows me to design viable and high-performance interfaces (UI). Focused on creating intuitive solutions for complex systems (ERPs and LLMs), based on research and data validation. I seek to apply my analytical and creative vision to improve user experience and optimize product metrics.'
                        : 'Desenvolvedor e Designer com sólida base em Ciência da Computação e experiência prévia como Desenvolvedor Fullstack. Essa vivência técnica me permite projetar interfaces (UI) viáveis e performáticas. Foco em criar soluções intuitivas para sistemas complexos (ERPs e LLMs), embasadas em pesquisa e validação de dados. Busco aplicar minha visão analítica e criativa para melhorar a experiência do usuário e otimizar métricas de produto.'}
                    </p>
                  </section>

                  <section>
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-2 uppercase">{t.skills}</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <li><strong>UX/UI:</strong> {lang === 'en' ? 'Prototyping, Wireframes, Mockups' : 'Prototipagem, Wireframes, Mockups'}</li>
                      <li><strong>{lang === 'en' ? 'Technical Vision' : 'Visão Técnica'}:</strong> Delphi, Python, SQL, .NET</li>
                      <li><strong>{lang === 'en' ? 'Research' : 'Pesquisa'}:</strong> {lang === 'en' ? 'A/B Testing, Usability, Metrics' : 'Testes A/B, Usabilidade, Métricas'}</li>
                      <li><strong>{lang === 'en' ? 'Data' : 'Dados'}:</strong> {lang === 'en' ? 'Automation, Documentation, Performance' : 'Automação, Documentação, Performance'}</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-2 uppercase">{t.experience}</h2>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold">LEXA Soluções de IA | {lang === 'en' ? 'Prompt Engineer' : 'Engenheiro de Prompt'}</h3>
                          <span className="text-xs text-gray-600">03/2025 – 12/2025</span>
                        </div>
                        <ul className="list-disc list-inside text-xs mt-1 space-y-1">
                          <li>{lang === 'en' ? 'A/B Testing and LLM-as-judge evaluation' : 'Testes A/B e avaliação LLM-as-judge'}</li>
                          <li>{lang === 'en' ? 'RAG Information Architecture' : 'Arquitetura de Informação RAG'}</li>
                          <li>{lang === 'en' ? 'Implementation of guardrails for AI safety' : 'Implementação de guardrails para segurança de IA'}</li>
                        </ul>
                      </div>
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold">Vikso Technology | {lang === 'en' ? 'JR Fullstack Developer' : 'Desenvolvedor Fullstack JR'}</h3>
                          <span className="text-xs text-gray-600">05/2024 – 02/2025</span>
                        </div>
                        <ul className="list-disc list-inside text-xs mt-1 space-y-1">
                          <li>{lang === 'en' ? 'UI Design and prototyping for ERP systems' : 'Design de UI e prototipagem para sistemas ERP'}</li>
                          <li>{lang === 'en' ? 'PL/SQL performance optimization' : 'Otimização de performance com PL/SQL'}</li>
                          <li>{lang === 'en' ? 'Multidisciplinary collaboration on usability' : 'Colaboração multidisciplinar em usabilidade'}</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-2 uppercase">{t.education}</h2>
                    <ul className="text-sm space-y-1">
                      <li>{lang === 'en' ? 'Analysis and Systems Development' : 'Análise e Desenvolvimento de Sistemas'} – UniLaSalle</li>
                      <li>{lang === 'en' ? 'Computer Science' : 'Ciências da Computação'} – UniLaSalle ({lang === 'en' ? 'Ongoing' : 'Em andamento'})</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-lg font-bold border-b border-gray-300 mb-2 uppercase">{t.languages}</h2>
                    <ul className="text-sm flex gap-4">
                      <li><strong>{lang === 'en' ? 'English' : 'Inglês'}:</strong> B2</li>
                      <li><strong>{lang === 'en' ? 'French' : 'Francês'}:</strong> A2</li>
                      <li><strong>{lang === 'en' ? 'Portuguese' : 'Português'}:</strong> {lang === 'en' ? 'Native' : 'Nativo'}</li>
                    </ul>
                  </section>
                </div>
              )}
              {w.id === 'music' && (
                <div className="flex flex-col h-full bg-[#f0f0f0]">
                  <div className="flex-1 p-4 overflow-auto">
                    <div className="flex items-center gap-4 mb-6 bg-blue-600 p-4 rounded-lg text-white shadow-md">
                      <div className="w-16 h-16 bg-white/20 rounded flex items-center justify-center">
                        <Music size={32} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{lang === 'en' ? 'My Playlist' : 'Minha Playlist'}</h3>
                        <p className="text-xs opacity-80">{lang === 'en' ? 'AI Generated Tracks' : 'Músicas Geradas por IA'}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {[
                        { 
                          title: 'Cold Night', 
                          url: 'https://www.mureka.ai/song-detail/UZ9NXuXo37f8JjqqHbmQNu?is_from_share=1' 
                        },
                        { 
                          title: 'Bike Ride', 
                          url: 'https://www.mureka.ai/song-detail/SfMkv6bMetQ9NSnQAdsLk3?is_from_share=1' 
                        }
                      ].map((song, i) => (
                        <div 
                          key={i}
                          className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded hover:bg-blue-50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-blue-600 group-hover:bg-blue-100">
                              <Music size={16} />
                            </div>
                            <span className="text-sm font-medium text-gray-800">{song.title}</span>
                          </div>
                          <a 
                            href={song.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-[#245edb] text-white px-3 py-1 rounded hover:bg-blue-700 transition-all"
                          >
                            {lang === 'en' ? 'Play' : 'Ouvir'}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="h-12 bg-[#ece9d8] border-t border-gray-300 flex items-center px-4 justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center border border-gray-400">
                        <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-6 border-l-blue-600" />
                      </div>
                      <div className="h-2 w-48 bg-gray-300 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-blue-500" />
                      </div>
                    </div>
                    <span className="text-xs font-mono">00:00 / 00:00</span>
                  </div>
                </div>
              )}
            </Window>
          </div>
        ))}
      </div>

      {/* Start Menu */}
      {isStartMenuOpen && (
        <div className="absolute bottom-10 left-0 w-80 bg-white border-2 border-[#0058e6] rounded-t-lg shadow-2xl z-[100] overflow-hidden">
          <div className="xp-gradient-title p-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center border-2 border-white/50">
              <User className="text-blue-600" />
            </div>
            <span className="text-white font-bold">{t.guest}</span>
          </div>
          <div className="flex h-96">
            <div className="w-1/2 p-2 space-y-2 border-r border-blue-100">
              <StartMenuItem icon={<Mail size={16} />} label={t.email} />
              <StartMenuItem icon={<Monitor size={16} />} label={t.internet} />
              <div className="border-t my-2" />
              <StartMenuItem icon={<FileText size={16} />} label={t.documents} />
              <StartMenuItem icon={<ImageIcon size={16} />} label={t.pictures} />
              <div onClick={() => { toggleWindow('music'); setIsStartMenuOpen(false); }}>
                <StartMenuItem icon={<Music size={16} />} label={t.music} />
              </div>
            </div>
            <div className="w-1/2 bg-[#d3e5fa] p-2 space-y-2">
              <StartMenuItem icon={<Monitor size={16} />} label={t.controlPanel} />
              <StartMenuItem icon={<Terminal size={16} />} label={t.run} />
              <div className="flex-1" />
            </div>
          </div>
          <div className="bg-[#d3e5fa] p-2 flex justify-end gap-2 border-t border-blue-200">
            <button className="flex items-center gap-1 text-xs hover:bg-blue-200 px-2 py-1 rounded">
              {t.logoff}
            </button>
            <button className="flex items-center gap-1 text-xs hover:bg-blue-200 px-2 py-1 rounded">
              {t.turnoff}
            </button>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 xp-taskbar-gradient flex items-center px-0 z-[110] shadow-[0_-2px_10px_rgba(0,0,0,0.3)]">
        <button 
          onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
          className="xp-start-button h-full px-4 flex items-center gap-2 rounded-r-xl italic font-bold text-white text-lg hover:brightness-110 transition-all active:brightness-90"
        >
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-sm" />
          </div>
          {t.start}
        </button>

        <div className="flex-1 flex items-center px-2 gap-1 overflow-x-auto">
          {windows.filter(w => w.isOpen).map(w => (
            <button
              key={w.id}
              onClick={() => focusWindow(w.id)}
              className={`h-8 px-3 flex items-center gap-2 rounded text-xs text-white min-w-[120px] max-w-[160px] transition-all ${
                activeWindowId === w.id && !w.isMinimized
                  ? 'bg-[#1e52b7] shadow-inner border border-black/20' 
                  : 'bg-[#3c81f3] hover:bg-[#5296f5] border border-white/20'
              }`}
            >
              <div className="scale-75">{w.icon}</div>
              <span className="truncate">{w.title}</span>
            </button>
          ))}
        </div>

        <div className="h-full bg-[#0997ff] border-l border-white/30 px-2 flex items-center gap-2 text-white text-xs shadow-inner">
          {/* Language Toggle */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
            className="flex items-center gap-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded border border-white/20 transition-colors uppercase font-bold"
          >
            {lang}
          </button>
          
          <div className="flex items-center gap-2 ml-2">
            <Monitor size={14} />
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
          <span className="font-medium min-w-[60px] text-center">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
}

function DesktopIcon({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center gap-1 w-20 p-2 rounded hover:bg-white/10 cursor-pointer group"
    >
      <div className="p-1 group-active:scale-95 transition-transform drop-shadow-lg">
        {icon}
      </div>
      <span className="text-white text-[11px] text-center font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1 rounded group-hover:bg-blue-700">
        {label}
      </span>
    </div>
  );
}

function StartMenuItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-3 p-1.5 hover:bg-[#316ac5] hover:text-white cursor-default group rounded">
      <div className="text-blue-600 group-hover:text-white">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}
