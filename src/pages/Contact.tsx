import { Mail, Github, Linkedin } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "aldrenarcenal.aa@gmail.com",
    href: "mailto:aldrenarcenal.aa@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/aldren-arcenal",
    href: "https://www.linkedin.com/in/aldren-arcenal-a60ab2279/",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/zen0529",
    href: "https://github.com/zen0529",
  },
];

export default function Contact() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl flex flex-col items-center text-center gap-6">
        <h2 className="text-[#75C310] text-4xl md:text-5xl font-bold">
          Let's build something together.
        </h2>
        <p className="text-white/50 text-base max-w-md">
          Open to work, collaborations, and interesting projects. Feel free to reach out.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-4 w-full justify-center">
          {contactLinks.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-[#75C310]/20 hover:border-[#75C310]/60 rounded-2xl px-6 py-4 text-left transition-all duration-300 hover:shadow-lg hover:shadow-[#75C310]/10 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#75C310]/10 border border-[#75C310]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#75C310]/20 transition-colors">
                <Icon size={18} className="text-[#75C310]" />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider">{label}</p>
                <p className="text-white text-sm font-medium">{value}</p>
              </div>
            </a>
          ))}
        </div>

        <p className="text-white/20 text-xs mt-12">
          © {new Date().getFullYear()} Aldren Arcenal. All rights reserved.
        </p>
      </div>
    </div>
  );
}
