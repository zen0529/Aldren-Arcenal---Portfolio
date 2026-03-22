const skillGroups = [
  {
    category: "Frontend",
    skills: ["React", "React Native", "Flutter / Dart", "NextJS", "HTML / CSS", "TailwindCSS"],
  },
  {
    category: "Backend",
    skills: ["FastAPI", "Django", "Node.js", "GraphQL", "REST APIs", "WebSocket"],
  },
  {
    category: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "C / C++", "R", "Dart"],
  },
  {
    category: "AI / ML",
    skills: ["NLP", "Computer Vision", "ML Training", "Data Preprocessing", "RAG", "Langchain", "ChromaDB", "LLM APIs"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "Supabase", "Firebase / NoSQL", "SQL"],
  },
  {
    category: "Cloud & DevOps",
    skills: ["AWS Lambda", "AWS CloudWatch", "Docker", "Railway", "Vercel", "Git"],
  },
  {
    category: "Automation & Integrations",
    skills: ["n8n", "OpenRouter", "OpenAI", "PayMongo", "Facebook Graph API", "Google Sheets", "SMTP / Gmail"],
  },
];

export default function Skills() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <h2 className="text-[#75C310] text-4xl md:text-5xl font-bold mb-4 self-start ml-4 md:ml-20">
        Skills
      </h2>
      <p className="text-white/50 text-sm self-start ml-4 md:ml-20 mb-12">
        Technologies I work with
      </p>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-2xl border border-[#75C310]/20 hover:border-[#75C310]/50 transition-all duration-300 p-6 shadow-lg hover:shadow-[#75C310]/10"
          >
            <h3 className="text-[#75C310] text-sm font-semibold uppercase tracking-widest mb-4">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm bg-white/5 text-white/80 border border-white/10 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
