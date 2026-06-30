import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store';
import { User, Phone, Briefcase, Award, CheckCircle, ArrowRight, Share2 } from 'lucide-react';

export default function Join() {
  const { addInquiry } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    socials: '',
    age: '',
    occupancy: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    if (!formData.socials.trim()) {
      newErrors.socials = 'Social links or handles are required';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else {
      const ageNum = parseInt(formData.age);
      if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
        newErrors.age = 'Please enter a valid age';
      }
    }
    if (!formData.occupancy.trim()) {
      newErrors.occupancy = 'Occupancy or occupation is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newInquiry = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      socials: formData.socials,
      age: parseInt(formData.age),
      occupancy: formData.occupancy
    };

    const result = addInquiry(newInquiry);
    setSubmittedData(result);
    setIsSubmitted(true);
    setFormData({ name: '', phoneNumber: '', socials: '', age: '', occupancy: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-off-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Absolute Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 border-r-[60px] border-t-[60px] border-imperial-red/5 rounded-tr-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 border-l-[60px] border-b-[60px] border-luxury-gold/5 rounded-bl-3xl pointer-events-none z-0"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-imperial-red px-3 py-1 border border-imperial-red/25 bg-imperial-red/5 inline-block rounded mb-4"
          >
            Membership Application
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-heading font-black text-[#111111] uppercase tracking-wide"
          >
            Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-imperial-red to-luxury-gold">INTI</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 text-sm font-mono tracking-widest text-gray-500 uppercase max-w-lg mx-auto"
          >
            Register your interest to become part of the Perhimpunan Indonesia Tionghoa community
          </motion.p>
        </div>

        {/* Content Box */}
        {!isSubmitted ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="bg-white border-2 border-luxury-gold/25 shadow-2xl p-8 rounded-2xl relative"
          >
            {/* Top red header bar on card */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-imperial-red via-luxury-gold to-imperial-red rounded-t-2xl"></div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Field */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-700 font-bold">
                  <User size={16} className="text-imperial-red" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full bg-off-white border-2 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-luxury-gold transition-all duration-300 font-medium ${
                      errors.name ? 'border-imperial-red' : 'border-luxury-gold/20 hover:border-luxury-gold/40'
                    }`}
                    placeholder="e.g. Alexander Wijaya"
                  />
                  {errors.name && (
                    <p className="text-[11px] font-mono text-imperial-red mt-1">{errors.name}</p>
                  )}
                </div>
              </motion.div>

              {/* Phone Number Field */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-700 font-bold">
                  <Phone size={16} className="text-imperial-red" />
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className={`w-full bg-off-white border-2 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-luxury-gold transition-all duration-300 font-medium ${
                      errors.phoneNumber ? 'border-imperial-red' : 'border-luxury-gold/20 hover:border-luxury-gold/40'
                    }`}
                    placeholder="e.g. +62 812-3456-789"
                  />
                  {errors.phoneNumber && (
                    <p className="text-[11px] font-mono text-imperial-red mt-1">{errors.phoneNumber}</p>
                  )}
                </div>
              </motion.div>

              {/* Socials Field */}
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-700 font-bold">
                  <Share2 size={16} className="text-imperial-red" />
                  Socials (Instagram, Facebook, or TikTok)
                </label>
                <div className="relative">
                  <input
                    id="socials"
                    type="text"
                    value={formData.socials}
                    onChange={(e) => setFormData({ ...formData, socials: e.target.value })}
                    className={`w-full bg-off-white border-2 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-luxury-gold transition-all duration-300 font-medium ${
                      errors.socials ? 'border-imperial-red' : 'border-luxury-gold/20 hover:border-luxury-gold/40'
                    }`}
                    placeholder="e.g. Instagram: @alex.w, TikTok: @alex.w"
                  />
                  {errors.socials && (
                    <p className="text-[11px] font-mono text-imperial-red mt-1">{errors.socials}</p>
                  )}
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age Field */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-700 font-bold">
                    <Award size={16} className="text-imperial-red" />
                    Age
                  </label>
                  <div className="relative">
                    <input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className={`w-full bg-off-white border-2 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-luxury-gold transition-all duration-300 font-medium ${
                        errors.age ? 'border-imperial-red' : 'border-luxury-gold/20 hover:border-luxury-gold/40'
                      }`}
                      placeholder="e.g. 28"
                    />
                    {errors.age && (
                      <p className="text-[11px] font-mono text-imperial-red mt-1">{errors.age}</p>
                    )}
                  </div>
                </motion.div>

                {/* Occupancy Field */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-700 font-bold">
                    <Briefcase size={16} className="text-imperial-red" />
                    Occupancy
                  </label>
                  <div className="relative">
                    <input
                      id="occupancy"
                      type="text"
                      value={formData.occupancy}
                      onChange={(e) => setFormData({ ...formData, occupancy: e.target.value })}
                      className={`w-full bg-off-white border-2 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-luxury-gold transition-all duration-300 font-medium ${
                        errors.occupancy ? 'border-imperial-red' : 'border-luxury-gold/20 hover:border-luxury-gold/40'
                      }`}
                      placeholder="e.g. Business Owner"
                    />
                    {errors.occupancy && (
                      <p className="text-[11px] font-mono text-imperial-red mt-1">{errors.occupancy}</p>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-4">
                <button
                  id="submitJoin"
                  type="submit"
                  className="w-full py-4 bg-[#111] hover:bg-imperial-red text-white font-mono text-xs uppercase tracking-widest font-bold border border-transparent hover:border-luxury-gold/30 rounded-lg shadow-xl cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Submit Inquiry
                  <ArrowRight size={16} />
                </button>
              </motion.div>

            </form>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-2 border-luxury-gold/25 shadow-2xl p-8 rounded-2xl relative text-center"
          >
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-imperial-red via-luxury-gold to-imperial-red rounded-t-2xl"></div>
            
            <div className="w-16 h-16 bg-green-50 rounded-full border border-green-200 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={36} className="text-green-500 animate-bounce" />
            </div>

            <h3 className="text-2xl font-heading font-extrabold text-[#111] uppercase tracking-wider mb-2">
              Inquiry Submitted!
            </h3>
            <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-8">
              Thank you for your interest in INTI
            </p>

            {/* Display submitted info gracefully */}
            <div className="bg-off-white border border-luxury-gold/15 p-6 rounded-xl text-left max-w-md mx-auto mb-8 space-y-4 font-mono text-xs text-gray-600">
              <div className="border-b border-gray-200 pb-2 flex justify-between">
                <span className="font-bold text-[#111] uppercase">Application Ref:</span>
                <span className="text-imperial-red">#INQ-{submittedData?.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Name:</span>
                <span className="font-bold text-[#111]">{submittedData?.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone Number:</span>
                <span className="font-bold text-[#111]">{submittedData?.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Socials:</span>
                <span className="font-bold text-[#111]">{submittedData?.socials}</span>
              </div>
              <div className="flex justify-between">
                <span>Age:</span>
                <span className="font-bold text-[#111]">{submittedData?.age} Years Old</span>
              </div>
              <div className="flex justify-between">
                <span>Occupancy:</span>
                <span className="font-bold text-[#111]">{submittedData?.occupancy}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between text-[10px]">
                <span>Submitted on:</span>
                <span>{new Date(submittedData?.submittedAt).toLocaleString()}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 max-w-sm mx-auto mb-8">
              The INTI administrative team has been notified. We will review your data and get in touch with you via your phone number.
            </p>

            <button
              id="resetJoin"
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2.5 border-2 border-[#111] hover:border-imperial-red hover:text-imperial-red text-[#111] font-mono text-[10px] uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
