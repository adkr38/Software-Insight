import React from "react";
import * as md from "react-icons/md";
import { fetchLegacy, fetchWeekly } from "./utils/fetch.js";
import Menu from "./menu.js";

function WeeklyGraph(props) {
  const { lang, weeklyData, cumulativeData } = props;
  const headerStyling =
    "sticky top-0 p-2 text-sky-500 text-[0.5rem] md:text-sm ";
  const tdStyling = "p-1 text-slate-700 text-[0.6rem] md:text-sm";

  return (
    <React.Fragment>
      <div className="w-full sm:w-2/3">
        <h1>Weekly repositories</h1>
        <table className="mt-3 table table-fixed items-center font-mono w-full h-full border-collapse">
          <thead className="my-2 sm:mx-6 font-extrabold border-b-slate-500 border-b">
            <tr>
              {Object.keys(weeklyData).map((k) => (
                <th className={headerStyling}>{k}</th>
              ))}
            </tr>
          </thead>

          <tbody className="align-baseline">
            <tr className="table-row text-left border-b-slate-200 border-b">
              {Object.values(weeklyData).map((v) => (
                <td className={tdStyling}>{v}</td>
              ))}
            </tr>
          </tbody>
        </table>
        <p className="m-auto text-center text-slate-400 text-sm mt-10 font-mono">
          Overtime Repositories:{" "}
          <span className="text-sky-500 text-sm">
            {cumulativeData.total_count}
          </span>
        </p>
      </div>
    </React.Fragment>
  );
}

function StatsLoading() {
  return (
    <div className="w-full h-full">
      <span className="animate-loadingDot text-6xl text-sky-800">.</span>
      <span className="animate-loadingDot text-6xl delay-150 text-sky-800">
        .
      </span>
      <span className="animate-loadingDot text-6xl delay-300 text-sky-800">
        .
      </span>
    </div>
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
    return (
      <React.Fragment>
        <Menu />
        <div className="m-auto  mt-10  rounded-xl relative flex flex-row items-center w-2/3 h-10">
          <form
            className="h-full w-full"
            onSubmit={(event) => this.handleSubmit(event)}
          >
            <div
              className="shadow-sm shadow-slate-300 active:shadow-inner h-full left-0 rounded-md absolute w-16  bg-slate-50 flex justify-center items-center"
              onClick={(event) => this.handleSubmit(event)}
            >
              <input type="submit" value="" />
              <md.MdSearch className="text-xl text-slate-400"></md.MdSearch>
            </div>
            <input
              className="pl-20 placeholder:italic font-raleway outline-slate-50 rounded-lg w-full h-full"
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
    );
  }
}

class Analytics extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="flex flex-col items-center mt-12 text-center p-5">
          <h1 className="font-raleway text-sky-400 text-5xl mb-6 font-extrabold">
            Analytics
          </h1>
          <p className="font-mono text-sm">
            Search for your preferred language & start playing around!
          </p>

          <span className="mt-6 italic font-mono text-slate-500 text-xs">
            *This section uses a mix of fake(weekly) & real(overtime) data.
          </span>
        </div>
        <AnalyticsSearchbar />
      </React.Fragment>
    );
  }
}

export default Analytics;
