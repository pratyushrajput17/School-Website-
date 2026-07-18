import { FileText, Search, Users, ClipboardCheck, GraduationCap } from 'lucide-react'

const steps = [
  { icon: FileText, title: 'Get Information', description: 'Fill the online form or visit the school to collect information about admissions.' },
  { icon: Search, title: 'School Visit', description: 'Visit our campus, meet the teachers, and experience the learning environment.' },
  { icon: Users, title: 'Interaction / Assessment', description: 'A simple conversation and assessment to understand your child\'s potential.' },
  { icon: ClipboardCheck, title: 'Submit Documents', description: 'Complete the process by submitting all required documents.' },
  { icon: GraduationCap, title: 'Confirmation', description: 'Once confirmed, welcome to the Adarsh High School family!' },
] as const

export default function AdmissionJourney() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Admission Process</span>
          <h2 className="heading-xl mt-6">
            How to Apply
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A simple and transparent admission process designed to be smooth and hassle-free for your family.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-deep-blue/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                <step.icon className="h-7 w-7 text-saffron-dark" />
              </div>

              <div className="mt-3 flex h-8 w-8 items-center justify-center rounded-full bg-saffron-light text-sm font-bold text-saffron-dark">
                {index + 1}
              </div>

              <h3 className="mt-4 text-lg font-bold text-deep-blue">{step.title}</h3>
              <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
