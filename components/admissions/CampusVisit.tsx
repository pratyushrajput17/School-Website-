'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, User, GraduationCap, Phone, MapPin, ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/section-header'
import { staggerContainer, cardVariant } from '@/lib/animations'

export default function CampusVisit() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32" id="campus-visit">
      <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />
      <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-blue-500/[0.03] blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Campus Visit"
          title="Experience Our"
          highlight="Campus in Person"
          description="Schedule a personalized campus tour and see firsthand what makes our school a special place for your child."
        />

        <motion.div
          className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-2xl shadow-lg shadow-blue-100/50 ring-1 ring-black/[0.02]">
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-blue-500/10 via-transparent to-primary/5" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border/60 bg-white p-4 shadow-sm">
                <Calendar className="h-5 w-5 text-blue-600" />
                <p className="mt-2 text-sm font-bold text-primary">Flexible Dates</p>
                <p className="text-xs text-muted-foreground">Mon–Sat, 9 AM – 4 PM</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-white p-4 shadow-sm">
                <MapPin className="h-5 w-5 text-blue-600" />
                <p className="mt-2 text-sm font-bold text-primary">Guided Tours</p>
                <p className="text-xs text-muted-foreground">Led by our admission team</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <div className="rounded-2xl border border-border/60 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-primary">Book Your Visit</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in your details and we&apos;ll confirm your campus tour within 24 hours.
              </p>

              <div className="mt-6 space-y-4">
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Preferred Date"
                    className="w-full rounded-xl border border-border/60 bg-white py-3.5 pl-11 pr-4 text-sm text-primary placeholder:text-muted-foreground focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    aria-label="Preferred date for campus visit"
                  />
                </div>

                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <select
                    className="w-full appearance-none rounded-xl border border-border/60 bg-white py-3.5 pl-11 pr-10 text-sm text-primary focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    aria-label="Preferred time for campus visit"
                    defaultValue=""
                  >
                    <option value="" disabled>Preferred Time</option>
                    <option value="9:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                  </select>
                </div>

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
                  <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Student Name"
                    className="w-full rounded-xl border border-border/60 bg-white py-3.5 pl-11 pr-4 text-sm text-primary placeholder:text-muted-foreground focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    aria-label="Student name"
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
                  <GraduationCap className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <select
                    className="w-full appearance-none rounded-xl border border-border/60 bg-white py-3.5 pl-11 pr-10 text-sm text-primary focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    aria-label="Preferred class"
                    defaultValue=""
                  >
                    <option value="" disabled>Preferred Class</option>
                    <option value="nursery">Nursery</option>
                    <option value="primary">Primary (I–V)</option>
                    <option value="middle">Middle (VI–VIII)</option>
                    <option value="secondary">Senior Secondary (IX–XII)</option>
                  </select>
                </div>

                <button
                  className="w-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  type="button"
                  aria-label="Book campus visit"
                >
                  Book Campus Visit
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
