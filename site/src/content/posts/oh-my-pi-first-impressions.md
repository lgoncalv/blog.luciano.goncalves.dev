---
title: "First impressions of Oh My Pi AI Agent Harness"
publishedOn: 2026-07-04
description: "Testing Oh My Pi, an AI agent harness built on top of Pi, and one feature that immediately stood out: Advisor."
---

I've tried a few different AI coding harnesses recently, and so far I quite like [Pi](https://github.com/earendil-works/pi). It feels less opinionated than some of the alternatives, as you'll read many people say, which makes it easier to adapt to the way I like to work rather than forcing me into a particular workflow.

I've spent a couple of days testing [Oh My Pi](https://github.com/can1357/oh-my-pi), an AI agent harness built on top of [Pi](https://github.com/earendil-works/pi). I found out about it because someone recommended it at work, so I decided to give it a go.

One cool feature they have is **Advisor**.

The idea is simple: while your main agent is writing code, the advisor agent independently reviews what it's doing. The feedback is then fed back into the main agent, which can apply the suggestions before continuing.

It's a bit like having an always-on code reviewer sitting next to your AI agent.

Another thing I like is that you can configure the model the advisor uses. It doesn't have to use the same model as the main agent, and it probably shouldn't.

You can actually configure many models for different things: which one to use for something fast, or another for things that require more reasoning? Or what about image processing? And of course, the advisor. Check this simple setup:

```yml
providers: 
  webSearch: auto
setupVersion: 1
modelRoles: 
  default: deepseek/deepseek-v4-flash:xhigh
  advisor: deepseek/deepseek-v4-pro:xhigh
  tiny: deepseek/deepseek-v4-flash:xhigh
  vision: openai/chatgpt-image-latest
  slow: openai-codex/gpt-5.5:xhigh
defaultThinkingLevel: auto
```

I'm experimenting now, building a pipeline to develop a feature from **Description** to **Pull Request**. See phases below.

## Pipeline Phases

### Phase 1 — PRD & Milestone (`prd-writer`)

The `prd-writer` agent analyzes the requirements, explores existing code patterns, and produces a structured PRD covering the problem statement, scope, technical requirements, user stories, acceptance criteria, and success metrics. The PRD is saved as a **GitHub milestone** description.

**Tools:** `read`, `bash`, `github_milestone_create`

### Phase 2 — Code Scout (`scout`)

The `scout` agent does fast reconnaissance of the codebase and returns compressed, structured findings: exact file paths with line ranges, key types and interfaces, architecture notes, and a recommended starting point. This context flows into the work splitter so issues are grounded in the real code.

**Tools:** `read`, `grep`, `find`, `ls`, `bash`

### Phase 3 — Work Split (`work-splitter`)

The `work-splitter` agent receives the PRD and scout findings, then creates **granular GitHub issues** under the milestone. Each issue is:

- **Independently deployable** — can ship on its own
- **Small** — completable in one focused session
- **Explicit** — clear acceptance criteria and technical notes
- **Dependency-aware** — blocked issues get `depends-on:#N` labels

The splitter also outputs a parallelization plan: which issues can run concurrently and which must wait.

**Tools:** `read`, `bash`, `github_issue_create`, `github_issue_list`

### Phase 4 — Parallel Workers & Testers (`worker` + `tester`)

This phase runs in **batches**. The agent checks `feature_status` to find unblocked issues, then for each one:

1. **Isolate**: `git_worktree_create` spins up a workspace at `/tmp/omp-worktrees/issue-N/` on branch `feature/issue-N`
2. **Implement**: the `worker` agent modifies code in the worktree
3. **Commit**: `git_commit_and_push` stages, commits, and pushes the branch
4. **Test**: the `tester` agent writes unit and integration tests, runs them, and commits again
5. **PR**: `github_pr_create` opens a pull request linked to the issue with `Closes #N`

Multiple unblocked issues run **in parallel** via the subagent tool's `tasks` array. As PRs merge, previously blocked issues become unblocked and the next batch starts.

**Worker tools:** all default  
**Tester tools:** `read`, `write`, `edit`, `bash`, `github_pr_create`, `git_commit_and_push`

## Dependency Tracking

Issues declare dependencies at creation time via `dependsOn: [#42]`. This adds a `depends-on:#42` GitHub label. The `feature_status` tool checks whether all dependency issues are closed — blocked issues show as 🚫 and agents skip them until their dependencies merge.

## Project Structure

```
omp-feature-factory/
├── .pi/
│   ├── extensions/
│   │   ├── feature-pipeline/      ← GitHub + worktree tools, /build-feature command
│   │   │   ├── index.ts
│   │   │   ├── github-tools.ts
│   │   │   └── worktree-tools.ts
│   │   └── subagent/              ← agent spawning (symlinked from pi)
│   ├── agents/                    ← agent role definitions
│   │   ├── prd-writer.md
│   │   ├── scout.md
│   │   ├── work-splitter.md
│   │   ├── worker.md
│   │   └── tester.md
│   └── prompts/                   ← workflow presets
│       ├── implement.md
│       ├── scout-and-plan.md
│       └── implement-and-review.md
├── .gitignore
└── README.md
```

It's a work in progress, and I'll share more here after some more testing. Oh, I forgot to mention, the code is in my GitHub, it's called [omp-feature-factory](https://github.com/lgoncalv/omp-feature-factory).