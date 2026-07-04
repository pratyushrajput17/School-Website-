'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, ArrowRight, Send } from 'lucide-react'
import { contactInfo } from '@/constants'

const contactMethods = [
  {
    icon: MapPin,
    label: 'Visit Us',
    value: contactInfo.address,
    bg: 'bg-blue-50',
    color: 'text-blue-600',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
    bg: 'bg-emerald-50',
    color: 'text-emerald-600',
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    bg: 'bg-violet-50',
    color: 'text-violet-600',
  },
  {
    icon: Clock,
    label: 'Office Hours',
    value: contactInfo.officeHours,
    bg: 'bg-amber-50',
    color: 'text-amber-600',
  },
] as const

export default function Contact() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className="badge-pill">Contact Us</span>
          </motion.div>

          <motion.h2
            className="heading-xl mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            Get in Touch
          </motion.h2>

          <motion.p
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            We&apos;d love to hear from you. Reach out to us through any of
            the channels below.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          <motion.div
            className="space-y-4 lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {contactMethods.map((method) => (
              <div
                key={method.label}
                className="group rounded-2xl border border-border/50 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${method.bg}`}
                  >
                    <method.icon className={`h-6 w-6 ${method.color}`} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {method.label}
                    </p>

                    {'href' in method && method.href ? (
                      <Link
                        href={method.href}
                        className="mt-0.5 block text-sm font-semibold text-primary transition-colors hover:text-accent"
                      >
                        {method.value}
                      </Link>
                    ) : (
                      <p className="mt-0.5 text-sm font-semibold text-primary">
                        {method.value}
                      </p>
                    )}
                  </div>

                  {'href' in method && method.href && (
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" />
                  )}
                </div>
              </div>
            ))}

            <div className="overflow-hidden rounded-2xl border border-border/50 shadow-sm">
              <div className="aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200" />
              <div className="flex items-center justify-between bg-white px-5 py-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Find us on map
                </div>
                <Link
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-accent transition-colors hover:text-accent/80"
                  aria-label="Open Google Maps"
                >
                  Open Map &rarr;
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="rounded-3xl border border-border/50 bg-white p-8 shadow-sm lg:p-10">
              <h3 className="text-xl font-bold text-primary">
                Send Us a Message
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We&apos;ll get back to you within 24 hours.
              </p>

              <form
                className="mt-8 space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-primary"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your full name"
                      className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-primary placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-primary"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-primary placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-medium text-primary"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="How can we help?"
                    className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-primary placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-primary"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    className="mt-1.5 w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm text-primary placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md focus-ring"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
