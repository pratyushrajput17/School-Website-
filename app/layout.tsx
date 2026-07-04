import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import { schoolConfig } from "@/lib/school-config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const { metadata: meta, contact } = schoolConfig

export const metadata: Metadata = {
  metadataBase: new URL(schoolConfig.url),
  title: {
    default: meta.defaultTitle,
    template: meta.titleTemplate,
  },
  description: schoolConfig.description,
  applicationName: meta.applicationName,
  creator: meta.creator,
  publisher: meta.publisher,
  category: meta.category,
  keywords: [
    "school",
    "education",
    "academics",
    "admissions",
    "campus",
    "learning",
    "students",
    "teachers",
    schoolConfig.name.toLowerCase(),
    schoolConfig.board,
    "k-12 school",
  ],
  authors: [{ name: schoolConfig.name }],
  alternates: {
    canonical: schoolConfig.url,
  },
  openGraph: {
    type: "website",
    locale: meta.locale,
    siteName: meta.siteName,
    title: meta.defaultTitle,
    description: schoolConfig.description,
    url: schoolConfig.url,
    images: [
      {
        url: meta.ogImage,
        width: 1200,
        height: 630,
        alt: schoolConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.defaultTitle,
    description: schoolConfig.description,
    images: [meta.ogImage],
    site: meta.twitterHandle,
    creator: meta.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  appleWebApp: {
    title: schoolConfig.name,
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "EducationalOrganization",
                name: schoolConfig.name,
                description: schoolConfig.description,
                url: schoolConfig.url,
                logo: `${schoolConfig.url}${schoolConfig.logoPath}`,
                foundingDate: schoolConfig.establishedYear,
                foundingYear: schoolConfig.establishedYear,
                areaServed: "Knowledge City and surrounding regions",
                knowsAbout: ["Education", "K-12 School", "Academics"],
                address: {
                  "@type": "PostalAddress",
                  streetAddress: contact.address.split(",")[0].trim(),
                  addressLocality: "Knowledge City",
                  addressRegion: "State",
                  postalCode: "400001",
                  addressCountry: meta.country,
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: contact.phone.replace(/\s/g, ''),
                  contactType: "admissions",
                  email: contact.email,
                  availableLanguage: ["English", "Hindi"],
                },
                sameAs: [
                  schoolConfig.socialLinks.facebook,
                  schoolConfig.socialLinks.instagram,
                  schoolConfig.socialLinks.youtube,
                  schoolConfig.socialLinks.linkedin,
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: schoolConfig.name,
                url: schoolConfig.url,
                description: schoolConfig.description,
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${schoolConfig.url}/search?q={search_term_string}`,
                  },
                  "query-input": "required name=search_term_string",
                },
              },
            ]),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ScrollProgress />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
