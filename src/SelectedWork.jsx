import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Hold My Place: Stockout Recovery and Unit Economics",
      date: "Aug 2026",
      short:
        "What if a stockout didn't just end in a refund? A simulation and cost model that found five places my own idea was wrong. Python standard library only, 262 tests.",
      tags: [
        "Python 3.11",
        "Zero Dependencies",
        "Discrete-Event Simulation",
        "Unit Economics",
        "pytest",
      ],
      links: [
        { label: "GitHub", url: "https://github.com/codeC02003/HoldMyPlace", icon: "github" },
      ],
      problem:
        "My roommate and I put in a bulk Costco order. We paid, then got the notification: the water was unavailable and that part of the order would be refunded. The refund wasn't the problem. We spent the next two days going store to store looking for the same thing at the same price per unit, gave up, and bought a smaller pack that cost more. What stuck with me is that Costco already knew where its own water was sitting in every other warehouse nearby. And at the moment it refunded me it was holding something genuinely useful: that I'll pay this price, for this item, at this address. The refund throws that away. Every large grocer works this way, and every one of them absorbs the same cost.",
      role:
        "I built all of it. The domain model, the simulation, the cost model, the generated demo, and 262 tests. Standard library only, nothing to install. I wrote it to find out where I was wrong rather than to argue I was right, and it was wrong in five places. One of them was the metric I had gated the whole project on.",
      solution:
        "A five-rung ladder, ordered by how close each outcome is to what the customer actually asked for: move the item from another warehouse, ship it from the other channel, refund but hold their place in line, refund with substitutes, then a plain refund. Every skipped rung records why, so nobody gets a bare no. The queue rests on one rule I'm happy with: your order time decides who gets a unit, and your own cancel-by date only decides whether you're still in line. Because that date filters instead of sorting, setting an aggressive one strictly reduces the restocks that can reach you. Lying makes your outcome worse, so nobody has to police it. Eligibility gets read off the item's lifecycle status rather than predicted, and defaults to no.",
      outcome:
        "Promises kept on 96 to 99% of settled claims across eight seeds, holding from 45 days out to 240. The sourcing ladder mattered more than the queue I set out to build: switch it off and the share of customers who got what they ordered drops from 42.3% to 31.6%, while refunds climb from $24,411 to $30,159. Reserving 15% of each delivery for the queue reaches 97% promise-keeping and costs 91 units against 40,289 that went to the shelf. The cost model also killed a feature. Free delivery loses $1.19 a stop on merchandise margin and only clears once you count membership renewal, needing 0.153pp of lift to break even. That makes it a retention play rather than a fulfillment one, and any team measuring cost-per-stop would rightly reject it.",
    },
    {
      id: 2,
      title: "Query Optimization via Sharding and Parallelization",
      date: "May 2026",
      short:
        "A three-phase Boolean retrieval engine over 100,000 documents. Sharding cut index build time by 3.58x, and a different merge strategy cut query latency by 67%.",
      tags: [
        "Python",
        "C++",
        "NLTK",
        "ProcessPoolExecutor",
        "mmap",
        "VByte Encoding",
        "Multiprocessing",
        "Make",
      ],
      links: [],
      problem:
        "Boolean retrieval over a large corpus is slow in two separate places. Building the index in a single process is slow and eats memory. Then once you're querying, comparison-based postings merges end up dominating anything with several operators in it.",
      role:
        "Solo. I wrote the Python indexing pipeline (FileReader, Tokenizer, Normalizer, IndexBuilder), the custom binary index format, the C++ query engine, the sharding layer, the merge strategy, and a four-tier test suite.",
      solution:
        "The Python side writes a binary format the C++ engine loads through mmap, so nothing gets copied. Sharding runs on ProcessPoolExecutor with a presort invariant that keeps document IDs globally unique, and that invariant is what makes the interesting part possible: an O(m) tail-join merge that skips comparison-based merging entirely in the parallel thread-pooled engine. Text normalization runs five stages, case folding, punctuation, stop words, the Porter stemmer, then a post-stem filter, and has to stay byte-identical to the C++ preprocessor.",
      outcome:
        "Index builds came out 3.58x faster using 67% less memory per worker across four shards. The tail-join merge cut query latency 67% and raised throughput 32% on complex multi-operator queries. All of it verified through a four-tier end-to-end suite.",
    },
    {
      id: 3,
      title: "FinRAG: Question Answering over Financial Documents",
      date: "Jan 2026",
      short:
        "A retrieval system for 10-K filings that answers at 94 to 100% accuracy, using hybrid search, live table extraction and a vision-language model.",
      tags: [
        "Python",
        "FastAPI",
        "PyTorch",
        "Transformers",
        "FAISS",
        "SQLite FTS5",
        "React",
        "Vite",
        "Docker",
        "Hugging Face Spaces",
      ],
      links: [],
      problem:
        "Pulling a single number out of a 10-K by hand takes hours. Ask a general-purpose model instead and it will confidently invent one. Ordinary RAG doesn't rescue this either, because financial tables carry multi-year columns that naive chunking destroys.",
      role:
        "Solo. Hybrid retrieval, the table discovery engine, the routing between three different answering models, and the React chat interface with PDF upload.",
      solution:
        "Keyword search runs on SQLite FTS5, dense search on FAISS, and the two get merged with reciprocal rank fusion then reranked by a cross-encoder. Answers route three ways depending on the question: straight table extraction for numeric lookups, RoBERTa-SQuAD2 for extractive spans, and Qwen2-VL-2B-Instruct when the query genuinely needs visual reasoning. Tables come out of the PDFs via PyMuPDF and pdfplumber, with fuzzy synonym matching so typos still land, and an unanswerable-query check so the system says nothing instead of guessing.",
      outcome:
        "100% on the Tandy Leather, Aaron's Holdings and Materion filings, and 94% on Apple's. Table lookups come back in around 50ms with no hallucination. The chat interface keeps conversation history, suggests follow-ups and shows you the source page. Deployed on Hugging Face Spaces in Docker.",
    },
    {
      id: 4,
      title: "WeConnect: A Collaboration Platform for NGOs",
      date: "Jan to Apr 2024",
      short:
        "A platform where NGOs and social enterprises can find each other and share resources instead of quietly duplicating each other's work.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      links: [],
      problem:
        "Organisations working on the same problem often don't know the others exist. The result is duplicated effort and slower projects, largely because there's no shared place to post what you're doing or what you still need.",
      role:
        "Full stack, on my own, in HTML, CSS, JavaScript, PHP and MySQL. Resource sharing, project matching, idea exchange, user authentication and the database layer.",
      solution:
        "Organisations register, post initiatives, search for collaborators and share resources. Role-based access controls who can do what, and the whole thing is built in modules so adding a feature doesn't mean touching everything else.",
      outcome:
        "Reworking the MySQL queries and the module structure made data retrieval about 40% faster. It ended up a complete working prototype.",
    },
    {
      id: 5,
      title: "Ticket Booking Website",
      date: "Jan to Apr 2023",
      short:
        "An event registration and booking site that several college councils ran their events on.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      links: [],
      problem:
        "College councils were handling event registration by hand, spread across spreadsheets and messages. Bookings got lost, and promoting anything meant starting from nothing each time.",
      role:
        "Built the whole application from scratch, including the live MySQL queries, the sponsor listings, and a front end that had to hold up when a few hundred people arrived at once.",
      solution:
        "Registration, event promotion and audience engagement in one place, with live seat availability, booking confirmation and sponsor listings.",
      outcome:
        "Page load times came down about 35%, and it handled a few hundred concurrent users through event peaks across several councils.",
    },
  ];

  const [selected, setSelected] = useState(projects[0]);

  const DETAILS = [
    { key: "problem", label: "Problem" },
    { key: "role", label: "My Role" },
    { key: "solution", label: "Solution" },
  ];

  return (
    <section id="projects" className="flex flex-col items-center px-6 lg:px-10 py-12 scroll-mt-20">
      <div className="w-full max-w-7xl">
        <SectionHeading
          index="05 / SELECTED WORK"
          title="Projects"
          accent="Five things I built, newest first. Each one says what the problem was and what the numbers said afterwards."
        />

        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* ── Project list ─────────────────────────────────────────── */}
          <div className="w-full lg:w-[38%] flex flex-col gap-4">
            {projects.map((p, i) => {
              const isActive = selected.id === p.id;
              return (
                <motion.button
                  key={p.id}
                  type="button"
                  onClick={() => setSelected(p)}
                  aria-current={isActive}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.99 }}
                  className={`panel panel-corner text-left p-5 cursor-pointer ${
                    isActive ? "panel-active" : ""
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <span
                      className={`font-grotesk text-xs tracking-[0.3em] ${
                        isActive ? "text-cyan-300" : "text-cyan-400/40"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-grotesk text-xs tracking-widest text-gray-500">
                      {p.date}
                    </span>
                  </div>
                  <h3
                    className={`font-grotesk font-semibold leading-snug mb-2 ${
                      isActive ? "text-white text-lg" : "text-gray-200 text-lg"
                    }`}
                  >
                    {p.title}
                  </h3>
                  <p className="text-gray-400 text-sm font-grotesk leading-relaxed">
                    {p.short}
                  </p>
                </motion.button>
              );
            })}
          </div>

          {/* ── Detail panel ─────────────────────────────────────────── */}
          <div className="w-full lg:w-[62%] lg:sticky lg:top-8">
            <div className="panel panel-corner p-8 md:p-10 min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.32 }}
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {selected.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-[rgba(0,255,255,0.07)]
                                   border border-[rgba(0,255,255,0.25)] text-cyan-300/90
                                   text-xs font-grotesk tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold font-grotesk text-white leading-tight mb-4">
                    {selected.title}
                  </h3>

                  {/* Links */}
                  {selected.links.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-7">
                      {selected.links.map((l, i) => (
                        <a
                          key={i}
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                                     border border-cyan-400/60 text-cyan-300 font-grotesk text-sm
                                     transition-all duration-300 hover:border-cyan-400
                                     hover:bg-[rgba(0,255,255,0.08)]
                                     hover:shadow-[0_0_18px_rgba(0,255,255,0.3)]"
                        >
                          {l.icon === "github" ? <FaGithub /> : <FaExternalLinkAlt />}
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Narrative */}
                  <div className="space-y-6">
                    {DETAILS.map(({ key, label }) => (
                      <div key={key}>
                        <h4 className="text-xs text-cyan-400/70 font-semibold font-grotesk tracking-[0.25em] uppercase mb-2">
                          {label}
                        </h4>
                        <p className="text-gray-300 text-[0.95rem] leading-relaxed font-grotesk">
                          {selected[key]}
                        </p>
                      </div>
                    ))}

                    {/* Outcome carries the numbers, so it gets the weight. */}
                    <div className="metric-callout rounded-r-lg pl-5 pr-4 py-4">
                      <h4 className="text-xs text-cyan-300 font-semibold font-grotesk tracking-[0.25em] uppercase mb-2">
                        Outcome
                      </h4>
                      <p className="text-gray-200 text-[0.95rem] leading-relaxed font-grotesk">
                        {selected.outcome}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
