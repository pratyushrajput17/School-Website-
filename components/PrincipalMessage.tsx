import { Quote, User } from 'lucide-react'
import { schoolConfig } from '@/lib/school-config'

export default function PrincipalMessage() {
  return (
    <section className="bg-saffron-light/20 py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">Principal&apos;s Message</span>
          <h2 className="heading-xl mt-6">
            A Message to Parents and Students
          </h2>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-saffron/30 lg:-inset-6" />
              <div className="relative h-72 w-72 lg:h-96 lg:w-96">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-saffron/10 via-saffron-light to-white p-1 shadow-xl shadow-saffron/10">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                    <User className="h-28 w-28 text-saffron/20 lg:h-36 lg:w-36" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="relative">
              <Quote className="h-10 w-10 text-saffron/30" />
              <blockquote className="mt-2 text-xl italic leading-relaxed text-deep-blue/80 lg:text-2xl">
                &ldquo;Education is not only about achieving academic success, but also about becoming a responsible and compassionate human being.&rdquo;
              </blockquote>
            </div>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                At {schoolConfig.name}, we believe that true education goes beyond textbooks and examinations. Our focus is on providing quality education that builds strong character, instils discipline, and nurtures every student&apos;s unique potential.
              </p>
              <p>
                We teach our students to respect their parents, teachers, and elders — values that form the foundation of a strong and compassionate society. Our dedicated team of experienced teachers works tirelessly to create a positive and supportive environment where every child feels valued and encouraged to grow.
              </p>
              <p>
                We are committed to the holistic development of each student — academically, morally, and socially. With a balanced emphasis on studies, sports, and cultural activities, we prepare our students not just for exams, but for life.
              </p>
            </div>

            <div className="mt-8 border-t border-saffron/20 pt-6">
              <p className="text-lg font-semibold text-deep-blue">
                {schoolConfig.principal.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {schoolConfig.principal.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
