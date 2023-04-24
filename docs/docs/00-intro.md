---
sidebar_position: 1
---

# CORE Platform

The CORE Platform is a suite of modules to accelerate the development of full-stack applications using a modern and scalable development stack. Having access to a rich set of base functionality allows teams to focus on building project-specific functionality while leveraging scalable and time-tested CORE modules.

## CORE Stack

- Postgres
- Ruby on Rails
- GraphQL
- Typescript / React
- React-admin / MUI

## CORE Principles

### DX First

```zsh
CORE DX Mode
✔ CORE Jobs
✔ CORE Accounting
✔ CORE Comments
✔ CORE Versions
```

## Getting Started

### Prerequisites & Tools

- ASDF
- Postgres
- PNPM

### Creating a New CORE App (Ruby on Rails 6+)

```
# -d postgresql --skip-turbolinks --skip-jbuilder --skip-webpack-install
rails new APPNAME -m https://moonlight-labs/core/rails-6.rb

cd APPNAME

bundle
pnpm install

which modules get installed?

rails db:setup  # create / migrate

rails c
```

## CORE Modules

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
      <td>
        <b>{mod.name}</b><br />
        <small>{mod.homepage}</small>
      </td>
      <td>{mod.version}</td>
      <td>
        {mod.description}<br />
        <small>{mod.keywords}</small>
      </td>
    </tr>
    ))
  }
</tbody>
</table>
)
