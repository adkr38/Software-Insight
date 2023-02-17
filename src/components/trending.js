import * as si from "react-icons/si";
import * as md from "react-icons/md";
import React from "react";
import Menu from "./menu.js";
import PropTypes from "prop-types";
import { fetchRepositories } from "./utils/fetch.js";

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

  const iconStyle = "text-4xl rounded-lg text-slate-600";
  const dashboardStyle =
    "grid gap-6  w-3/4 mt-24  m-auto grid-cols-2 md:grid-cols-5 2xl:grid-cols-10 transition-all duration-700";

  return (
    <div className="mainDashboard flex items-center flex-col animate-fadeIn">
      <div className="flex justify-center mt-24 md:mt-40 2xl:mt-48">
        <h3 className="font-raleway text-bold absolute text-xl">
          Start <span className="text-slate-400">investigating</span>
        </h3>
      </div>
      <div className={dashboardStyle}>
        {languages.map((lang) => (
          <div
            key={lang}
            className="flex justify-center  p-5 rounded-xl  bg-gradient-to-br from-transparent to-slate-300 shadow-md hover:shadow-lg transition-all ease-in-out duration-300 active:shadow-inner active:scale-95"
            onClick={() => {
              {
              }
              callback(lang);
            }}
          >
            <DynamicIcon name={lang} styling={iconStyle} />
          </div>
        ))}
      </div>
    </div>
  );
}

LangGrid.propTypes = {
  selectedLang: PropTypes.string,
  callback: PropTypes.func.isRequired,
};

function LoadingScreen() {
  return (
    <div className="fixed top-1/2 left-1/2">
      <span className="animated-dot animate-loadingDot text-5xl">.</span>
      <span className="animated-dot animate-loadingDot delay-300 text-5xl">
        .
      </span>
      <span className="animated-dot animate-loadingDot delay-600 text-5xl">
        .
      </span>
    </div>
  );
}

function RepoGrid(props) {
  function Avatar(props) {
    return (
      <a
        className="p-2 shadow-sm shadow-slate-300 active:shadow-inner rounded-xl w-20 row-span-3"
        href={props.href}
        target="_blank"
      >
        <img className="rounded-3xl" src={props.src} />
      </a>
    );
  }

  function RepoStats(props) {
    const { repoHref, stars, description, issues } = props;
    const iconStyling = "text-slate-900 text-sm mx-0 my-auto";

    let descText = `${description}`;
    if (descText.length >= 40) {
      descText = descText.slice(0, 40) + "...";
    }

    return (
      <React.Fragment>
        <div className="w-1/3 icons-bar flex flex-col justify-center gap-3 items-center align-middle rounded-xl bg-slate-50/10">
          <div className="flex flex-row gap-6 justify-center  align-baseline">
            <a className="w-1/3 mx-0 my-auto" href={repoHref} target="_blank">
              <md.MdLink> </md.MdLink>
            </a>

            <md.MdOutlineDescription
              className={iconStyling + " w-1/3"}
            ></md.MdOutlineDescription>
            <span className="font-mono text-xs mx-0 my-auto break-words hidden">
              {descText}
            </span>
          </div>

          <div className="flex flex-row gap-5 justify-center  items-center ">
            <div className="flex flex-col items-center justify-center text-center w-1/3">
              <md.MdOutlineStar className={iconStyling}></md.MdOutlineStar>
              <span className="font-raleway text-xs">
                {Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(stars)}
              </span>
            </div>

            <div className="flex flex-col justify-center items-center text-center w-1/3">
              <md.MdOutlineError className={iconStyling}></md.MdOutlineError>
              <span className="font-raleway text-xs">
                {Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(issues)}
              </span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="repositories absolute mx-auto left-0 right-0 w-3/4 h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-x-5 md:gap-x-10 gap-y-10 p-3 items-center">
        {props.repoData.map((rep, index) => (
          <div
            key={index}
            className="text-center shadow-sm shadow-slate-300 py-4 px-0 rounded-xl grid gap-y-2 gap-x-6 grid-flow-row items-center break-words align-baseline"
          >
            <span className="font-raleway text-sm text-slate-600 row-span-1">
              {rep.name}
            </span>

            <div className="flex flex-row gap-5 justify-center items-center align-middle row-span-2">
              <Avatar href={rep.owner.html_url} src={rep.owner.avatar_url} />
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
