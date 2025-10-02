import React, { useState } from "react";
import Scene from "./3js/Scene";
import Nav from "./components/Nav";
import Story from "./components/Story";
import ScrollInfo from "./components/ScrollInfo";
import NormalText from "./components/NormalText";

const App = () => {
  const [story, setStory] = useState(false);
  return (
    <main className="relative overflow-hidden">
      {/* <Story story={story} /> */}
      <nav>
        <Nav story={story} setStory={setStory} />
      </nav>
      {story ? <ScrollInfo /> : null}
      {/* <ScrollInfo />   */}
      <NormalText />
      <section>
        <Scene story={story} />
      </section>
    </main>
  );
};

export default App;
