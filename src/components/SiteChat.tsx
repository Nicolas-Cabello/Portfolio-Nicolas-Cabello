import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EMAIL, LINKEDIN_URL, GITHUB_URL } from '../content/site';
import { askGeminiChat, ChatMessage } from '../services/geminiChat';
import FormattedMessage from './FormattedMessage';

const quickSuggestions = [
  '¿Cuál es tu formación y experiencia?',
  'Háblame de tus proyectos destacados',
  '¿Qué stack y herramientas dominas?',
  '¿Cómo puedo contactar contigo?',
];

const SiteChat = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const getInitialMessage = (): ChatMessage => ({
    role: 'model',
    text: i18n.language.startsWith('en')
      ? "Hi! I'm Nicolás. Feel free to ask me anything about my work, projects, background, or how we can collaborate."
      : '¡Hola! Soy Nicolás. Pregúntame lo que quieras sobre mis proyectos, mi trayectoria en IA y sistemas, o cómo podemos colaborar.',
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => [getInitialMessage()]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (open) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, open]);

  const handleClearChat = () => {
    setMessages([getInitialMessage()]);
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: query };
    const newHistory = [...messages, userMsg];

    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      const historyToSend = newHistory.filter((_, idx) => idx > 0);
      const reply = await askGeminiChat(historyToSend.length > 0 ? historyToSend : [userMsg]);
      setMessages((prev) => [...prev, { role: 'model', text: reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: `Vaya, ha ocurrido un error temporal al responder. Si lo prefieres, escríbeme directamente a mi correo: ${EMAIL}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 font-sans">
      {open && (
        <section
          className="flex flex-col w-[min(27rem,calc(100vw-2.5rem))] h-[560px] max-h-[84vh] overflow-hidden rounded-3xl shadow-[0_25px_70px_rgba(3,0,20,0.95)] border border-violet-500/30 bg-[#070216]/95 backdrop-blur-2xl transition-all duration-300 animate-fadeInUp"
          aria-label={t('chat_title')}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-violet-500/20 px-4 py-3 bg-gradient-to-r from-violet-950/80 via-[#0d0726]/90 to-indigo-950/60">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                  <div className="w-full h-full bg-[#070216] rounded-2xl flex items-center justify-center overflow-hidden">
                    <img src="/favicon.png" alt="Nicolás Cabello" className="w-6 h-6 object-contain" />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-[#070216]" />
                </span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-white tracking-wide">
                  Nicolás Cabello
                </h2>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[#94a3b8]">En línea</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-violet-300 font-mono text-[10px]">Toledo</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Botón para Limpiar el Chat destacado con texto e icono */}
              <button
                type="button"
                onClick={handleClearChat}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-violet-500/30 bg-violet-950/40 text-violet-200 text-xs font-medium transition-all hover:bg-rose-950/40 hover:border-rose-500/50 hover:text-rose-200 cursor-pointer shadow-sm"
                aria-label="Limpiar chat"
                title="Borrar mensajes y reiniciar chat"
              >
                <i className="ri-delete-bin-line text-xs" />
                <span className="text-[11px]">Limpiar</span>
              </button>

              {/* Botón para Cerrar */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-all hover:border-cyan-400/50 hover:bg-cyan-950/30 hover:text-white cursor-pointer"
                aria-label={t('chat_close')}
                title="Cerrar ventana"
              >
                <i className="ri-close-line text-lg" />
              </button>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm custom-scrollbar">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-7 h-7 rounded-xl bg-violet-950/80 border border-violet-500/30 flex items-center justify-center text-cyan-300 shrink-0 shadow-sm mt-0.5">
                    <span className="font-bold text-[11px] font-heading">NC</span>
                  </div>
                )}

                <div
                  className={`max-w-[86%] rounded-2xl px-4 py-3 leading-relaxed break-words ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-br-sm shadow-[0_4px_18px_rgba(124,58,237,0.35)] font-medium'
                      : 'bg-[#110729]/85 border border-violet-500/25 text-[#e2e8f0] rounded-bl-sm shadow-[0_4px_15px_rgba(0,0,0,0.3)]'
                  }`}
                >
                  <FormattedMessage text={msg.text} />
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-[#94a3b8] text-xs">
                <div className="w-7 h-7 rounded-xl bg-violet-950/80 border border-violet-500/30 flex items-center justify-center text-cyan-300 shrink-0">
                  <span className="font-bold text-[11px] font-heading">NC</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#110729]/85 border border-violet-500/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse delay-200" />
                  <span className="text-[11px] text-gray-400 font-sans">Escribiendo...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions pills */}
          {messages.length <= 1 && !loading && (
            <div className="px-4 pb-3 pt-1 border-t border-white/5 bg-[#09031c]/50">
              <p className="text-[10px] text-gray-400 mb-1.5 uppercase font-mono tracking-wider">Puedes preguntarme:</p>
              <div className="flex flex-wrap gap-1.5">
                {quickSuggestions.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => handleSend(sug)}
                    className="text-[11px] text-left px-3 py-1.5 rounded-xl border border-violet-500/25 bg-violet-950/40 text-gray-300 hover:text-white hover:border-cyan-400/50 hover:bg-violet-900/50 transition-all cursor-pointer shadow-sm"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input & footer */}
          <div className="p-3 border-t border-violet-500/20 bg-[#09031c]/90 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe un mensaje..."
                disabled={loading}
                className="flex-1 bg-white/5 border border-violet-500/30 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white transition-all disabled:opacity-35 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] cursor-pointer shrink-0 shadow-md"
                aria-label="Enviar mensaje"
              >
                <i className="ri-send-plane-fill text-sm" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-400 px-1 pt-0.5">
              <span className="font-mono text-[10px] text-gray-500 hover:text-gray-400 transition-colors">{EMAIL}</span>
              <div className="flex gap-3">
                <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <i className="ri-github-fill text-xs" /> GitHub
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <i className="ri-linkedin-fill text-xs" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Floating launcher trigger */}
      <button
        type="button"
        onClick={() => setOpen((val) => !val)}
        className="group relative flex items-center gap-3 px-5 py-3 rounded-full border border-violet-500/40 bg-[#09031c]/90 text-white backdrop-blur-xl shadow-[0_0_25px_rgba(124,58,237,0.45)] hover:shadow-[0_0_35px_rgba(6,182,212,0.65)] hover:border-cyan-400/60 transition-all duration-300 cursor-pointer"
        aria-label="Abrir chat con Nicolás"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
        </span>
        <div className="flex items-center gap-2">
          <i className="ri-chat-smile-2-line text-lg text-cyan-300 group-hover:scale-110 transition-transform" />
          <span className="font-semibold text-sm tracking-wide">Habla conmigo</span>
        </div>
      </button>
    </div>
  );
};

export default SiteChat;
