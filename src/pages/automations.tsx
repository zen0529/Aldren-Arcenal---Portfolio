import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const automationsData = [
  {
    id: 1,
    title: "AI-Powered Course Sales Automation with PayMongo",
    description:
      "Built to eliminate every manual step in selling an online course. When a prospect messages the Facebook page, an AI bot (GPT-4o Mini with Gemini 2.5 Flash as fallback) answers inquiries 24/7. Once they're ready to enroll, a PayMongo payment link is generated automatically. On successful payment, the webhook triggers instant course delivery via Gmail, logs the enrollment in Google Sheets, and sends a Messenger confirmation — all without touching a single button.",
    stack: ["n8n", "GPT-4o Mini", "Gemini 2.5 Flash", "PayMongo", "SMTP", "Google Sheets", "Facebook Graph API", "IONOS VPS"],
    images: ["/assets/automations/auto1.jpg", "/assets/automations/auto2.jpg"],
  },
  {
    id: 2,
    title: "AI GCash Receipt Verifier & Course Delivery",
    description:
      "A more complex payment flow built for GCash — where there's no API to hook into. When a buyer sends their GCash receipt screenshot via Messenger, the workflow converts the image to Base64 via HTTP request and passes it to an AI model for vision analysis. The AI checks whether the receipt contains a valid date, reference number, and the correct payment amount. If it passes, the course is delivered via email, the enrollment is logged in Google Sheets, and a Messenger confirmation is sent. The biggest challenge was that n8n's AI Agent node can only process text — image reading required a separate HTTP request to convert the file to Base64 before it could be analyzed.",
    stack: ["n8n", "OpenRouter", "AI Vision", "Base64 Encoding", "Google Sheets", "SMTP", "Facebook Graph API"],
    images: ["/assets/automations/auto3.png"],
  },
];

export default function Automations() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAuto, setModalAuto] = useState<typeof automationsData[number] | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const openModal = (auto: typeof automationsData[0], imageIndex: number) => {
    setModalAuto(auto);
    setModalImageIndex(imageIndex);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalAuto(null);
  };

  const nextModalImage = () => {
    if (modalAuto) {
      setModalImageIndex((prev) => (prev + 1) % modalAuto.images.length);
    }
  };

  const prevModalImage = () => {
    if (modalAuto) {
      setModalImageIndex((prev) => (prev - 1 + modalAuto.images.length) % modalAuto.images.length);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        <h2 className="text-[#75C310] text-4xl md:text-5xl font-bold mb-4 self-start ml-4 md:ml-20">
          Automations
        </h2>
        <p className="text-white/50 text-sm self-start ml-4 md:ml-20 mb-12">
          Workflow automations built with n8n
        </p>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {automationsData.map((auto) => (
            <div
              key={auto.id}
              className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-2xl border-2 border-[#75C310]/20 hover:border-[#75C310]/60 transition-all duration-300 shadow-lg hover:shadow-[#75C310]/20 overflow-hidden"
            >
              {/* Workflow Image */}
              <div
                className="relative h-52 cursor-pointer group"
                onClick={() => openModal(auto, 0)}
              >
                <img
                  src={auto.images[0]}
                  alt={`${auto.title} workflow`}
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <span className="text-white/0 group-hover:text-white/80 text-sm font-medium transition-all">
                    Click to expand
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-white text-lg font-semibold leading-tight">
                  {auto.title}
                </h3>

                <p className="text-white/70 text-sm leading-relaxed line-clamp-4">
                  {auto.description}
                </p>

                {/* Stack tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {auto.stack.map((tech) => (
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

      {/* Modal */}
      {modalOpen && modalAuto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-[#75C310] transition-colors z-10"
          >
            <X size={32} />
          </button>

          <div
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row gap-6 bg-[#1a1a1a] rounded-xl p-6 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section */}
            <div className="relative flex-1 flex items-center justify-center min-h-0">
              <img
                src={modalAuto.images[modalImageIndex]}
                alt={`${modalAuto.title} workflow`}
                className="max-w-full max-h-[60vh] md:max-h-[75vh] object-contain rounded-lg"
              />

              {modalAuto.images.length > 1 && (
                <>
                  <button
                    onClick={prevModalImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                  >
                    <ChevronLeft size={28} />
                  </button>
                  <button
                    onClick={nextModalImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}
            </div>

            {/* Description Section */}
            <div className="w-full md:w-80 flex flex-col gap-4 overflow-y-auto">
              <h3 className="text-[#75C310] text-2xl font-bold">{modalAuto.title}</h3>

              <div className="border-t border-white/10 pt-4">
                <p className="text-white/90 text-sm leading-relaxed">{modalAuto.description}</p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-white/50 text-xs mb-3 uppercase tracking-wider">Stack</p>
                <div className="flex flex-wrap gap-2">
                  {modalAuto.stack.map((tech) => (
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
          </div>
        </div>
      )}
    </>
  );
}
