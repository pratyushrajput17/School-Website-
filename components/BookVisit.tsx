'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Phone, ArrowRight } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

export default function BookVisit() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="badge-pill">Campus Visit</span>

            <h2 className="heading-xl mt-6">
              Book a Campus Visit
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Experience our campus firsthand. Meet our faculty, explore our
              facilities, and discover why our school is the right choice for
              your child&apos;s future.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">
                    Flexible Scheduling
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Choose a date and time that works best for your family.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                  <Clock className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">
                    Personalized Tour
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    One-on-one guided tour with our admission counselor.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50">
                  <MapPin className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">
                    Campus Exploration
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    Visit classrooms, labs, library, sports facilities, and
                    more.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md focus-ring"
                aria-label="Schedule a campus visit"
              >
                Schedule a Visit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`tel:${schoolConfig.contact.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-7 py-3 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-ring"
                aria-label="Call us to book a visit"
              >
                <Phone className="h-4 w-4" />
                Call Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm lg:p-10">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent shadow-lg shadow-accent/20">
                  <Calendar className="h-8 w-8 text-white" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-primary">
                  Schedule Your Visit
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Fill in your preferred date and we&apos;ll confirm your
                  campus tour.
                </p>
              </div>

              <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="visit-name"
                      className="block text-xs font-medium text-muted-foreground"
                    >
                      Full Name
                    </label>
                    <input
                      id="visit-name"
                      type="text"
                      placeholder="Your name"
                      className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-primary placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="visit-phone"
                      className="block text-xs font-medium text-muted-foreground"
                    >
                      Phone Number
                    </label>
                    <input
                      id="visit-phone"
                      type="tel"
                      placeholder="Your phone"
                      className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-primary placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="visit-date"
                      className="block text-xs font-medium text-muted-foreground"
                    >
                      Preferred Date
                    </label>
                    <input
                      id="visit-date"
                      type="date"
                      className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="visit-time"
                      className="block text-xs font-medium text-muted-foreground"
                    >
                      Preferred Time
                    </label>
                    <select
                      id="visit-time"
                      className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <option value="">Select time</option>
                      <option value="9:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="visit-message"
                    className="block text-xs font-medium text-muted-foreground"
                  >
                    Message (Optional)
                  </label>
                  <textarea
                    id="visit-message"
                    rows={3}
                    placeholder="Any specific questions or requests..."
                    className="mt-1.5 w-full resize-none rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-primary placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md focus-ring"
                >
                  Request a Visit
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
