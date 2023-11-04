import { defineStore } from 'pinia';
import { Octokit } from 'octokit';

const octokit = new Octokit();

export interface Repo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: null | string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: null | string;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: License;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  temp_clone_token: null | string;
  network_count: number;
  subscribers_count: number;
  readme: string;
  commits: number;
}

interface Owner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface License {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

const rawRepos = [
  {
    id: 'kyleaupton/os-install-maker',
    icons: ['vue', 'electron', 'typescript'],
  },
  {
    id: 'kyleaupton/resume',
    icons: ['react'],
  },
  {
    id: 'kyleaupton/node-rsync',
    npm: 'https://www.npmjs.com/package/@kyleupton/node-rsync',
  },
  {
    id: 'kyleaupton/glob-copy',
    npm: 'https://www.npmjs.com/package/@kyleupton/glob-copy',
  },
  {
    id: 'kyleaupton/portfolio',
    icons: ['vue', 'typescript'],
  },
  {
    id: 'kyleaupton/TransactionTracker',
  },
  {
    id: 'kyleaupton/schedule-widget',
  },
  {
    id: 'kyleaupton/zerotier-utility',
    icons: ['vue', 'electron', 'javascript'],
  },
  {
    id: 'kyleaupton/witte-quote-generator-desktop',
    icons: ['vue', 'electron', 'javascript'],
  },
  {
    id: 'kyleaupton/windows-iso-downloader',
  },
];

export type t_project = {
  data: Repo;
  loaded: boolean;
  icons?: string[];
  npm?: string;
};

type state = {
  repos: {
    [key: string]: t_project;
  };
};

export const useGitHubStore = defineStore('gitHub', {
  state: () =>
    ({
      repos: {},
    }) as state,

  getters: {
    allLoaded(state) {
      const arr = Object.keys(state.repos);
      return arr.length > 0 && !arr.find((x) => !state.repos[x].loaded);
    },
  },

  actions: {
    async getRepos() {
      await Promise.all(rawRepos.map((raw) => this.getRepo(raw)));
    },

    async getRepo(raw: (typeof rawRepos)[0]) {
      // Main repo data
      const repoData = (await octokit.request(`GET /repos/${raw.id}`)).data;

      // README.md request
      const readmeRes = (
        await octokit.request(`GET /repos/${raw.id}/contents/README.md`)
      ).data;

      const data: Repo = {
        ...repoData,
        readme: atob(readmeRes.content),
        commits: 0,
      };

      // Commit number request
      // https://stackoverflow.com/questions/27931139/how-to-use-github-v3-api-to-get-commit-count-for-a-repo
      const countRes = await octokit.request(
        `GET /repos/${raw.id}/commits?sha={branch}&per_page=1&page=1`,
      );

      const match = countRes.headers.link?.split(',')[1].match(/<.+>/);

      if (match && match[0]) {
        const raw = match[0].replace('<', '').replace('>', '');
        data.commits = +(new URL(raw).searchParams.get('page') || 0);
      }

      this.repos[raw.id] = {
        data,
        loaded: true,
        icons: raw.icons,
        npm: raw.npm,
      };
    },
  },
});
