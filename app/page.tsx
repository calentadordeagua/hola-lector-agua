import { Hero } from "@/components/landing/Hero";
import { BackgroundSlideshow } from "@/components/landing/BackgroundSlideshow";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { Github } from "lucide-react";

export const dynamic = 'force-static';
export const revalidate = false;

export default function Home() {
  return (
    <main className="relative grid h-svh grid-rows-[minmax(0,1fr)_auto] overflow-x-hidden overflow-y-auto">
      <SiteHeader showBack={false} />
      <BackgroundSlideshow />
      <Hero />

      <footer className="relative z-10 flex w-full flex-col items-center justify-center gap-3 border-t border-white/5 bg-black/40 px-4 py-4 text-center text-sm text-zinc-400 backdrop-blur-sm">
        <a
          href="https://github.com/NITHINSPACETIME/novels-reader"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View the project on GitHub"
          title="GitHub repository"
          className="rounded-xl border border-white/10 bg-black/30 p-3 transition-colors hover:border-white/25 hover:text-white"
        >
          <Github className="h-5 w-5" />
        </a>
        <div className="flex flex-col gap-1">
          <p>
            © 2026 COTE Reader. Made by{" "}
            <a
              href="https://github.com/NITHINSPACETIME"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zinc-300 transition-colors hover:text-white"
            >
              NITHINSPACETIME
            </a>
          </p>
          <p className="text-xs text-zinc-500">
            Not affiliated with the official Classroom of the Elite franchise.
          </p>
        </div>
      </footer>
    </main >
  );
}
