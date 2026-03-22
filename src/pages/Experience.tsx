const experiences = [
  {
    role: "Full Stack Junior Software Developer",
    company: "Xeleqt Technology Innovations Inc.",
    period: "October 2025 – Present",
    location: "Cebu City",
    bullets: [
      "Optimized system stability by diagnosing and resolving critical software bugs, reducing performance bottlenecks and improving overall user experience.",
      "Reduced fetch time for 11,000+ user records from 21 seconds to 4 seconds.",
      "Developed custom feature enhancements based on client requirements, improving product usability and strengthening client retention.",
      "Led migration of a legacy frontend from React 16 to React 19, modernizing dependencies and improving security posture.",
    ],
    stack: ["React", "GraphQL", "AWS", "TailwindCSS", "JavaScript", "Claude Code"],
  },
  {
    role: "AI Developer",
    company: "Freelance Project",
    period: "August – October 2025",
    location: "Cebu City",
    bullets: [
      "Designed and implemented core insights generation logic, transforming users' daily inputs into personalized, data-driven summaries.",
      "Integrated GenAI capabilities via LLM gateways (OpenRouter) to maintain 100% uptime in generating personalized daily insights.",
      "Containerized and deployed a FastAPI-based system using Docker, hosted on Railway with scheduled tasks through AWS Lambda and CloudWatch.",
      "Implemented timezone-aware scheduling logic for accurate summarization across global user bases.",
    ],
    stack: ["FastAPI", "Docker", "Railway", "AWS Lambda", "AWS CloudWatch", "Supabase", "OpenRouter"],
  },
  {
    role: "Front End Team Lead Intern",
    company: "Xpertis Solutions",
    period: "January – May 2025",
    location: "Cebu City",
    bullets: [
      "Coded WebSocket (instead of polling) to ensure real-time updates for both client and server side.",
      "Implemented responsive design for admin and customer screens across different screen sizes.",
      "Ensured server-side API requests match backend fields for seamless integration.",
      "Adapted to agile development: User Stories in sprint planning, retrospectives, and daily stand-ups.",
    ],
    stack: ["NextJS", "TailwindCSS", "JavaScript", "FastAPI", "PostgreSQL"],
  },
];

export default function Experience() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <h2 className="text-[#75C310] text-4xl md:text-5xl font-bold mb-4 self-start ml-4 md:ml-20">
        Experience
      </h2>
      <p className="text-white/50 text-sm self-start ml-4 md:ml-20 mb-12">
        Where I've worked
      </p>

      <div className="w-full max-w-4xl relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-[#75C310]/20" />

        <div className="flex flex-col gap-8 md:gap-10">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-12 md:pl-14">
              {/* Dot */}
              <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-[#1a1a1a] border-2 border-[#75C310] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#75C310]" />
              </div>

              <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-2xl border border-[#75C310]/20 hover:border-[#75C310]/50 transition-all duration-300 p-4 md:p-6 shadow-lg">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-4 text-left">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{exp.role}</h3>
                    <p className="text-[#75C310] text-sm font-medium">{exp.company}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-white/50 text-sm">{exp.period}</p>
                    <p className="text-white/30 text-xs">{exp.location}</p>
                  </div>
                </div>

                <ul className="flex flex-col gap-2 mb-4 items-start text-left">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-2 text-white/70 text-sm leading-relaxed">
                      <span className="text-[#75C310] mt-1 flex-shrink-0">▸</span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-[#75C310]/10 text-[#75C310] border border-[#75C310]/30 px-2 py-1 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
