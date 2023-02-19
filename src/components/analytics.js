import React from "react";
import * as md from "react-icons/md";
import { fetchLegacy, fetchWeekly } from "./utils/fetch.js";
import Menu from "./menu.js";
import { ThemeConsumer } from "../context/theme.js";

function WeeklyGraph(props) {
  const { lang, weeklyData, cumulativeData } = props;
  const headerStylingLight =
    "sticky top-0 p-2 text-sky-500 text-[0.5rem] md:text-sm ";
  const headerStylingDark =
    "sticky top-0 p-2 text-rose-800 text-[0.5rem] md:text-sm ";
  const lightTd = "p-1 text-slate-700 text-[0.6rem] md:text-sm";
  const darkTd = "p-1 text-slate-500 text-[0.6rem] md:text-sm";
  const lightP = "m-auto text-center text-slate-400 text-sm mt-10 font-mono";
  const darkP = "m-auto text-center text-rose-500 text-sm mt-10 font-mono";
  const lightSpan = "text-sky-500 text-sm";
  const darkSpan = "text-rose-200 text-sm";
  const lightH1 = "font-raleway text-sky-400 text-2xl font-extrabold";
  const darkH1 = "font-raleway text-rose-700 text-2xl font-extrabold";
  const lightTr = "table-row text-left border-b-slate-200 border-b";
  const darkTr = "table-row text-left border-b-slate-500 border-b";
  const lightThead = "my-2 sm:mx-6 font-extrabold border-b-slate-500 border-b";
  const darkThead = "my-2 sm:mx-6 font-extrabold border-b-rose-200 border-b";

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <React.Fragment>
          <div className="w-full sm:w-2/3">
            <h1 className={theme === "light" ? lightH1 : darkH1}>
              Weekly repositories
            </h1>
            <table className="mt-3 table table-fixed items-center font-mono w-full h-full border-collapse">
              <thead className={theme === "light" ? lightThead : darkThead}>
                <tr>
                  {Object.keys(weeklyData).map((k) => (
                    <th
                      className={
                        theme == "light"
                          ? headerStylingLight
                          : headerStylingDark
                      }
                    >
                      {k}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="align-baseline">
                <tr className={theme === "light" ? lightTr : darkTr}>
                  {Object.values(weeklyData).map((v) => (
                    <td className={theme === "light" ? lightTd : darkTd}>
                      {v}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            <p className={theme === "light" ? lightP : darkP}>
              Overtime Repositories:{" "}
              <span className={theme === "light" ? lightSpan : darkSpan}>
                {cumulativeData.total_count}
              </span>
            </p>
          </div>
        </React.Fragment>
      )}
    </ThemeConsumer>
  );
}

function StatsLoading() {
  const lightDot = "animate-loadingDot text-6xl text-sky-800";
  const darkDot = "animate-loadingDot text-6xl text-rose-300";
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className="w-full h-full">
          <span className={theme === "light" ? lightDot : darkDot}>.</span>
          <span
            className={(theme === "light" ? lightDot : darkDot) + " delay-150"}
          >
            .
          </span>

          <span
            className={(theme === "light" ? lightDot : darkDot) + " delay-300"}
          >
            .
          </span>
        </div>
      )}
    </ThemeConsumer>
  );
}

function ErrorMessage() {
  return (
    <div className="w-full h-full">
      <p className="font-mono text-slate-500 text-md">
        Invalid input, pelase try another language.
      </p>
    </div>
  );
}

class AnalyticsSearchbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      weeklyData: {},
      cumulativeData: {},
      err: null,
      loading: false,
      language: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    const language = this.state.text;
    event.preventDefault();
    this.setState({ loading: true, err: null, language, text: "" });
    fetchLegacy(language)
      .then((data) => {
        this.setState(({ cumulativeData }) => ({
          cumulativeData: {
            ...cumulativeData,
            [language]: data,
          },
        }));
      })
      .catch((err) => {
        this.setState({ err });
      });

    fetchWeekly(language)
      .then((data) => {
        this.setState(({ weeklyData }) => ({
          weeklyData: {
            ...weeklyData,
            [language]: data,
          },
        }));
        setTimeout(() => {
          this.setState({ loading: false });
        }, 2000);
      })
      .catch((err) => this.setState({ err }));
  }

  handleChange(event) {
    this.setState({
      text: event.target.value,
    });
  }

  render() {
    const { weeklyData, cumulativeData, loading, err, language } = this.state;
    const lightInputBox =
      "shadow-sm shadow-slate-300 active:shadow-inner h-full left-0 rounded-md absolute w-16  bg-slate-50 flex justify-center items-center";
    const darkInputBox =
      "shadow-sm shadow-slate-400 active:shadow-inner h-full left-0 rounded-md absolute w-16  bg-slate-500 flex justify-center items-center";
    const searchIconLight = "text-xl text-slate-400";
    const searchIconDark = "text-xl text-slate-200";
    const inputLight =
      "pl-20 placeholder:italic font-raleway outline-slate-50 rounded-lg w-full h-full";
    const inputDark =
      "pl-20 placeholder:italic bg-slate-700 font-raleway text-slate-200 focus:ring-2 ring-slate-500 outline-none rounded-lg w-full h-full";

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <React.Fragment>
            <div className="m-auto  mt-10  rounded-xl relative flex flex-row items-center w-2/3 h-10">
              <form
                className="h-full w-full"
                onSubmit={(event) => this.handleSubmit(event)}
              >
                <div
                  className={theme === "light" ? lightInputBox : darkInputBox}
                  onClick={(event) => this.handleSubmit(event)}
                >
                  <input type="submit" value="" />
                  <md.MdSearch
                    className={
                      theme === "light" ? searchIconLight : searchIconDark
                    }
                  ></md.MdSearch>
                </div>
                <input
                  className={theme === "light" ? inputLight : inputDark}
                  placeholder="Search"
                  type="text"
                  value={this.state.text}
                  onChange={(ev) => this.handleChange(ev)}
                />
              </form>
            </div>

            <div className="content w-full m-auto mt-10 flex items-center align-middle justify-center text-center">
              {err && <ErrorMessage />}
              {loading && !err && <StatsLoading />}
              {weeklyData[language] &&
                cumulativeData[language] &&
                !loading &&
                !err && (
                  <WeeklyGraph
                    lang={language}
                    weeklyData={weeklyData[language]}
                    cumulativeData={cumulativeData[language]}
                  />
                )}
            </div>
          </React.Fragment>
        )}
      </ThemeConsumer>
    );
  }
}

class Analytics extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const lightH1 = "font-raleway text-sky-400 text-5xl mb-6 font-extrabold";
    const darkH1 =
      "font-raleway text-transparent text-clip bg-clip-text bg-gradient-to-bl from-slate-600 via-rose-800 to-rose-800 text-5xl mb-6 font-extrabold";
    const lightP = "font-mono text-sm text-slate-400";
    const darkP = "font-mono text-sm text-rose-300";

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <React.Fragment>
            <Menu />
            <div className="flex flex-col items-center mt-12 text-center p-5">
              <h1 className={theme === "light" ? lightH1 : darkH1}>
                Analytics
              </h1>
              <p className={theme === "light" ? lightP : darkP}>
                Search for your preferred language & start playing around!
              </p>

              <span className="mt-6 italic font-mono text-slate-500 text-xs">
                *This section uses a mix of fake(weekly) & real(overtime) data.
              </span>
            </div>
            <AnalyticsSearchbar />
          </React.Fragment>
        )}
      </ThemeConsumer>
    );
  }
}

export default Analytics;
