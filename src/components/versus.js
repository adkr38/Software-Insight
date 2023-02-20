import React from "react";
import * as md from "react-icons/md";
import { fetchUser } from "./utils/fetch.js";
import * as ri from "react-icons/ri";
import Menu from "./menu.js";
import { ThemeConsumer } from "../context/theme.js";

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
    this.setState({ username: ev.target.value });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.setState({ submitted: true });
    this.props.onSubmit(this.state.username);
  }

  render() {
    const { username, submitted } = this.state;
    const inputLight =
      "border-transparent pl-20 w-full h-full rounded-md  outline-none ring-slate-300 focus:ring-1 ";
    const inputLightSubmitted =
      "border-transparent pl-20 w-full h-full rounded-md  outline-none ring-slate-300 focus:ring-1 pointer-events-none bg-slate-200 text-sky-400";
    const inputDark =
      "border-transparent pl-20 w-full h-full rounded-md  outline-none ring-slate-900 focus:ring bg-slate-400 shadow-inner shadow-slate-700";
    const inputDarkSubmitted =
      "border-transparent pl-20 w-full h-full rounded-md  outline-none ring-slate-900 focus:ring bg-slate-400 shadow-inner shadow-slate-700 pointer-events-none bg-slate-900 text-rose-400";
    const submittedAvatarLight =
      "outline-none absolute right-0 border border-slate-300 h-10 flex items-center justify-center rounded-md bg-slate-200 w-16 shadow-lg shadow-slate-300 active:shadow-inner";
    const submittedAvatarDark =
      "outline-none absolute right-0 h-10 flex items-center justify-center rounded-md bg-slate-800 w-16 shadow-lg shadow-slate-600 active:shadow-inner";
    const lockBoxLight =
      "border border-slate-300 absolute h-10 flex items-center justify-center rounded-md bg-slate-200 left-0 w-16 shadow-lg shadow-slate-300 active:shadow-inner";
    const lockBoxDark =
      "border border-slate-800 absolute h-10 flex items-center justify-center rounded-md bg-slate-700 left-0 w-16 shadow-lg shadow-slate-800 active:shadow-slate-600 active:shadow-inner";
    const lockLight = "text-slate-900";
    const lockLightSubmited = "scale-95 text-white";
    const lockDark = "text-slate-200";
    const lockDarkSubmitted = "scale-95 text-rose-700";

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <React.Fragment>
            <form onSubmit={(ev) => this.handleSubmit(ev)}>
              <div className="m-auto relative player-input flex flex-col justify-center items-center w-2/3 h-10 align-middle">
                <div
                  onClick={(ev) => this.handleSubmit(ev)}
                  className={theme === "light" ? lockBoxLight : lockBoxDark}
                >
                  {!submitted && (
                    <md.MdLock
                      className={theme === "light" ? lockLight : lockDark}
                    ></md.MdLock>
                  )}
                  {submitted && (
                    <md.MdLock
                      className={
                        theme === "light"
                          ? lockLightSubmited
                          : lockDarkSubmitted
                      }
                    ></md.MdLock>
                  )}
                </div>
                <input
                  className={
                    theme === "light"
                      ? submitted
                        ? inputLightSubmitted
                        : inputLight
                      : submitted
                      ? inputDarkSubmitted
                      : inputDark
                  }
                  type="text"
                  value={username}
                  onChange={(ev) => {
                    this.handleChange(ev);
                  }}
                />

                {submitted && (
                  <div
                    className={
                      theme === "light"
                        ? submittedAvatarLight
                        : submittedAvatarDark
                    }
                  >
                    <a href={`https://github.com/${username}`} target="_blank">
                      <img
                        className="rounded-2xl"
                        src={`https://github.com/${username}.png?size=150`}
                      />
                    </a>
                  </div>
                )}
              </div>
            </form>
          </React.Fragment>
        )}
      </ThemeConsumer>
    );
  }
}

async function doVersus(props) {
  const { user1data, user2data } = props;
  const OUTPUT =
    user1data.score > user2data.score
      ? [user1data, user2data]
      : [user2data, user1data];
  return OUTPUT;
}

class UserVersus extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      hoveringScore: false,
      hoveringLocation: false,
      hoveringRepositories: false,
      hoveringFollowers: false,
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }
  mouseOver(id) {
    this.setState({
      [id]: true,
    });
  }
  mouseOut(id) {
    this.setState({
      [id]: false,
    });
  }
  render() {
    const results = this.props.wonVersus
      ? "border-4 border-green-300"
      : "border-4 border-rose-200";

    const lightTooltip =
      "absolute bottom-5 left-3  bg-sky-100 rounded-lg shadow-sm text-center px-3 py-1 text-center";
    const darkTooltip =
      "absolute bottom-5 left-3  bg-sky-100 rounded-lg shadow-sm text-center px-3 py-1 text-center";
    const lightPointsSection =
      "flex flex-col w-3/4 p-3 items-center align-middle justify-center rounded-md shadow-inner";
    const darkPointsSection =
      "bg-slate-700 flex flex-col w-3/4 p-3 items-center align-middle justify-center rounded-md shadow-inner shadow-slate-900/50";
    const lightCard =
      "p-5 flex flex-col gap-3 justify-center w-52 sm:w-80 h-64 align-middle items-center rounded-lg shadow-md shadow-slate-100 bg-gradient-to-br from-slate-100 to-slate-50 ";
    const darkCard =
      "p-5 flex flex-col gap-3 justify-center w-52 sm:w-80 h-64 align-middle items-center rounded-lg shadow-md shadow-slate-600 bg-gradient-to-br from-slate-900 to-slate-700 ";
    const lightIcon = "text-slate-600 text-sm";
    const darkIcon = "text-rose-800 text-sm";
    const lightP = "font-raleway text-sm";
    const darkP = "text-rose-300 font-raleway text-sm";
    const processedLocation =
      !this.props.location || this.props.location.length <= 20
        ? this.props.location
        : this.props.location.slice(0, 20) + "...";
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <React.Fragment>
            <div
              className={(theme === "light" ? lightCard : darkCard) + results}
            >
              <a href={this.props.url}>
                <img
                  className="m-auto w-1/3 rounded-md"
                  src={this.props.avatar_url}
                />
              </a>
              <div
                className={
                  theme === "light" ? lightPointsSection : darkPointsSection
                }
              >
                <div
                  className="relative flex flex-row gap-2 text-center"
                  onMouseOver={() => this.mouseOver("hoveringScore")}
                  onMouseOut={() => this.mouseOut("hoveringScore")}
                >
                  {this.state.hoveringScore && (
                    <div
                      className={theme === "light" ? lightTooltip : darkTooltip}
                    >
                      <p className={theme === "light" ? lightP : darkP}>
                        Score
                      </p>
                    </div>
                  )}
                  <md.MdCategory
                    className={theme === "light" ? lightIcon : darkIcon}
                  ></md.MdCategory>
                  <p className={theme === "light" ? lightP : darkP}>
                    {this.props.score || "0"}
                  </p>
                </div>

                <div
                  className="relative flex flex-row gap-2 ext-center"
                  onMouseOver={() => this.mouseOver("hoveringLocation")}
                  onMouseOut={() => this.mouseOut("hoveringLocation")}
                >
                  {this.state.hoveringLocation && (
                    <div
                      className={theme === "light" ? lightTooltip : darkTooltip}
                    >
                      <p className={theme === "light" ? lightP : darkP}>
                        Location
                      </p>
                    </div>
                  )}

                  <md.MdLocationCity
                    className={theme === "light" ? lightIcon : darkIcon}
                  ></md.MdLocationCity>
                  <p className={theme === "light" ? lightP : darkP}>
                    {processedLocation || "none"}
                  </p>
                </div>
                <div
                  className="relative flex flex-row text-center"
                  onMouseOver={() => this.mouseOver("hoveringFollowers")}
                  onMouseOut={() => this.mouseOut("hoveringFollowers")}
                >
                  {this.state.hoveringFollowers && (
                    <div
                      className={theme === "light" ? lightTooltip : darkTooltip}
                    >
                      <p className={theme === "light" ? lightP : darkP}>
                        Followers
                      </p>
                    </div>
                  )}

                  <ri.RiUser2Fill
                    className={theme === "light" ? lightIcon : darkIcon}
                  ></ri.RiUser2Fill>
                  <p className={theme === "light" ? lightP : darkP}>
                    {this.props.followers || "NaN"}
                  </p>
                </div>
                <div
                  className="relative flex flex-row gap-2 text-center"
                  onMouseOver={() => this.mouseOver("hoveringRepositories")}
                  onMouseOut={() => this.mouseOut("hoveringRepositories")}
                >
                  {this.state.hoveringRepositories && (
                    <div
                      className={theme === "light" ? lightTooltip : darkTooltip}
                    >
                      <p className={theme === "light" ? lightP : darkP}>
                        Repositories
                      </p>
                    </div>
                  )}
                  <ri.RiGitRepositoryFill
                    className={theme === "light" ? lightIcon : darkIcon}
                  ></ri.RiGitRepositoryFill>
                  <p className={theme === "light" ? lightP : darkP}>
                    {this.props.public_repos || "0"}
                  </p>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </ThemeConsumer>
    );
  }
}
class VersusInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      user1data: props.user1data,
      user2data: props.user2data,
      winner: null,
      looser: null,
    };
  }

  componentDidMount() {
    const { user1data, user2data } = this.state;
    doVersus({ user1data, user2data }).then((arr) => {
      this.setState({
        winner: arr[0],
        looser: arr[1],
      });
    });
  }

  render() {
    const { user1data, user2data, winner, looser } = this.state;
    return (
      <React.Fragment>
        {(winner || looser) && (
          <div className="flex gap-10 items-center flex-col sm:flex-row align-middle justify-center">
            {winner && (
              <UserVersus
                className="animate-fadeIn"
                wonVersus={true}
                {...winner}
              />
            )}
            {looser && (
              <UserVersus
                className="animate-fadeIn"
                wonVersus={false}
                {...looser}
              />
            )}
          </div>
        )}
        {!user1data && !user2data && <p className="animate-loadingDot">...</p>}
      </React.Fragment>
    );
  }
}

class Versus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user1: null,
      user2: null,
      user1data: null,
      user2data: null,
      versus: false,
    };
    this.fetchBothUsers = this.fetchBothUsers.bind(this);
  }

  async fetchBothUsers() {
    let allPromises = [];
    allPromises.push(
      new Promise((resolve, reject) => {
        fetchUser(this.state.user1)
          .then((user1data) => {
            resolve(user1data);
          })
          .catch((err) => reject(err));
      })
    );

    allPromises.push(
      new Promise((resolve, reject) => {
        fetchUser(this.state.user2)
          .then((user2data) => {
            resolve(user2data);
          })
          .catch((err) => reject(err));
      })
    );

    return allPromises;
  }

  render() {
    const { user1, user2, err, versus, user1data, user2data } = this.state;

    const resetButtonLight =
      "m-auto text-center w-24 rounded-lg p-3 bg-slate-100 shadow-md shadow-slate-300 font-raleway active:shadow-inner text-md";
    const resetButtonDark =
      "m-auto text-center w-24 rounded-lg p-3 bg-slate-800 shadow-md shadow-slate-600 font-raleway active:shadow-inner text-md text-rose-600";

    if (versus) {
      return (
        <ThemeConsumer>
          {({ theme }) => (
            <React.Fragment>
              <Menu />
              <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center align-middle gap-5">
                <VersusInput user1data={user1data} user2data={user2data} />
                <button
                  className={
                    theme === "light" ? resetButtonLight : resetButtonDark
                  }
                  onClick={() =>
                    this.setState({
                      versus: false,
                      user1: null,
                      user2: null,
                      user1data: null,
                      user2data: null,
                    })
                  }
                >
                  Reset
                </button>
              </div>
            </React.Fragment>
          )}
        </ThemeConsumer>
      );
    }
    const lightH1 =
      "font-raleway text-6xl text-transparent bg-gradient-to-br from-slate-400 to-sky-600 bg-clip-text text-clip";
    const darkH1 =
      "font-raleway text-6xl text-transparent bg-gradient-to-bl from-rose-400 to-slate-600 bg-clip-text text-clip";
    const lightP = "text-slate-700";
    const darkP = "text-rose-700";
    const lightSubmitButton =
      "outline-none animate-fadeIn duration-200 active:px-4  px-6 py-1 bg-slate-50 text-white font-raleway  bg-gradient-to-br from-sky-600 to-slate-600 text-center rounded-lg active:shadow-inner  shadow-md";
    const darkSubmitButton =
      "outline-none animate-fadeIn duration-200 active:px-4  px-6 py-1 bg-slate-50 text-white font-raleway  bg-gradient-to-br from-rose-600 to-slate-600 text-center rounded-lg active:shadow-inner  shadow-md";

    return (
      <ThemeConsumer>
        {({ theme }) => (
          <React.Fragment>
            <Menu />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full -mt-10 ">
              <div className="flex flex-col items-center align-middle justify-center text-center">
                <h1 className={theme === "light" ? lightH1 : darkH1}>
                  Github Versus
                </h1>
                <p className={theme === "light" ? lightP : darkP}>
                  Chose two github users & compare their stats
                </p>
              </div>
              <div className="mt-10 input-section text-center">
                <PlayerInput
                  id="playera"
                  onSubmit={(user1) => {
                    this.setState({ user1 });
                  }}
                />
                <p
                  className={
                    theme === "light"
                      ? "m-auto my-10 text-sky-600"
                      : "m-auto my-10 text-rose-700"
                  }
                >
                  VS
                </p>
                <PlayerInput
                  id="playerb"
                  onSubmit={(user2) => {
                    this.setState({ user2 });
                  }}
                />
              </div>
              {user1 && user2 && (
                <div className="mt-12 flex items-center justify-center">
                  <button
                    className={
                      theme === "light" ? lightSubmitButton : darkSubmitButton
                    }
                    onClick={() =>
                      this.fetchBothUsers()
                        .then((promisesArray) => Promise.all(promisesArray))
                        .then((arr) => {
                          this.setState({
                            user1data: arr[0],
                            user2data: arr[1],
                            versus: true,
                          });
                        })
                    }
                  >
                    Start!
                  </button>
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </ThemeConsumer>
    );
  }
}

export default Versus;
