---
title: Blender で作成した3Dモデルを Three.js で表示する
createdAt: 2023-12-11T20:47:47.935
updatedAt: 2023-12-11T20:41:57.852
description: Blenderで作成した3Dモデルを Three.js で表示する方法についてまとめました。
coverImage: /assets/blog/threejs-blender.png
draft: true
tags:
  - three.js
categories:
  - develop
author:
  name: ""
  picture: ""
ogImage:
  url: /assets/blog/threejs-blender.png
keywords:
  - three.js
slug: threejs-blender
---

```shell
❯ pnpm dlx create-turbo@latest
Packages: +116
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 116, reused 0, downloaded 116, added 116, done

>>> TURBOREPO

>>> Welcome to Turborepo! Let's get you set up with a new codebase.

? Where would you like to create your turborepo? ./my-turborepo
? Which package manager do you want to use? pnpm workspaces

Downloading files. This might take a moment.

>>> Created a new Turborepo with the following:

apps
 - apps/docs
 - apps/web
packages
 - packages/eslint-config
 - packages/typescript-config
 - packages/ui

Installing packages. This might take a couple of minutes.

>>> Success! Created a new Turborepo at "my-turborepo".
Inside that directory, you can run several commands:

  pnpm run build
     Build all apps and packages

  pnpm run dev
     Develop all apps and packages

  pnpm run lint
     Lint all apps and packages

Turborepo will cache locally by default. For an additional
speed boost, enable Remote Caching with Vercel by
entering the following command:

  pnpm dlx turbo login

We suggest that you begin by typing:

  cd my-turborepo
  pnpm dlx turbo login
```
