import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Star Wars API Explorer",
  description: "Explore the vast Star Wars universe with this API explorer.",
};

export default function Home() {
  return (
    <div className="max-w-4xl w-full mx-auto gap-6 px-6 flex flex-col items-center justify-start text-center">
      <h2 className="mt-10 scroll-m-20 pb-2 text-5xl font-semibold tracking-tight transition-colors">
        Felipe Gorostiaga
      </h2>
      <p className="text-xl text-muted-foreground text-neutral-300 max-w-2xl">
        Greetings, young Padawans. Present myself, I must! Skilled in the ways
        of coding, I am. From a galaxy far, far away, I come to show you my
        passion for web development. Strong, the Force in me is.
      </p>
    </div>
  );
}
