import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

export default function Index() {
  return (
    <div className="bg-background min-h-screen">
      <Nav />
      <main className="pt-16">
        <Hero />
      </main>
    </div>
  );
}
