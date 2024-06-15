/**
 * Module that exports utility functions for fetching data about my GitHub repos
 */

import { Octokit } from "octokit";
import { kv } from "@vercel/kv";

// List of repos to fetch
const repos: RawRepo[] = [
  {
    id: "boot-builder",
    display: "Boot Builder",
    technologies: ["vue", "electron", "typescript"],
  },
  {
    id: "resume",
    display: "Resume",
    technologies: ["react", "typescript"],
  },
  {
    id: "node-rsync",
    display: "Node Rsync",
    npm: "https://www.npmjs.com/package/@kyleupton/node-rsync",
  },
  {
    id: "glob-copy",
    display: "Glob Copy",
    npm: "https://www.npmjs.com/package/@kyleupton/glob-copy",
  },
  {
    id: "portfolio",
    display: "Portfolio",
    technologies: ["nuxt", "vue", "typescript"],
  },
  {
    id: "TransactionTracker",
    display: "Transaction Tracker",
  },
  {
    id: "schedule-widget",
    display: "Schedule Widget",
  },
  {
    id: "zerotier-utility",
    display: "ZeroTier Utility",
    technologies: ["vue", "electron", "javascript"],
  },
  {
    id: "witte-quote-generator-desktop",
    display: "Witte Quote Generator Desktop",
    technologies: ["vue", "electron", "javascript"],
  },
  {
    id: "win-iso",
    display: "Win ISO",
  },
  {
    id: "leet-scold",
    display: "Leet Scold",
  },
  {
    id: "node-wimlib-split",
    display: "Node Wimlib Split",
  },
];

// Env validation
const requiredEnvVars = ["GITHUB_TOKEN"];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const repoCache: Array<Repo> = [];

export const getRepoData = async () => {
  return repoCache;
};

export const setRepoData = async () => {
  console.log("GET_REPOS: Refreshing repo data");

  try {
    await Promise.all(repos.map(fetchRepo));
    console.log("GET_REPOS: Finished fetching all repos");
  } catch (e) {
    console.error("GET_REPOS: Failed to fetch all repos");
    console.error(e);
  }
};

const fetchRepo = async (repo: RawRepo) => {
  try {
    console.log(`GET_REPOS: Fetching data for ${repo.id}`);
    const start = Date.now();

    // Main repo data
    const { data: repoData } = await octokit.rest.repos.get({
      owner: "kyleaupton",
      repo: repo.id,
    });

    // Commits
    // Bit of a hack here, we request `listCommits` with 1 commit per page
    // then count the total number of pages to get the total number of commits
    const { headers } = await octokit.rest.repos.listCommits({
      owner: "kyleaupton",
      repo: repo.id,
      per_page: 1,
      page: 1,
    });

    let commits = 0;
    const paginationLink = headers.link;
    if (paginationLink) {
      const lastPageMatch = paginationLink.match(/page=(\d+)>; rel="last"/);
      if (lastPageMatch) {
        commits = parseInt(lastPageMatch[1]);
      }
    }

    // Readme
    const { data: readmeData } = await octokit.rest.repos.getReadme({
      owner: "kyleaupton",
      repo: repo.id,
    });

    const readme = Buffer.from(readmeData.content, "base64").toString("utf-8");

    console.log(
      `GET_REPOS: Adding ${repo.id} to cache. Took ${
        (Date.now() - start) / 1000
      }s.`
    );

    repoCache.push({
      data: {
        id: repoData.id,
        name: repoData.name,
        description: repoData.description || "",
        language: repoData.language || "",
        stargazers_count: repoData.stargazers_count,
        watchers: repoData.watchers,
        pushed_at: repoData.pushed_at,
      },
      commits,
      readme,
      display: repo.display,
      technologies: repo.technologies,
      npm: repo.npm,
    });
  } catch (e) {
    console.error(`GET_REPOS: Failed to fetch repo data for ${repo.id}`);
    console.error(e);
  }
};

// Types
type RawRepo = {
  id: string;
  display: string;
  technologies?: string[];
  npm?: string;
};

type Repo = {
  data: {
    id: number;
    name: string;
    description: string;
    language: string;
    stargazers_count: number;
    watchers: number;
    pushed_at: string;
  };
  commits: number;
  readme: string;
  display: string;
  technologies?: string[];
  npm?: string;
};
