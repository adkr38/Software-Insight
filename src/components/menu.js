import React from "react";
import { ThemeConsumer } from "../context/theme.js";
import { Link } from "react-router-dom";
import * as bs from "react-icons/bs";
import * as cg from "react-icons/cg";
import * as gi from "react-icons/gi";
import * as im from "react-icons/im";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  toggleMenu() {
    this.setState({ toggled: true });
  }

  componentWillUnmount() {
    this.setState({ toggled: false });
  }

  render() {
    const iconStyleLight = "z-10 text-lg text-slate-800 animate-fadeIn";
    const iconRowLight =
      "z-10 flex flex-row items-center align-middle gap-5 p-2 border-b border-slate-300 animate-fadeIn";
    const menuStyleLight =
      "z-10 backdrop-blur-md p-3 absolute -left-1 -top-1 flex flex-col gap-5 w-80 sm: w-72 rounded-lg bg-sky-800/10 shadow-md shadow-slate-300 animate-fadeIn";
    const textStyleLight = "z-10 text-md text-slate-800 font-raleway";

    const iconStyleDark = "z-10 text-lg text-slate-200 animate-fadeIn";
    const iconRowDark =
      "z-10 flex flex-row items-center align-middle gap-5 p-2 border-b border-rose-100 animate-fadeIn -margin-2";
    const menuStyleDark =
      "z-10 backdrop-blur-md bg-gradient-to-br from-slate-700/50 to-slate-800/50  p-3 absolute -left-1 -top-1 flex w-80 sm:w-72 flex-col gap-5 rounded-lg  shadow-md shadow-slate-700  animate-fadeIn";
    const textStyleDark = "z-10 text-md text-rose-100 font-raleway";

    if (!this.state.toggled) {
      return (
        <ThemeConsumer>
          {({ theme }) => (
            <button
              className="z-10 absolute top-4 left-4"
              onClick={() => this.toggleMenu()}
            >
              <cg.CgMenu
                className={theme === "light" ? iconStyleLight : iconStyleDark}
              ></cg.CgMenu>
            </button>
          )}
        </ThemeConsumer>
      );
    }

    return (
      <ThemeConsumer>
        {({ theme, toggleTheme }) => (
          <div className={theme === "light" ? menuStyleLight : menuStyleDark}>
            <button className="px-2 py-1" onClick={this.componentWillUnmount}>
              <bs.BsXDiamond
                className={theme === "light" ? iconStyleLight : iconStyleDark}
              ></bs.BsXDiamond>
            </button>
            <div className={theme === "light" ? iconRowLight : iconRowDark}>
              <Link to="/">
                <bs.BsHouseFill
                  className={theme === "light" ? iconStyleLight : iconStyleDark}
                ></bs.BsHouseFill>
              </Link>
              <p className={theme === "light" ? textStyleLight : textStyleDark}>
                Home
              </p>
            </div>

            <div className={theme === "light" ? iconRowLight : iconRowDark}>
              <button onClick={toggleTheme}>
                {theme === "light" ? (
                  <bs.BsMoonStarsFill
                    className={iconStyleLight}
                  ></bs.BsMoonStarsFill>
                ) : (
                  <bs.BsFillEmojiSunglassesFill
                    className={iconStyleDark}
                  ></bs.BsFillEmojiSunglassesFill>
                )}
              </button>
              <p className={theme === "light" ? textStyleLight : textStyleDark}>
                Switch Theme
              </p>
            </div>

            <div className={theme === "light" ? iconRowLight : iconRowDark}>
              <a
                href="https://github.com/adkr38/software-insight"
                target="_blank"
              >
                <bs.BsGithub
                  className={theme === "light" ? iconStyleLight : iconStyleDark}
                ></bs.BsGithub>
              </a>

              <p className={theme === "light" ? textStyleLight : textStyleDark}>
                Repository
              </p>
            </div>

            <div className={theme === "light" ? iconRowLight : iconRowDark}>
              <Link to="/versus">
                <gi.GiSwordSpin
                  className={theme === "light" ? iconStyleLight : iconStyleDark}
                ></gi.GiSwordSpin>
              </Link>

              <p className={theme === "light" ? textStyleLight : textStyleDark}>
                Github Versus
              </p>
            </div>

            <div className={theme === "light" ? iconRowLight : iconRowDark}>
              <Link to="/analytics">
                <im.ImStatsBars
                  className={theme === "light" ? iconStyleLight : iconStyleDark}
                ></im.ImStatsBars>
              </Link>

              <p className={theme === "light" ? textStyleLight : textStyleDark}>
                Language Stats
              </p>
            </div>

            <div className={theme === "light" ? iconRowLight : iconRowDark}>
              <Link to="/trending">
                <cg.CgTrending
                  className={theme === "light" ? iconStyleLight : iconStyleDark}
                ></cg.CgTrending>
              </Link>

              <p className={theme === "light" ? textStyleLight : textStyleDark}>
                Popular Repositories
              </p>
            </div>
          </div>
        )}
      </ThemeConsumer>
    );
  }
}
