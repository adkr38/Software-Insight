import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Home from "./components/home.js";
import Trending from "./components/trending.js";
import Analytics from "./components/analytics.js";
import Versus from "./components/versus.js";
import Menu from "./components/menu.js";
import { ThemeProvider } from "./context/theme.js";
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
      "min-w-screen h-full px-5 py-3 bg-gradient-to-br bg-fixed from-sky-100 to-purple-100 sm:bg-gradient-to-br sm:from-purple-50 sm:via-sky-100 sm:to-purple-100";
    const darkBg =
      "min-w-screen h-full px-5 py-3 bg-gradient-to-tr from-[black_80%] via-slate-800 to-rose-800 bg-fixed ";
    const { theme } = this.state;
    return (
      <ThemeProvider value={this.state}>
        <div className={theme === "light" ? lightBg : darkBg}>
          <div className="min-w-screen h-full">
            {/* <Analytics /> */}
            {/* <Trending />*/}
            {/*<Home />*/}
            <Home />
            {/* <Versus /> */}
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
