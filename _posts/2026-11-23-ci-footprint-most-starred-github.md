---
title: "Popular projects, hidden carbon"
author: Julien Nioche
description: We estimated a month of GitHub Actions usage for the 500 most starred repositories. Stars say almost nothing about which projects run the most CI, one project accounts for half of the minutes, and AI agent projects account for about half of the rest.
layout: post
---

Every pull request and every commit on a popular open source project triggers automated builds and tests on GitHub Actions, and those run on servers that use electricity. We wanted to know how much, and which projects are behind most of it, so we looked at the Actions usage of the 500 most starred repositories over the 30 days from 24 October to 23 November 2026. Together they used 228 million minutes, which comes to about 50.6 MWh of electricity, 19.4 tonnes of CO2eq and 198,000 litres of water.
{: .post_intro}

[Aspen](https://github.com/DigitalPebble/aspen) is our open source tool for estimating the energy, carbon emissions and water use of GitHub Actions. It normally works from the jobs of your workflow runs or from your GitHub billing report, which tell it the runner type behind every minute. To cover 500 repositories we took the total minutes that GitHub shows on the Actions usage metrics page of each public repository, split by operating system, and applied Aspen's methodology to them. Energy comes from [BoaviztAPI](https://github.com/Boavizta/boaviztapi) with Microsoft's reported PUE for its American data centres, and carbon from the average US grid intensity published by [Ember](https://ember-energy.org). Every minute is given the power draw of a standard GitHub hosted runner for its operating system, which makes the result a rough estimate.

## The ten repositories with the most minutes

| Repository | Rank by stars | Stars | Minutes | Energy (kWh) | Carbon (kg CO2eq) | Water (L) |
|---|---:|---:|---:|---:|---:|---:|
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | 129 | 105,798 | 108,794,757 | 24,219 | 9,300 | 94,892 |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | 7 | 395,094 | 16,117,899 | 3,565 | 1,369 | 13,967 |
| [BerriAI/litellm](https://github.com/BerriAI/litellm) | 358 | 63,773 | 7,657,523 | 1,708 | 656 | 6,691 |
| [paperclipai/paperclip](https://github.com/paperclipai/paperclip) | 112 | 116,238 | 5,553,784 | 1,236 | 475 | 4,844 |
| [twentyhq/twenty](https://github.com/twentyhq/twenty) | 378 | 61,371 | 5,528,447 | 1,231 | 473 | 4,824 |
| [grafana/grafana](https://github.com/grafana/grafana) | 243 | 78,051 | 4,370,510 | 973 | 374 | 3,814 |
| [rust-lang/rust](https://github.com/rust-lang/rust) | 99 | 122,416 | 4,020,399 | 893 | 343 | 3,498 |
| [stablyai/orca](https://github.com/stablyai/orca) | 85 | 134,250 | 3,344,458 | 756 | 290 | 2,963 |
| [protocolbuffers/protobuf](https://github.com/protocolbuffers/protobuf) | 291 | 72,193 | 2,952,116 | 638 | 245 | 2,499 |
| [vercel/next.js](https://github.com/vercel/next.js) | 75 | 143,601 | 2,728,011 | 610 | 234 | 2,391 |
| **Total, all 500 repositories checked** | | | **228,046,320** | **50,617** | **19,437** | **198,321** |
{: .table}

## Stars say almost nothing about CI

The ten most starred repositories are mostly lists and learning material, such as [build-your-own-x](https://github.com/codecrafters-io/build-your-own-x), [awesome](https://github.com/sindresorhus/awesome), [public-apis](https://github.com/public-apis/public-apis) and [system-design-primer](https://github.com/donnemartin/system-design-primer). They have hundreds of thousands of stars and almost no CI, because there is little to build or test. Of the 500 repositories, 104 ran no Actions at all. Across the other 396, the correlation between a repository's rank by stars and its rank by minutes is 0.13, which is close to no relation.

The repositories with the most minutes sit at ranks 129, 7, 358, 112 and 378 by stars. Stars measure attention. CI minutes follow how often the code changes, how many platforms it is tested on and how heavy the workflows are. The 100 lists, books and learning resources in the top 500 together account for 0.4% of the minutes.

## One repository uses half of the minutes

[PyTorch](https://github.com/pytorch/pytorch) ran 108.8 million minutes in the month, 47.7% of the total. Spread over the month, that is about 2,500 machines running without a break. The top 20 repositories account for 81% of the minutes and the 35 repositories above one million minutes for 90%. The median repository with any usage ran about 7,000 minutes.

PyTorch's real footprint is probably different from our figure, and we cannot tell in which direction. Much of its CI may run on infrastructure the project manages itself, including GPU machines that use more energy per minute than the standard runner we assumed. Those machines may also sit in a region with cleaner electricity than the US average we applied.

## Which kinds of project use the most minutes

To group the repositories by type, we fetched the topics and description of each and sorted them into eight categories, then checked the 50 repositories with the most minutes by hand. Those 50 repositories account for 94% of the total.

![Bar chart of estimated carbon emissions by type of project. PyTorch alone accounts for 9.3 tonnes of CO2eq (48%), AI agents and LLM apps for 5.0 tonnes (26%), and every other category for under 2 tonnes each.](/images/blog/ci-carbon-by-category.svg){: .img-post style="width: 720px; max-width: 100%"}

PyTorch is shown on its own because it would otherwise make machine learning frameworks look like the largest category by far. The next one, AI agents and LLM applications, comes to 5.0 tonnes, about half of what remains once PyTorch is set aside.

| Category | Repositories | Minutes | Share without PyTorch | Median minutes |
|---|---:|---:|---:|---:|
| ML frameworks and models | 35 | 118.0M | 7.7% | 6,235 |
| AI agents and LLM apps | 147 | 59.0M | 49.4% | 10,027 |
| Infrastructure, data and developer tools | 55 | 21.0M | 17.6% | 5,449 |
| Languages, compilers and runtimes | 31 | 13.4M | 11.2% | 51,285 |
| Web and UI frameworks | 59 | 8.0M | 6.7% | 8,417 |
| End user apps and OS tools | 21 | 5.9M | 5.0% | 1,763 |
| Lists, books and learning | 100 | 0.9M | 0.8% | 12 |
| Other | 52 | 1.8M | 1.5% | 26 |
{: .table}

Languages, compilers and runtimes have a modest total, but the median project in that group runs over 50,000 minutes, five times the figure for AI agents. [Rust](https://github.com/rust-lang/rust), [CPython](https://github.com/python/cpython), [Node.js](https://github.com/nodejs/node) and [Protocol Buffers](https://github.com/protocolbuffers/protobuf) test every change on many platforms and versions, so their load is large and steady.

## The footprint of young projects

Projects created recently run more CI. Leaving PyTorch aside, the 111 repositories created in 2025 or 2026 average about 410,000 minutes each, against 161,000 for those created before 2023. Together they use 38.5% of the minutes, and nearly all of those with the most minutes are AI agents and coding tools. [openclaw](https://github.com/openclaw/openclaw) was created on 24 November 2025 and now runs about 114,000 jobs a day. [Paperclip](https://github.com/paperclipai/paperclip) and [Orca](https://github.com/stablyai/orca) are less than nine months old.

Part of this is the composition of the list, since 147 of the 500 repositories are now AI projects, but the difference holds per repository too. The data does not tell us why. One possible cause is that coding agents now open many of the pull requests on these projects, and each one triggers a full round of CI. We have not checked this against pull request data.

## How far to trust these figures

These are rough estimates, for four reasons.

- **Public repositories only.** Private repositories, which we cannot see, add to the total.
- **Every minute is treated as a standard GitHub hosted runner.** We know the split between Linux (89%), Windows (7%) and macOS (4%) but not the machine sizes. Self-hosted runners and larger machines can move a project's footprint up or down, depending on the machines and where they run. PyTorch is the obvious case, and any other project using its own runners is affected too.
- **The grid is the US average.** Runners in a region with cleaner electricity would emit less.
- **The categories come from keyword rules,** checked by hand for the 50 repositories with the most minutes.

## Measure your own

CI footprint concentrates in a few projects, and how popular or large a project is does not tell you which ones.

[Aspen](https://github.com/DigitalPebble/aspen) measures it for your own repositories, as a GitHub Action or from your organisation's billing report. It is open source and the methodology is documented in the repository.

If you maintain one of the projects above and would like a more accurate picture, or want help reducing your CI footprint, get in touch. We are happy to talk it through.
