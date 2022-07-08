class GithubService {
  getProfile(login: string): Promise<GithubProfile> {
    return fetch(`https://api.github.com/users/${login}`)
      .then(res => res.json())
      .then(({ avatar_url, name, login }) => ({
        avatar: avatar_url as string,
        name: name as string,
        login: login as string,
      }));
  }

  getRepos(login: string): Promise<GithubRepo[]> {
    return fetch(`https://api.github.com/users/${login}/repos`)
      .then(res => res.json())
      .then((repos: any[]) =>
        repos.map(({ name, language }) => ({
          name: name as string,
          language: language as string,
        })),
      );
  }
}

export type GithubProfile = {
  avatar: string;
  name: string;
  login: string;
};

export type GithubRepo = {
  name: string;
  language: string | null;
};

export const githubSerive = new GithubService();
