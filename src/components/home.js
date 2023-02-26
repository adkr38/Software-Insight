import React from "react";
import { ThemeConsumer } from "../context/theme.js";
import * as md from "react-icons/md";
import * as ai from "react-icons/ai";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Hero />
        <PopularTable />
        <GetStarted />
      </React.Fragment>
    );
  }
}

class GetStarted extends React.Component {
  render() {
    const lightP = "font-raleway font-md md:text-xl";
    const darkP = "font-raleway font-md text-rose-600 md:text-xl";
    const lightButton =
      "mt-6 sm:mt-10 text-sm bg-black hover:bg-slate-700 text-white px-8 py-4 rounded-xl shadow-sm active:shadow-inner shadow-slate-500";

    const darkButton =
      "mt-6 sm:mt-10 text-sm bg-gradient-to-bl from-rose-900 hover:from-rose-500 text-slate-300 px-8 py-4 rounded-xl shadow-sm active:shadow-inner active:shadow-slate-700 shadow-slate-700";

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <div className=" flex flex-col mt-9 justify-center align-middle items-center text-center">
            <p className={theme === "light" ? lightP : darkP}>
              Insight & charting on your favourite languages , frameworks &
              programmers,{" "}
              <span
                className={
                  theme === "light" ? "text-sky-500" : "text-slate-400"
                }
              >
                for free.
              </span>
            </p>
            <Link to="/trending">
              <button className={theme === "light" ? lightButton : darkButton}>
                Get Started
              </button>
            </Link>
          </div>
        )}
      </ThemeConsumer>
    );
  }
}

class PopularTable extends React.Component {
  render() {
    const spanLight =
      "inline-block font-raleway font-extrabold text-sm md:text-md sm:mr-3";
    const spanDark =
      "inline-block font-raleway font-extrabold text-sm md:text-md text-rose-600 sm:mr-3";
    const thLight =
      "sticky text-center top-0 text-xs font-mono font-extrabold border-b border-slate-400";
    const thDark =
      "sticky text-center top-0 text-xs text-slate-500 font-mono font-extrabold border-b border-rose-800";
    const thDivCss = "p-2";
    const tdLight = "font-mono text-xs border-b-2 border-slate-200 p-1";
    const tdDark =
      "font-mono text-xs border-b-2 border-slate-800 p-1 text-slate-400";
    const firstTdLight =
      "font-mono text-xs text-center text-sky-500 border-b border-slate-200 p-1";

    const firstTdDark =
      "font-mono text-xs text-center text-rose-600 border-b border-slate-800 p-1";

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <React.Fragment>
            <div className="w-full text-center">
              <span className={theme === "light" ? spanLight : spanDark}>
                Last{" "}
                <span
                  className={
                    theme === "light" ? "text-sky-600" : "text-slate-400"
                  }
                >
                  30
                </span>{" "}
                Days
              </span>
            </div>
            <table className="w-full lg:w-1/2  m-auto text-bold text-right border-collapse overflow-scroll">
              <thead>
                <tr>
                  <th className={theme === "light" ? thLight : thDark}>
                    <div className={thDivCss}>Language</div>
                  </th>

                  <th className={theme === "light" ? thLight : thDark}>
                    <div className={thDivCss}>Comments</div>
                  </th>

                  <th className={theme === "light" ? thLight : thDark}>
                    <div className={thDivCss}>Searches</div>
                  </th>

                  <th className={theme === "light" ? thLight : thDark}>
                    <div className={thDivCss}>Repositories</div>
                  </th>
                </tr>
              </thead>
              <tbody className="align-baseline">
                <tr>
                  <td
                    className={theme === "light" ? firstTdLight : firstTdDark}
                  >
                    Python
                  </td>

                  <td className={theme === "light" ? tdLight : tdDark}>
                    26922
                  </td>

                  <td className={theme === "light" ? tdLight : tdDark}>511</td>

                  <td className={theme === "light" ? tdLight : tdDark}>1511</td>
                </tr>

                <tr>
                  <td
                    className={theme === "light" ? firstTdLight : firstTdDark}
                  >
                    JavaScript
                  </td>

                  <td className={theme === "light" ? tdLight : tdDark}>
                    11233
                  </td>

                  <td className={theme === "light" ? tdLight : tdDark}>398</td>

                  <td className={theme === "light" ? tdLight : tdDark}>1003</td>
                </tr>

                <tr>
                  <td
                    className={theme === "light" ? firstTdLight : firstTdDark}
                  >
                    TypeScript
                  </td>

                  <td className={theme === "light" ? tdLight : tdDark}>9420</td>

                  <td className={theme === "light" ? tdLight : tdDark}>125</td>

                  <td className={theme === "light" ? tdLight : tdDark}>603</td>
                </tr>

                <tr>
                  <td
                    className={theme === "light" ? firstTdLight : firstTdDark}
                  >
                    Go
                  </td>

                  <td className={theme === "light" ? tdLight : tdDark}>6111</td>

                  <td className={theme === "light" ? tdLight : tdDark}>101</td>

                  <td className={theme === "light" ? tdLight : tdDark}>612</td>
                </tr>
              </tbody>
            </table>
          </React.Fragment>
        )}
      </ThemeConsumer>
    );
  }
}

class Hero extends React.Component {
  render() {
    const lightH1 =
      "font-raleway  m-auto text-2xl font-extrabold tracking-wider sm:text-5xl xl:text-6xl";
    const darkH1 =
      "font-raleway  m-auto text-2xl font-extrabold text-slate-500 tracking-wider sm:text-5xl xl:text-6xl";
    const lightTitleSpan =
      "font-raleway text-transparent bg-gradient-to-bl from-slate-500 via-sky-300 to-slate-500 bg-clip-text";
    const darkTitleSpan =
      "font-raleway text-transparent bg-gradient-to-bl from-rose-600 via-rose-400 to-rose-600 bg-clip-text";

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <div className="hero p-10 py-10 sm:px-20  md:px-32 text-center w-auto m-auto">
            <h1 className={theme === "light" ? lightH1 : darkH1}>
              Get information & analytics on the
              <span
                className={theme === "light" ? lightTitleSpan : darkTitleSpan}
              >
                {" "}
                latest software trends.
              </span>
            </h1>
          </div>
        )}
      </ThemeConsumer>
    );
  }
}

class NavBar extends React.Component {
  render() {
    const spanLight =
      "inline-block font-raleway font-extrabold text-normal cursor-pointer md:text-lg hover:text-sky-300 sm:mr-3";
    const spanDark =
      "inline-block font-raleway font-extrabold text-normal cursor-pointer md:text-lg text-rose-600 hover:text-rose-400 sm:mr-3";
    const versionSpanLight =
      "p-2 rounded-xl font-raleway bg-slate-200 shadow-inner shadow-slate-300 text-sm text-slate-800 hidden md:block";
    const versionSpanDark =
      "p-2 rounded-xl font-raleway bg-slate-700 shadow-inner shadow-slate-800 text-sm text-rose-400 hidden md:block";
    const navLight =
      "bg-gray-50/20 flex flex-row justify-between align-middle items-center gap-3 p-1 border-slate-200 border-b ";
    const navDark =
      "bg-transparent flex flex-row justify-between align-middle items-center gap-3 p-1 border-slate-700 border-b ";
    const navSeparatorLight =
      "pr-2 sm:pr-4 md:pr-5 border-r border-slate-200 flex flex-row text-center items-center";
    const navSeparatorDark =
      "pr-2 sm:pr-4 md:pr-5 border-r border-slate-700 flex flex-row text-center items-center";

    const mediaIconLight = "cursor-pointer text-2xl";
    const mediaIconDark = "cursor-pointer text-2xl text-rose-400";

    return (
      <ThemeConsumer>
        {({ theme, toggleTheme }) => (
          <React.Fragment>
            <nav className={theme === "light" ? navLight : navDark}>
              <div
                className={
                  theme === "light" ? navSeparatorLight : navSeparatorDark
                }
              >
                <span className={theme === "light" ? spanLight : spanDark}>
                  Software Insight
                </span>
                <span
                  className={
                    theme === "light" ? versionSpanLight : versionSpanDark
                  }
                >
                  v1.0.0
                </span>
              </div>
              <div className="flex flex-row justify-center items-center gap-6 align-middle h-auto overflow-hidden">
                <span className={theme === "light" ? spanLight : spanDark}>
                  About
                </span>

                <a href="https://github.com/adkr38" target="_blank">
                  <ai.AiFillGithub
                    className={
                      theme === "light" ? mediaIconLight : mediaIconDark
                    }
                  ></ai.AiFillGithub>
                </a>
                <button
                  className={
                    (theme === "light" ? "hidden" : "block") + " animate-fadeIn"
                  }
                  onClick={toggleTheme}
                >
                  <md.MdLightMode className={mediaIconDark}></md.MdLightMode>
                </button>

                <button
                  className={
                    (theme === "dark" ? "hidden" : "block") + " animate-fadeIn"
                  }
                  onClick={toggleTheme}
                >
                  <md.MdDarkMode className={mediaIconLight}></md.MdDarkMode>
                </button>
              </div>
            </nav>
          </React.Fragment>
        )}
      </ThemeConsumer>
    );
  }
}

export default Home;
