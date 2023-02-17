import React from "react";
// import * as d3 from "d3";
// import FetchProgramStats from "../fetch";

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
    const pCss = "font-raleway font-md md:text-xl";
    return (
      <div className=" flex flex-col mt-9 justify-center align-middle items-center text-center">
        <p className={pCss}>
          Insight & charting on your favourite languages , frameworks &
          programmers, <span className="text-sky-500">for free.</span>
        </p>
        <button className="mt-6 sm:mt-10 text-sm bg-black hover:bg-slate-700 text-white px-8 py-4 rounded-xl shadow-sm active:shadow-inner shadow-slate-500">
          Get Started
        </button>
      </div>
    );
  }
}

class PopularTable extends React.Component {
  render() {
    const thCss =
      "sticky text-center top-0 text-xs font-mono font-extrabold border-b border-slate-400";
    const thDivCss = "p-2";

    const tdCss = " font-mono text-xs border-b-2 border-slate-200 p-1";
    const firstTdCss =
      "font-mono text-xs text-center text-sky-500 border-b border-slate-200 p-1";

    return (
      <React.Fragment>
        <div className="w-full text-center">
          <span className="text-xs p-1 border-b border-slate-400 inline-block mb-1 md:mb-5 text-center ">
            Last <span className="text-sky-600">30</span> Days
          </span>
        </div>
        <table className="w-full lg:w-1/2  m-auto text-bold text-right border-collapse overflow-scroll">
          <thead>
            <tr>
              <th className={thCss}>
                <div className={thDivCss}>Language</div>
              </th>

              <th className={thCss}>
                <div className={thDivCss}>Comments</div>
              </th>

              <th className={thCss}>
                <div className={thDivCss}>Searches</div>
              </th>

              <th className={thCss}>
                <div className={thDivCss}>Repositories</div>
              </th>
            </tr>
          </thead>
          <tbody className="align-baseline bg-white/10">
            <tr>
              <td className={firstTdCss}>Python</td>

              <td className={tdCss}>26922</td>

              <td className={tdCss}>511</td>

              <td className={tdCss}>1511</td>
            </tr>

            <tr>
              <td className={firstTdCss}>JavaScript</td>

              <td className={tdCss}>11233</td>

              <td className={tdCss}>398</td>

              <td className={tdCss}>1003</td>
            </tr>

            <tr>
              <td className={firstTdCss}>TypeScript</td>

              <td className={tdCss}>9420</td>

              <td className={tdCss}>125</td>

              <td className={tdCss}>603</td>
            </tr>

            <tr>
              <td className={firstTdCss}>Go</td>

              <td className={tdCss}>6111</td>

              <td className={tdCss}>101</td>

              <td className={tdCss}>612</td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

class Hero extends React.Component {
  render() {
    return (
      <div className="hero p-10 py-10 sm:px-20  md:px-32 text-center w-auto m-auto">
        <h1 className=" font-raleway  m-auto text-2xl font-extrabold tracking-wider sm:text-5xl xl:text-6xl">
          Get information & analytics on the
          <span className=" font-raleway text-transparent bg-gradient-to-bl from-slate-500 via-sky-300 to-slate-500 bg-clip-text">
            {" "}
            latest software trends.
          </span>
        </h1>
      </div>
    );
  }
}

class NavBar extends React.Component {
  render() {
    const navTextCssTitle =
      "inline-block font-raleway font-extrabold text-normal cursor-pointer md:text-lg hover:text-sky-300 ";
    const navTextCssSecTitle =
      "font-raleway font-extrabold text-normal p-0 cursor-pointer hover:text-sky-300";
    const nightDayIconCss = "w-10 object-cover rounded-xl cursor-pointer";
    const mediaIconsCss = "w-8 object-cover rounded-xl cursor-pointer";

    return (
      <nav className=" bg-gray-50/20 flex flex-row justify-between align-middle items-center gap-3 p-1 border-slate-200 border-b ">
        <div className="pr-2 sm:pr-4 md:pr-5 border-r border-slate-200 flex flex-row text-center items-center">
          <span className={navTextCssTitle + "sm:mr-3"}>Software Insight</span>
          <span className="hidden md:block font-mono text-xs bg-slate-200 w-auto p-1 rounded-xl">
            v1.0.0
          </span>
        </div>
        <div className="flex flex-row justify-center items-center gap-6 align-middle h-auto overflow-hidden">
          <span className={navTextCssSecTitle}>About</span>

          <a href="https://github.com/adkr38" target="_blank">
            <img className={mediaIconsCss} src="images/github.png" />
          </a>
          <img
            className={nightDayIconCss}
            src="images/dark_mode_black_24dp.svg"
          />
          <img className="hidden" src="images/white_mode_black_24dp.svg" />
        </div>
      </nav>
    );
  }
}

export default Home;
