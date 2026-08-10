import { useState, useEffect } from 'react';
import { fetchResumeData, saveResumeData } from './api';
import { defaultData } from './data';
import { LogOut, Save, Plus, Trash2, ArrowUp, ArrowDown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { auth } from './firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [data, setData] = useState<typeof defaultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saveMessage, setSaveMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchResumeData().then((d) => {
          setData(d);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setData(null);
  };

  const handleSave = async () => {
    if (data) {
      setLoading(true);
      setSaveMessage({ text: '', type: '' });
      try {
        await saveResumeData(data);
        setSaveMessage({ text: 'Saved successfully!', type: 'success' });
        setTimeout(() => setSaveMessage({ text: '', type: '' }), 3000);
      } catch (err: any) {
        setSaveMessage({ text: 'Error saving data (check permissions): ' + err.message, type: 'error' });
      }
      setLoading(false);
    }
  };

  const moveItem = (arrayName: keyof typeof defaultData, index: number, direction: 'up' | 'down') => {
    if (!data) return;
    const newArray = [...data[arrayName] as any[]];
    if (direction === 'up' && index > 0) {
      [newArray[index - 1], newArray[index]] = [newArray[index], newArray[index - 1]];
    } else if (direction === 'down' && index < newArray.length - 1) {
      [newArray[index + 1], newArray[index]] = [newArray[index], newArray[index + 1]];
    } else {
      return;
    }
    setData({ ...data, [arrayName]: newArray });
  };

  const removeItem = (arrayName: keyof typeof defaultData, index: number) => {
    if (!data) return;
    const newArray = [...data[arrayName] as any[]];
    newArray.splice(index, 1);
    setData({ ...data, [arrayName]: newArray });
  };

  if (loading) {
    return <div className="min-h-screen bg-[#020203] text-white flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#020203] text-gray-100 flex flex-col items-center justify-center p-8 relative">
        <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back to Resume
        </Link>
        <h1 className="text-3xl font-light mb-8">Admin Access</h1>
        <button 
          onClick={handleLogin} 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
        >
          Sign in with Google
        </button>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#020203] text-gray-100 p-8 md:p-12">
      <div className="max-w-5xl mx-auto pb-20">
        <div className="mb-6 flex justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={16} /> Back to Resume
          </Link>
          <div className="text-sm text-gray-500 mb-8">Logged in as {user.email}</div>
        </div>
        
        <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#020203]/90 backdrop-blur py-4 z-50">
          <h1 className="text-3xl font-light">Content Editor</h1>
          <div className="flex gap-4 items-center">
            {saveMessage.text && (
              <span className={`text-sm ${saveMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {saveMessage.text}
              </span>
            )}
            <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/50 rounded hover:bg-blue-500/30 disabled:opacity-50">
              <Save size={16} /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/50 rounded hover:bg-red-500/30">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
        
        {/* HERO SECTION */}
        <section className="mb-12">
          <h2 className="text-2xl text-cyan-300 mb-6 font-light">Hero Section</h2>
          <div className="p-6 bg-white/5 border border-white/10 rounded space-y-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">First Name</label>
              <input className="w-full bg-black/50 border border-white/10 rounded p-3 text-white outline-none focus:border-cyan-500/50 transition-colors" value={data.hero.name} onChange={e => setData({...data, hero: {...data.hero, name: e.target.value}})} />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Last Name</label>
              <input className="w-full bg-black/50 border border-white/10 rounded p-3 text-white outline-none focus:border-cyan-500/50 transition-colors" value={data.hero.surname} onChange={e => setData({...data, hero: {...data.hero, surname: e.target.value}})} />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Subtitle</label>
              <textarea className="w-full bg-black/50 border border-white/10 rounded p-3 text-white outline-none focus:border-cyan-500/50 transition-colors min-h-[80px]" value={data.hero.subtitle} onChange={e => setData({...data, hero: {...data.hero, subtitle: e.target.value}})} />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Description</label>
              <textarea className="w-full bg-black/50 border border-white/10 rounded p-3 text-white outline-none focus:border-cyan-500/50 transition-colors min-h-[120px]" value={data.hero.description} onChange={e => setData({...data, hero: {...data.hero, description: e.target.value}})} />
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-cyan-300 font-light">Featured Projects</h2>
            <button 
              onClick={() => setData({...data, featuredProjects: [...data.featuredProjects, { title: 'New Project', url: '', description: '', tags: [] }]})} 
              className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded text-sm hover:bg-white/10 transition-colors"
            >
              <Plus size={14} /> Add Project
            </button>
          </div>
          <div className="space-y-4">
            {data.featuredProjects.map((proj, idx) => (
              <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded relative group">
                <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => moveItem('featuredProjects', idx, 'up')} className="p-1.5 bg-white/10 rounded hover:bg-white/20" disabled={idx === 0}><ArrowUp size={14} /></button>
                  <button onClick={() => moveItem('featuredProjects', idx, 'down')} className="p-1.5 bg-white/10 rounded hover:bg-white/20" disabled={idx === data.featuredProjects.length - 1}><ArrowDown size={14} /></button>
                  <button onClick={() => removeItem('featuredProjects', idx)} className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40"><Trash2 size={14} /></button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-12">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Title</label>
                    <input className="w-full bg-black/50 border border-white/10 rounded p-2 text-white outline-none focus:border-cyan-500/50" value={proj.title} onChange={e => { const n = [...data.featuredProjects]; n[idx].title = e.target.value; setData({...data, featuredProjects: n}) }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">URL</label>
                    <input className="w-full bg-black/50 border border-white/10 rounded p-2 text-white outline-none focus:border-cyan-500/50" value={proj.url} onChange={e => { const n = [...data.featuredProjects]; n[idx].url = e.target.value; setData({...data, featuredProjects: n}) }} />
                  </div>
                </div>
                <div className="pr-12 mb-4">
                  <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Description</label>
                  <textarea className="w-full bg-black/50 border border-white/10 rounded p-2 text-white outline-none focus:border-cyan-500/50 min-h-[80px]" value={proj.description} onChange={e => { const n = [...data.featuredProjects]; n[idx].description = e.target.value; setData({...data, featuredProjects: n}) }} />
                </div>
                <div className="pr-12">
                  <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Tags (comma separated)</label>
                  <input className="w-full bg-black/50 border border-white/10 rounded p-2 text-white outline-none focus:border-cyan-500/50" value={proj.tags.join(', ')} onChange={e => { const n = [...data.featuredProjects]; n[idx].tags = e.target.value.split(',').map(t=>t.trim()).filter(Boolean); setData({...data, featuredProjects: n}) }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCES */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-purple-300 font-light">Experiences</h2>
            <button 
              onClick={() => setData({...data, experiences: [...data.experiences, { year: '', role: 'New Role', company: '', description: '', details: [] }]})} 
              className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded text-sm hover:bg-white/10 transition-colors"
            >
              <Plus size={14} /> Add Experience
            </button>
          </div>
          <div className="space-y-4">
            {data.experiences.map((exp, idx) => (
              <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded relative group">
                <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => moveItem('experiences', idx, 'up')} className="p-1.5 bg-white/10 rounded hover:bg-white/20" disabled={idx === 0}><ArrowUp size={14} /></button>
                  <button onClick={() => moveItem('experiences', idx, 'down')} className="p-1.5 bg-white/10 rounded hover:bg-white/20" disabled={idx === data.experiences.length - 1}><ArrowDown size={14} /></button>
                  <button onClick={() => removeItem('experiences', idx)} className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40"><Trash2 size={14} /></button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pr-12">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Role</label>
                    <input className="w-full bg-black/50 border border-white/10 rounded p-2 text-white outline-none focus:border-purple-500/50" value={exp.role} onChange={e => { const n = [...data.experiences]; n[idx].role = e.target.value; setData({...data, experiences: n}) }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Company</label>
                    <input className="w-full bg-black/50 border border-white/10 rounded p-2 text-white outline-none focus:border-purple-500/50" value={exp.company} onChange={e => { const n = [...data.experiences]; n[idx].company = e.target.value; setData({...data, experiences: n}) }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Year</label>
                    <input className="w-full bg-black/50 border border-white/10 rounded p-2 text-white outline-none focus:border-purple-500/50" value={exp.year} onChange={e => { const n = [...data.experiences]; n[idx].year = e.target.value; setData({...data, experiences: n}) }} />
                  </div>
                </div>
                <div className="pr-12 mb-4">
                  <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Summary Description</label>
                  <textarea className="w-full bg-black/50 border border-white/10 rounded p-2 text-white outline-none focus:border-purple-500/50 min-h-[60px]" value={exp.description} onChange={e => { const n = [...data.experiences]; n[idx].description = e.target.value; setData({...data, experiences: n}) }} />
                </div>
                
                <div className="pr-12">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs text-gray-500 uppercase tracking-widest">Detail Bullets</label>
                    <button 
                      onClick={() => { const n = [...data.experiences]; n[idx].details = [...(n[idx].details || []), {title:'', desc:''}]; setData({...data, experiences: n}) }} 
                      className="text-xs text-purple-400 hover:text-purple-300"
                    >
                      + Add Detail
                    </button>
                  </div>
                  <div className="space-y-2">
                    {exp.details?.map((det, dIdx) => (
                      <div key={dIdx} className="flex gap-2 items-start">
                        <input placeholder="Title" className="w-1/4 bg-black/50 border border-white/10 rounded p-2 text-white outline-none text-sm" value={det.title} onChange={e => { const n = [...data.experiences]; n[idx].details![dIdx].title = e.target.value; setData({...data, experiences: n}) }} />
                        <textarea placeholder="Description" className="flex-1 bg-black/50 border border-white/10 rounded p-2 text-white outline-none text-sm min-h-[40px]" value={det.desc} onChange={e => { const n = [...data.experiences]; n[idx].details![dIdx].desc = e.target.value; setData({...data, experiences: n}) }} />
                        <button onClick={() => { const n = [...data.experiences]; n[idx].details!.splice(dIdx, 1); setData({...data, experiences: n}) }} className="p-2 text-gray-500 hover:text-red-400"><Trash2 size={14}/></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-green-300 font-light">Education</h2>
            <button 
              onClick={() => setData({...data, education: [...data.education, { year: '', role: 'New Degree', company: '', details: '' }]})} 
              className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded text-sm hover:bg-white/10 transition-colors"
            >
              <Plus size={14} /> Add Education
            </button>
          </div>
          <div className="space-y-4">
            {data.education.map((edu, idx) => (
              <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded relative group">
                <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => moveItem('education', idx, 'up')} className="p-1.5 bg-white/10 rounded hover:bg-white/20" disabled={idx === 0}><ArrowUp size={14} /></button>
                  <button onClick={() => moveItem('education', idx, 'down')} className="p-1.5 bg-white/10 rounded hover:bg-white/20" disabled={idx === data.education.length - 1}><ArrowDown size={14} /></button>
                  <button onClick={() => removeItem('education', idx)} className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40"><Trash2 size={14} /></button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pr-12">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Degree / Role</label>
                    <input className="w-full bg-black/50 border border-white/10 rounded p-2 text-white outline-none focus:border-green-500/50" value={edu.role} onChange={e => { const n = [...data.education]; n[idx].role = e.target.value; setData({...data, education: n}) }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Institution</label>
                    <input className="w-full bg-black/50 border border-white/10 rounded p-2 text-white outline-none focus:border-green-500/50" value={edu.company} onChange={e => { const n = [...data.education]; n[idx].company = e.target.value; setData({...data, education: n}) }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Year</label>
                    <input className="w-full bg-black/50 border border-white/10 rounded p-2 text-white outline-none focus:border-green-500/50" value={edu.year} onChange={e => { const n = [...data.education]; n[idx].year = e.target.value; setData({...data, education: n}) }} />
                  </div>
                </div>
                <div className="pr-12">
                  <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Details</label>
                  <textarea className="w-full bg-black/50 border border-white/10 rounded p-2 text-white outline-none focus:border-green-500/50 min-h-[60px]" value={edu.details} onChange={e => { const n = [...data.education]; n[idx].details = e.target.value; setData({...data, education: n}) }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl text-blue-300 font-light">Skills</h2>
            <button 
              onClick={() => setData({...data, skillCategories: [...data.skillCategories, { title: 'New Category', skills: [] }]})} 
              className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded text-sm hover:bg-white/10 transition-colors"
            >
              <Plus size={14} /> Add Category
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.skillCategories.map((cat, idx) => (
              <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded relative group">
                <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => moveItem('skillCategories', idx, 'up')} className="p-1.5 bg-white/10 rounded hover:bg-white/20" disabled={idx === 0}><ArrowLeft size={14} /></button>
                  <button onClick={() => moveItem('skillCategories', idx, 'down')} className="p-1.5 bg-white/10 rounded hover:bg-white/20" disabled={idx === data.skillCategories.length - 1}><ArrowLeft className="rotate-180" size={14} /></button>
                  <button onClick={() => removeItem('skillCategories', idx)} className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40"><Trash2 size={14} /></button>
                </div>
                
                <div className="mb-4 pr-20">
                  <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Category Title</label>
                  <input className="w-full bg-black/50 border border-white/10 rounded p-2 text-white outline-none focus:border-blue-500/50" value={cat.title} onChange={e => { const n = [...data.skillCategories]; n[idx].title = e.target.value; setData({...data, skillCategories: n}) }} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Skills (comma separated)</label>
                  <textarea className="w-full bg-black/50 border border-white/10 rounded p-2 text-white outline-none focus:border-blue-500/50 min-h-[80px]" value={cat.skills.join(', ')} onChange={e => { const n = [...data.skillCategories]; n[idx].skills = e.target.value.split(',').map(s=>s.trim()).filter(Boolean); setData({...data, skillCategories: n}) }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="mb-12">
          <h2 className="text-2xl text-blue-400 mb-6 font-light">Contact Section</h2>
          <div className="p-6 bg-white/5 border border-white/10 rounded grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Location</label>
              <input className="w-full bg-black/50 border border-white/10 rounded p-3 text-white outline-none focus:border-blue-500/50 transition-colors" value={data.contact.location} onChange={e => setData({...data, contact: {...data.contact, location: e.target.value}})} />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Phone</label>
              <input className="w-full bg-black/50 border border-white/10 rounded p-3 text-white outline-none focus:border-blue-500/50 transition-colors" value={data.contact.phone} onChange={e => setData({...data, contact: {...data.contact, phone: e.target.value}})} />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Email</label>
              <input type="email" className="w-full bg-black/50 border border-white/10 rounded p-3 text-white outline-none focus:border-blue-500/50 transition-colors" value={data.contact.email} onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})} />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Resume Download URL</label>
              <input className="w-full bg-black/50 border border-white/10 rounded p-3 text-white outline-none focus:border-blue-500/50 transition-colors" value={data.contact.resumeUrl} onChange={e => setData({...data, contact: {...data.contact, resumeUrl: e.target.value}})} />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
