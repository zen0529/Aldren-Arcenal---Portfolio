export default function Projects() {
  return (
    <div className="h-screen bg-[#05080f] flex flex-col items-center justify-center">
      <p className="text-[#75C310] relative right-120 bottom-8 text-5xl font-bold">
        Projects
      </p>
      <div className="h-[480px] w-[1000px] bg-[#545454] backdrop-opacity-100 flex flex-row border rounded-[40px] p-8">
        <ul className="text-white text-2xl/loose flex flex-col items-start justify-center font-bold pl-15 list-decimal">
          <button>
            <li>
              TopIT: Personalized Reviewer for TOPCIT Using RAG and CAT
            </li>
          </button>
          <button>
            <li>Ordersnap</li>
          </button>
          <button>
            <li >SpeakUp</li>
          </button>
          <button>
            <li >
              NLP based Crypto Sentiment Analyzer
            </li>
          </button>
          <button>
            <li >
              Spine Saver - Posture Corrector and notifier
            </li>
          </button>
          <button>
            <li >
              Gainz Grind - Workout Recommender and Tracker
            </li>
          </button>
        </ul>
      </div>
    </div>
  );
}
