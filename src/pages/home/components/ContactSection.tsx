import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { motion, useReducedMotion } from 'framer-motion';
import MagneticButton from '../../../components/MagneticButton';
import ParticleBurst from '../../../components/ParticleBurst';
import ParticleNetwork from '../../../components/ParticleNetwork';
import TiltCard from '../../../components/TiltCard';
import { EMAIL, GITHUB_LABEL, GITHUB_URL, LINKEDIN_URL } from '../../../content/site';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'missing';

const ContactSection = () => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [charCount, setCharCount] = useState(0);
  const [burst, setBurst] = useState<{ x: number; y: number; token: number; color: string } | null>(null);

  const contactLinks = [
    { icon: 'ri-mail-line', labelKey: 'contact_email_label', value: EMAIL, href: `mailto:${EMAIL}`, external: false },
    { icon: 'ri-linkedin-fill', labelKey: 'contact_linkedin_label', value: t('contact_linkedin_display'), href: LINKEDIN_URL, external: true },
    { icon: 'ri-github-fill', labelKey: 'contact_github_label', value: GITHUB_LABEL, href: GITHUB_URL, external: true },
  ];

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (charCount > 500) return;
    const service = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const template = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!service || !template || !key || !formRef.current) {
      setStatus('missing');
      return;
    }
    setStatus('loading');
    try {
      await emailjs.sendForm(service, template, formRef.current, { publicKey: key });
      setStatus('success');
      formRef.current.reset();
      setCharCount(0);
      setBurst({ x: window.innerWidth / 2, y: window.innerHeight / 2, token: Date.now(), color: '#22c55e' });
    } catch {
      setStatus('error');
      setBurst({ x: window.innerWidth / 2, y: window.innerHeight / 2, token: Date.now(), color: '#f43f5e' });
    }
  };

  return (
    <section id="contacto" className="relative overflow-hidden px-6 py-24">
      <ParticleNetwork id="contact-particles" density={24} interactive={false} />
      {burst && <ParticleBurst x={burst.x} y={burst.y} token={burst.token} color={burst.color} />}
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mono text-sm text-[#06b6d4]">{t('contact_label')}</p>
          <h2 className="text-depth mt-2 text-4xl font-bold md:text-5xl">
            <span className="text-[#06b6d4]">{t('contact_title_highlight')}</span> {t('contact_title_plain')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#94a3b8]">{t('contact_subtitle')}</p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <TiltCard className="lg:col-span-2">
            <div className="space-y-4">
              {contactLinks.map((item) => (
                <a
                  key={item.labelKey}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  aria-label={t(item.labelKey)}
                  className="glass-card group flex items-center gap-4 rounded-2xl p-5 transition-colors duration-300 hover:bg-[#141428]"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#7c3aed]/15 text-[#c4b5fd]">
                    <i className={`${item.icon} text-lg`} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-[#94a3b8]">{t(item.labelKey)}</span>
                    <span className="block truncate font-medium transition-colors duration-200 group-hover:text-[#06b6d4]">
                      {item.value}
                    </span>
                  </span>
                </a>
              ))}
              <article className="glass-card rounded-2xl p-5">
                <p className="flex items-center gap-3 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" style={{ animation: reduced ? undefined : 'glow-pulse 2s ease-in-out infinite' }} />
                  {t('contact_available_label')}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#94a3b8]">{t('contact_available_desc')}</p>
              </article>
            </div>
          </TiltCard>

          <TiltCard className="lg:col-span-3">
            <form ref={formRef} onSubmit={onSubmit} className={`glass-card space-y-5 rounded-2xl p-7 ${status === 'error' ? 'shake' : ''}`}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-xs font-medium text-[#94a3b8]" htmlFor="from_name">
                  {t('form_name_label')} <span className="text-[#f43f5e]">*</span>
                  <input id="from_name" name="from_name" required className="field mt-2 text-sm" placeholder={t('form_name_placeholder')} />
                </label>
                <label className="block text-xs font-medium text-[#94a3b8]" htmlFor="reply_to">
                  Email <span className="text-[#f43f5e]">*</span>
                  <input id="reply_to" name="reply_to" type="email" required className="field mt-2 text-sm" placeholder={t('form_email_placeholder')} />
                </label>
              </div>
              <label className="block text-xs font-medium text-[#94a3b8]" htmlFor="subject">
                {t('form_subject_label')} <span className="text-[#f43f5e]">*</span>
                <input id="subject" name="subject" required className="field mt-2 text-sm" placeholder={t('form_subject_placeholder')} />
              </label>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-medium text-[#94a3b8]" htmlFor="message">
                    {t('form_message_label')} <span className="text-[#f43f5e]">*</span>
                  </label>
                  <span className={`text-xs ${charCount > 480 ? 'text-[#f43f5e]' : 'text-[#64748b]'}`}>{charCount}/500</span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={500}
                  placeholder={t('form_message_placeholder')}
                  onChange={(event) => setCharCount(event.target.value.length)}
                  className="field resize-none text-sm"
                />
              </div>
              {status === 'success' && (
                <p className="flex items-center gap-3 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-300">
                  <i className="ri-checkbox-circle-line text-lg" aria-hidden="true" />
                  {t('form_success')}
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-3 rounded-lg border border-[#f43f5e]/20 bg-[#f43f5e]/10 p-4 text-sm text-[#fda4af]">
                  <i className="ri-error-warning-line text-lg" aria-hidden="true" />
                  {t('form_error')}
                </p>
              )}
              {status === 'missing' && (
                <p className="flex items-center gap-3 rounded-lg border border-[#f43f5e]/20 bg-[#f43f5e]/10 p-4 text-sm text-[#fda4af]">
                  <i className="ri-error-warning-line text-lg" aria-hidden="true" />
                  {t('form_missing')}
                </p>
              )}
              <MagneticButton
                type="submit"
                disabled={status === 'loading' || charCount > 500}
                className="icon-btn icon-btn-solid w-full py-3.5 disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <>
                    <i className="ri-loader-4-line animate-spin" aria-hidden="true" />
                    {t('form_submitting')}
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-line" aria-hidden="true" />
                    {t('form_submit')}
                  </>
                )}
              </MagneticButton>
            </form>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
