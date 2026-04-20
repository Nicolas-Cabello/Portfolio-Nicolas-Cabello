import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useInView from '../../../hooks/useInView';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const FORM_URL = 'https://readdy.ai/api/form/d7556hucsbv12mkudej0';
const EMAIL = 'nicolascabelloalonso@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/nicol%C3%A1s-cabello-alonso-94319a282/';
const GITHUB_URL = 'https://github.com/Nicolas-Cabello';

const ContactSection = () => {
  const { t } = useTranslation();
  const { ref: titleRef, isVisible: titleVisible } = useInView();
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [charCount, setCharCount] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const messageField = form.querySelector<HTMLTextAreaElement>('textarea[name="mensaje"]');
    if (messageField && messageField.value.length > 500) return;

    const formData = new FormData(form);
    const urlEncoded = new URLSearchParams();
    formData.forEach((value, key) => urlEncoded.append(key, value.toString()));

    setFormStatus('loading');
    try {
      const response = await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: urlEncoded.toString(),
      });
      if (response.ok) {
        setFormStatus('success');
        formRef.current?.reset();
        setCharCount(0);
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const contactLinks = [
    {
      icon: 'ri-mail-line',
      labelKey: 'contact_email_label',
      value: EMAIL,
      href: `mailto:${EMAIL}`,
    },
    {
      icon: 'ri-linkedin-fill',
      labelKey: 'contact_linkedin_label',
      valueKey: 'contact_linkedin_display',
      href: LINKEDIN_URL,
    },
    {
      icon: 'ri-github-fill',
      labelKey: 'contact_github_label',
      valueKey: 'contact_github_display',
      href: GITHUB_URL,
    },
  ];

  return (
    <section id="contacto" className="py-24 bg-[#09090b] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-green-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-400/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div
          ref={titleRef}
          className="in-view mb-16 text-center"
          style={titleVisible ? { opacity: 1, transform: 'translateY(0)' } : {}}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-green-400" />
            <span className="text-green-400 text-sm font-medium uppercase tracking-widest">{t('contact_label')}</span>
            <span className="w-8 h-px bg-green-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">{t('contact_title_highlight')}</span> {t('contact_title_plain')}
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-[17px]">{t('contact_subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            {contactLinks.map((item) => (
              <a
                key={item.labelKey}
                href={item.href}
                target={item.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-4 bg-[#111113] rounded-xl p-5 glow-border group transition-all duration-300 hover:bg-[#141416] cursor-pointer"
                aria-label={t(item.labelKey)}
              >
                <div className="w-10 h-10 flex items-center justify-center bg-green-400/10 rounded-lg flex-shrink-0">
                  <i className={`${item.icon} text-green-400`} />
                </div>
                <div className="min-w-0">
                  <p className="text-zinc-400 text-sm mb-0.5">{t(item.labelKey)}</p>
                  <p className="text-white text-[15px] font-medium group-hover:text-green-400 transition-colors duration-200 truncate">
                    {item.value ?? t(item.valueKey ?? '')}
                  </p>
                </div>
              </a>
            ))}

            <div className="bg-[#111113] rounded-xl p-5 glow-border">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2 h-2 flex items-center justify-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulseGlow" />
                </span>
                <p className="text-white text-[15px] font-medium">{t('contact_available_label')}</p>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{t('contact_available_desc')}</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              data-readdy-form
              className="bg-[#111113] rounded-xl p-7 glow-border space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-2" htmlFor="nombre">
                    {t('form_name_label')} <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    placeholder={t('form_name_placeholder')}
                    className="w-full bg-[#18181b] border border-white/5 text-white text-sm placeholder-zinc-600 rounded-md px-4 py-3 focus:outline-none focus:border-green-400/50 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-2" htmlFor="email">
                    Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t('form_email_placeholder')}
                    className="w-full bg-[#18181b] border border-white/5 text-white text-sm placeholder-zinc-600 rounded-md px-4 py-3 focus:outline-none focus:border-green-400/50 transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-medium mb-2" htmlFor="asunto">
                  {t('form_subject_label')} <span className="text-rose-400">*</span>
                </label>
                <input
                  id="asunto"
                  name="asunto"
                  type="text"
                  required
                  placeholder={t('form_subject_placeholder')}
                  className="w-full bg-[#18181b] border border-white/5 text-white text-sm placeholder-zinc-600 rounded-md px-4 py-3 focus:outline-none focus:border-green-400/50 transition-colors duration-200"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-zinc-400 text-xs font-medium" htmlFor="mensaje">
                    {t('form_message_label')} <span className="text-rose-400">*</span>
                  </label>
                  <span className={`text-xs ${charCount > 480 ? 'text-rose-400' : 'text-zinc-600'}`}>
                    {charCount}/500
                  </span>
                </div>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={5}
                  maxLength={500}
                  placeholder={t('form_message_placeholder')}
                  onChange={(e) => setCharCount(e.target.value.length)}
                  className="w-full bg-[#18181b] border border-white/5 text-white text-sm placeholder-zinc-600 rounded-md px-4 py-3 focus:outline-none focus:border-green-400/50 transition-colors duration-200 resize-none"
                />
              </div>

              {formStatus === 'success' && (
                <div className="flex items-center gap-3 bg-green-400/10 border border-green-400/20 rounded-lg p-4">
                  <i className="ri-checkbox-circle-line text-green-400 text-lg" />
                  <p className="text-green-400 text-sm font-medium">{t('form_success')}</p>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="flex items-center gap-3 bg-rose-400/10 border border-rose-400/20 rounded-lg p-4">
                  <i className="ri-error-warning-line text-rose-400 text-lg" />
                  <p className="text-rose-400 text-sm font-medium">{t('form_error')}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus === 'loading' || charCount > 500}
                className="w-full flex items-center justify-center gap-2 bg-green-400 text-[#09090b] py-3.5 rounded-md font-semibold text-sm hover:bg-green-300 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
              >
                {formStatus === 'loading' ? (
                  <>
                    <i className="ri-loader-4-line animate-spin" />
                    {t('form_submitting')}
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-line" />
                    {t('form_submit')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
