import { schoolConfig } from '@/lib/school-config'

export default function MaaSaraswati() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-saffron-light/20 via-white to-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-saffron-light to-saffron/10 shadow-lg sm:h-40 sm:w-40">
            <span className="text-5xl sm:text-6xl">🪷</span>
          </div>

          <p className="shloka text-deep-blue">॥ या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता ॥</p>
          <p className="shloka text-deep-blue">॥ या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना ॥</p>
          <p className="shloka text-deep-blue">॥ या ब्रह्माच्युत शंकर प्रभृतिभिर्देवैः सदा वन्दिता ॥</p>
          <p className="shloka text-deep-blue">॥ सा मां पातु सरस्वती भगवती निःशेषजाड्यापहा ॥</p>

          <p className="mt-6 text-base text-muted-foreground sm:text-lg">
            हे माँ सरस्वती, जो कुन्द के फूल, चन्द्रमा, हिम और मोतियों के समान धवल हैं,
            जिन्होंने शुभ्र वस्त्र धारण किए हैं, जिनके हाथ में वीणा है और जो श्वेत कमल पर विराजमान हैं,
            हमारी बुद्धि को प्रकाशित करें और अज्ञान को दूर करें।
          </p>

          <div className="mt-10 border-t border-saffron/20 pt-8">
            <p className="text-lg font-semibold text-deep-blue">
              माँ सरस्वती की कृपा से ही विद्या, बुद्धि और ज्ञान की प्राप्ति होती है।
            </p>
            <p className="mt-2 text-base text-muted-foreground">
              {schoolConfig.name} में हम विद्यार्थियों को ज्ञान और संस्कार के साथ जीवन के लिए तैयार करते हैं।
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
