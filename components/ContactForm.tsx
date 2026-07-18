'use client'

import { Phone, Mail, MessageSquare, User, Send } from 'lucide-react'

export default function ContactForm() {
  return (
    <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for your message. We will get back to you shortly.'); }} className="space-y-5">
      <div className="relative">
        <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder="Name" aria-label="Name" required className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20" />
      </div>
      <div className="relative">
        <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input type="tel" placeholder="Phone" aria-label="Phone" required className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20" />
      </div>
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input type="email" placeholder="Email" aria-label="Email" required className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20" />
      </div>
      <div className="relative">
        <MessageSquare className="absolute left-4 top-5 h-4 w-4 text-muted-foreground" />
        <textarea rows={5} placeholder="Message" aria-label="Message" required className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20 resize-none" />
      </div>
      <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-deep-blue px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light">
        Send Message
        <Send className="h-4 w-4" />
      </button>
    </form>
  )
}
