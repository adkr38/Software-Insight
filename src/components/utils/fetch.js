export function fetchRepositories(language) {
  const URL = `https://api.github.com/search/repositories?q=stars:>3+language:${language}&sort=stars&order=desc&type=Repositories`;
  return fetch(URL)
    .then((resp) => resp.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message);
      }
      return data.items;
    });
}

export function fetchLegacy(language) {
  const URL = `https://api.github.com/search/repositories?q=language:${language.toLowerCase()}`;

  return fetch(URL)
    .then((resp) => resp.json())
    .then((data) => {
      if (!data.total_count) {
        throw new Error(data.message);
      }
      return data;
    })
    .catch((err) => {
      throw new Error("Unable to fetch data for ", language, err);
    });
}

export function fetchWeekly(language) {
  const URL = "./fake_data.json";
  return fetch(URL)
    .then((resp) => resp.json())
    .then((data) => {
      if (!data[language.toLowerCase()]) {
        throw new Error("Invalid lang!");
      }
      return data[language.toLowerCase()];
    })
    .catch((err) => {
      throw new Error("Unable to fetch data for ", language, err);
    });
}

export function fetchUser(username) {
  const URL = `https://api.github.com/users/${username}`;
  return fetch(URL)
    .then((resp) => resp.json())
    .then((data) => {
      data["score"] = data.public_repos * data.followers;
      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}
