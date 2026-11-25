import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Users, Mail, ShieldCheck } from 'lucide-react';

export const LEGAL_SECTIONS = {
  about: {
    label: 'Quiénes somos',
    title: 'Quiénes somos',
    icon: Users,
    text: 'Vagón Abierto es una comunidad y chat independiente en tiempo real creado para conectar a los viajeros de tren, compartir incidencias de las vías al momento y amenizar los trayectos con radio en directo.',
  },
  contact: {
    label: 'Contacto',
    title: 'Contacto',
    icon: Mail,
    text: 'Para dudas, sugerencias o soporte técnico, escríbenos a:',
    email: 'nhemesysgonzalez@gmail.com',
  },
  privacy: {
    label: 'Política de Privacidad',
    title: 'Política de Privacidad',
    icon: ShieldCheck,
    text: 'Respetamos tu privacidad: solo usamos un alias y correo para el acceso al chat. Este sitio utiliza cookies propias y de terceros (Google AdSense) para mostrar publicidad relevante y mejorar la experiencia de navegación.',
  },
};

const LegalModal = ({ sectionKey, onClose }) => {
  const section = LEGAL_SECTIONS[sectionKey];

  useEffect(() => {
    if (!section) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [section, onClose]);

  if (!section) return null;
  const Icon = section.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2rem] p-7 shadow-2xl space-y-5"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-vagon-red/15 border border-vagon-red/20 flex items-center justify-center shrink-0">
              <Icon size={18} className="text-vagon-red" />
            </div>
            <h2 id="legal-modal-title" className="text-xl font-outfit font-bold text-white">
              {section.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-zinc-300 leading-relaxed">
          {section.text}
          {section.email && (
            <>
              {' '}
              <a
                href={`mailto:${section.email}`}
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 font-medium break-all"
              >
                {section.email}
              </a>
            </>
          )}
        </p>

        <div className="pt-1 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-widest transition-colors"
          >
            Cerrar
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LegalModal;
