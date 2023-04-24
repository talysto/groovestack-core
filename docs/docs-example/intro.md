---
sidebar_position: 1
---

# CORE Platform

<ModuleList />

import jobs from '../../core-jobs-fe/package.json'
import accounting from '../../core-accounting-fe/package.json'
import comments from '../../core-comments-fe/package.json'
import versions from '../../core-versions-fe/package.json'

export const coreModules = [jobs, accounting, comments, versions]

export const ModuleList = () => (

<table>
<tbody>
  { coreModules.map(mod => (
    <tr>
      <td><b>{mod.name}</b></td>
      <td>{mod.version}</td>
      <td>
        {mod.description}
        <small>{mod.keywords}</small>
      </td>
      <td>{mod.homepage}</td>

    </tr>
    ))

}

</tbody>
</table>
)

Let's discover **Docusaurus in less than 5 minutes**.

## Getting Started

Get started by **creating a new site**.

Or **try Docusaurus immediately** with **[docusaurus.new](https://docusaurus.new)**.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 16.14 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
