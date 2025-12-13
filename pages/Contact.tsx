import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { contactData } from '../data/contact';

const Contact = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section - Moved out of grid */}
                <div className="mb-12">
                    <div className="inline-block relative">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 pb-4 relative z-10">
                            Get in Touch
                        </h1>
                        {/* Thin gray line only up to text width */}
                        <div className="absolute bottom-0 left-0 w-full h-px bg-slate-300"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Info Side */}
                    <div className="flex flex-col">
                        <p className="text-slate-600 text-lg mb-12 leading-relaxed">
                            We are always open to collaboration, student inquiries, and media requests.
                            Please reach out using the form or the contact details below.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="bg-white p-4 rounded-xl mr-5 shadow-sm ring-1 ring-slate-100">
                                    <MapPin className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 font-bold text-lg">Visit Us</h3>
                                    <p className="text-slate-600">{contactData.address.room}</p>
                                    <p className="text-slate-600">{contactData.address.university}</p>
                                    <p className="text-slate-600">{contactData.address.street}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-white p-4 rounded-xl mr-5 shadow-sm ring-1 ring-slate-100">
                                    <Mail className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 font-bold text-lg">Email Us</h3>
                                    <p className="text-slate-600">{contactData.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-white p-4 rounded-xl mr-5 shadow-sm ring-1 ring-slate-100">
                                    <Phone className="text-blue-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 font-bold text-lg">Call Us</h3>
                                    <p className="text-slate-600">{contactData.phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Side */}
                    <div className="bg-white p-4 rounded-3xl shadow-xl ring-1 ring-slate-100 h-full overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d789.9388194616715!2d127.07534906962253!3d37.63144389825137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbb712d44f303%3A0xf74585f86bbdbe48!2z7ISc7Jq46rO87ZWZ6riw7Iig64yA7ZWZ6rWQIO2UhOuhoO2LsOyWtOq0gA!5e0!3m2!1sko!2skr!4v1765526663887!5m2!1sko!2skr"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '450px', borderRadius: '1rem' }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
