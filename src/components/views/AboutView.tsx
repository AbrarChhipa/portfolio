import React from 'react';
import { GraduationCap, Award, MapPin, Sparkles, Smartphone, ShieldCheck, HeartHandshake } from 'lucide-react';
import { EDUCATION } from '../../data/portfolioData';

export const AboutView: React.FC = () => {
  const highlights = [
    {
      icon: <Smartphone className="text-vscode-blue" size={20} />,
      title: "Cross-Platform Engineering",
      desc: "Delivering native-feeling, high-performance apps across iOS & Android using React Native, TypeScript, and optimized React hooks.",
    },
    {
      icon: <Sparkles className="text-vscode-yellow" size={20} />,
      title: "Complex Media Pipelines",
      desc: "Architected 4GB+ chunked AWS S3 multipart video uploaders, Instagram-style interactive reels/stories with stickers, text, and doodle canvas.",
    },
    {
      icon: <ShieldCheck className="text-vscode-green" size={20} />,
      title: "Secure & Resilient",
      desc: "End-to-end authentication (Google, Apple, Firebase OTP), push notifications (APNs / FCM), and Razorpay payment integrations.",
    },
    {
      icon: <HeartHandshake className="text-vscode-pink" size={20} />,
      title: "App Store & Play Store Lifecycle",
      desc: "Experienced with deployment pipelines, signing certificates, provisioning profiles, and Google Play Store / Apple App Store releases.",
    },
  ];

  return (
    <div className="min-h-full px-6 py-10 md:px-12 md:py-14 max-w-4xl mx-auto font-sans animate-fade-in text-vscode-text">
      {/* HTML comment tag */}
      <p className="font-mono text-xs text-vscode-gcm mb-2 italic">
        &lt;!-- about.html - Mohammad Abrar --&gt;
      </p>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-vscode-bright tracking-tight mb-1">
        About Me
      </h1>
      <p className="font-mono text-xs text-vscode-dim mb-8">
        &lt;summary&gt; who I am · what I build · how I engineer &lt;/summary&gt;
      </p>

      {/* Story Card */}
      <div className="bg-white/[0.02] border border-vscode-border rounded-lg p-6 sm:p-8 mb-8 space-y-4 text-sm sm:text-base leading-relaxed text-vscode-text">
        <p>
          Hello! I'm <strong className="text-vscode-bright font-semibold">Mohammad Abrar</strong>, a dedicated{' '}
          <span className="text-vscode-blue font-semibold">React Native Developer</span> based in{' '}
          <span className="text-vscode-bright">Udaipur, Rajasthan, India</span>.
        </p>

        <p className="text-vscode-dim">
          Over the past 1.5+ years, I have engineered and shipped production cross-platform applications across iOS and Android. At{' '}
          <strong className="text-vscode-bright">Websenor Infotech</strong>, I have contributed to over 15+ production applications, independently conceptualizing and delivering 5 complete mobile solutions from initial design through store deployment.
        </p>

        <p className="text-vscode-dim">
          I thrive on solving difficult technical hurdles: whether that is engineering a robust{' '}
          <span className="text-vscode-yellow">AWS S3 multipart uploader</span> that streams 4GB+ video files in ~2 minutes, developing interactive Instagram-style stories with custom gesture doodling and stickers, integrating ultra-low latency live broadcasting via{' '}
          <span className="text-vscode-purple">ZegoCloud</span>, or optimizing API layers with RTK Query to slash latency by 30%.
        </p>

        <p className="text-vscode-dim">
          Before that, at <strong className="text-vscode-bright">Lakebrains</strong>, I sharpened my frontend craft developing web applications and Chrome extensions using React.js and reusable UI architectures.
        </p>
      </div>

      {/* Highlights Grid */}
      <h2 className="text-xl font-bold font-display text-vscode-bright mb-4 flex items-center gap-2">
        <Award className="text-vscode-yellow" size={18} />
        <span>What I Bring To The Table</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {highlights.map((h, i) => (
          <div
            key={i}
            className="p-5 rounded-lg bg-white/[0.02] border border-vscode-border hover:border-vscode-blue/40 transition-colors"
          >
            <div className="mb-2.5">{h.icon}</div>
            <h3 className="font-semibold text-vscode-bright text-sm mb-1">{h.title}</h3>
            <p className="text-xs text-vscode-dim leading-relaxed">{h.desc}</p>
          </div>
        ))}
      </div>

      {/* Education Card */}
      <h2 className="text-xl font-bold font-display text-vscode-bright mb-4 flex items-center gap-2">
        <GraduationCap className="text-vscode-blue" size={20} />
        <span>Education</span>
      </h2>

      <div className="bg-white/[0.02] border border-vscode-border rounded-lg p-6 hover:border-vscode-blue/30 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
          <h3 className="font-bold text-vscode-bright text-base">
            {EDUCATION.institution}
          </h3>
          <span className="font-mono text-xs text-vscode-green font-semibold bg-vscode-green/10 px-2 py-0.5 rounded border border-vscode-green/20 w-fit">
            {EDUCATION.gpa}
          </span>
        </div>

        <div className="text-sm text-vscode-blue font-medium mb-1">
          {EDUCATION.degree}
        </div>

        <div className="flex items-center gap-3 text-xs text-vscode-dim mb-4">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {EDUCATION.location}
          </span>
          <span>•</span>
          <span>Graduated {EDUCATION.period}</span>
        </div>

        <div className="space-y-1.5 text-xs text-vscode-dim border-t border-vscode-border/50 pt-3">
          {EDUCATION.highlights.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-vscode-blue mt-0.5">▹</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
