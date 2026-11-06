---
title: "SPRUCE: what has changed since 1.0"
author: Julien Nioche
description: Six months after 1.0, SPRUCE covers Azure and FOCUS reports, gets monthly carbon intensity for Great Britain from NESO, and has its first module built on a commercial API, WattTime.
layout: post
---

SPRUCE is our open source tool for estimating the environmental impact of your cloud usage, from your AWS or Azure billing data. Version 1.0 came out in May, and we have just released 1.5. A lot has happened in those six months, so here is an overview of how the project has grown.
{: .post_intro}

It has been a busy few months outside the code too. I spoke about SPRUCE at [GreenIO London](https://greenio.tech/conference/22/london-2026-september) with Diana Todea, and at [Community Over Code](https://communityovercode.apache.org/events/glasgow-2026/) in Glasgow. The slides and videos of these talks, and of earlier ones, are on the [resources page](https://opensourcegreenops.cloud/resources/) of the SPRUCE site.

## Azure

SPRUCE started with AWS. Most of the Azure pipeline came in version 1.1, with modules for storage (including managed disks), networking, virtual machine impacts from BoaviztAPI, PUE and WUE, water, carbon intensity and operational emissions. Both providers now get the same depth of analysis.

## FOCUS

![FOCUS logo](/images/blog/focus-logo.svg){: .img-post style="width: 220px; max-width: 100%"}

<p class="text-center"><a href="https://focus.finops.org/">focus.finops.org</a></p>

FOCUS, the FinOps Open Cost and Usage Specification, is an open standard for cloud billing data. It is developed by the [FinOps Foundation](https://www.finops.org/), part of the Linux Foundation, with contributions from cloud providers and practitioners. It defines a common set of columns for billing data, so the same analysis works whichever provider produced the data. AWS, Azure and Google Cloud all offer FOCUS exports.

SPRUCE reads FOCUS reports from AWS and Azure as well as their native formats, and its reporting scripts and dashboard work on FOCUS columns. If your organisation already exports FOCUS data, you can run SPRUCE on it directly, and the environmental figures sit next to the cost data your FinOps team already uses.

## Carbon intensity

How much carbon a kWh of electricity carries varies by place and time, and it accounts for much of the difference between one region and another in a SPRUCE report. This area has seen the most work since 1.0.

### Ember

![Ember logo](/images/blog/ember-logo.svg){: .img-post style="width: 220px; max-width: 100%"}

<p class="text-center"><a href="https://ember-energy.org/">ember-energy.org</a></p>

Ember's open data remains the default source for every region. Its figures are lifecycle based, and SPRUCE now applies them for the year in which the usage happened instead of using a single year for everything. The bundled data has just been refreshed. Ember rebuilt its US sub-national dataset and moved it from CO2 to CO2 equivalent, so figures for US regions change by around 15% with no change to SPRUCE's own logic.

### Monthly figures for Great Britain from NESO

<div class="mx-auto rounded" style="max-width: 220px; background: #161616; padding: 16px 24px; margin-bottom: 1rem;"><img src="/images/blog/neso-logo.svg" alt="NESO logo" class="d-block mx-auto" style="width: 100%"></div>

<p class="text-center"><a href="https://carbonintensity.org.uk/">carbonintensity.org.uk</a></p>

The UK grid varies a lot over the seasons, and a yearly average hides that. For cloud regions in Great Britain (AWS `eu-west-2`, Azure `uksouth` and `ukwest`), SPRUCE now uses monthly figures built from the Carbon Intensity API of the National Energy System Operator (NESO).

The API divides Great Britain into 14 regions and models the power flows between them, so a region that imports electricity gets the mix of what it consumes rather than of what it generates. SPRUCE retrieves the data with [carbonintensity-api](https://github.com/jnioche/carbonintensity-api), an open source command line client for the API. The API's own figures only count the CO2 emitted at generation. To stay consistent with the rest of SPRUCE, we value each half-hourly mix with Ember's lifecycle factors instead. Electricity imported from other countries gets the intensity of the country it comes from, weighted by the actual flows through each interconnector as published by Elexon.

The module is part of the default configuration, so UK users get these figures without changing anything. It is also a good example of what regional open data makes possible, and we would like to do the same for other countries where similar data exists.

### WattTime

![WattTime logo](/images/blog/watttime-logo.png){: .img-post style="width: 220px; max-width: 100%"}

<p class="text-center"><a href="https://watttime.org/">watttime.org</a></p>

The newest module gets carbon intensity from WattTime. For each line item, it looks up the grid region of the cloud region and averages WattTime's figures over the period when the resources were used. It works for AWS and Azure, with native and FOCUS reports, and needs a WattTime account.

WattTime provides the average operating emissions rate (AOER). These figures cover combustion only, not the full lifecycle of power generation, so they are lower than the lifecycle figures from Ember and NESO used elsewhere in SPRUCE.

We're pretty excited about this one, because it is the first SPRUCE module to integrate a commercial API. SPRUCE is a framework for enriching usage reports for GreenOps. It comes with a solid set of free, open source modules, and these can be supplemented by proprietary ones such as WattTime's.

## Hardware and embodied emissions

![BoaviztAPI logo](/images/blog/boaviztapi-logo.svg){: .img-post style="width: 220px; max-width: 100%"}

<p class="text-center"><a href="https://github.com/Boavizta/boaviztapi">github.com/Boavizta/boaviztapi</a></p>

The embodied emissions and energy figures for virtual machines come from BoaviztAPI, and we regenerate the bundled data with each new release. Every release improves the coverage and accuracy of the data, with more instance types, better hardware descriptions and refinements to the methodology. SPRUCE has gone from BoaviztAPI 2.3 to 2.6 since 1.0. Version 2.6 estimates the electricity used by GPUs, which made our own Accelerators module redundant, so it has been removed. We also now build the list of AWS instance types from current and discontinued ones, so older instance types still found in billing data get figures too.

- Storage now has embodied emissions, on AWS and Azure.
- LLM inference on Azure Foundry is estimated with EcoLogits, in addition to Amazon Bedrock.
- More AWS services are covered, including DocumentDB Elastic, Amazon MQ and ElastiCache.
- PUE and WUE are applied for the year in which the usage happened.

## Reporting

The dashboard and static report now summarise emissions by GHG Protocol scope, translate impacts into everyday equivalences, show cost alongside environmental trends, and leave out AWS Marketplace charges. The Docker image includes the reporting tools, so a single image takes you from a billing export to a dashboard. The output also has a `spruce_version` column, so you can tell which release produced a given set of figures.

## Under the hood

SPRUCE moved to Java 21 and Spark 4.2. Recent releases also made processing faster, with enriched rows copied in one go and the Boavizta impact data loaded once per JVM. A new `-m` option shows how long each module takes. The documentation has moved to [opensourcegreenops.cloud](https://opensourcegreenops.cloud/).

## Getting started

The [tutorial using Docker](https://opensourcegreenops.cloud/tutorial/with-docker/) is the quickest way to try SPRUCE on your own data, and the [release notes](https://github.com/DigitalPebble/spruce/releases) list every change. As always, bug reports and contributions are very welcome on GitHub. If you'd like help setting SPRUCE up or working out what the figures mean for your organisation, we're happy to talk it through.
