import {setRequestLocale} from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Estimator from '@/components/sections/Estimator';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import ContactForm from '@/components/sections/ContactForm';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function Home({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Projects />
        <Estimator />
        <Process />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
