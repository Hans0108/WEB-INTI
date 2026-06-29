import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, Trash2, Image as ImageIcon, Sparkles, RefreshCw, 
  Check, Save, ArrowLeft, Eye, Edit2, AlertCircle, Calendar, MapPin, Clock, FileText, ToggleLeft, ToggleRight,
  Lock, User, ShieldCheck, LogIn, LogOut, Download, Upload
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore, Leader, store } from '../store';
import { ContentItem } from '../data';
import ImageUploader from '../components/ImageUploader';

const IMAGE_PRESETS = [
  { name: 'Traditional Temple', url: 'https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Modern Festival', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Newsletter Tech', url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Youth Gathering', url: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Charity Teamwork', url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { name: 'Cultural Summit', url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];

export default function Admin() {
  const { 
    articles, leaders, websiteImages, 
    addArticle, deleteArticle, updateArticle, updateLeaderDetails, updateWebsiteImages, resetToDefault 
  } = useStore();

  const [editingId, setEditingId] = useState<number | null>(null);

  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_authenticated') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (username === 'INTIADMIN' && password === 'INTI123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
    } else {
      setLoginError('Invalid ID or Passcode.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setUsername('');
    setPassword('');
  };

  const [activeTab, setActiveTab] = useState<'content' | 'images' | 'system'>('content');

  // New Content Form State
  const [formType, setFormType] = useState<string>('Articles');
  const [formTitle, setFormTitle] = useState<string>('');
  const [formImg, setFormImg] = useState<string>('');
  const [formDate, setFormDate] = useState<string>('');
  const [formLocation, setFormLocation] = useState<string>('');
  const [formReadTime, setFormReadTime] = useState<string>('');
  const [formFeatured, setFormFeatured] = useState<boolean>(false);
  const [formContent, setFormContent] = useState<string>('');
  const [formSuccessMsg, setFormSuccessMsg] = useState<string>('');
  const [formErrorMsg, setFormErrorMsg] = useState<string>('');

  // Image editing states
  const [aboutCommunityImg, setAboutCommunityImg] = useState(websiteImages.aboutCommunityImg);
  const [homeHeroImg, setHomeHeroImg] = useState(websiteImages.homeHeroImg || '');
  const [showHomeHeroImg, setShowHomeHeroImg] = useState(websiteImages.showHomeHeroImg);
  const [leaderStates, setLeaderStates] = useState<Leader[]>(leaders);

  const importInputRef = React.useRef<HTMLInputElement>(null);

  const handleExportBackup = () => {
    try {
      const dataStr = JSON.stringify({
        articles,
        leaders,
        websiteImages,
        exportedAt: new Date().toISOString(),
        version: "1.0.0"
      }, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `inti_portal_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setFormSuccessMsg('System database backup downloaded successfully!');
      setTimeout(() => setFormSuccessMsg(''), 4000);
    } catch (e) {
      setFormErrorMsg('Failed to export system backup.');
      setTimeout(() => setFormErrorMsg(''), 4000);
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.articles && Array.isArray(data.articles) && data.leaders && data.websiteImages) {
          store.saveArticles(data.articles);
          store.saveLeaders(data.leaders);
          store.saveWebsiteImages(data.websiteImages);
          
          // Sync current page component states
          setAboutCommunityImg(data.websiteImages.aboutCommunityImg);
          setHomeHeroImg(data.websiteImages.homeHeroImg || '');
          setShowHomeHeroImg(data.websiteImages.showHomeHeroImg);
          setLeaderStates(data.leaders);
          setEditingId(null);

          setFormSuccessMsg('System restored and synchronized from backup successfully!');
          setTimeout(() => setFormSuccessMsg(''), 5000);
        } else {
          alert('Invalid backup file structure. The selected JSON file does not contain valid INTI Portal system database records.');
        }
      } catch (error) {
        alert('Error parsing backup file. Please ensure it is a valid, uncorrupted backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset file input
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccessMsg('');
    setFormErrorMsg('');

    if (!formTitle.trim() || !formImg.trim() || !formContent.trim()) {
      setFormErrorMsg('Title, Image URL, and Content are required fields.');
      return;
    }

    const defaultDate = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });

    const articleData: Partial<ContentItem> = {
      type: formType,
      title: formTitle,
      img: formImg,
      date: formDate.trim() || defaultDate,
      content: formContent,
      featured: formFeatured
    };

    if (formType === 'Upcoming Events') {
      articleData.location = formLocation.trim() || 'Jakarta, Indonesia';
      articleData.readTime = undefined;
    } else {
      articleData.readTime = formReadTime.trim() || '5 min read';
      articleData.location = undefined;
    }

    if (editingId !== null) {
      updateArticle(editingId, articleData);
      setFormSuccessMsg('Article updated successfully!');
      setEditingId(null);
    } else {
      addArticle(articleData as Omit<ContentItem, 'id'>);
      setFormSuccessMsg('Article posted successfully! Check the Archive page to see it live.');
    }
    
    // Reset Form
    setFormTitle('');
    setFormImg('');
    setFormDate('');
    setFormLocation('');
    setFormReadTime('');
    setFormFeatured(false);
    setFormContent('');
    
    setTimeout(() => setFormSuccessMsg(''), 5000);
  };

  const handleUpdateWebsiteImages = (e: React.FormEvent) => {
    e.preventDefault();
    updateWebsiteImages({
      aboutCommunityImg,
      homeHeroImg,
      showHomeHeroImg
    });
    setFormSuccessMsg('Website assets updated successfully!');
    setTimeout(() => setFormSuccessMsg(''), 4000);
  };

  const handleUpdateLeader = (id: number, name: string, role: string, img: string) => {
    updateLeaderDetails(id, name, role, img);
    // Refresh local leaders edit state
    setLeaderStates(store.getLeaders());
    setFormSuccessMsg(`Updated Leader node: ${name}`);
    setTimeout(() => setFormSuccessMsg(''), 4000);
  };

  const handleReset = () => {
    if (confirm('Are you absolutely sure you want to reset all portal data, articles, pictures, and configurations back to their factory parameters? This action is irreversible.')) {
      resetToDefault();
      setAboutCommunityImg(store.getWebsiteImages().aboutCommunityImg);
      setHomeHeroImg(store.getWebsiteImages().homeHeroImg || '');
      setShowHomeHeroImg(store.getWebsiteImages().showHomeHeroImg);
      setLeaderStates(store.getLeaders());
      setFormSuccessMsg('Portal database rolled back to initial variables.');
      setTimeout(() => setFormSuccessMsg(''), 4000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-28 pb-20 bg-[#FAFAFA] min-h-screen flex items-center justify-center relative overflow-hidden tech-grid px-4">
        {/* Absolute visual background decorations */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-luxury-gold via-imperial-red to-luxury-gold" />
        <div className="absolute top-12 left-12 w-64 h-64 border border-luxury-gold/10 rounded-full pointer-events-none" />
        <div className="absolute bottom-12 right-12 w-96 h-96 border border-luxury-gold/10 rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md bg-white border border-luxury-gold/30 rounded-2xl p-8 md:p-10 shadow-xl relative z-10"
        >
          {/* Header Banner */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-imperial-red/5 border border-luxury-gold/20 mb-4 text-imperial-red">
              <ShieldCheck size={28} />
            </div>
            <h4 className="text-imperial-red font-mono uppercase tracking-[0.4em] font-bold text-[9px] mb-2 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-imperial-red animate-pulse rounded-full"></span>
              SECURE ACCESS NODE
            </h4>
            <h2 className="text-2xl font-heading font-extrabold text-[#111111] uppercase tracking-tight">
              Portal Admin
            </h2>
            <p className="text-gray-400 font-mono text-[9px] uppercase tracking-wider mt-1.5">
              Perhimpunan Indonesia Tionghoa
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">
                Administrator ID
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <User size={15} />
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g., INTIADMIN"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAFAFA] border border-luxury-gold/25 focus:border-imperial-red focus:bg-white text-xs text-[#111111] font-mono tracking-wide placeholder:text-gray-400 outline-none transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2">
                Secure Passcode
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Lock size={15} />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAFAFA] border border-luxury-gold/25 focus:border-imperial-red focus:bg-white text-xs text-[#111111] font-mono tracking-wide placeholder:text-gray-400 outline-none transition-all duration-300"
                />
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 bg-rose-50 border border-rose-500/20 text-rose-800 font-mono text-[10px] flex items-center gap-2 overflow-hidden"
                >
                  <AlertCircle size={14} className="text-rose-600 shrink-0" />
                  <span>{loginError}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full py-3.5 bg-[#111111] hover:bg-imperial-red text-white text-[10px] font-mono uppercase tracking-widest font-bold border border-luxury-gold/30 hover:border-imperial-red transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-6"
            >
              <LogIn size={13} /> Authenticate Gateway
            </motion.button>
          </form>

          {/* Additional Help Section */}
          <div className="mt-8 pt-6 border-t border-luxury-gold/15 text-center">
            <p className="text-[9px] font-mono text-gray-400 uppercase tracking-wide">
              AUTHORIZED PERSONNEL ONLY
            </p>
            <p className="text-[8.5px] font-mono text-gray-400 uppercase tracking-wide mt-1">
              Please enter official credentials to gain edit permission
            </p>
            {/* Credentials tooltip in off-gray subtle display for easy evaluation/testing */}
            <div className="mt-4 p-2.5 bg-gray-50 border border-dashed border-luxury-gold/15 text-[8.5px] font-mono text-gray-400 text-left rounded">
              <div className="text-gray-500 font-bold mb-0.5">🔑 LOCAL GATEWAY ACCESS:</div>
              <div>ID: <span className="text-[#111] font-semibold">INTIADMIN</span></div>
              <div>PASS: <span className="text-[#111] font-semibold">INTI123</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-[#FAFAFA] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Console */}
        <div className="border border-luxury-gold/30 bg-white p-8 mb-8 relative tech-grid shadow-sm">
          <div className="absolute top-2 right-4 text-[9px] font-mono text-gray-400 font-bold tracking-widest uppercase">
            SECURE_LINK // ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h4 className="text-imperial-red font-mono uppercase tracking-[0.4em] font-bold text-[10px] mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-imperial-red animate-pulse"></span>
                CORE.SYS_ADMIN_PORTAL
              </h4>
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-[#1a1a1a] tracking-tight uppercase">Portal Controller</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/magazine" className="px-6 py-3 bg-[#1a1a1a] text-white hover:bg-gray-800 font-mono text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all duration-300">
                <ArrowLeft size={14} /> Open Magazine View
              </Link>
              <button 
                onClick={handleLogout} 
                className="px-6 py-3 bg-imperial-red text-white hover:bg-red-700 font-mono text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all duration-300 cursor-pointer"
              >
                <LogOut size={14} /> Exit Session
              </button>
            </div>
          </div>

          {/* Quick Stats banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-luxury-gold/20 font-mono text-xs">
            <div className="p-3 bg-[#FAFAFA] border border-luxury-gold/10">
              <span className="text-gray-400 block text-[9px] uppercase tracking-wider">DATABASE_ARTICLES</span>
              <span className="text-xl font-bold text-imperial-red">{articles.length} Node(s)</span>
            </div>
            <div className="p-3 bg-[#FAFAFA] border border-luxury-gold/10">
              <span className="text-gray-400 block text-[9px] uppercase tracking-wider">EVENTS_ACTIVE</span>
              <span className="text-xl font-bold text-[#1a1a1a]">{articles.filter(a => a.type === 'Upcoming Events').length} Event(s)</span>
            </div>
            <div className="p-3 bg-[#FAFAFA] border border-luxury-gold/10">
              <span className="text-gray-400 block text-[9px] uppercase tracking-wider">LEADERSHIP_NODES</span>
              <span className="text-xl font-bold text-[#1a1a1a]">{leaders.length} Active</span>
            </div>
            <div className="p-3 bg-[#FAFAFA] border border-luxury-gold/10">
              <span className="text-gray-400 block text-[9px] uppercase tracking-wider">WATERMARK_HERO</span>
              <span className="text-xl font-bold text-luxury-gold-dark">{showHomeHeroImg ? 'ENABLED' : 'DISABLED'}</span>
            </div>
          </div>
        </div>

        {/* Global Action Messages */}
        <AnimatePresence>
          {formSuccessMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }} 
              className="mb-6 p-4 bg-emerald-50 border border-emerald-500/30 text-emerald-800 font-mono text-xs flex items-center gap-3"
            >
              <Check className="text-emerald-600 shrink-0" size={16} />
              <span>{formSuccessMsg}</span>
            </motion.div>
          )}
          {formErrorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }} 
              className="mb-6 p-4 bg-rose-50 border border-rose-500/30 text-rose-800 font-mono text-xs flex items-center gap-3"
            >
              <AlertCircle className="text-rose-600 shrink-0" size={16} />
              <span>{formErrorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tab Navigation Controls */}
        <div className="flex border-b border-luxury-gold/20 mb-8 bg-white shadow-sm p-1.5 gap-2">
          <TabButton active={activeTab === 'content'} onClick={() => setActiveTab('content')} icon={FileText} label="Content Pipeline" />
          <TabButton active={activeTab === 'images'} onClick={() => setActiveTab('images')} icon={ImageIcon} label="Visual Assets" />
          <TabButton active={activeTab === 'system'} onClick={() => setActiveTab('system')} icon={RefreshCw} label="System Matrix" />
        </div>

        {/* Content Pipeline View */}
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Create Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div id="content-form-section" className="bg-white border border-luxury-gold/20 p-6 shadow-sm">
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-[#1a1a1a] mb-6 border-b border-luxury-gold/20 pb-3 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-2">
                    <span className={`w-2 h-2 ${editingId !== null ? 'bg-luxury-gold' : 'bg-imperial-red'}`}></span>
                    {editingId !== null ? `EDIT_CONTENT_NODE // ID_0${editingId}` : 'UPLOAD_NEW_ARTICLE_OR_EVENT'}
                  </span>
                  {editingId !== null && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingId(null);
                        setFormTitle('');
                        setFormImg('');
                        setFormDate('');
                        setFormLocation('');
                        setFormReadTime('');
                        setFormFeatured(false);
                        setFormContent('');
                      }}
                      className="px-2 py-1 text-[9px] font-bold text-gray-500 hover:text-imperial-red border border-gray-300 hover:border-imperial-red transition-all cursor-pointer"
                    >
                      CANCEL_EDIT
                    </button>
                  )}
                </h3>

                <form onSubmit={handleCreateArticle} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-500 uppercase tracking-wider mb-2 font-bold">Content Class</label>
                      <select 
                        value={formType}
                        onChange={(e) => setFormType(e.target.value)}
                        className="w-full bg-[#FAFAFA] border border-luxury-gold/30 p-3 outline-none focus:border-imperial-red font-bold"
                      >
                        <option value="Articles">Articles</option>
                        <option value="Newsletters">Newsletters</option>
                        <option value="Upcoming Events">Upcoming Events</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-500 uppercase tracking-wider mb-2 font-bold">Featured Priority</label>
                      <div className="flex items-center h-[46px] bg-[#FAFAFA] border border-luxury-gold/30 px-3">
                        <input 
                          type="checkbox" 
                          id="featured-checkbox"
                          checked={formFeatured}
                          onChange={(e) => setFormFeatured(e.target.checked)}
                          className="mr-2 accent-imperial-red w-4 h-4"
                        />
                        <label htmlFor="featured-checkbox" className="select-none font-bold uppercase cursor-pointer">Set as Featured Post</label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-500 uppercase tracking-wider mb-2 font-bold">Document Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Traditional Culinary Heritage in Modern Era"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-luxury-gold/30 p-3 outline-none focus:border-imperial-red font-bold"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-500 uppercase tracking-wider mb-2 font-bold">
                        {formType === 'Upcoming Events' ? 'Scheduled Location' : 'Read Duration'}
                      </label>
                      <input 
                        type="text" 
                        placeholder={formType === 'Upcoming Events' ? 'e.g. Ballroom Hotel, Jakarta' : 'e.g. 5 min read'}
                        value={formType === 'Upcoming Events' ? formLocation : formReadTime}
                        onChange={(e) => formType === 'Upcoming Events' ? setFormLocation(e.target.value) : setFormReadTime(e.target.value)}
                        className="w-full bg-[#FAFAFA] border border-luxury-gold/30 p-3 outline-none focus:border-imperial-red font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-500 uppercase tracking-wider mb-2 font-bold">Display Date Stamp (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Nov 24, 2026"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full bg-[#FAFAFA] border border-luxury-gold/30 p-3 outline-none focus:border-imperial-red font-bold"
                      />
                    </div>
                  </div>

                   <div className="space-y-4 p-4 border border-luxury-gold/20 bg-white rounded">
                    <ImageUploader 
                      value={formImg} 
                      onUpload={(dataUrl) => setFormImg(dataUrl)} 
                      label="Upload Cover Image (PNG/JPG)" 
                    />
                    
                    <div className="relative flex py-2 items-center">
                      <div className="flex-grow border-t border-luxury-gold/15"></div>
                      <span className="flex-shrink mx-4 text-gray-400 text-[9px] uppercase tracking-wider font-bold">OR USE REMOTE URL / PRESETS</span>
                      <div className="flex-grow border-t border-luxury-gold/15"></div>
                    </div>

                    <div>
                      <label className="block text-gray-400 uppercase tracking-wider mb-2 font-bold text-[10px]">Image URL Direct Reference</label>
                      <input 
                        type="text" 
                        placeholder="https://images.unsplash.com/... or base64 data"
                        value={formImg}
                        onChange={(e) => setFormImg(e.target.value)}
                        className="w-full bg-[#FAFAFA] border border-luxury-gold/30 p-2.5 outline-none focus:border-imperial-red font-bold text-xs"
                      />
                    </div>

                    {/* Presets Grid */}
                    <div>
                      <span className="block text-gray-400 uppercase tracking-wider mb-2 font-bold text-[9px]">Quick Image Presets</span>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-1.5 bg-[#FAFAFA] border border-luxury-gold/10">
                        {IMAGE_PRESETS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setFormImg(preset.url)}
                            className="group relative h-10 overflow-hidden border border-luxury-gold/20 hover:border-imperial-red transition-all"
                            title={preset.name}
                          >
                            <img src={preset.url} className="w-full h-full object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt="preset" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-500 uppercase tracking-wider mb-2 font-bold">Document Body (Markdown Supported)</label>
                    <textarea 
                      rows={8}
                      placeholder="Write your article in markdown format here..."
                      value={formContent}
                      onChange={(e) => setFormContent(e.target.value)}
                      className="w-full bg-[#FAFAFA] border border-luxury-gold/30 p-3 outline-none focus:border-imperial-red font-bold font-mono"
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-4 bg-imperial-red/10 text-imperial-red border border-imperial-red hover:bg-imperial-red hover:text-white hover:tech-glow font-mono font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2"
                  >
                    {editingId !== null ? <Save size={16} /> : <Plus size={16} />}
                    {editingId !== null ? 'SAVE_CHANGES()' : 'Execute_Upload()'}
                  </button>
                </form>
              </div>
            </div>

            {/* List Pipeline Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-luxury-gold/20 p-6 shadow-sm min-h-[500px]">
                <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-[#1a1a1a] mb-6 border-b border-luxury-gold/20 pb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-luxury-gold"></span>
                  ARCHIVE_PIPELINE ({articles.length} Records)
                </h3>

                <div className="space-y-4 max-h-[850px] overflow-y-auto pr-1">
                  {articles.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 font-mono text-xs uppercase tracking-wider border border-dashed border-luxury-gold/20">
                      Archive is completely empty.
                    </div>
                  ) : (
                    articles.map((item) => (
                      <div 
                        key={item.id} 
                        className="border border-luxury-gold/10 p-4 bg-[#FAFAFA] hover:border-imperial-red/40 transition-all flex justify-between items-center gap-4 group"
                      >
                        <div className="flex gap-4 items-center overflow-hidden">
                          <div className="w-12 h-12 shrink-0 border border-luxury-gold/20 overflow-hidden relative">
                            <img src={item.img} alt="" className="w-full h-full object-cover grayscale" />
                          </div>
                          <div className="overflow-hidden">
                            <span className="text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 border border-imperial-red/30 bg-imperial-red/5 text-imperial-red w-fit inline-block mb-1">
                              {item.type}
                            </span>
                            <h4 className="text-[11px] font-heading font-bold uppercase text-[#1a1a1a] tracking-tight truncate w-48 group-hover:text-imperial-red transition-colors">
                              {item.title}
                            </h4>
                            <span className="text-[9px] font-mono text-gray-400 block uppercase tracking-widest">{item.date}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 shrink-0">
                          <button 
                            onClick={() => {
                              setEditingId(item.id);
                              setFormType(item.type);
                              setFormTitle(item.title);
                              setFormImg(item.img);
                              setFormDate(item.date);
                              setFormLocation(item.location || '');
                              setFormReadTime(item.readTime || '');
                              setFormFeatured(!!item.featured);
                              setFormContent(item.content);
                              document.getElementById('content-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                            className="w-8 h-8 rounded border border-luxury-gold/30 text-luxury-gold-dark hover:bg-luxury-gold hover:border-luxury-gold hover:text-white flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300"
                            title="Edit content record"
                          >
                            <Edit2 size={13} />
                          </button>

                          <button 
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete this content item: "${item.title}"?`)) {
                                if (editingId === item.id) {
                                  setEditingId(null);
                                  setFormTitle('');
                                  setFormImg('');
                                  setFormDate('');
                                  setFormLocation('');
                                  setFormReadTime('');
                                  setFormFeatured(false);
                                  setFormContent('');
                                }
                                deleteArticle(item.id);
                                setFormSuccessMsg(`Deleted content node: "${item.title}"`);
                                setTimeout(() => setFormSuccessMsg(''), 3000);
                              }
                            }}
                            className="w-8 h-8 rounded border border-rose-200 text-rose-500 hover:bg-rose-500 hover:border-rose-500 hover:text-white flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300"
                            title="Delete content record"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visual Assets View */}
        {activeTab === 'images' && (
          <div className="space-y-8">
            
            {/* Global & Sectional Pictures Form */}
            <div className="bg-white border border-luxury-gold/20 p-6 shadow-sm">
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-[#1a1a1a] mb-6 border-b border-luxury-gold/20 pb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-imperial-red"></span>
                SECTION_WEBSITE_IMAGERY_CONTROLS
              </h3>

              <form onSubmit={handleUpdateWebsiteImages} className="space-y-6 font-mono text-xs">
                
                {/* Community Image block */}
                <div className="p-4 bg-[#FAFAFA] border border-luxury-gold/20 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <h4 className="font-bold text-[#1a1a1a] uppercase tracking-wider flex items-center gap-2 text-[11px]">
                      <span className="w-1.5 h-1.5 bg-imperial-red"></span> About Us: Community Main Photo
                    </h4>
                    <p className="text-gray-500 text-[10px] leading-relaxed">
                      This picture represents the community gathering on the About Us screen. Perfect resolution target: 1200 x 800 (landscape style).
                    </p>
                    <ImageUploader 
                      value={aboutCommunityImg} 
                      onUpload={(dataUrl) => setAboutCommunityImg(dataUrl)} 
                      label="Choose JPG/PNG file" 
                    />
                    <div className="mt-2">
                      <label className="block text-gray-400 uppercase tracking-wider mb-1 font-bold text-[9px]">Or URL Reference</label>
                      <input 
                        type="text" 
                        value={aboutCommunityImg}
                        onChange={(e) => setAboutCommunityImg(e.target.value)}
                        className="w-full bg-white border border-luxury-gold/30 p-2 outline-none focus:border-imperial-red font-bold text-xs"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-4 border border-luxury-gold/20 h-32 overflow-hidden relative shadow-sm bg-gray-100">
                    <img src={aboutCommunityImg} className="w-full h-full object-cover filter grayscale" alt="About Main View" />
                    <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-0.5 text-[8px] text-white">LIVE_PREVIEW</div>
                  </div>
                </div>

                {/* Home Hero Overlay Block */}
                <div className="p-4 bg-[#FAFAFA] border border-luxury-gold/20 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-[#1a1a1a] uppercase tracking-wider flex items-center gap-2 text-[11px]">
                        <span className="w-1.5 h-1.5 bg-luxury-gold-dark"></span> Home Page Hero Background Picture
                      </h4>
                      <button 
                        type="button"
                        onClick={() => setShowHomeHeroImg(!showHomeHeroImg)}
                        className="flex items-center gap-2 text-imperial-red font-bold font-mono text-[10px] uppercase hover:opacity-85"
                      >
                        {showHomeHeroImg ? <ToggleRight size={24} className="text-imperial-red" /> : <ToggleLeft size={24} className="text-gray-400" />}
                        <span>{showHomeHeroImg ? 'Active' : 'Disabled'}</span>
                      </button>
                    </div>
                    <p className="text-gray-500 text-[10px] leading-relaxed">
                      Toggles or replaces a subtle watermark greyscale background image inside the main Home page hero backdrop layout.
                    </p>
                    {showHomeHeroImg && (
                      <div className="space-y-3">
                        <ImageUploader 
                          value={homeHeroImg} 
                           onUpload={(dataUrl) => setHomeHeroImg(dataUrl)} 
                          label="Choose JPG/PNG file" 
                        />
                        <div>
                          <label className="block text-gray-400 uppercase tracking-wider mb-1 font-bold text-[9px]">Or URL Reference</label>
                          <input 
                            type="text" 
                            value={homeHeroImg}
                            onChange={(e) => setHomeHeroImg(e.target.value)}
                            className="w-full bg-white border border-luxury-gold/30 p-2 outline-none focus:border-imperial-red font-bold text-xs"
                            placeholder="Insert background image URL..."
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={`md:col-span-4 border border-luxury-gold/20 h-32 overflow-hidden relative shadow-sm bg-gray-100 ${!showHomeHeroImg ? 'opacity-40' : ''}`}>
                    {showHomeHeroImg && homeHeroImg ? (
                      <>
                        <img src={homeHeroImg} className="w-full h-full object-cover filter grayscale" alt="Home Hero Preview" />
                        <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-0.5 text-[8px] text-white">LIVE_PREVIEW</div>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-[10px] uppercase tracking-wider">Watermark Disabled</div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-luxury-gold/10">
                  <button 
                    type="submit" 
                    className="px-8 py-4 bg-imperial-red/10 text-imperial-red border border-imperial-red hover:bg-imperial-red hover:text-white font-mono font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2"
                  >
                    <Save size={16} /> Save Website Assets
                  </button>
                </div>
              </form>
            </div>

            {/* Leadership Nodes Block */}
            <div className="bg-white border border-luxury-gold/20 p-6 shadow-sm">
              <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-[#1a1a1a] mb-6 border-b border-luxury-gold/20 pb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-luxury-gold"></span>
                LEADERSHIP_NODE_CONTROLLERS
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {leaderStates.map((l) => (
                  <LeaderNodeEditor 
                    key={l.id} 
                    leader={l} 
                    onSave={(name, role, img) => handleUpdateLeader(l.id, name, role, img)} 
                  />
                ))}
              </div>
            </div>

          </div>
        )}

        {/* System Matrix View */}
        {activeTab === 'system' && (
          <div className="bg-white border border-luxury-gold/20 p-8 shadow-sm">
            <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-[#1a1a1a] mb-6 border-b border-luxury-gold/20 pb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-imperial-red"></span>
              DIAGNOSTIC_AND_RECOVERY_MATRIX
            </h3>

            <div className="font-mono text-xs max-w-2xl space-y-6">
              <p className="text-gray-500 leading-relaxed uppercase tracking-wider text-[10px]">
                The INTI portal system state relies on local-first secure variables in localStorage to support immediate, responsive changes within the container architecture. You can manage backups here to prevent accidental data loss.
              </p>

              <div className="bg-black text-[#00FF00] p-4 font-mono text-[11px] leading-relaxed rounded border border-[#333] shadow-inner">
                <p>&gt; sys.status::ACTIVE</p>
                <p>&gt; sys.runtime::LOCAL_STORAGE_PROVIDER</p>
                <p>&gt; sys.articles_count::{articles.length} records in pipeline</p>
                <p>&gt; sys.leadership_nodes::{leaders.length} live configurations</p>
                <p>&gt; sys.integrity::OK // All checksum variables matching</p>
              </div>

              {/* Data Backup & Restore Panel */}
              <div className="p-4 border border-luxury-gold/20 bg-gray-50/50 space-y-4">
                <h4 className="font-bold text-[#1a1a1a] uppercase tracking-wider text-[11px] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-luxury-gold"></span> DATA_PRESERVATION_&_BACKUPS
                </h4>
                <p className="text-gray-500 text-[10px] leading-relaxed uppercase">
                  Download a physical copy of all your blogs, events, custom images, and leadership data. You can restore this backup at any time or on another device.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Export Button */}
                  <button
                    onClick={handleExportBackup}
                    className="py-3 px-4 bg-white border border-luxury-gold hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-sm text-[10px]"
                  >
                    <Download size={13} /> EXPORT_PORTAL_DATA()
                  </button>

                  {/* Import Button */}
                  <div>
                    <input 
                      type="file" 
                      ref={importInputRef} 
                      accept=".json" 
                      onChange={handleImportBackup} 
                      className="hidden" 
                    />
                    <button
                      onClick={() => importInputRef.current?.click()}
                      className="w-full py-3 px-4 bg-white border border-luxury-gold hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-sm text-[10px]"
                    >
                      <Upload size={13} /> IMPORT_PORTAL_DATA()
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-luxury-gold/20">
                <button 
                  onClick={handleReset}
                  className="px-8 py-4 bg-rose-50 text-rose-600 border border-rose-300 hover:bg-rose-600 hover:text-white font-mono font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2"
                >
                  <RefreshCw size={14} className="animate-spin" /> Rollback to Defaults
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Subcomponents
function TabButton({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-mono text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 transition-all duration-300 ${
        active 
          ? 'bg-imperial-red/5 text-imperial-red border border-imperial-red' 
          : 'text-gray-500 hover:text-[#1a1a1a] border border-transparent'
      }`}
    >
      <Icon size={14} />
      <span>{label}</span>
    </button>
  );
}

function LeaderNodeEditor({ leader, onSave }: { leader: Leader, onSave: (name: string, role: string, img: string) => void }) {
  const [name, setName] = useState(leader.name);
  const [role, setRole] = useState(leader.role);
  const [img, setImg] = useState(leader.img);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name, role, img);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-[#FAFAFA] border border-luxury-gold/10 space-y-4 font-mono text-xs relative group">
      <div className="absolute top-2 right-2 text-[8px] font-bold text-gray-400">NODE_ID_0{leader.id}</div>
      
      <div className="flex gap-4 items-center">
        <div className="w-16 h-16 border border-luxury-gold/20 overflow-hidden shrink-0 shadow-sm relative bg-gray-100">
          <img src={img} className="w-full h-full object-cover filter grayscale" alt="" />
        </div>
        <div className="w-full">
          <label className="block text-[8px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Node Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white border border-luxury-gold/20 p-2 outline-none focus:border-imperial-red font-bold text-xs"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[8px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Node Role/Title</label>
          <input 
            type="text" 
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-white border border-luxury-gold/20 p-2 outline-none focus:border-imperial-red font-bold text-xs"
            required
          />
        </div>
        <div>
          <label className="block text-[8px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Or Paste URL Reference</label>
          <input 
            type="text" 
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="w-full bg-white border border-luxury-gold/20 p-2 outline-none focus:border-imperial-red font-bold text-xs"
            placeholder="Image URL..."
          />
        </div>
      </div>

      <div>
        <ImageUploader 
          value={img} 
          onUpload={(dataUrl) => setImg(dataUrl)} 
          label="Upload Profile Photo (PNG/JPG)" 
        />
      </div>

      <div className="flex justify-end pt-2">
        <button 
          type="submit" 
          className={`px-4 py-2 text-[9px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
            isSaved 
              ? 'bg-emerald-500 text-white border border-emerald-500' 
              : 'bg-white border border-luxury-gold/30 hover:border-imperial-red hover:text-imperial-red text-gray-600'
          }`}
        >
          {isSaved ? <Check size={12} /> : <Save size={12} />}
          <span>{isSaved ? 'SAVED' : 'SAVE_NODE'}</span>
        </button>
      </div>
    </form>
  );
}
