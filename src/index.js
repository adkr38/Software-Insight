import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Home from "./components/home.js";
import Trending from "./components/trending.js";
import Analytics from "./components/analytics.js";
import Versus from "./components/versus.js";
import Menu from "./components/menu.js";
import { ThemeProvider } from "./context/theme.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import "../dist/output.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
      toggleTheme: () => {
        console.log("TOGGLING THEME!");
        this.setState(({ theme }) => ({
          theme: theme === "light" ? "dark" : "light",
        }));
      },
    };
  }
  render() {
    const lightBg =
      "min-w-screen h-screen px-5 py-3 clear-both bg-gradient-to-br bg-cover from-sky-100 to-purple-100 sm:bg-gradient-to-br sm:from-purple-50 sm:via-sky-100 sm:to-purple-100";
    const darkBg =
      "min-w-screen h-screen clear-both px-5 py-3 bg-gradient-to-tr from-[rgba(0,0,0,0.95)_80%] via-slate-800 to-rose-800 bg-cover";
    const { theme } = this.state;
    return (
      <ThemeProvider value={this.state}>
        <div className={theme === "light" ? lightBg : darkBg}>
          {/*<div className="min-w-screen h-full">*/}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/versus" element={<Versus />} />
              {/* <Analytics /> */}
              {/* <Trending />*/}
              {/*<Home />*/}
              {/* <Versus /> */}
            </Routes>
          </BrowserRouter>
          {/*</div>*/}
        </div>
      </ThemeProvider>
    );
  }
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
