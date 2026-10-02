import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Copy, Check, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const ContactView: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 800);
  };

  return (
    <div className="min-h-full px-6 py-10 md:px-12 md:py-14 max-w-4xl mx-auto font-sans animate-fade-in text-vscode-text">
      {/* CSS comment */}
      <p className="font-mono text-xs text-vscode-gcm mb-2 italic">
        /* contact.css — direct channels &amp; connection interface */
      </p>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-vscode-bright tracking-tight mb-1">
        Get In Touch
      </h1>
      <p className="font-mono text-xs text-vscode-dim mb-8">
        .connect &#123; availability: "open_for_hire"; response_time: "&lt; 24h"; &#125;
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Direct Contact Info Cards */}
        <div className="space-y-4">
          <h2 className="text-base font-bold font-display text-vscode-bright uppercase tracking-wider text-xs mb-2">
            Direct Reach Channels
          </h2>

          {/* Email Card */}
          <div className="bg-white/[0.02] border border-vscode-border rounded-lg p-4 flex items-center justify-between hover:border-vscode-blue/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-vscode-green/10 text-vscode-green">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-[11px] text-vscode-dim font-mono">Email Address</div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-xs sm:text-sm font-semibold text-vscode-bright hover:text-vscode-blue transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
              className="p-1.5 rounded hover:bg-white/10 text-vscode-dim hover:text-vscode-bright"
              title="Copy Email"
            >
              {copiedItem === 'email' ? <Check size={14} className="text-vscode-green" /> : <Copy size={14} />}
            </button>
          </div>

          {/* Phone Card */}
          <div className="bg-white/[0.02] border border-vscode-border rounded-lg p-4 flex items-center justify-between hover:border-vscode-blue/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-vscode-yellow/10 text-vscode-yellow">
                <Phone size={18} />
              </div>
              <div>
                <div className="text-[11px] text-vscode-dim font-mono">Mobile / WhatsApp</div>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-xs sm:text-sm font-semibold text-vscode-bright hover:text-vscode-blue transition-colors font-mono"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
              className="p-1.5 rounded hover:bg-white/10 text-vscode-dim hover:text-vscode-bright"
              title="Copy Phone Number"
            >
              {copiedItem === 'phone' ? <Check size={14} className="text-vscode-green" /> : <Copy size={14} />}
            </button>
          </div>

          {/* Location Card */}
          <div className="bg-white/[0.02] border border-vscode-border rounded-lg p-4 flex items-center gap-3">
            <div className="p-2 rounded bg-vscode-purple/10 text-vscode-purple">
              <MapPin size={18} />
            </div>
            <div>
              <div className="text-[11px] text-vscode-dim font-mono">Based In</div>
              <div className="text-xs sm:text-sm font-semibold text-vscode-bright">
                {PERSONAL_INFO.location}
              </div>
            </div>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={PERSONAL_INFO.links.github}
              target="_blank"
              rel="noreferrer"
              className="bg-white/[0.02] border border-vscode-border rounded-lg p-3 flex items-center gap-2 text-xs hover:border-vscode-blue hover:text-vscode-bright transition-colors"
            >
              <Github size={15} />
              <span>github.com/AbrarChhipa</span>
            </a>
            <a
              href={PERSONAL_INFO.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="bg-white/[0.02] border border-vscode-border rounded-lg p-3 flex items-center gap-2 text-xs hover:border-vscode-blue hover:text-vscode-bright transition-colors"
            >
              <Linkedin size={15} className="text-[#0a66c2]" />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>

        {/* Right Column: Working Contact Form */}
        <div className="bg-white/[0.02] border border-vscode-border rounded-lg p-6 flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-[11px] font-mono text-vscode-dim border-b border-vscode-border/50 pb-2 flex items-center justify-between">
              <span>/* Send message to Mohammad Abrar */</span>
              {status === 'sent' && (
                <span className="text-vscode-green font-semibold flex items-center gap-1">
                  <Check size={12} /> Message Delivered
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-vscode-dim mb-1">
                --your-name:
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ada Lovelace"
                className="w-full bg-vscode-bg border border-vscode-border rounded px-3 py-2 text-xs text-vscode-bright focus:outline-none focus:border-vscode-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-vscode-dim mb-1">
                --your-email:
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ada@example.com"
                className="w-full bg-vscode-bg border border-vscode-border rounded px-3 py-2 text-xs text-vscode-bright focus:outline-none focus:border-vscode-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-vscode-dim mb-1">
                --subject:
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="React Native Role / Project Inquiry"
                className="w-full bg-vscode-bg border border-vscode-border rounded px-3 py-2 text-xs text-vscode-bright focus:outline-none focus:border-vscode-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-vscode-dim mb-1">
                --message-body:
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hi Mohammad, let's discuss an exciting opportunity..."
                className="w-full bg-vscode-bg border border-vscode-border rounded px-3 py-2 text-xs text-vscode-bright focus:outline-none focus:border-vscode-blue resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-vscode-blue2 hover:bg-vscode-blue text-white py-2 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {status === 'sending' ? (
                <span>Dispatching Packet...</span>
              ) : status === 'sent' ? (
                <>
                  <Check size={14} />
                  <span>Message Sent Successfully!</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
