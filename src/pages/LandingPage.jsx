import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Menu,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import crmPreview from "../assets/LoginBanner.png";

const features = [
  {
    icon: UsersRound,
    title: "Lead management",
    description: "Keep every lead, conversation, and next step in one organized workspace.",
  },
  {
    icon: BarChart3,
    title: "Actionable insights",
    description: "Track pipeline performance and give your team clarity on what moves revenue.",
  },
  {
    icon: ShieldCheck,
    title: "Built for teams",
    description: "Create a shared, reliable process that helps every sales agent do their best work.",
  },
];

function LandingPage() {
  return (
    <main className="min-h-screen bg-lime-50 text-green-900">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-green-900 text-lime-100">C</span>
          clientix
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Primary navigation">
          <a href="#features" className="transition hover:text-green-700">Features</a>
          <a href="#how-it-works" className="transition hover:text-green-700">How it works</a>
          <Link to="/login" className="transition hover:text-green-700">Sign in</Link>
          <Link to="/signup" className="rounded-full bg-green-900 px-5 py-2.5 text-lime-50 transition hover:bg-green-800">Start free</Link>
        </nav>
        <button className="rounded-lg p-2 md:hidden" aria-label="Open menu"><Menu size={24} /></button>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-14 lg:grid-cols-2 lg:px-8 lg:pb-32 lg:pt-24">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-lime-200 px-4 py-2 text-sm font-semibold text-green-900">
            <Sparkles size={16} /> Your sales workflow, simplified
          </p>
          <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
            Build better customer relationships with Clientix.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-green-800">
            A calm, powerful CRM for teams that want to turn promising conversations into lasting customers.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-full bg-green-900 px-6 py-3.5 font-semibold text-lime-50 shadow-lg shadow-green-900/15 transition hover:-translate-y-0.5 hover:bg-green-800">
              Get started free <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="rounded-full border border-green-900/20 bg-white/60 px-6 py-3.5 font-semibold transition hover:bg-white">
              Sign in to Clientix
            </Link>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-green-800"><CheckCircle2 size={17} /> No credit card required</p>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-green-800">
            <Link to="/login" className="underline decoration-green-900/30 underline-offset-4 transition hover:text-green-950">Create a lead</Link>
            <Link to="/login" className="underline decoration-green-900/30 underline-offset-4 transition hover:text-green-950">Create an agent</Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-5 -rotate-3 rounded-3xl bg-lime-200" />
          <img
            src={crmPreview}
            alt="Clientix CRM dashboard preview"
            className="relative aspect-[4/3] w-full rounded-3xl border border-green-900/10 object-cover shadow-2xl shadow-green-900/20"
          />
        </div>
      </section>

      <section id="features" className="border-y border-green-900/10 bg-white/55 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Everything in one place</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Spend less time switching tools and more time closing deals.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl bg-lime-50 p-7 ring-1 ring-green-900/10">
                <Icon className="h-7 w-7 text-green-700" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-green-800">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:px-8">
        <div className="order-2 lg:order-1">
          <img src={crmPreview} alt="Clientix leads workspace" className="w-full rounded-3xl border border-green-900/10 object-cover shadow-xl" />
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-700">Made for momentum</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Your next customer is closer than you think.</h2>
          <ol className="mt-8 space-y-5">
            {["Capture and qualify new opportunities.", "Give every lead a clear next step.", "Measure the work that drives growth."].map((step, index) => (
              <li key={step} className="flex items-center gap-4 text-lg font-medium"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-green-900 text-sm text-lime-50">{index + 1}</span>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-6 mb-16 rounded-3xl bg-green-900 px-6 py-16 text-center text-lime-50 lg:mx-auto lg:max-w-7xl lg:px-12">
        <h2 className="text-3xl font-bold sm:text-4xl">Ready to grow with more clarity?</h2>
        <p className="mx-auto mt-4 max-w-xl text-lime-100">Create your Clientix workspace and give your team a better way to manage every opportunity.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/signup" className="rounded-full bg-lime-200 px-6 py-3 font-semibold text-green-950 transition hover:bg-lime-100">Create an account</Link>
          <Link to="/login" className="rounded-full border border-lime-100/40 px-6 py-3 font-semibold transition hover:bg-white/10">Sign in</Link>
        </div>
      </section>

      <footer className="border-t border-green-900/10 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-green-800 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Clientix. Better relationships, built together.</p>
          <div className="flex gap-5"><a href="#features" className="hover:text-green-950">Features</a><Link to="/login" className="hover:text-green-950">Sign in</Link><Link to="/signup" className="hover:text-green-950">Sign up</Link></div>
        </div>
      </footer>
    </main>
  );
}

export default LandingPage;
