---
sidebar_position: 1
---

# Getting Started

## Prerequisites & Tools

- ASDF
- Postgres
- PNPM

## Creating a New CORE App (Ruby on Rails 6+)

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
