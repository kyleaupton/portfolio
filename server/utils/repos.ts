/**
 * Module that exports utility functions for fetching data about my GitHub repos
 */

import { Octokit } from "octokit";

const REFRESH_INTERVAL = 1000 * 60 * 15; // 15 minutes

type PersistedRepo = {
  id: string;
  icons?: string[];
  npm?: string;
};

// List of repos to fetch
const repos: PersistedRepo[] = [
  {
    id: "boot-builder",
    icons: ["vue", "electron", "typescript"],
  },
  {
    id: "resume",
    icons: ["react", "typescript"],
  },
  {
    id: "node-rsync",
    npm: "https://www.npmjs.com/package/@kyleupton/node-rsync",
  },
  {
    id: "glob-copy",
    npm: "https://www.npmjs.com/package/@kyleupton/glob-copy",
  },
  {
    id: "portfolio",
    icons: ["vue", "typescript"],
  },
  {
    id: "TransactionTracker",
  },
  {
    id: "schedule-widget",
  },
  {
    id: "zerotier-utility",
    icons: ["vue", "electron", "javascript"],
  },
  {
    id: "witte-quote-generator-desktop",
    icons: ["vue", "electron", "javascript"],
  },
  {
    id: "win-iso",
  },
  {
    id: "leet-scold",
  },
  {
    id: "node-wimlib-split",
  },
];

if (!process.env.GITHUB_TOKEN) {
  throw new Error("GITHUB_TOKEN environment variable is required");
}

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
let cache: Record<string, Repo> = {};

// Exported utility function
export const getRepoData = async () => {
  return cache;
};

const fetchAll = async () => {
  console.log("utils/repos.ts: Refreshing repo data");

  await Promise.race([
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error("fetchAll() timed out")),
        REFRESH_INTERVAL
      )
    ),
    Promise.all(repos.map(fetchRepo)),
  ]);

  console.log(
    `utils/repos.ts: Finished refreshing repo data. ${
      Object.keys(cache).length
    } repos in cache.`
  );
};

const fetchRepo = async (repo: PersistedRepo) => {
  try {
    console.log(`utils/repo.ts: Fetching data for ${repo.id}`);
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
      `utils/repo.ts: Adding ${repo.id} to cache. Took ${Date.now() - start}ms.`
    );

    cache[repo.id] = {
      data: repoData,
      commits,
      readme,
      icons: repo.icons,
      npm: repo.npm,
    };
  } catch (e) {
    console.error(`Failed to fetch repo data for ${repo.id}`);
    console.error(e);
  }
};

// Upon module load, fetch the data
fetchAll();

// Refresh the data every 15 minutes
setInterval(fetchAll, REFRESH_INTERVAL);

// Types
type Repo = {
  data: Awaited<ReturnType<typeof octokit.rest.repos.get>>["data"];
  commits: number;
  readme: string;
  icons?: string[];
  npm?: string;
};
