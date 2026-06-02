import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
import { contentData } from '../data';
import Markdown from 'react-markdown';

export default function ArticleView() {
  const { id } = useParams<{ id: string }>();
  const article = contentData.find(item => item.id === Number(id));

  if (!article) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-[#FAFAFA]">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold text-[#1a1a1a] mb-4 uppercase">Record Not Found</h1>
          <p className="font-mono text-gray-500 mb-8">The requested data log could not be retrieved.</p>
          <Link to="/magazine" className="inline-flex items-center text-imperial-red font-mono font-bold uppercase tracking-widest hover:text-[#1a1a1a] transition-colors">
            <ArrowLeft className="mr-2" size={16} /> Return to Archive
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-[#FAFAFA] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] border-b border-luxury-gold/20 overflow-hidden bg-gray-100">
        <div className="absolute inset-0">
          <img src={article.img} alt={article.title} className="w-full h-full object-cover filter grayscale mix-blend-luminosity opacity-80" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/magazine" className="inline-flex items-center text-luxury-gold font-mono text-[10px] uppercase font-bold tracking-widest mb-6 hover:text-white transition-colors">
                <ArrowLeft className="mr-2" size={14} /> Back to Archive
              </Link>
              <div className="mb-4">
                <span className="px-3 py-1 text-[9px] font-bold font-mono uppercase tracking-widest border backdrop-blur-md bg-white border-imperial-red text-imperial-red">
                  {article.type}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-tight leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center text-gray-300 font-mono space-x-6 text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center"><Calendar size={14} className="mr-2 text-luxury-gold" /> {article.date}</div>
                {article.readTime && <div className="flex items-center"><Clock size={14} className="mr-2 text-luxury-gold" /> {article.readTime}</div>}
                {article.location && <div className="flex items-center"><MapPin size={14} className="mr-2 text-luxury-gold" /> {article.location}</div>}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-lg prose-headings:font-heading prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight prose-a:text-imperial-red hover:prose-a:text-[#1a1a1a] prose-p:font-mono prose-p:text-gray-600 prose-p:leading-relaxed"
          >
            <div className="markdown-body">
              <Markdown>{article.content}</Markdown>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
