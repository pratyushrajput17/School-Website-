const quotes = [
  {
    text: 'उठो, जागो और तब तक मत रुको जब तक लक्ष्य प्राप्त न हो जाए।',
    author: 'स्वामी विवेकानंद',
    description: 'प्रेरणा और आत्मविश्वास का संदेश',
  },
  {
    text: 'सपने वो नहीं जो नींद में आते हैं, सपने वो हैं जो नींद नहीं आने देते।',
    author: 'डॉ. ए.पी.जे. अब्दुल कलाम',
    description: 'मेहनत और लगन का संदेश',
  },
  {
    text: 'शिक्षा सबसे अच्छी मित्र है। एक शिक्षित व्यक्ति हर जगह सम्मान पाता है। शिक्षा शारीरिक और मानसिक सुंदरता बढ़ाती है।',
    author: 'आचार्य चाणक्य',
    description: 'शिक्षा का महत्व',
  },
] as const

export default function InspirationalQuotes() {
  return (
    <section className="relative overflow-hidden bg-deep-blue py-24 lg:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-saffron/5 via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-saffron/30 bg-saffron/10 px-4 py-1.5 text-sm font-medium text-saffron">
            प्रेरणादायक विचार
          </span>
          <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            महान विभूतियों के प्रेरक वचन
          </h2>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {quotes.map((q) => (
            <div
              key={q.author}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-saffron/30 hover:bg-white/10"
            >
              <div className="mb-4 text-4xl text-saffron/60">❝</div>
              <p className="text-lg font-medium leading-relaxed text-white/90 hindi-text">
                {q.text}
              </p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-semibold text-saffron">{q.author}</p>
                <p className="mt-1 text-sm text-white/50">{q.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
