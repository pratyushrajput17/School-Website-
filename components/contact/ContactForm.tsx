'use client'

import { motion } from 'framer-motion'
import { User, Mail, Phone, GraduationCap, MessageSquare, Send } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'



export default function ContactForm() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.02] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Send Us a Message"
          title="We're Here to"
          highlight="Help"
          description="Have a specific question? Fill out the form below and our team will get back to you within 24 hours."
        />

        <motion.div
          className="mt-16"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm">
            <div className="grid lg:grid-cols-5">
              <motion.div
                variants={cardVariant}
                className="hidden bg-gradient-to-br from-blue-600 to-blue-500 p-10 lg:col-span-2 lg:block"
              >
                <div className="flex h-full flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white">Start a Conversation</h3>
                  <p className="mt-3 text-sm leading-relaxed text-blue-100">
                    Whether you&apos;re interested in admissions, have questions
                    about our programs, or want to schedule a visit — we&apos;re
                    here for you.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-blue-200">Call Us</p>
                        <p className="text-sm font-semibold text-white">{schoolConfig.contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-blue-200">Email</p>
                        <p className="text-sm font-semibold text-white">{schoolConfig.contact.email || 'info@adarshhighschool.edu'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                        <GraduationCap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-blue-200">Office</p>
                        <p className="text-sm font-semibold text-white">Mon–Sat, 8 AM – 4 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={cardVariant}
                className="p-8 lg:col-span-3 lg:p-10"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Parent Name"
                      className="w-full rounded-xl border border-border/60 bg-white py-3.5 pl-11 pr-4 text-sm text-primary placeholder:text-muted-foreground focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      aria-label="Parent name"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full rounded-xl border border-border/60 bg-white py-3.5 pl-11 pr-4 text-sm text-primary placeholder:text-muted-foreground focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      aria-label="Email address"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full rounded-xl border border-border/60 bg-white py-3.5 pl-11 pr-4 text-sm text-primary placeholder:text-muted-foreground focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      aria-label="Phone number"
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Student Name"
                      className="w-full rounded-xl border border-border/60 bg-white py-3.5 pl-11 pr-4 text-sm text-primary placeholder:text-muted-foreground focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      aria-label="Student name"
                    />
                  </div>
                  <div className="relative sm:col-span-2">
                    <GraduationCap className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <select
                      className="w-full appearance-none rounded-xl border border-border/60 bg-white py-3.5 pl-11 pr-10 text-sm text-primary focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      aria-label="Class interested in"
                      defaultValue=""
                    >
                      <option value="" disabled>Class Interested In</option>
                      <option value="nursery">Nursery</option>
                      <option value="primary">Primary (I–V)</option>
                      <option value="middle">Middle (VI–VIII)</option>
                      <option value="secondary">Senior Secondary (IX–X)</option>
                      <option value="senior">Senior Secondary (XI–XII)</option>
                    </select>
                  </div>
                  <div className="relative sm:col-span-2">
                    <MessageSquare className="absolute left-4 top-6 h-4 w-4 text-muted-foreground" />
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full rounded-xl border border-border/60 bg-white py-3.5 pl-11 pr-4 text-sm text-primary placeholder:text-muted-foreground focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                      aria-label="Your message"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Send Message
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
