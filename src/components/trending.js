import * as si from "react-icons/si";
import * as md from "react-icons/md";
import React from "react";
import Menu from "./menu.js";
import PropTypes from "prop-types";
import { fetchRepositories } from "./utils/fetch.js";
import { ThemeConsumer } from "../context/theme.js";

function DynamicIcon({ name, styling }) {
  const IconComp = si["Si" + name];
  if (!IconComp) {
    return <si.SiCloudbees />;
  }
  return <IconComp className={styling} />;
}

DynamicIcon.propTypes = {
  name: PropTypes.string,
  styling: PropTypes.string,
};

function LangGrid({ callback }) {
  const languages = [
    "Go",
    "Rust",
    "Javascript",
    "Typescript",
    "Python",
    "Java",
    "Php",
    "C",
    "Cplusplus",
    "Csharp",
  ];

  const iconLight = "text-4xl rounded-lg text-slate-600";
  const iconDark = "text-4xl rounded-lg text-rose-800";
  const dashboard =
    "grid gap-6  w-3/4 mt-24  m-auto grid-cols-2 md:grid-cols-5 2xl:grid-cols-10 transition-all duration-700";
  const languageBoxLight =
    "flex justify-center  p-5 rounded-xl  bg-repeat bg-gradient-to-br from-transparent to-slate-300 shadow-md hover:shadow-lg transition-all ease-in-out duration-300 active:shadow-inner active:scale-95";
  const languageBoxDark =
    "flex justify-center  ring ring-slate-900/10 p-5 rounded-xl  bg-gradient-to-br from-slate-400 shadow-md shadow-slate-600/50 hover:shadow-lg transition-all ease-in-out duration-300 active:shadow-slate-600 active:shadow-inner active:scale-95";
  const h3Light = "font-raleway text-bold absolute text-xl";
  const h3Dark = "font-raleway text-bold absolute text-xl text-rose-800";

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className="mainDashboard flex items-center flex-col animate-fadeIn">
          <div className="flex justify-center mt-24 md:mt-40 2xl:mt-48">
            <h3 className={theme === "light" ? h3Light : h3Dark}>
              Start{" "}
              <span
                className={
                  theme === "light" ? "text-slate-400" : "text-slate-200"
                }
              >
                investigating
              </span>
            </h3>
          </div>
          <div className={dashboard}>
            {languages.map((lang) => (
              <div
                key={lang}
                className={
                  theme === "light" ? languageBoxLight : languageBoxDark
                }
                onClick={() => {
                  {
                  }
                  callback(lang);
                }}
              >
                <DynamicIcon
                  name={lang}
                  styling={theme === "light" ? iconLight : iconDark}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </ThemeConsumer>
  );
}

LangGrid.propTypes = {
  selectedLang: PropTypes.string,
  callback: PropTypes.func.isRequired,
};

function LoadingScreen() {
  const dotLight = "animated-dot animate-loadingDot text-5xl";
  const dotDark = "animated-dot animate-loadingDot text-5xl text-rose-500";
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className="fixed top-1/2 left-1/2">
          <span className={theme === "light" ? dotLight : dotDark}>.</span>
          <span
            className={(theme === "light" ? dotLight : dotDark) + " delay-300"}
          >
            .
          </span>
          <span
            className={(theme === "light" ? dotLight : dotDark) + " delay-600"}
          >
            .
          </span>
        </div>
      )}
    </ThemeConsumer>
  );
}

function RepoGrid(props) {
  const repos =
    "repositories absolute mx-auto left-0 right-0 w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-x-5 md:gap-x-10 gap-y-10 p-20 items-center overflow-y-auto";
  const lightRepoBox =
    "text-center shadow-sm shadow-slate-300 py-4 px-0 rounded-xl grid gap-y-2 gap-x-6 grid-flow-row items-center break-words align-baseline";
  const darkRepoBox =
    "text-center shadow-sm shadow-rose-800/50 py-4 px-0 rounded-xl grid gap-y-2 gap-x-6 grid-flow-row items-center break-words align-baseline bg-gradient-to-br from-slate-900";
  const lightRepoSpan = "font-raleway text-sm text-slate-600 row-span-1";
  const darkRepoSpan = "font-raleway text-sm text-rose-500 row-span-1";

  function Avatar(props) {
    const lightA =
      "p-2 shadow-sm shadow-slate-300 active:shadow-inner rounded-xl w-20 row-span-3";
    const darkA =
      "p-2 shadow-sm shadow-rose-800 active:shadow-rose-300/10 active:shadow-inner rounded-xl w-20 row-span-3";
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <a
            className={theme === "light" ? lightA : darkA}
            href={props.href}
            target="_blank"
          >
            <img className="rounded-3xl" src={props.src} />
          </a>
        )}
      </ThemeConsumer>
    );
  }

  function RepoStats(props) {
    const { repoHref, stars, description, issues } = props;
    const iconLight = "text-slate-900 text-sm mx-0 my-auto w-1/3";
    const iconDark = "text-slate-200 text-sm mx-0 my-auto w-1/3";
    const repoStatsLight =
      "w-1/3 icons-bar flex flex-col justify-center gap-3 items-center align-middle rounded-xl bg-slate-50/10";
    const repoStatsDark =
      "w-1/3 icons-bar flex flex-col justify-center gap-3 items-center align-middle rounded-xl bg-slate-900/10";
    const spanLight = "font-mono text-[0.6rem] mx-0 my-auto break-words";
    const spanDark =
      "font-mono text-[0.6rem] mx-0 my-auto break-words text-rose-400";

    let descText = `${description}`;
    if (descText.length >= 40) {
      descText = descText.slice(0, 40) + "...";
    }

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <React.Fragment>
            <div className={theme === "light" ? repoStatsLight : repoStatsDark}>
              <div className="flex flex-row gap-6 justify-center  align-middle">
                <a
                  className={
                    theme === "light"
                      ? "w-1/3 mx-0 my-auto"
                      : "w-1/3 mx-0 my-auto text-slate-200"
                  }
                  href={repoHref}
                  target="_blank"
                >
                  <md.MdLink></md.MdLink>
                </a>
                <md.MdOutlineDescription
                  className={theme === "light" ? iconLight : iconDark}
                ></md.MdOutlineDescription>
              </div>

              <div className="flex flex-row gap-5 justify-center items-center ">
                <div className="flex flex-col items-center justify-center text-center w-1/3">
                  <md.MdOutlineStar
                    className={
                      theme === "light"
                        ? iconLight.replace("w-1/3", "")
                        : iconDark.replace("w-1/3", "")
                    }
                  ></md.MdOutlineStar>
                  <span className={theme === "light" ? spanLight : spanDark}>
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(stars)}
                  </span>
                </div>

                <div className="flex flex-col justify-center items-center text-center w-1/3">
                  <md.MdOutlineError
                    className={
                      theme === "light"
                        ? iconLight.replace("w-1/3", "")
                        : iconDark.replace("w-1/3", "")
                    }
                  ></md.MdOutlineError>
                  <span className={theme === "light" ? spanLight : spanDark}>
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(issues)}
                  </span>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </ThemeConsumer>
    );
  }

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <React.Fragment>
          <div className={repos}>
            {props.repoData.map((rep, index) => (
              <div
                key={index}
                className={theme === "light" ? lightRepoBox : darkRepoBox}
              >
                <span
                  className={theme === "light" ? lightRepoSpan : darkRepoSpan}
                >
                  {rep.name}
                </span>

                <div className="flex flex-row gap-5 justify-center items-center align-middle row-span-2">
                  <Avatar
                    href={rep.owner.html_url}
                    src={rep.owner.avatar_url}
                  />
                  <RepoStats
                    repoHref={rep.html_url}
                    stars={rep.stargazers_count}
                    description={rep.description}
                    issues={rep.open_issues}
                  />
                </div>
              </div>
            ))}
          </div>
        </React.Fragment>
      )}
    </ThemeConsumer>
  );
}

class Trending extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repositories: {},
      dashboard: true,
      language: "",
      error: null,
      unmountableRepos: false,
    };

    this.pickLang = this.pickLang.bind(this);
    this.toggleDashboard = this.toggleDashboard.bind(this);
    this.reposLoading = this.reposLoading.bind(this);
  }

  reposLoading() {
    return (
      !this.state.repositories[this.state.language] &&
      this.state.error === null &&
      !this.state.dashboard
    );
  }

  pickLang(lang) {
    this.setState({
      dashboard: false,
      language: lang,
      error: null,
    });
    this.toggleDashboard();
    if (!this.state.repositories[lang]) {
      fetchRepositories(lang)
        .then((data) => {
          this.setState(({ repositories }) => ({
            repositories: {
              ...repositories,
              [lang]: data,
            },
          }));
        })
        .catch((error) => {
          console.warn("Error fetching repositories - ", error);
          this.setState({ error });
        });
    }
    this.setState({ unmountableRepos: true });
  }

  toggleDashboard() {
    const dashboardVisible = !this.state.dashboard;
    const dash = document.querySelector(".mainDashboard");

    if (!dashboardVisible) {
      setTimeout(
        () =>
          this.setState({
            dashboard: dashboardVisible,
            language: this.state.language,
            error: null,
          }),
        1000
      );
      dash.classList.remove("animate-fadeIn");
      dash.classList.add("animate-fadeOut");
      return;
    }

    this.setState({
      dashboard: dashboardVisible,
      language: this.state.language,
      error: null,
      unmountableRepos: false,
    });

    // clearTimeout(this.cache.timeoutEventId);
  }

  render() {
    const { dashboard, language, repositories, error } = this.state;

    return (
      <React.Fragment>
        <Menu />
        {dashboard && (
          <LangGrid selectedLang={language} callback={this.pickLang} />
        )}
        {this.reposLoading() && <LoadingScreen />}
        {error && <p>{error}</p>}
        {repositories[language] && this.state.unmountableRepos && (
          <RepoGrid repoData={repositories[language]} />
        )}
      </React.Fragment>
    );
  }
}

export default Trending;
