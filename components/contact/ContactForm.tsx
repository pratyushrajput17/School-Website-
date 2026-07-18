import { User, Mail, Phone, GraduationCap, MessageSquare, Send } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

export default function ContactForm() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Send a Message</span>
          <h2 className="heading-xl mt-6">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a question? Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="mt-16">
          <div className="overflow-hidden rounded-2xl border border-deep-blue/10 bg-white shadow-sm">
            <div className="grid lg:grid-cols-5">
              <div className="hidden bg-gradient-to-br from-deep-blue to-deep-blue/95 p-10 lg:col-span-2 lg:block">
                <div className="flex h-full flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white">Start a Conversation</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Whether you need information about admissions, our programmes,
                    or a campus visit — we are happy to help.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                        <Phone className="h-5 w-5 text-saffron" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white/50">Phone</p>
                        <p className="text-sm font-semibold text-white">{schoolConfig.contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                        <Mail className="h-5 w-5 text-saffron" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white/50">Email</p>
                        <p className="text-sm font-semibold text-white">{schoolConfig.contact.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                        <GraduationCap className="h-5 w-5 text-saffron" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-white/50">Office Hours</p>
                        <p className="text-sm font-semibold text-white">{schoolConfig.contact.officeHours}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:col-span-3 lg:p-10">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Parent's Name"
                      className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                      aria-label="Parent's Name"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                      aria-label="Email Address"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                      aria-label="Phone Number"
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Child's Name"
                      className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                      aria-label="Child's Name"
                    />
                  </div>
                  <div className="relative sm:col-span-2">
                    <GraduationCap className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <select
                      className="w-full appearance-none rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-10 text-sm text-deep-blue focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
                      aria-label="Class"
                      defaultValue=""
                    >
                      <option value="" disabled>Select Class</option>
                      <option value="nursery">Nursery</option>
                      <option value="primary">Primary (I–V)</option>
                      <option value="middle">Middle (VI–VIII)</option>
                      <option value="secondary">High School (IX–X)</option>
                      <option value="senior">Senior Secondary (XI–XII)</option>
                    </select>
                  </div>
                  <div className="relative sm:col-span-2">
                    <MessageSquare className="absolute left-4 top-6 h-4 w-4 text-muted-foreground" />
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full rounded-xl border border-deep-blue/10 bg-white py-3.5 pl-11 pr-4 text-sm text-deep-blue placeholder:text-muted-foreground focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20 resize-none"
                      aria-label="Your Message"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full bg-deep-blue px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-deep-blue-light"
                    >
                      Send Message
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
