import React, { useState } from "react";
import Scene from "./3js/Scene";
import Nav from "./components/Nav";
import Story from "./components/Story";
import ScrollInfo from "./components/ScrollInfo";
import NormalText from "./components/NormalText";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [story, setStory] = useState(false);
  return (
    <main className=" absolute overflow-hidden">
      {/* <Story story={story} /> */}
      <nav>
        <Nav story={story} setStory={setStory} />
      </nav>

      {story && (
        <AnimatePresence>
          <motion.div
            className="absolute z-[999] w-screen h-full" // Tailwind form (or add inline style below)
            style={{ display: "block" }} // ensures full block behavior
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
          >
            <ScrollInfo story={story} setStory={setStory} />
          </motion.div>
        </AnimatePresence>
      )}
      {/* <ScrollInfo />   */}
      <NormalText />
      <section>
        <Scene story={story} />
      </section>
    </main>
  );
};

export default App;
