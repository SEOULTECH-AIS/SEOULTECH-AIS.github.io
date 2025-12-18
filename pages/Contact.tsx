import React from 'react';
import { Mail, MapPin, Phone, Users, Brain, Coffee } from 'lucide-react';
import { contactData } from '../data/contact';

const Contact = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="inline-block relative">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 pb-4 relative z-10">
                            Get in Touch
                        </h1>
                        <div className="absolute bottom-0 left-0 w-full h-px bg-slate-300"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
                    {/* LEFT COLUMN: Main Info */}
                    <div className="flex flex-col space-y-12">
                        {/* Section 1: Recruitment */}
                        <div className="animate-fade-in-up bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <Users size={24} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">Always Open to New Researchers</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed pl-12">
                                Our lab is always open to prospective students (M.S. / Ph.D.) who possess a deep passion for AI research,
                                regardless of their current degree status. We welcome anyone with a mindset ready to acquire new knowledge
                                and take on new challenges.
                            </p>
                        </div>

                        {/* Section 2: Research */}
                        <div className="animate-fade-in-up delay-100 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <Brain size={24} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">Research & Capabilities</h2>
                            </div>
                            <div className="pl-12 space-y-3 text-slate-600 leading-relaxed">
                                <p>
                                    Our research focuses primarily on <span className="font-semibold text-indigo-600">Deep Learning and Deep Reinforcement Learning</span>.
                                    We specialize in improving model training performance and optimizing algorithms.
                                </p>
                                <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 italic">
                                    Note: While we prioritize modeling over embedded hardware control, we are equipped with the necessary hardware.
                                    Related research can be pursued upon consultation.
                                </p>
                                <p>
                                    Given the rapidly evolving nature of the AI field, we are looking for candidates capable of quickly grasping
                                    the latest SOTA (State-of-the-art) papers and implementing/verifying them through code.
                                </p>
                            </div>
                        </div>

                        {/* Section 3: Lab Life */}
                        <div className="animate-fade-in-up delay-200 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                    <Coffee size={24} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">Life at Lab</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed pl-12">
                                We foster an autonomous culture where each individual takes ownership of their research.
                                Researchers conduct their work proactively, supported by weekly group lab meetings and 1:1 individual meetings with the professor.
                                These sessions ensure steady growth and help maintain the right research direction.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Map + Contact */}
                    <div className="flex flex-col space-y-8">
                        {/* Map Section */}
                        {/* Increased height to align with left column */}
                        <div className="bg-white p-2 rounded-3xl shadow-lg ring-1 ring-slate-100 flex-grow min-h-[500px] overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d789.9388194616715!2d127.07534906962253!3d37.63144389825137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbb712d44f303%3A0xf74585f86bbdbe48!2z7ISc7Jq46rO87ZWZ6riw7Iig64yA7ZWZ6rWQIO2UhOuhoO2LsOyWtOq0gA!5e0!3m2!1sko!2skr!4v1765526663887!5m2!1sko!2skr"
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: '1.2rem' }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        {/* Section 4: Contact Instruction & Details */}
                        {/* Changed style to white/slate to match other blocks */}
                        <div className="animate-fade-in-up delay-300 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                                    <Mail size={24} />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">Contact</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-sm mb-6 pl-12">
                                If you are interested in joining our lab, please email <strong>Prof. Jong-Eun Ha</strong> with a brief description of your background/experience and attach your CV.
                                We look forward to hearing from you.
                            </p>

                            {/* Compact Contact Details Cards */}
                            <div className="pl-2 lg:pl-12 space-y-3">
                                {/* Location */}
                                <div className="flex items-start p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                                    <MapPin className="text-slate-400 mr-3 mt-1 flex-shrink-0" size={18} />
                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Location</p>
                                        <p className="text-slate-800 font-medium text-sm">{contactData.address.university}</p>
                                        <p className="text-slate-600 text-sm">{contactData.address.room}</p>
                                    </div>
                                </div>
                                {/* Phone */}
                                <div className="flex items-center p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                                    <Phone className="text-slate-400 mr-3 flex-shrink-0" size={18} />
                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Phone</p>
                                        <p className="text-slate-800 font-medium text-sm">{contactData.phone}</p>
                                    </div>
                                </div>
                                {/* Email */}
                                <div className="flex items-center p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                                    <Mail className="text-slate-400 mr-3 flex-shrink-0" size={18} />
                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Email</p>
                                        <a href={`mailto:${contactData.email}`} className="text-blue-600 font-medium hover:underline text-sm">{contactData.email}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
