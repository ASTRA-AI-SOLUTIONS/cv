import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export function Overlay() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    language: string;
    stargazers_count: number;
  }
  
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/ASTRA-AI-SOLUTIONS/repos?sort=updated&per_page=6')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoadingRepos(false);
      })
      .catch(err => {
        console.error(err);
        setLoadingRepos(false);
      });
  }, []);

  const experiences = [
    { 
      year: 'Recent', 
      role: 'Machine Learning Specialization', 
      company: 'Stanford Online via DeepLearning.AI',
      details: 'Completed comprehensive coursework in machine learning, covering supervised learning, unsupervised learning, and advanced algorithms. Gained practical experience in building and evaluating ML models.'
    },
    { 
      year: '2022 – Present', 
      role: 'Independent Content Operations & Strategy', 
      company: 'Self-Employed (AdSense Monetized)',
      details: 'Managed end-to-end digital production workflows and revenue generation. Utilized AI and Large Language Models (LLMs) to automate scripting and research tasks, reducing production time by 30%. Tracked performance metrics using Excel spreadsheets to forecast trends.'
    },
    { 
      year: '2020 – 2021', 
      role: 'Sales and Service Engineer', 
      company: 'Ionex Chemical and Engineers',
      details: 'Oversaw technical service delivery and client account management for industrial chemical solutions. Coordinated the delivery of technical services and products to industrial clients. Assessed client technical needs to ensure accurate product provisioning and inventory alignment.'
    },
    { 
      year: '2018 – 2020', 
      role: 'Financial Advisor', 
      company: 'SBI Life Insurance',
      details: 'Managed a portfolio of clients, focusing on financial planning and risk management. Analyzed client financial data to forecast future needs and recommend suitable long-term investment products. Built a sustainable client network through consistent follow-ups.'
    },
    { 
      year: '2018', 
      role: 'Manufacturing Intern', 
      company: 'Surya Roshni Limited',
      details: 'Conducted time studies on assembly lines and suggested layout changes and procedural adjustments aimed at modifying and speeding up the overall manufacturing process. Assisted the quality assurance team in inspecting finished goods and raw materials.'
    },
    { 
      year: '2017', 
      role: 'Process Engineering Intern', 
      company: 'SRF Limited',
      details: 'Assisted in analyzing existing production lines, identifying bottlenecks, and proposing minor modifications to the process flow to speed up the manufacturing process. Created and updated standard operating procedures (SOPs) for key process stages.'
    },
    { 
      year: '2018', 
      role: 'B.Tech Engineering', 
      company: 'Lovely Professional University',
      details: 'Relevant Subjects: Industrial Engineering, Manufacturing Processes, Operations Research, robotics and automation, supply chain management.'
    }
  ];

  return (
    <div className="w-full">
      {/* Page 1: Hero */}
      <section className="min-h-[100vh] w-full flex flex-col justify-center px-8 md:px-24 pt-20 pb-20">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 3.5 }}
            className="text-6xl md:text-8xl font-thin tracking-tight mb-6"
          >
            Ikshit <br/><span className="font-semibold text-blue-400">Joshi.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 3.8 }}
            className="text-xl md:text-2xl text-gray-400 font-light max-w-xl leading-relaxed"
          >
            Versatile Engineering graduate with a diverse background in technical sales, financial advisory, and digital media. Proven track record in independent content creation, leveraging advanced AI tools and LLMs.
          </motion.p>
        </div>
      </section>

      {/* Page 2: Experience / Projects */}
      <section className="min-h-[100vh] w-full flex flex-col justify-center px-8 md:px-24 items-end text-right pt-20 pb-20">
        <div className="max-w-2xl">
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-thin tracking-tight mb-12"
          >
            Professional <span className="font-semibold text-purple-400">Experience</span>
          </motion.h2>
          
          <div className="space-y-8">
            {experiences.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer border-b border-gray-800 pb-6"
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              >
                <div className="text-sm text-gray-500 mb-1 font-mono tracking-widest">{item.year}</div>
                <h3 className="text-2xl md:text-3xl font-medium group-hover:text-blue-300 transition-colors duration-300">
                  {item.role}
                </h3>
                <div className="text-lg text-gray-400 mt-1">{item.company}</div>
                <AnimatePresence>
                  {expandedIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-300 leading-relaxed text-left max-w-2xl ml-auto border-l-2 border-blue-400/30 pl-4">
                        {item.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 text-right"
          >
             <h4 className="text-xl font-medium text-gray-300 mb-4 tracking-wide uppercase">Core Skills</h4>
             <p className="text-gray-500 leading-relaxed max-w-xl ml-auto">
               AI & LLM Workflow Integration, Microsoft Excel, Oracle, Supply Chain & Operations, Logistics Coordination, Demand Planning, Process Improvement, Negotiation, Critical Thinking.
             </p>
          </motion.div>
        </div>
      </section>

      {/* Page 3.5: Open Source / GitHub */}
      <section className="min-h-screen flex items-center justify-center py-20 relative px-6 md:px-20">
        <div className="w-full max-w-6xl z-10">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="text-4xl md:text-6xl font-light mb-16 tracking-tight"
          >
            Open Source <span className="font-semibold text-cyan-400">Work</span>
          </motion.h2>
          
          {loadingRepos ? (
            <div className="text-gray-400 animate-pulse">Loading repositories from GitHub...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.1 }}
                  className="group block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-medium text-gray-200 group-hover:text-cyan-300 transition-colors line-clamp-1">{repo.name}</h3>
                      <div className="flex items-center gap-1 text-gray-400 text-sm bg-black/30 px-2 py-1 rounded-md">
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        {repo.stargazers_count}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 min-h-[40px]">
                      {repo.description || 'No description provided.'}
                    </p>
                    {repo.language && (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                        <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">{repo.language}</span>
                      </div>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Page 3: Contact */}
      <section className="min-h-[100vh] w-full flex flex-col justify-center px-8 md:px-24 items-center text-center pt-20 pb-20">
        <div className="max-w-3xl flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-thin tracking-tight mb-8"
          >
            Get in <span className="font-semibold text-blue-400">Touch</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center gap-4 text-xl text-gray-400 font-light mb-12 max-w-xl"
          >
            <p>
              Kashipur, Uttarakhand<br />
              +91-9760915613
            </p>
            <a 
              href="https://github.com/ASTRA-AI-SOLUTIONS" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 text-lg"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              ASTRA-AI-SOLUTIONS
            </a>
          </motion.div>
          
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.4 }}
            href="mailto:ikshitjoshi2@gmail.com"
            className="inline-block px-12 py-4 border border-gray-600 hover:border-white hover:bg-white hover:text-black transition-all duration-500 tracking-widest text-sm uppercase"
          >
            Initiate Sequence
          </motion.a>
        </div>
      </section>
    </div>
  );
}
