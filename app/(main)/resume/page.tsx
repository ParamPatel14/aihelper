import { Features } from "@/home/Features";
import { Hero } from "@/home/Hero";
import { QuestionsAndAnswers } from "@/home/QuestionsAndAnswers";
import { Steps } from "@/home/Steps";
import { Testimonials } from "@/home/Testimonials";


export default function Home() {
  return (
    <main className="mx-auto max-w-screen-2xl bg-dot px-8 pb-32 text-gray-900 lg:px-12">
      <Hero />
      <Steps />
      <Features />
      <Testimonials />
      <QuestionsAndAnswers />
    </main>
  );
}
