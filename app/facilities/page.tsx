import type { Metadata } from "next"
import { Monitor, Library, FlaskConical, Shield, Bus, TreePine, Cpu, Wrench } from 'lucide-react'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { schoolConfig } from "@/lib/school-config"

export const metadata: Metadata = {
  title: "Facilities",
  description: "Explore the facilities at Adarsh High School — classrooms, library, computer lab, science lab, CCTV monitoring, transport, green campus, and smart learning lab.",
  alternates: { canonical: `${schoolConfig.url}/facilities` },
}

const facilityList = [
  { title: "Classrooms", description: "Spacious, well-ventilated classrooms designed for focused and effective learning.", icon: Monitor },
  { title: "Library", description: "A quiet and resource-rich library with a wide collection of books and study materials.", icon: Library },
  { title: "Computer Lab", description: "A fully equipped computer lab to develop digital literacy and technical skills.", icon: Cpu },
  { title: "Science Lab", description: "Well-maintained physics, chemistry and biology labs for hands-on practical learning.", icon: FlaskConical },
  { title: "CCTV Monitoring", description: "School premises are monitored with CCTV cameras to ensure student safety.", icon: Shield },
  { title: "School Transport", description: "Reliable pick-up and drop service available for students from nearby areas.", icon: Bus },
  { title: "Green Environment", description: "A peaceful campus surrounded by greenery that supports focused learning and wellbeing.", icon: TreePine },
  { title: "Smart Learning Lab", description: "Currently under development and will be introduced in the future.", icon: Wrench, comingSoon: true },
] as const

export default function FacilitiesPage() {
  return (
    <>
      <Navbar />
      <section className="relative min-h-[50vh] overflow-hidden bg-gradient-to-b from-saffron-light/30 via-white to-white">
        <div className="absolute -top-48 right-0 h-[600px] w-[600px] rounded-full bg-saffron/5 blur-3xl" />
        <div className="absolute -bottom-48 left-0 h-[500px] w-[500px] rounded-full bg-deep-blue/5 blur-3xl" />
        <div className="relative mx-auto flex min-h-[50vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="badge-pill">Our Facilities</span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-deep-blue sm:text-5xl lg:text-6xl">
            School Facilities
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We provide a safe, supportive and well-equipped environment for every student.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {facilityList.map((facility) => (
              <div
                key={facility.title}
                className="group rounded-2xl border border-deep-blue/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/20 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-saffron-light">
                  <facility.icon className="h-6 w-6 text-saffron-dark" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-deep-blue">{facility.title}</h3>
                  {'comingSoon' in facility && facility.comingSoon && (
                    <span className="shrink-0 rounded-full bg-saffron-light px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-saffron-dark">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {facility.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
