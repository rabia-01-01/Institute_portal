import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); setFormData({ name: '', email: '', subject: '', message: '' }); };

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gradient-to-r from-[#1a2744] to-[#0d4a4a] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-300">Get in touch with us</p>
        </div>
      </section>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-[#1a2744] mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-teal-600 mt-0.5" /><div><p className="text-sm font-medium text-gray-700">Address</p><p className="text-sm text-gray-500">123 Academic Avenue, Education City</p></div></div>
                  <div className="flex items-start gap-3"><Phone className="w-4 h-4 text-teal-600 mt-0.5" /><div><p className="text-sm font-medium text-gray-700">Phone</p><p className="text-sm text-gray-500">+1 (555) 123-4567</p></div></div>
                  <div className="flex items-start gap-3"><Mail className="w-4 h-4 text-teal-600 mt-0.5" /><div><p className="text-sm font-medium text-gray-700">Email</p><p className="text-sm text-gray-500">info@abc-institute.edu</p></div></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-[#1a2744] mb-6">Send us a Message</h3>
                {submitted && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">✓ Message sent successfully!</div>}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <input type="text" required placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm" />
                    <input type="email" required placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm" />
                  </div>
                  <input type="text" required placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm" />
                  <textarea required rows={5} placeholder="Your message..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none resize-none text-sm" />
                  <button type="submit" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1a2744] hover:bg-[#2a3a5c] text-white font-medium rounded-lg">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
