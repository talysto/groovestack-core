# frozen_string_literal: true

# CORE Applications Template
# USAGE
# rails new -m https://raw.githubusercontent.com/moonlight-labs/core/main/support/core-rails-template.rb

# Reference: https://guides.rubyonrails.org/rails_application_templates.html

# starter command:
#  -d postgresql --skip-turbolinks --skip-jbuilder --skip-webpack-install

# ARGV << "--skip-webpack-install"
# ARGV << "-d postgresql"

# puts ARGV
# exit
# puts self.class.protected_instance_methods(false).sort
# puts self.class.private_instance_methods(false).sort
# puts self.singleton_class.instance_methods(false).sort


# Groovestack Basics
gem 'graphql'
gem 'uuid'
gem 'vite_rails'

# Nice to haves for Rails apps
gem 'view_component'

# dev stuff
gem_group :development, :test do
  gem 'foreman'
end

# CORE Modules
# add_source 'https://github.com/moonlight-labs/core.git', branch: 'spike/darren-refactors2' do
# git 'https://github.com/moonlight-labs/core.git', branch: 'spike/darren-refactors2' do
github 'moonlight-labs/core', branch: 'dev' do
  gem 'core-base' # must be first dependency
  gem 'core-jobs'
  # gem 'core-comments'
  # gem 'core-versions'
  # gem 'core-notifications'
  # gem 'core-webhooks'
end

run "bundle install"

# git 'https://github.com/moonlight-labs/core.git', branch: 'spike/darren-refactors2' do # TODO: update branch name to main
#   gem 'core-base' # must be first dependency
#   gem 'core-comments'
#   gem 'core-referrals'
#   gem 'core-versions'
# end

# # gem 'groovestack-rails', github: 'talysto/groovestack-rails'

inject_into_file 'config/application.rb', :before => "  end" do
  "\n  config.active_record.schema_format = :sql\n\n"
end

inject_into_file 'app/controllers/application_controller.rb', :before => "  end" do
  "\n  def index; end\n\n"
end

create_file "app/frontend/entrypoints/application.js", <<~RUBY
// To see this message, add the following to the `<head>` section in your
// views/layouts/application.html.erb
//
//    <%= vite_client_tag %>
//    <%= vite_javascript_tag 'application' %>
console.log('Vite ⚡️ Rails')

import '~/entrypoints/groovestack-admin.js'
// If using a TypeScript entrypoint file:
//     <%= vite_typescript_tag 'application' %>
//
// If you want to use .jsx or .tsx, add the extension:
//     <%= vite_javascript_tag 'application.jsx' %>

console.log('Visit the guide for more information: ', 'https://vite-ruby.netlify.app/guide/rails')

// Example: Load Rails libraries in Vite.
//
// import * as Turbo from '@hotwired/turbo'
// Turbo.start()
//
// import ActiveStorage from '@rails/activestorage'
// ActiveStorage.start()
//
// // Import all channels.
// const channels = import.meta.globEager('./**/*_channel.js')

// Example: Import a stylesheet in app/frontend/index.css
// import '~/index.css'

RUBY

create_file "app/views/application/index.html.erb", <<~RUBY
<header>
  <a href="https://vite-ruby.netlify.app/guide/rails.html">
    # <img class="logo smooth" src="<%= vite_asset_path 'images/logo.svg' %>"/>
    <div id="root"></div>
  </a>
</header>
RUBY

create_file "app/frontend/components/layout/CustomAppBar.jsx", <<~RUBY
// in src/MyAppBar.js
import React from 'react'
import { AppBar, Logout, TitlePortal, UserMenu } from 'react-admin'

export const CustomAppBar = () => {
  return (
    <AppBar
      color="primary"
      userMenu={
        <UserMenu>
          {/* <SettingsMenuItem /> */}
          <Logout />
        </UserMenu>
      }
    >
      <TitlePortal />
    </AppBar>
  )
}
RUBY

create_file "app/frontend/data/mock-providers.js", <<~RUBY
import fakeDataProvider from 'ra-data-fakerest'

import data from './dev-data.json'

export const mockDataProvider = fakeDataProvider(data, true)

export const mockAuthProvider = async () => {
  const currentUser = data.User[0]
  currentUser.fullName = currentUser.name

  return {
    // authentication
    login: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    getIdentity: () => Promise.resolve(currentUser),
    handleCallback: () => Promise.resolve(), // for 3rd-party auth only
    getPermissions: () => Promise.resolve(['admin']),
  }
}
RUBY

create_file "app/frontend/components/pages/HomeView.jsx", <<~RUBY
import React from 'react'
import { List, ListItem, ListItemText, Paper } from '@mui/material'
// import { useContext } from 'react'

const stack = [
  { name: 'React Admin' },
  { name: 'MUI' },
  { name: 'Typescript / React' },
  { name: 'GraphQL' },
  { name: 'Ruby / Rails' },
  { name: 'PostgreSQL' },
]

// Storybook
// https://github.com/storybookjs/storybook/blob/998926f115259ffe4e9afe03b25daf34556e4756/code/ui/blocks/src/blocks/Controls.tsx#L25

// Reflection
// https://stackoverflow.com/questions/69724621/react-typescript-reflection-listing-properties-of-an-interface
const Members = ({ members }) => {
  return (
    <ul>
      {members.map((member, idx) => {
        // console.log(argTypes)

        return (
          <li key={idx}>
            {member.name} ({member.releaseTag} {member.kind})
            {member.members && <Members members={member.members} />}
          </li>
        )
      })}
    </ul>
  )
}

export const Packages = ({ packages }) => {
  return (
    <ul>
      {Object.values(packages).map((pkg, idx) => (
        <li key={idx}>
          <b>{pkg.name}</b> - {pkg.kind} <br />
          <small>
            v{pkg.version} - {pkg.license}
          </small>{' '}
          <br />
          <Members members={pkg.members[0].members} />
        </li>
      ))}
    </ul>
  )
}

// export const Components = ({components}) => (
//   <ul>
//       {components.members[0].members.map((member: any, idx:number) => (
//         <li key={idx}>{member.name} ({member.kind})</li>
//       ))}
//     </ul>
// )

export const HomeView = () => (
  <Paper elevation={2} sx={{ minHeight: 600, p: 5, minWidth: 800 }}>
    <h2>CORE Platform</h2>
    <p>
      The CORE Platform is a suite of modules that provide full-stack
      functionality to allow you to build new bespoke platforms faster than
      ever.
    </p>

    <h3>Design Approach</h3>
    <ul>
      <li>DX First</li>
      <li>Reasonable Defaults</li>
      <li>Extensible</li>
      <li>Minimal Depdendencies</li>
      <li>Green tests on all releases</li>
    </ul>

    <h3>Modules</h3>
    {/* <Packages packages={packages} /> */}

    <h3>CORE Modules</h3>
    <ul>
      <li>
        <b>Base</b> - shared elements leveraged by most CORE modules
      </li>
      <li>
        <b>Jobs</b> - reliable, persistent asynchronous job management.
        [PostgreSQL, que gem ]
      </li>
      <li>
        <b>Accounting</b> - double entry accounting for any type of financial
        transactions [double_entry gem]
      </li>
      <li>
        <b>Versions</b> - track changes to database records [paper_trail gem]
      </li>
    </ul>

    <h4>ROADMAP</h4>
    <ul>
      <li>
        Webhooks - authenticate, log, and process webhooks from integrated
        applications
      </li>
      <li>Lookups - enable admin and user management of custom lookups.</li>

      <li>Auth - FE components</li>
    </ul>

    <h3>CORE Stack</h3>
    <List dense>
      {stack.map((layer, idx) => (
        <ListItem key={idx}>
          {/* <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon> */}
          <ListItemText
            primary={layer.name}
            // secondary={secondary ? 'Secondary text' : null}
          />
        </ListItem>
      ))}
    </List>
  </Paper>
)
RUBY

create_file "app/frontend/data/dev-data.json", <<~JSON
{
  "Comment": [
    {
      "body": "Dignissimos fugit harum quam possimus totam nemo in. Architecto voluptatem quos voluptatum cumque corrupti laborum consequatur accusantium maxime. Ea dolor ea aliquam odio.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "75339710-2d95-4216-b52e-ba7b5778f2bf",
      "created_at": "2022-11-15T14:21:15.555Z",
      "updated_at": "2023-09-21T23:24:51.562Z"
    },
    {
      "body": "Maiores reiciendis animi animi. Fugit sunt quia dicta ex sed culpa commodi error nulla. Voluptatum laudantium voluptatibus natus quod velit facilis ab commodi quidem.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "54634601-7d7c-4929-9db7-800142b0b6d3",
      "created_at": "2022-10-28T13:28:23.994Z",
      "updated_at": "2023-07-22T09:01:44.377Z"
    },
    {
      "body": "Voluptatum neque natus excepturi voluptate ratione molestias aliquid magnam. Sapiente molestiae quia. Asperiores accusamus quisquam quis est occaecati aliquam animi labore maiores.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "resource_type": "User",
      "id": "3c23b03f-bdae-49c5-9f8c-f9eb825c8df2",
      "created_at": "2023-02-01T19:51:41.777Z",
      "updated_at": "2023-07-22T03:37:45.403Z"
    },
    {
      "body": "Nesciunt facere maiores labore praesentium omnis eius ad perferendis doloremque. Asperiores suscipit doloribus nemo. At quae velit excepturi quas.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "resource_type": "User",
      "id": "ee8b1655-4970-4370-aef6-58cecbd66508",
      "created_at": "2023-05-29T00:35:37.646Z",
      "updated_at": "2022-10-17T10:23:39.095Z"
    },
    {
      "body": "Perspiciatis commodi ipsa unde esse. Ea cum laborum magnam explicabo cum et sed. Pariatur harum voluptas esse voluptatum nam ut.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "5e8d7856-8d47-478b-9cd5-5acc470fc9e4",
      "created_at": "2022-10-29T17:12:58.088Z",
      "updated_at": "2022-12-20T05:02:45.976Z"
    },
    {
      "body": "Quas numquam rerum. Similique quae sunt magnam in. Numquam error quia.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "resource_type": "User",
      "id": "890431c4-e59c-4505-a612-ae54bf31ae66",
      "created_at": "2023-01-05T10:35:04.347Z",
      "updated_at": "2023-07-10T11:36:10.706Z"
    },
    {
      "body": "Qui voluptas officiis aspernatur. Saepe molestias tempora possimus ipsam. Reiciendis saepe ratione tempora.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "resource_type": "User",
      "id": "541f1f4f-6a98-48ef-bee3-81f7904933e8",
      "created_at": "2023-04-04T00:41:52.691Z",
      "updated_at": "2022-10-23T14:34:55.500Z"
    },
    {
      "body": "Nihil nesciunt omnis. Sed repellat numquam. Alias dolorum sequi id alias minus.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "3d9c15ac-44dc-4982-a3bb-dbc3e7af27cd",
      "created_at": "2023-09-28T12:58:16.859Z",
      "updated_at": "2022-12-28T21:30:33.044Z"
    },
    {
      "body": "Vitae mollitia commodi ratione consequatur ut quisquam. Occaecati fuga necessitatibus ea. Impedit temporibus dolorum.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "resource_type": "User",
      "id": "577e068e-7cd9-49bb-b5ef-17ea927e686c",
      "created_at": "2023-03-31T07:14:31.732Z",
      "updated_at": "2023-09-15T03:27:35.029Z"
    },
    {
      "body": "Alias iusto soluta tempore vel consectetur quod reiciendis. Eaque rem similique quam minima magni earum. Architecto dolorum magni delectus.",
      "author_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "c0e39720-f6eb-44bf-aabb-769955c50e22",
      "created_at": "2023-08-26T11:54:28.514Z",
      "updated_at": "2023-07-19T06:06:47.150Z"
    },
    {
      "body": "Rerum sint itaque autem adipisci delectus ab tempora neque. Vitae quo quod optio totam. Cupiditate eos odit aut nesciunt provident dignissimos odio autem.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "resource_type": "User",
      "id": "47bc41d8-7836-48f7-8851-0e0805448f9d",
      "created_at": "2023-04-04T14:32:22.695Z",
      "updated_at": "2023-05-20T23:06:27.540Z"
    },
    {
      "body": "Repudiandae ipsa neque rerum voluptate dolorum. Aliquid sequi est excepturi earum temporibus consequatur ullam fugit. Quas non facere sed aspernatur rem enim nesciunt id eius.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "resource_type": "User",
      "id": "b26c9566-cc20-4a7c-b085-27bfc8794bf6",
      "created_at": "2023-06-19T02:38:04.413Z",
      "updated_at": "2023-08-08T16:22:04.763Z"
    },
    {
      "body": "Dolores velit doloremque dicta sapiente distinctio sapiente exercitationem vitae corporis. Voluptatibus explicabo hic blanditiis. Molestias ex minima.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "5809a67e-8029-40ae-8763-d1c3def8bb91",
      "created_at": "2023-03-09T13:56:58.831Z",
      "updated_at": "2023-08-24T19:36:23.259Z"
    },
    {
      "body": "Hic fugiat saepe reprehenderit quos. Ullam ex necessitatibus optio maxime ipsum dolores culpa totam labore. Iure ab hic mollitia dolore asperiores iste distinctio dolores.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "resource_type": "User",
      "id": "919e16b5-6a67-4e67-8069-95edd9670ffd",
      "created_at": "2022-12-06T17:38:50.792Z",
      "updated_at": "2023-09-24T15:41:40.145Z"
    },
    {
      "body": "Perferendis aperiam laudantium excepturi atque totam nulla. Ipsum praesentium dolorem sapiente necessitatibus soluta maxime. Voluptatem a facilis.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "f0e9c2b5-88c3-45e9-b4fa-6b3694a2e1b8",
      "created_at": "2022-10-31T06:35:02.778Z",
      "updated_at": "2022-11-06T12:24:01.964Z"
    },
    {
      "body": "Inventore quam illo asperiores quidem cum. Magnam quia ducimus numquam. Incidunt cupiditate dignissimos tenetur necessitatibus quis.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "9fb3091b-93bf-46b0-b4fe-2b58a3299e59",
      "created_at": "2023-04-28T12:58:04.173Z",
      "updated_at": "2023-05-23T21:15:46.711Z"
    },
    {
      "body": "Occaecati rem ullam laboriosam odit reprehenderit. Voluptatum aliquam natus tempore dicta. Delectus quasi dolorem deserunt accusantium.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "resource_type": "User",
      "id": "c4c6ef3d-71a7-4ba3-bf6c-774a7daae400",
      "created_at": "2023-02-08T00:54:10.157Z",
      "updated_at": "2023-07-18T12:46:58.315Z"
    },
    {
      "body": "Labore rem dicta laboriosam quae quasi at velit laboriosam. Non expedita magni dignissimos tempore. Fugiat vero dolor.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "resource_type": "User",
      "id": "ad995a51-4c80-4d23-bb42-d75f8bd20045",
      "created_at": "2023-05-18T01:18:00.750Z",
      "updated_at": "2023-01-17T19:15:09.674Z"
    },
    {
      "body": "Alias molestias nulla. Cupiditate fugiat ex est non eos sit magnam quae nam. Esse possimus corrupti repellat assumenda asperiores nam.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "9341a6d2-516d-4831-8a9f-3c7b73b9b95c",
      "created_at": "2022-11-30T21:50:04.860Z",
      "updated_at": "2023-05-11T20:54:08.290Z"
    },
    {
      "body": "Quia ipsa tempora voluptates asperiores quis optio illo magnam quisquam. Impedit quas veniam cupiditate tempora unde blanditiis. Molestiae quasi delectus qui deserunt dolorum doloribus libero quo.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "1ed0a25e-128c-415a-b333-b38ca10a4679",
      "created_at": "2023-02-24T07:12:30.941Z",
      "updated_at": "2022-11-08T16:53:11.403Z"
    },
    {
      "body": "Ratione reprehenderit fugit vero illum enim. Totam consequuntur repudiandae sunt. Amet veritatis animi maxime suscipit optio quaerat iste delectus debitis.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "resource_type": "User",
      "id": "7d1c67cb-4b4d-4a39-a5f7-6a21154987c7",
      "created_at": "2023-10-05T17:29:41.223Z",
      "updated_at": "2023-04-21T23:17:52.040Z"
    },
    {
      "body": "Harum cumque similique nesciunt nesciunt. Et minus quaerat. Alias temporibus ipsum.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "resource_type": "User",
      "id": "86622379-81e1-4fbc-9a20-fec37a5c89f4",
      "created_at": "2023-03-02T06:13:00.999Z",
      "updated_at": "2023-02-23T21:36:21.525Z"
    },
    {
      "body": "Vero cupiditate occaecati. Dolore magni voluptatibus fugiat reiciendis id alias. Minima ad ipsam.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "resource_type": "User",
      "id": "6d7efa20-a31b-4daa-90aa-3220f51a918b",
      "created_at": "2023-02-22T02:41:47.392Z",
      "updated_at": "2023-05-14T01:38:35.885Z"
    },
    {
      "body": "Voluptate suscipit facere facilis rerum. Nihil odio aliquid nesciunt id ipsum incidunt itaque repellat. Quis vitae corrupti fugit molestiae earum aliquid aspernatur.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "resource_type": "User",
      "id": "e88d5014-0e17-4e81-b526-faa0d67a6f68",
      "created_at": "2023-02-13T01:22:18.713Z",
      "updated_at": "2023-05-26T07:27:51.002Z"
    },
    {
      "body": "Dolorem nostrum temporibus maxime iusto. Ipsam aperiam maiores. Veritatis nostrum tenetur vitae a nam necessitatibus iusto.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "c0c368c7-2f94-4574-b905-3a26e7e70d42",
      "created_at": "2023-01-14T10:49:16.020Z",
      "updated_at": "2023-04-18T06:21:52.073Z"
    },
    {
      "body": "Reiciendis in expedita recusandae nostrum. Quis sapiente dolore. Id repellat eos magnam tenetur.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "resource_type": "User",
      "id": "8ed32f34-4830-4204-85d2-f7f8507935bb",
      "created_at": "2023-06-18T23:19:32.600Z",
      "updated_at": "2023-08-18T08:40:48.886Z"
    },
    {
      "body": "Libero magnam reprehenderit quos. At qui harum maiores repellendus. Accusantium dolorum esse necessitatibus ab ipsa.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "resource_type": "User",
      "id": "8a8359c4-6f1e-4062-8421-e331494fc6e2",
      "created_at": "2023-07-18T14:13:26.523Z",
      "updated_at": "2023-09-22T15:50:13.266Z"
    },
    {
      "body": "Fuga doloribus nesciunt omnis debitis veritatis accusamus. At beatae quia. Laborum molestias aut amet ea aliquid amet.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "resource_type": "User",
      "id": "52df7626-b8bf-4236-9dcf-97a6b32e7bbc",
      "created_at": "2023-04-06T00:30:36.443Z",
      "updated_at": "2023-10-01T06:59:07.886Z"
    },
    {
      "body": "Repellendus non reiciendis nihil autem vero consequuntur rerum esse. Animi harum veritatis quidem quis labore quo. Nulla molestiae sint placeat facilis illum eius minima exercitationem veniam.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "a28f6e5c-ae5f-4635-a4c9-af04562668f5",
      "created_at": "2023-01-17T13:43:27.562Z",
      "updated_at": "2023-01-04T07:57:48.111Z"
    },
    {
      "body": "Autem veritatis quia reprehenderit sit iste dolorum quos repellat. Necessitatibus delectus ab nulla dolores quos provident veritatis. Necessitatibus ex cum necessitatibus et ullam assumenda ea quasi.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "4b37cc4c-8bf7-4ed8-81fe-1f06410d4364",
      "created_at": "2023-03-04T16:48:24.281Z",
      "updated_at": "2023-08-10T15:45:27.212Z"
    },
    {
      "body": "Reiciendis consequuntur nostrum autem sit eius. Aliquid tenetur aspernatur. Voluptatem ducimus quasi culpa modi blanditiis aperiam numquam provident consequuntur.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "resource_type": "User",
      "id": "d2f885df-21b3-47a5-8a26-b0caeb06a03c",
      "created_at": "2022-11-11T08:17:04.446Z",
      "updated_at": "2023-10-02T19:01:44.105Z"
    },
    {
      "body": "Tempora ex reprehenderit aspernatur harum. Eius consectetur sint possimus aliquid similique velit architecto fuga optio. Alias provident dolor.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "b3e6c1f3-0882-4082-bdf4-0cffde44a213",
      "created_at": "2022-10-31T01:07:56.004Z",
      "updated_at": "2023-06-30T03:30:31.506Z"
    },
    {
      "body": "Cupiditate sunt nemo mollitia. Ad eum cum id. Nemo eius ratione provident rem assumenda fuga magnam ea magni.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "2fe3a888-b448-4686-a116-1f595685ce9d",
      "created_at": "2023-02-02T23:17:24.834Z",
      "updated_at": "2022-11-06T03:25:17.019Z"
    },
    {
      "body": "Earum eveniet aliquam est incidunt magni soluta blanditiis. Aspernatur voluptatem qui hic reprehenderit delectus dicta ex quis ipsam. Culpa repudiandae consectetur aperiam temporibus aspernatur dolorum.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "resource_type": "User",
      "id": "9f8314d3-8bc2-42d3-b9d9-44b9f2b5ea3a",
      "created_at": "2022-11-09T11:10:11.199Z",
      "updated_at": "2023-05-30T11:40:15.335Z"
    },
    {
      "body": "Vero maxime at repudiandae molestias reprehenderit. Sed sequi quasi sequi. Qui in provident.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "adff13c3-87e4-40c2-8903-b9c8a449e621",
      "created_at": "2023-06-05T08:21:00.550Z",
      "updated_at": "2023-04-04T07:48:08.318Z"
    },
    {
      "body": "Sapiente dolor a facilis vero. Accusantium ratione aliquam rem. Ad voluptatem eaque a sit reiciendis corporis.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "8925145b-f53b-4a4d-84f2-64f7e58a3a15",
      "created_at": "2023-07-31T03:40:33.566Z",
      "updated_at": "2023-01-28T05:35:32.250Z"
    },
    {
      "body": "Repellendus iure tenetur iusto alias atque. Officiis quibusdam facere quam odit. Occaecati assumenda aspernatur.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "resource_type": "User",
      "id": "2083c298-2cf7-4d16-8441-d0f95428e0b7",
      "created_at": "2023-07-13T11:25:46.927Z",
      "updated_at": "2023-03-09T05:16:31.523Z"
    },
    {
      "body": "Eaque iste occaecati ea distinctio explicabo velit. Odio repellat saepe est. Repudiandae hic totam modi atque.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "resource_type": "User",
      "id": "cd39b819-9173-4c2e-a6f4-7985f5d9d987",
      "created_at": "2023-01-22T08:22:16.686Z",
      "updated_at": "2023-02-05T03:56:35.165Z"
    },
    {
      "body": "Deserunt nisi nobis esse. Rerum consequuntur deserunt error aspernatur consequatur blanditiis. Velit eos voluptates eos quia delectus.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "resource_type": "User",
      "id": "38f2493f-a340-4c8e-ba34-8e59778bed28",
      "created_at": "2023-03-29T10:39:15.918Z",
      "updated_at": "2023-04-26T08:41:53.522Z"
    },
    {
      "body": "Eveniet libero id consequatur porro dignissimos repellendus vero harum. Maiores nam libero. Ut repellat explicabo voluptatum nihil odit eos nisi.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "resource_type": "User",
      "id": "1c8a9694-5be6-4fce-ae3c-b1a74c667332",
      "created_at": "2023-08-31T15:35:42.736Z",
      "updated_at": "2023-01-12T00:29:32.872Z"
    },
    {
      "body": "Eius saepe magni ea earum sapiente maiores modi nesciunt voluptates. At labore ut vero possimus facere expedita quae error. A quaerat consectetur provident mollitia suscipit ipsa.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "3f4a3ca3-24a8-4fe2-83d3-7c7958fea9ac",
      "created_at": "2023-09-15T19:54:03.000Z",
      "updated_at": "2023-04-12T00:16:56.652Z"
    },
    {
      "body": "Ut quo suscipit minima. Iste error tenetur explicabo voluptatibus. Reprehenderit facere vitae vel aspernatur quod eaque molestias nostrum.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "resource_type": "User",
      "id": "a28e8020-0f7f-4121-80a5-bb6661d1cc4d",
      "created_at": "2023-09-12T23:43:55.550Z",
      "updated_at": "2023-04-18T05:57:31.978Z"
    },
    {
      "body": "Possimus porro excepturi dignissimos. Repellat incidunt ipsum veniam. Corporis iusto nam possimus quos vel neque rerum fugit.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "resource_type": "User",
      "id": "6273b6c4-2bcf-45da-837d-69d647d09375",
      "created_at": "2022-10-14T21:07:01.011Z",
      "updated_at": "2022-10-16T21:32:23.098Z"
    },
    {
      "body": "Quae molestiae aut nulla expedita debitis distinctio neque adipisci. Ipsum iure ipsam. Hic error ab consectetur in nisi.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "bcae7f25-eb84-4df3-b31c-066345264b61",
      "created_at": "2022-11-03T01:14:30.180Z",
      "updated_at": "2023-08-23T13:53:40.825Z"
    },
    {
      "body": "Voluptatum nihil fugit veritatis illum. Quibusdam temporibus et et veritatis incidunt repellendus. Adipisci porro reiciendis occaecati aliquam suscipit delectus necessitatibus.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "29bd732b-df2e-4997-9b45-d94f5ba3fe39",
      "created_at": "2023-05-16T07:23:06.748Z",
      "updated_at": "2023-06-02T08:34:48.864Z"
    },
    {
      "body": "Aperiam architecto debitis consequatur rerum dolor consequuntur nam quod voluptatem. Eius consequuntur officia. Doloremque perspiciatis illo dolore dolor incidunt.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "resource_type": "User",
      "id": "82b275f3-25ad-4068-aebd-701c553ad97d",
      "created_at": "2023-05-05T11:52:30.284Z",
      "updated_at": "2023-05-24T05:47:36.225Z"
    },
    {
      "body": "Minima numquam accusamus cupiditate expedita libero nihil. Maiores doloremque perferendis esse praesentium veritatis debitis eaque. Quibusdam voluptatibus velit earum molestias sint fuga provident.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "resource_type": "User",
      "id": "4602daa3-18dd-462d-b36b-68b7379f30f4",
      "created_at": "2023-09-08T08:15:36.621Z",
      "updated_at": "2023-03-26T02:25:48.200Z"
    },
    {
      "body": "Et nam blanditiis impedit debitis modi. Quis voluptatum excepturi repudiandae molestias placeat veritatis eaque dignissimos. Nobis earum eaque ipsum.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "resource_type": "User",
      "id": "d4f31fc7-87d8-4045-bad3-bce180f1cb89",
      "created_at": "2023-08-04T09:07:59.467Z",
      "updated_at": "2023-10-05T16:44:23.578Z"
    },
    {
      "body": "Consequatur eveniet assumenda. Quam incidunt autem rerum consectetur labore modi at quidem consequuntur. Sint quasi quo rerum est facilis adipisci eaque.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "resource_type": "User",
      "id": "c54c942b-1d6a-48b4-8d89-75323742c907",
      "created_at": "2023-03-31T08:47:23.096Z",
      "updated_at": "2023-07-28T05:56:47.526Z"
    },
    {
      "body": "Ipsam nam nam magnam eius aspernatur odio. Quo dolore sint laborum tempora eligendi. Distinctio nihil quasi neque eveniet quidem eaque temporibus.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "resource_type": "User",
      "id": "c2326085-11a9-435e-9b99-2e8550559561",
      "created_at": "2023-01-30T22:25:13.489Z",
      "updated_at": "2023-09-15T08:13:14.943Z"
    },
    {
      "body": "Omnis in quasi praesentium debitis autem. Suscipit tempore magni minima dignissimos eveniet ipsam id ducimus. Porro impedit corrupti nemo.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "resource_type": "User",
      "id": "b75eaf86-5fd6-4e8e-b31f-2959841291ad",
      "created_at": "2023-07-29T03:44:37.971Z",
      "updated_at": "2022-11-18T14:00:15.551Z"
    },
    {
      "body": "Qui dicta ipsa occaecati molestiae odit reprehenderit praesentium esse. Eos ducimus recusandae vitae commodi officiis doloribus optio. Cumque velit modi distinctio.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "9a2dbd69-2870-4a73-ac0f-37b6a8f0e0c6",
      "created_at": "2023-07-09T13:46:40.110Z",
      "updated_at": "2022-12-07T05:14:19.009Z"
    },
    {
      "body": "Blanditiis magnam facilis sequi quia beatae architecto repellendus. Quae quo laboriosam accusantium. Repellat explicabo consequatur suscipit sunt officiis maiores dolore.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "resource_type": "User",
      "id": "209526df-116d-4a0a-9cbc-eb7b89c20b85",
      "created_at": "2022-12-27T01:01:01.903Z",
      "updated_at": "2023-02-20T14:57:31.822Z"
    },
    {
      "body": "Itaque illum at inventore cumque quidem maxime ipsam pariatur enim. Cumque dignissimos eum. Facere iusto voluptates fuga qui temporibus officia et.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "141a6550-8c6c-42d2-8f4f-c1c900f7e542",
      "created_at": "2023-02-07T16:59:48.787Z",
      "updated_at": "2023-03-29T14:53:54.605Z"
    },
    {
      "body": "Nesciunt hic nobis pariatur dolore exercitationem sequi doloremque sunt enim. Enim dolorum magnam. Quis cupiditate perspiciatis necessitatibus adipisci.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "d51dd948-8517-4664-9bb4-7d8592c57cb6",
      "created_at": "2023-01-08T01:51:38.885Z",
      "updated_at": "2022-10-15T01:06:47.388Z"
    },
    {
      "body": "Enim a perspiciatis at nobis ullam perspiciatis explicabo sequi. Nesciunt hic provident accusantium repellat. Voluptates laudantium quibusdam repellendus voluptates quo cupiditate quia totam.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "239d5edf-513a-40f5-a9d3-1f87e03b3395",
      "created_at": "2023-05-18T23:30:40.360Z",
      "updated_at": "2023-09-22T00:38:57.519Z"
    },
    {
      "body": "Unde distinctio rerum eligendi beatae aliquam unde iste sunt accusamus. Enim vitae voluptate. Recusandae fugiat fuga voluptate nesciunt quaerat minima.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "4a13abaf-d180-452d-b229-b0a25337a2f0",
      "created_at": "2023-03-22T03:26:41.839Z",
      "updated_at": "2023-05-14T12:46:00.919Z"
    },
    {
      "body": "Quibusdam error maxime. Alias odit possimus. Eum temporibus animi aliquid nihil expedita sit cumque.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "resource_type": "User",
      "id": "8f722fbb-4cf6-43d6-9f06-b3c9b834d877",
      "created_at": "2023-03-20T17:02:38.528Z",
      "updated_at": "2023-10-01T05:46:10.751Z"
    },
    {
      "body": "Quisquam mollitia quas adipisci mollitia. Ad harum ullam id ex consectetur totam aut. Voluptatem voluptates laboriosam unde deserunt.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "resource_type": "User",
      "id": "3397cd14-895e-44d6-ab5f-fa787d1002d8",
      "created_at": "2023-09-03T11:32:46.465Z",
      "updated_at": "2023-01-03T12:50:57.513Z"
    },
    {
      "body": "Harum officia saepe cupiditate id vel labore eveniet numquam. Laudantium facere quia enim quaerat. Molestiae neque cumque minima aperiam consectetur odio iste.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "resource_type": "User",
      "id": "c5f5b51f-7d12-45a2-95f9-640bc83471d6",
      "created_at": "2023-01-29T18:11:15.326Z",
      "updated_at": "2023-03-20T17:55:27.256Z"
    },
    {
      "body": "Atque exercitationem iure. Nemo occaecati officiis fugiat vero cupiditate labore delectus. Laborum odio quia laborum harum dolor quidem mollitia aspernatur labore.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "8c02c2fc-ff83-4c46-b95c-6794df2d8e42",
      "created_at": "2022-11-16T14:04:34.010Z",
      "updated_at": "2022-10-06T09:00:24.744Z"
    },
    {
      "body": "Sint illum quae sequi nobis quo fugit corrupti. Praesentium consectetur animi quae nobis quis totam similique voluptates. Mollitia eos cupiditate quo numquam.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "resource_type": "User",
      "id": "f53834aa-a3cb-4bd5-9552-d4b0fbd5f600",
      "created_at": "2022-10-08T06:48:01.210Z",
      "updated_at": "2023-08-29T04:36:02.650Z"
    },
    {
      "body": "Officiis consectetur voluptatem quidem non perspiciatis doloribus earum atque. Dignissimos quia molestiae error totam. Minima odio vel reprehenderit quibusdam incidunt harum.",
      "author_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "6e9ac843-ef8e-4c4b-90a6-54774a118a42",
      "created_at": "2023-06-07T03:18:37.065Z",
      "updated_at": "2023-03-18T10:35:27.042Z"
    },
    {
      "body": "Ea quo id voluptatem animi dicta. Fugiat nulla id dolorem. Quas dolor non impedit.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "resource_type": "User",
      "id": "80cb296a-c033-4e78-a160-ba5a4a36664e",
      "created_at": "2023-07-22T15:09:17.793Z",
      "updated_at": "2023-01-11T09:48:55.222Z"
    },
    {
      "body": "Doloribus officiis quia magnam minima quisquam hic deserunt quisquam. Molestias inventore non iste modi minima voluptatem sapiente. Voluptas temporibus explicabo itaque ipsa quas fuga eaque laudantium eum.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "resource_type": "User",
      "id": "9b44342a-1d2e-4706-ba8f-02ae86491b14",
      "created_at": "2023-04-11T22:12:04.627Z",
      "updated_at": "2022-11-07T10:10:17.847Z"
    },
    {
      "body": "Natus quas cum incidunt nulla. Amet nobis iusto libero minima quam ex libero odit esse. Placeat sunt molestias maiores vitae corporis.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "resource_type": "User",
      "id": "e6d92e19-a82d-4788-abb9-82724f5603e4",
      "created_at": "2022-12-13T22:52:43.316Z",
      "updated_at": "2022-12-02T13:16:44.324Z"
    },
    {
      "body": "Dolorum quas voluptatum eos quaerat nulla ullam. Deleniti possimus excepturi deleniti vel exercitationem reiciendis. Molestias itaque autem modi pariatur eius debitis.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "9b6dcc89-26e9-45eb-9d19-9c3072e02bf3",
      "created_at": "2023-01-05T11:29:56.798Z",
      "updated_at": "2023-05-15T06:49:25.919Z"
    },
    {
      "body": "Dolores reiciendis labore eligendi architecto. Molestias facilis atque. Eius ipsa aliquam voluptatibus quaerat.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "resource_type": "User",
      "id": "53c09c27-25c1-42e0-94ac-1c7e14db822b",
      "created_at": "2023-06-15T19:11:38.717Z",
      "updated_at": "2023-08-22T13:51:22.383Z"
    },
    {
      "body": "Veniam natus voluptatem non quibusdam. Sapiente consequatur voluptatibus autem. Eveniet magni est ut vitae nisi aliquam ratione occaecati quisquam.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "4a758eef-c712-4a08-ae15-d40c1ed78c7a",
      "created_at": "2023-06-30T02:17:31.531Z",
      "updated_at": "2023-06-11T19:00:10.627Z"
    },
    {
      "body": "Ipsam odio neque illum a qui eum. Mollitia non porro dolorum illum quis. Quos ipsa quae molestias nulla dolores occaecati et corrupti fugit.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "resource_type": "User",
      "id": "832a3899-5178-4e06-87da-93c8f394b2ca",
      "created_at": "2023-07-27T18:42:59.830Z",
      "updated_at": "2022-11-26T06:23:02.927Z"
    },
    {
      "body": "Officia maxime accusamus optio ipsam consectetur quod expedita dolorum earum. At necessitatibus eos. Laborum molestiae ex.",
      "author_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "author_type": "User",
      "resource_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "resource_type": "User",
      "id": "089626c1-0458-400c-a7ee-77fd13723151",
      "created_at": "2023-08-13T16:45:36.991Z",
      "updated_at": "2023-05-07T02:35:23.075Z"
    },
    {
      "body": "Ipsam quo aspernatur sed necessitatibus repudiandae. Corrupti voluptas quibusdam esse ad deserunt minima quaerat. Tempore blanditiis nostrum iste.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "resource_type": "User",
      "id": "667ff25f-29f5-4aad-8bbe-dd38b29f5e43",
      "created_at": "2023-05-29T20:47:08.327Z",
      "updated_at": "2023-09-17T14:27:37.417Z"
    },
    {
      "body": "Ex atque nobis quis quisquam. Labore doloribus dolore sit ducimus officia veritatis quam. Excepturi corrupti non quidem reprehenderit quaerat error.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "resource_type": "User",
      "id": "bbb71a2d-b06b-49ba-97db-31adc09dc1fd",
      "created_at": "2023-01-20T21:40:22.950Z",
      "updated_at": "2023-02-08T11:36:22.568Z"
    },
    {
      "body": "Placeat fugiat consequatur suscipit veritatis architecto. Quod voluptas soluta distinctio eaque cupiditate blanditiis asperiores. Quas nihil iste voluptatibus quis ut dolor qui saepe.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "5e04dc75-8b0a-43d3-b544-aabb2657fec1",
      "created_at": "2023-01-04T07:49:36.220Z",
      "updated_at": "2023-06-23T08:19:35.920Z"
    },
    {
      "body": "Vero rerum culpa rem. Similique nihil placeat doloremque ut quo minima. Inventore hic officia veniam quasi rem similique iusto voluptatibus.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "resource_type": "User",
      "id": "d99739da-9d96-418d-9d36-aacbe8ed84ff",
      "created_at": "2023-05-13T15:42:41.414Z",
      "updated_at": "2023-08-10T20:23:19.053Z"
    },
    {
      "body": "Sed voluptas iusto numquam saepe. Eius totam nihil harum beatae explicabo officiis iste esse qui. Dolorum temporibus illum rem.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "resource_type": "User",
      "id": "a5fa7d60-cb2a-4e2d-90b8-9b178bb2f9cd",
      "created_at": "2023-03-28T09:37:18.043Z",
      "updated_at": "2022-11-04T15:54:11.360Z"
    },
    {
      "body": "Aliquam similique neque sunt qui qui sapiente dolore perferendis porro. Illum assumenda repudiandae. Vel veniam quam necessitatibus necessitatibus.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "36abce5a-85a8-49b9-a0a9-82512c2d95d7",
      "created_at": "2023-07-07T18:40:18.795Z",
      "updated_at": "2022-10-14T17:25:43.286Z"
    },
    {
      "body": "Praesentium odio voluptates laboriosam quam. Fuga similique fugiat laboriosam aliquid. Alias possimus laborum optio alias at velit corrupti praesentium consequuntur.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "e69af27c-3561-40b5-be60-056623eb970c",
      "created_at": "2023-06-08T16:55:13.763Z",
      "updated_at": "2022-10-25T10:01:07.874Z"
    },
    {
      "body": "Impedit a assumenda nesciunt. Occaecati doloribus non dicta sed hic tempore sed odit atque. Eligendi quo corrupti recusandae.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "55e2f7fe-2db7-4768-8521-713993b3a6fe",
      "created_at": "2023-09-10T03:03:24.961Z",
      "updated_at": "2023-03-03T05:30:43.776Z"
    },
    {
      "body": "Totam optio impedit magnam quis. Reprehenderit dolore totam. Ab aliquid officiis soluta sit occaecati accusamus sit sint inventore.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "466175c4-c0b5-458a-81e1-24415e3617e4",
      "created_at": "2023-08-03T18:03:46.394Z",
      "updated_at": "2023-05-04T14:44:41.447Z"
    },
    {
      "body": "Qui alias officia ipsa rerum voluptates non accusantium explicabo. Natus corporis soluta soluta. Ea et placeat.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "resource_type": "User",
      "id": "17d0d1e3-a329-4661-a0e2-b0b64282f9ba",
      "created_at": "2023-02-22T17:14:39.124Z",
      "updated_at": "2022-11-29T04:59:34.281Z"
    },
    {
      "body": "Quis maiores placeat. Sapiente quod asperiores soluta autem cupiditate dolorum. Minima porro at omnis sint ullam ad tempora alias.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "7b943495-a0e2-4f33-8dd6-ccdec43f088a",
      "created_at": "2023-09-26T20:24:19.138Z",
      "updated_at": "2022-12-07T00:54:01.163Z"
    },
    {
      "body": "Laboriosam inventore corrupti magnam corrupti accusantium aspernatur ab odit. Consequatur laudantium eum dolorum architecto quam minima quas accusantium excepturi. Repellat non molestiae temporibus ratione iusto expedita cum.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "69681cbf-02b1-48a0-b895-721f7aeff118",
      "created_at": "2022-11-26T16:02:21.098Z",
      "updated_at": "2023-08-04T04:54:11.304Z"
    },
    {
      "body": "Cumque blanditiis adipisci id deserunt magni quae veniam distinctio. Accusantium itaque voluptates. Quidem fugiat enim.",
      "author_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "author_type": "User",
      "resource_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "resource_type": "User",
      "id": "a9d68a03-81d2-4b66-932b-a85b00f929f6",
      "created_at": "2022-10-07T19:28:04.389Z",
      "updated_at": "2023-07-04T02:35:55.202Z"
    },
    {
      "body": "Dolorum ratione adipisci eligendi quos. Harum quisquam soluta accusamus quibusdam iusto sequi. Reprehenderit unde consequatur labore magnam impedit similique odio quaerat consequatur.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "resource_type": "User",
      "id": "e5be017d-5f77-461e-a0f6-11dd23a68564",
      "created_at": "2023-09-11T23:01:47.043Z",
      "updated_at": "2023-06-19T04:02:21.337Z"
    },
    {
      "body": "Facilis consectetur voluptates perferendis. Nulla corrupti cum aliquid vero voluptate id. Repellendus labore quaerat.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "resource_type": "User",
      "id": "34b51905-6b60-4906-af1a-f23da169af48",
      "created_at": "2023-08-22T07:35:34.074Z",
      "updated_at": "2022-10-12T07:37:51.806Z"
    },
    {
      "body": "Expedita accusamus quae rerum aperiam vel voluptas dolores. Reprehenderit inventore maxime voluptatibus nostrum suscipit facilis. Praesentium consectetur eveniet laudantium quo laudantium quod doloribus tempora animi.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "resource_type": "User",
      "id": "3abca096-9ecb-4851-b956-532a207293d9",
      "created_at": "2023-01-19T22:30:33.101Z",
      "updated_at": "2023-01-08T04:48:21.304Z"
    },
    {
      "body": "Accusamus commodi beatae corporis quo aliquid numquam maxime ipsa vero. Tempore mollitia inventore sed temporibus. Pariatur voluptatibus accusamus totam necessitatibus omnis.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "10a76770-21fb-4c1a-8fd1-1cc1877d0f6e",
      "created_at": "2023-05-24T07:23:30.910Z",
      "updated_at": "2023-03-30T07:52:39.966Z"
    },
    {
      "body": "Quibusdam sapiente tempora quas occaecati. Dignissimos omnis iste at sequi aliquid id quis harum. Deserunt totam reprehenderit hic aut nostrum expedita.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "resource_type": "User",
      "id": "66cb6661-4467-4a57-83be-49af58af5491",
      "created_at": "2023-01-27T03:50:25.804Z",
      "updated_at": "2023-03-26T21:38:32.607Z"
    },
    {
      "body": "Enim odio laboriosam vel. Non sunt soluta quaerat placeat mollitia accusantium veritatis doloribus quaerat. Deleniti consequatur ipsam similique necessitatibus.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "03e1e709-d5fa-415e-bbae-8474804bea55",
      "created_at": "2023-06-13T11:55:23.610Z",
      "updated_at": "2023-07-25T20:20:13.235Z"
    },
    {
      "body": "Quaerat deserunt eligendi consequuntur natus. Repellendus ipsam non. Ea esse blanditiis dignissimos odio.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "88cdec0c-e42c-457f-9ae2-ee35f5fc3ef0",
      "created_at": "2023-06-16T19:42:08.832Z",
      "updated_at": "2022-11-08T13:42:16.313Z"
    },
    {
      "body": "Assumenda repellat eveniet numquam possimus quam. Nam qui totam sapiente minima. Beatae provident debitis consectetur fugit eius ratione repellendus officia facilis.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "resource_type": "User",
      "id": "ae658f9f-022b-4230-b2fd-477f361a4a27",
      "created_at": "2023-01-24T19:26:21.450Z",
      "updated_at": "2023-01-09T05:08:32.133Z"
    },
    {
      "body": "Laborum id laudantium dolor facere a dignissimos totam hic nihil. Quisquam illum labore labore ex corporis aut explicabo laudantium voluptate. Libero molestias quasi quisquam placeat.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "resource_type": "User",
      "id": "ccba5f2d-6d3c-4c1d-aeb2-42ebf32431a2",
      "created_at": "2022-12-09T15:50:51.274Z",
      "updated_at": "2022-11-27T14:09:56.344Z"
    },
    {
      "body": "Eveniet incidunt eveniet corporis accusantium inventore explicabo. Esse mollitia nobis magnam incidunt. Architecto fugiat explicabo.",
      "author_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "author_type": "User",
      "resource_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "resource_type": "User",
      "id": "c1f7b1a8-77ab-450a-9068-9a74dd52fedf",
      "created_at": "2023-05-03T17:02:11.607Z",
      "updated_at": "2022-10-31T15:15:36.756Z"
    },
    {
      "body": "Delectus hic fugiat temporibus cumque dicta sed modi voluptatibus. Maiores voluptatem tempora nihil similique reprehenderit dolor debitis. Tenetur rem iure dolores consequatur autem adipisci.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "resource_type": "User",
      "id": "7155b286-1c85-478c-96e5-614defdcf7a8",
      "created_at": "2022-10-16T01:36:57.715Z",
      "updated_at": "2023-08-20T11:36:24.457Z"
    },
    {
      "body": "Asperiores sint molestiae voluptate quam. Animi officiis eos. Earum reiciendis consequuntur optio.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "882e945a-dc3b-444f-9b07-79e6a85d3b8d",
      "created_at": "2023-03-27T01:10:09.633Z",
      "updated_at": "2023-09-27T23:41:12.848Z"
    },
    {
      "body": "Accusantium molestias repudiandae iste ducimus. Corrupti suscipit aperiam aliquid. Officiis labore aspernatur rerum modi dolorem officia incidunt dolore harum.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "c70fbd23-5de3-4498-b83d-11cd75e8293f",
      "created_at": "2023-06-01T12:15:39.057Z",
      "updated_at": "2023-01-04T02:40:51.737Z"
    },
    {
      "body": "Libero atque reiciendis. Consectetur suscipit blanditiis earum nam minus. Nostrum recusandae libero ad libero totam adipisci quae qui.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "00cf8643-d679-425b-8566-4df0a2ce6a11",
      "created_at": "2023-05-15T11:43:23.128Z",
      "updated_at": "2023-01-18T07:56:51.744Z"
    },
    {
      "body": "Maiores cum ab recusandae consequuntur facilis. Amet incidunt similique ratione sapiente sapiente impedit consectetur nostrum. Laborum nisi quam deserunt nemo.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "ea79de37-a378-42b7-9590-fe8d809174be",
      "created_at": "2022-10-15T04:18:02.593Z",
      "updated_at": "2023-09-10T11:42:58.728Z"
    },
    {
      "body": "Occaecati ut nesciunt officia ab corporis. Vero consequatur magni suscipit deleniti. Nulla tempore laudantium vel est excepturi dolor deleniti.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "929bc2af-7970-4f6e-8a4b-2b67e4126f15",
      "created_at": "2023-09-17T19:42:23.777Z",
      "updated_at": "2023-08-17T00:42:44.964Z"
    },
    {
      "body": "Ipsa excepturi quis necessitatibus eum asperiores molestiae. Tempora mollitia facilis. Exercitationem magni necessitatibus vitae.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "resource_type": "User",
      "id": "1edd1c44-a107-498c-9c67-c2111fc8755b",
      "created_at": "2023-08-03T21:50:16.341Z",
      "updated_at": "2023-07-22T22:54:30.324Z"
    },
    {
      "body": "Aliquam pariatur sequi voluptatum molestias reprehenderit perspiciatis nobis aut. Perferendis ipsa nulla quos cumque sit praesentium. Laboriosam reiciendis itaque suscipit ex totam laboriosam officiis vel.",
      "author_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "author_type": "User",
      "resource_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "resource_type": "User",
      "id": "8d078f84-e650-4c0b-aa63-58ea9151e413",
      "created_at": "2023-06-28T16:14:15.140Z",
      "updated_at": "2023-03-14T01:51:54.513Z"
    },
    {
      "body": "Tenetur pariatur veniam facilis possimus. Iusto labore ratione hic rem. Reiciendis consequatur omnis libero amet deserunt.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "resource_type": "User",
      "id": "b3e3cf5f-5680-4a71-87f9-f34ada30273b",
      "created_at": "2023-04-06T02:33:37.650Z",
      "updated_at": "2023-01-27T12:05:36.004Z"
    },
    {
      "body": "Nostrum neque aut magnam laboriosam quibusdam qui. Repellendus delectus perspiciatis recusandae libero voluptatum. Animi perspiciatis eum.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "resource_type": "User",
      "id": "70e7fb20-fc5c-4bd3-85b9-aaceaf45972e",
      "created_at": "2022-12-30T15:03:22.270Z",
      "updated_at": "2023-06-30T20:09:01.926Z"
    },
    {
      "body": "Laudantium earum libero. Assumenda beatae voluptatibus officia iure magni soluta atque. Nam unde veniam officia neque sequi minima temporibus nobis iure.",
      "author_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "3f219bbf-ef60-4ac6-bf72-4bf4ceb17070",
      "created_at": "2023-05-25T02:43:31.237Z",
      "updated_at": "2023-08-15T17:33:06.722Z"
    },
    {
      "body": "Deleniti nostrum incidunt impedit. Facilis consequuntur dolores architecto minima facere magnam. Illum quo esse praesentium.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "702ab28d-87e1-433d-b104-25d0cfabcc2d",
      "created_at": "2023-07-17T01:14:01.366Z",
      "updated_at": "2023-01-15T18:30:16.858Z"
    },
    {
      "body": "Odit repellat neque nobis quos quisquam in molestiae esse dolorum. Nam veritatis voluptates natus repellendus provident provident eum porro. Facere a minima pariatur reiciendis animi molestias.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "0e395e20-8c66-44e1-8f9d-03b0f15981ac",
      "created_at": "2023-02-24T06:07:36.391Z",
      "updated_at": "2023-05-08T07:54:25.565Z"
    },
    {
      "body": "Repellat est iusto placeat porro corrupti incidunt quibusdam velit eius. Officia error consequatur dolorum voluptatibus quia exercitationem eaque fugiat. Natus ducimus voluptate ipsum consequuntur rem.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "0a6a4edd-8c99-4dd7-a889-b63fa90d7289",
      "created_at": "2023-08-22T00:30:31.662Z",
      "updated_at": "2023-05-26T11:34:45.725Z"
    },
    {
      "body": "Suscipit aperiam expedita reiciendis adipisci. Debitis beatae dignissimos qui. Vel velit necessitatibus architecto saepe.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "9784d33e-6232-494f-97c2-0d81c6a21c4a",
      "created_at": "2023-05-12T23:48:47.098Z",
      "updated_at": "2023-03-22T12:20:16.094Z"
    },
    {
      "body": "Dignissimos quos expedita nulla. Iure eos totam eos et. Reiciendis accusantium illum rem a.",
      "author_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "author_type": "User",
      "resource_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "resource_type": "User",
      "id": "9915d40b-52c1-4f1d-baf8-c3129f0adddd",
      "created_at": "2022-10-18T15:01:25.497Z",
      "updated_at": "2023-02-16T22:26:19.669Z"
    },
    {
      "body": "Sit est accusamus eum est corrupti. Quas quas officiis possimus voluptatem assumenda quo praesentium dicta voluptatem. Voluptatibus dignissimos tenetur quas eius quos vel deleniti placeat.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "df058d16-62ca-4861-903a-5fcbb4cae6cd",
      "created_at": "2023-09-20T03:59:13.225Z",
      "updated_at": "2022-11-02T14:03:24.675Z"
    },
    {
      "body": "Consequuntur eos aliquam. Aut exercitationem voluptas est ullam accusantium. Corrupti repudiandae ut facilis deleniti.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "56a70f67-fb10-4a5f-9291-10e125900556",
      "created_at": "2023-09-09T12:48:53.822Z",
      "updated_at": "2023-01-02T22:05:31.618Z"
    },
    {
      "body": "Omnis optio similique repellat incidunt incidunt odit quisquam. Distinctio nam optio illum pariatur voluptatibus delectus asperiores nesciunt ullam. Provident eveniet sapiente eligendi illum corporis.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "resource_type": "User",
      "id": "5f241c2c-047b-4abb-b6d9-616be2ea45d5",
      "created_at": "2023-08-03T06:15:18.878Z",
      "updated_at": "2023-02-23T04:32:08.155Z"
    },
    {
      "body": "Perferendis saepe debitis harum. Labore cumque deserunt tempora esse cumque magnam nobis libero. Repellendus asperiores alias.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "4d0f7e8b-76de-48b5-b447-5eed99e3a76d",
      "created_at": "2023-08-16T09:28:52.175Z",
      "updated_at": "2023-05-14T15:30:26.983Z"
    },
    {
      "body": "Voluptate omnis consequuntur vero. Maxime dicta quod ratione repellendus ut autem soluta. Optio officiis dolores illum ratione est voluptatum.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "0cabeda0-8387-4c1c-b15f-7996e2b52216",
      "created_at": "2023-09-17T15:54:41.471Z",
      "updated_at": "2022-10-29T10:26:12.860Z"
    },
    {
      "body": "Impedit aperiam voluptatum vel porro saepe modi corrupti pariatur. Similique sit saepe ipsa nihil amet maxime. Incidunt minus ipsum exercitationem beatae quo quas accusantium fuga.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "resource_type": "User",
      "id": "85a748d2-30a7-48d2-a6f3-353d935fbe10",
      "created_at": "2022-11-12T00:11:02.260Z",
      "updated_at": "2023-05-11T20:14:54.045Z"
    },
    {
      "body": "Nisi exercitationem natus. Dolorum minima sequi odio eum unde distinctio placeat alias minima. Distinctio dignissimos incidunt accusamus exercitationem ipsum quae.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "resource_type": "User",
      "id": "d3e40edd-8ed6-4753-8238-72012e540476",
      "created_at": "2023-04-14T07:53:38.576Z",
      "updated_at": "2023-02-28T12:52:13.610Z"
    },
    {
      "body": "Neque architecto delectus aut pariatur nobis ab. Quo quasi officia deleniti odio atque et possimus nulla. Enim recusandae aliquid architecto voluptas earum fuga quo ullam non.",
      "author_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "47dd4600-672d-4c66-8adb-0d247eaf75fc",
      "created_at": "2023-07-24T08:54:16.881Z",
      "updated_at": "2022-11-10T12:27:03.620Z"
    },
    {
      "body": "Possimus quisquam unde dignissimos impedit officiis unde architecto quia. Amet nisi laudantium quae sunt praesentium. Enim reprehenderit ea illum rem.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "a4d87567-2124-4346-b3ba-342d7e935d26",
      "created_at": "2022-11-07T07:28:13.562Z",
      "updated_at": "2023-03-03T22:05:14.843Z"
    },
    {
      "body": "Pariatur tenetur necessitatibus temporibus vero quasi ipsa ex eligendi. Mollitia rerum delectus tenetur provident accusantium nesciunt hic. Facilis praesentium sed.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "resource_type": "User",
      "id": "dd97081c-ac20-4f54-b834-cf12d72ffcd1",
      "created_at": "2022-11-19T11:24:07.124Z",
      "updated_at": "2023-01-11T03:28:12.772Z"
    },
    {
      "body": "Consequuntur fugit adipisci quasi saepe. Exercitationem delectus magnam officia blanditiis voluptatem mollitia. Dolores facilis vitae animi illo doloremque libero aspernatur quo nostrum.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "resource_type": "User",
      "id": "a1e220cb-89d9-4ea1-9724-7bb729e239d0",
      "created_at": "2022-12-30T01:26:09.094Z",
      "updated_at": "2023-08-03T21:25:39.255Z"
    },
    {
      "body": "Soluta similique repellendus. Fugit nulla molestiae iure assumenda odio molestias cupiditate maiores exercitationem. Pariatur doloribus ab soluta omnis nostrum impedit inventore eligendi architecto.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "resource_type": "User",
      "id": "f2e8f911-cb0a-4ebd-85df-c35ca9d624da",
      "created_at": "2023-09-30T12:42:10.134Z",
      "updated_at": "2023-09-01T10:40:25.076Z"
    },
    {
      "body": "Nam temporibus quos. Quibusdam ipsa fuga voluptatem magnam. Odio nulla quisquam excepturi nesciunt.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "resource_type": "User",
      "id": "99d5e1c6-ca27-49a4-a4f9-cf637b744593",
      "created_at": "2022-11-13T05:44:58.153Z",
      "updated_at": "2023-05-16T07:56:59.960Z"
    },
    {
      "body": "Ut deleniti quia. Perferendis sit assumenda quibusdam quas quo culpa natus dolorem. Eligendi totam ipsa quae fugiat eligendi.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "80f19df9-3eba-4068-a9af-b7f75cde71db",
      "created_at": "2022-12-31T14:27:05.461Z",
      "updated_at": "2022-10-14T03:33:15.501Z"
    },
    {
      "body": "Ipsa omnis nisi. Soluta vel commodi libero fugiat deleniti facere. Enim fugit a perspiciatis.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "2855483f-df5f-44f5-bfcf-b8a40515af7a",
      "created_at": "2023-10-03T18:47:20.124Z",
      "updated_at": "2023-06-11T19:04:35.275Z"
    },
    {
      "body": "In mollitia eos dolor veniam sequi occaecati molestiae excepturi adipisci. Totam sunt et. Veritatis natus asperiores cupiditate sint similique recusandae.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "66383dbe-113d-4d25-a582-f25dee9cf99e",
      "created_at": "2023-04-01T04:14:06.030Z",
      "updated_at": "2022-11-12T11:41:13.644Z"
    },
    {
      "body": "Expedita modi quas deserunt iste voluptatum dicta dicta. Aliquid nisi consequuntur voluptatem soluta dignissimos. Commodi consectetur aspernatur.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "f5a05bd4-2e1d-4c00-939c-6484ff4f4c1a",
      "created_at": "2023-03-17T10:39:41.360Z",
      "updated_at": "2022-12-30T08:01:15.483Z"
    },
    {
      "body": "Porro incidunt optio natus voluptatibus eligendi quo. Impedit quod dolore voluptatum officiis dolore corporis quae. Accusamus quaerat aliquam.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "resource_type": "User",
      "id": "79f0756e-1d8f-4851-a98e-d9154a34cda9",
      "created_at": "2023-04-01T11:25:28.207Z",
      "updated_at": "2023-03-16T09:13:45.769Z"
    },
    {
      "body": "Dicta labore enim veritatis doloremque dolorum libero fugiat tenetur. Corporis molestiae iure et. Dolore voluptatum impedit illum inventore fuga aliquid.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "resource_type": "User",
      "id": "3a621af9-143b-4d3f-8b1a-871da0e110bc",
      "created_at": "2022-12-06T12:41:48.694Z",
      "updated_at": "2023-09-27T20:53:17.069Z"
    },
    {
      "body": "Exercitationem earum sit perspiciatis magni perspiciatis. Molestiae voluptas explicabo molestiae quaerat. Ducimus similique occaecati quaerat quibusdam accusantium rem esse eligendi.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "resource_type": "User",
      "id": "7b89666b-0b21-4b89-bf14-3e4b177846f8",
      "created_at": "2023-03-29T07:48:04.336Z",
      "updated_at": "2023-05-24T05:24:18.845Z"
    },
    {
      "body": "Odit libero veniam quo illo maiores quisquam quibusdam quam ea. Placeat rem molestiae asperiores culpa delectus aliquam. Quidem fugiat soluta sed cumque ex dolores.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "cb6dbe56-44bf-44e0-bb4f-a676a7433ed8",
      "created_at": "2022-11-01T01:39:54.914Z",
      "updated_at": "2023-07-11T07:10:39.085Z"
    },
    {
      "body": "Perspiciatis sapiente beatae. Velit hic commodi. Corporis ab illum dignissimos perspiciatis aspernatur quibusdam dignissimos nemo debitis.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "resource_type": "User",
      "id": "0855e5ed-042a-40a0-949e-681305f89948",
      "created_at": "2023-08-18T11:35:40.705Z",
      "updated_at": "2023-09-10T08:57:12.412Z"
    },
    {
      "body": "Rerum ex velit. Deleniti architecto iure in. Culpa ea itaque distinctio dignissimos nihil error nostrum facilis placeat.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "18b4d212-876e-45d1-9a1e-a000189146f4",
      "created_at": "2023-05-23T09:14:11.482Z",
      "updated_at": "2023-06-06T02:49:57.545Z"
    },
    {
      "body": "Temporibus ipsa tenetur possimus. Eveniet eum occaecati adipisci repellendus totam dolor provident. Corporis quod culpa officia quos delectus repudiandae minima.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "resource_type": "User",
      "id": "aa25fbaa-ddc7-413a-a28c-e83867648de2",
      "created_at": "2023-08-06T05:25:30.556Z",
      "updated_at": "2023-08-27T12:08:28.797Z"
    },
    {
      "body": "Repellat rem aliquam accusamus dolores similique rem delectus vel consectetur. Veniam natus libero repellat hic. Fugiat iusto voluptatem ipsa aliquam accusamus non minima.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "resource_type": "User",
      "id": "45cc1732-0bd5-422b-96eb-9af285487ba1",
      "created_at": "2023-09-15T00:28:03.193Z",
      "updated_at": "2023-09-14T04:37:19.102Z"
    },
    {
      "body": "Corrupti doloremque quisquam quam sunt expedita architecto et cumque corrupti. Sunt a quas tempora. Facere enim dolore.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "resource_type": "User",
      "id": "63ad3620-00be-4e5a-bbcc-791f875007bd",
      "created_at": "2023-01-27T06:55:27.758Z",
      "updated_at": "2023-06-13T05:21:02.768Z"
    },
    {
      "body": "Doloribus ipsa quos beatae. Eaque voluptate rem unde in deleniti. Dicta aperiam debitis possimus quo.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "resource_type": "User",
      "id": "21dd8ed5-16aa-42ae-9b24-9285922f9c3a",
      "created_at": "2023-08-11T17:40:18.803Z",
      "updated_at": "2023-09-13T00:27:56.086Z"
    },
    {
      "body": "Porro tempora occaecati ipsa repellendus alias. Veniam asperiores eligendi. Maiores veniam quibusdam architecto itaque perspiciatis iure sequi aliquam.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "26936355-2052-47b8-8885-90acebb2116c",
      "created_at": "2023-04-02T17:29:05.212Z",
      "updated_at": "2023-09-27T23:40:50.711Z"
    },
    {
      "body": "Soluta ipsa culpa quo officiis quisquam nostrum officia perferendis. Dolorem eos odio. Dolores nulla odit laboriosam aut dolor.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "8603d23f-635d-49e0-90e2-e12040f49d33",
      "created_at": "2023-04-24T17:11:03.205Z",
      "updated_at": "2023-08-09T18:58:05.536Z"
    },
    {
      "body": "Veritatis omnis fugiat quasi asperiores dolorem recusandae quidem similique et. Tempora id repellat odit sapiente veniam earum. Officia possimus optio nemo facere ipsam molestiae doloribus dolore aspernatur.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "2c1b70b1-e722-4bd6-9670-195162ec2f5b",
      "created_at": "2023-07-28T10:17:47.029Z",
      "updated_at": "2023-06-18T00:39:43.601Z"
    },
    {
      "body": "Odit repellat molestias ratione modi. Officiis sunt provident ex temporibus non. Reiciendis commodi debitis beatae quo.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "bc23e295-96fe-4124-b619-ddc9ed90f11e",
      "created_at": "2023-05-08T05:37:34.373Z",
      "updated_at": "2022-12-31T23:11:04.118Z"
    },
    {
      "body": "Harum nesciunt fuga voluptas ratione debitis voluptates nobis alias fuga. Possimus deserunt qui enim dignissimos. Modi consequatur vel commodi quam distinctio reprehenderit reprehenderit doloremque.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "b4e1ce71-4c23-440b-a598-7b52eb7c4195",
      "created_at": "2022-11-28T15:03:07.423Z",
      "updated_at": "2023-03-18T06:46:48.037Z"
    },
    {
      "body": "Tempora nostrum inventore debitis non quae autem a. Itaque quos culpa unde non. Sapiente consectetur sit porro quod optio maiores.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "893fb8d6-f0ec-4dcb-8a78-70170ac06a4e",
      "created_at": "2023-02-13T04:49:18.157Z",
      "updated_at": "2022-10-31T17:34:58.963Z"
    },
    {
      "body": "Odio nihil eligendi officiis adipisci mollitia accusantium minima. Eos ab minus expedita. Minima voluptate occaecati dignissimos ducimus.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "f77698c1-a90c-42c8-b7d4-cc5df99eed77",
      "created_at": "2023-08-12T07:53:57.276Z",
      "updated_at": "2023-04-03T10:38:45.791Z"
    },
    {
      "body": "Deserunt sunt ad tenetur distinctio sed recusandae. Enim quisquam eum inventore ullam maiores sed temporibus sit. Nam aspernatur provident asperiores.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "aa51ef0c-cf3d-4bb3-b7a4-ffe62f5bccfa",
      "created_at": "2023-07-11T06:07:19.332Z",
      "updated_at": "2023-01-03T11:41:39.071Z"
    },
    {
      "body": "Eaque occaecati mollitia qui laboriosam earum nostrum earum a. Mollitia reiciendis ratione nihil quod porro pariatur perferendis id voluptatem. Officiis omnis tempora nisi aspernatur.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "9f2572f2-a539-4af2-8cff-b03dd82e8a35",
      "created_at": "2023-10-05T16:30:56.510Z",
      "updated_at": "2023-05-04T07:12:57.340Z"
    },
    {
      "body": "Deserunt reiciendis et distinctio. Deserunt natus possimus quidem. Exercitationem eaque inventore blanditiis omnis doloribus sint tempore natus.",
      "author_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "7d1d4ca2-152e-4546-a809-e0f8207592cc",
      "created_at": "2023-08-09T12:09:31.291Z",
      "updated_at": "2023-08-06T23:17:30.225Z"
    },
    {
      "body": "Nemo minima dolores. Veritatis cum quibusdam eligendi accusantium. Possimus expedita nostrum earum accusamus magni architecto.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "f5dd45de-dd0f-469a-bcb6-fb59aa2e1df6",
      "created_at": "2023-10-03T13:43:22.560Z",
      "updated_at": "2023-08-26T05:06:37.850Z"
    },
    {
      "body": "Deleniti enim laborum maxime laborum quas a at dignissimos enim. Commodi modi praesentium porro vel expedita alias. Maiores natus impedit incidunt reprehenderit natus cum fuga sapiente quod.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "7dd3af18-c64b-4d1c-83cb-ddd50c74a795",
      "created_at": "2023-01-16T06:41:11.799Z",
      "updated_at": "2023-03-24T00:25:10.266Z"
    },
    {
      "body": "Illo quasi doloribus corporis corrupti ea porro. Dolores explicabo neque quasi ratione quam labore nihil. Voluptatem officiis excepturi minima excepturi quidem alias.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "4c90f5e5-dcc6-464a-8fe0-78531f403009",
      "created_at": "2023-02-04T21:27:00.501Z",
      "updated_at": "2023-07-02T13:04:57.387Z"
    },
    {
      "body": "Occaecati soluta quis atque aperiam recusandae occaecati enim consectetur aperiam. Id possimus provident odio nam mollitia deleniti maxime aliquid temporibus. Illum beatae nesciunt distinctio exercitationem.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "95099d1e-0679-462b-a104-ed2433df56dc",
      "created_at": "2022-10-26T04:57:33.873Z",
      "updated_at": "2023-08-14T03:24:26.505Z"
    },
    {
      "body": "Nemo praesentium ipsam quod. Deserunt at asperiores ratione voluptatum. Consectetur repellat laborum ad sunt.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "resource_type": "User",
      "id": "3c8f26bb-2dcf-46d2-8e24-8d11e4bfbb78",
      "created_at": "2023-06-28T19:49:59.559Z",
      "updated_at": "2023-01-02T05:56:07.868Z"
    },
    {
      "body": "Fuga minima fugit cumque quidem. Repellat ipsa dolor nostrum ex asperiores atque in ducimus blanditiis. Unde ex quasi modi expedita consequatur.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "0bebe782-bd25-4168-9d7a-091c4e954154",
      "created_at": "2023-05-12T20:02:45.870Z",
      "updated_at": "2023-01-09T06:10:38.317Z"
    },
    {
      "body": "Iusto voluptatum omnis recusandae nulla. Beatae minus delectus. Quaerat id hic.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "a9fb79a9-25fb-4015-88f5-5364a6b1d7af",
      "created_at": "2023-04-18T01:36:20.100Z",
      "updated_at": "2022-12-20T22:44:41.504Z"
    },
    {
      "body": "Ratione hic veritatis delectus. Facere iusto quibusdam illum. Voluptas id reiciendis nobis ex optio error.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "7e3c90da-1dc3-4074-aa37-d8541d964feb",
      "created_at": "2023-05-21T07:53:06.459Z",
      "updated_at": "2022-11-17T03:29:50.549Z"
    },
    {
      "body": "Consequuntur velit officia commodi officia dolorem quibusdam. Cum fuga magni alias inventore nobis aliquam. Quis accusantium laboriosam laboriosam quod expedita.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "bbf9e43e-1053-4af9-a32b-c1b450178897",
      "created_at": "2023-08-29T13:18:16.509Z",
      "updated_at": "2022-10-09T16:09:58.973Z"
    },
    {
      "body": "Tempora rerum ipsa eaque ipsum. Dolorum facere facere laborum in itaque illum magni. Optio reprehenderit eos nemo officiis atque aspernatur.",
      "author_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "author_type": "User",
      "resource_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "resource_type": "User",
      "id": "c6755bf0-ff75-4b30-8c40-93fefbc43d21",
      "created_at": "2023-07-30T09:36:28.486Z",
      "updated_at": "2023-05-06T11:36:54.435Z"
    },
    {
      "body": "Maiores quaerat praesentium delectus voluptatem magnam. Atque nesciunt atque. Consequuntur nesciunt labore repudiandae quas quam.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "8956cec1-626c-4a51-9d66-e036ca813232",
      "created_at": "2023-04-03T03:52:37.891Z",
      "updated_at": "2023-06-15T21:32:14.476Z"
    },
    {
      "body": "Incidunt nemo officia quae nostrum esse. Expedita voluptates laboriosam ullam corrupti. Nesciunt sapiente laborum accusantium quis atque.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "64f0fb9a-b7df-4e37-86c3-b0f4c1d8e19b",
      "created_at": "2023-02-09T17:25:15.363Z",
      "updated_at": "2023-09-14T15:06:30.397Z"
    },
    {
      "body": "Illo eius aliquam velit laudantium corrupti aut ipsum corporis. Vero culpa cupiditate quibusdam aspernatur rem consectetur beatae accusamus rem. Quasi occaecati consequatur.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "b735b851-c4d4-48dc-bb77-3e29b00dce3b",
      "created_at": "2023-03-07T01:13:40.647Z",
      "updated_at": "2023-08-02T06:14:45.383Z"
    },
    {
      "body": "Voluptatibus rem commodi officia nemo facilis iure fugit ad. Vitae necessitatibus animi voluptatum repudiandae eos. Nam officia laborum accusantium vel aut eveniet.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "329b0f56-240b-4490-b6f5-c287a515a20f",
      "created_at": "2023-08-02T16:25:35.442Z",
      "updated_at": "2023-01-11T01:55:16.072Z"
    },
    {
      "body": "Beatae cupiditate similique aspernatur expedita et. Illo sapiente voluptatem temporibus quae ea iusto magnam. Fugiat ipsum accusantium libero impedit magni perspiciatis.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "ba3df9d2-c881-4255-913b-6c5871c0f510",
      "created_at": "2023-03-13T10:50:39.732Z",
      "updated_at": "2023-01-25T14:41:35.587Z"
    },
    {
      "body": "Nulla molestias nulla impedit similique. Earum error minus explicabo veritatis animi rerum dicta pariatur. Eaque unde voluptas id aut porro tempore omnis.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "resource_type": "User",
      "id": "b4ae8627-79d1-41c3-82e3-1cccd6e7c798",
      "created_at": "2023-07-02T02:05:30.127Z",
      "updated_at": "2022-11-20T11:51:43.118Z"
    },
    {
      "body": "Aspernatur alias voluptatibus repudiandae voluptas sunt illo cumque aperiam eaque. Nihil ex dolore aut quis. Officiis nesciunt tenetur excepturi expedita.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "resource_type": "User",
      "id": "4a40ee85-59cd-46d4-a1db-6c9d6e490680",
      "created_at": "2022-11-04T17:43:11.934Z",
      "updated_at": "2023-01-02T16:32:53.232Z"
    },
    {
      "body": "Quibusdam tempore excepturi nobis expedita reprehenderit. Quia repudiandae culpa vitae nobis rerum numquam. Numquam nemo ut dignissimos ipsa.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "f4f4106f-56be-4213-b965-a5a57d69506a",
      "created_at": "2023-04-21T22:49:43.434Z",
      "updated_at": "2022-11-25T10:52:02.956Z"
    },
    {
      "body": "Nobis officiis suscipit consectetur assumenda omnis. Nisi porro beatae atque ea ad accusamus magnam. Illum nobis modi ratione consectetur voluptates.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "81c5c0bf-6f27-41a8-b257-2db04889af89",
      "created_at": "2023-09-24T20:38:38.954Z",
      "updated_at": "2023-07-25T16:09:34.262Z"
    },
    {
      "body": "Beatae quia dolores itaque. Tempora sequi et. Sit facilis cumque.",
      "author_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "f795924e-f112-4aec-acde-32400e0ea0fb",
      "created_at": "2023-03-13T19:15:16.849Z",
      "updated_at": "2023-06-11T07:44:17.074Z"
    },
    {
      "body": "Eaque blanditiis repellendus dolorem dignissimos. Eos nam soluta commodi voluptatibus dolorem ab. Ipsam quod voluptatum enim voluptates hic eveniet accusamus sed.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "aa964d01-e2d7-4087-bdb7-02b2ebc79455",
      "created_at": "2022-12-19T10:51:05.351Z",
      "updated_at": "2022-10-11T13:16:37.366Z"
    },
    {
      "body": "Tempora nostrum et quam illo. Mollitia quam placeat eaque voluptate. Aperiam quas aliquam veniam tenetur labore fugiat assumenda impedit saepe.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "resource_type": "User",
      "id": "c7d4c540-9a0d-432d-b1d4-97b60e0f8a95",
      "created_at": "2023-05-31T08:30:30.895Z",
      "updated_at": "2023-05-13T14:09:06.908Z"
    },
    {
      "body": "Dolores ducimus earum fugiat optio corporis quam quia. Occaecati nisi reprehenderit adipisci. Beatae nam ratione.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "ee17c28d-510c-41e9-afa3-6514787282bf",
      "created_at": "2023-05-24T14:26:40.052Z",
      "updated_at": "2023-02-26T15:32:40.300Z"
    },
    {
      "body": "Vitae inventore tenetur nesciunt voluptate voluptatem dolorum. Sapiente nihil magnam neque aliquid sunt placeat. Quaerat sapiente error.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "resource_type": "User",
      "id": "d9256f2f-6c5e-488f-95e1-aa386994b3ee",
      "created_at": "2022-11-29T17:36:16.327Z",
      "updated_at": "2023-09-20T21:24:30.634Z"
    },
    {
      "body": "Dignissimos vel dolor in. Dolorem autem ab adipisci eaque minus nesciunt dolorem ea enim. Eligendi eveniet quia doloremque sint sed quas commodi soluta amet.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "5253c924-34fa-4f5a-8c80-c04a366d5e0b",
      "created_at": "2023-07-09T17:11:59.989Z",
      "updated_at": "2023-06-06T04:43:02.801Z"
    },
    {
      "body": "Sapiente voluptate nesciunt libero corporis dolorem. Quasi alias fuga mollitia id. Voluptatibus architecto maxime adipisci amet voluptate aperiam dignissimos ad fugiat.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "resource_type": "User",
      "id": "0bc49b02-01a7-4692-96aa-79ffa75ecb9c",
      "created_at": "2023-08-10T01:08:29.415Z",
      "updated_at": "2023-06-25T16:45:01.896Z"
    },
    {
      "body": "Error animi ullam quo eaque. Quis labore modi ipsum repudiandae perferendis alias neque quibusdam. Quae quas amet consectetur praesentium facere veritatis labore tempora.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "bc7bc501-e83f-46ab-af8b-a8f0c5325c44",
      "created_at": "2023-02-02T11:54:22.757Z",
      "updated_at": "2022-11-23T02:17:35.778Z"
    },
    {
      "body": "Corporis sint voluptate ipsa ut error consequatur. Deleniti provident earum qui impedit. Laudantium blanditiis non eos omnis omnis corrupti.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "7698a65c-9ea0-48ca-a3c0-2abdca715005",
      "created_at": "2022-10-25T18:23:50.148Z",
      "updated_at": "2023-03-01T01:35:44.811Z"
    },
    {
      "body": "Quaerat dolorem illum suscipit architecto consectetur aliquid. Labore et magni in veniam. Accusamus repudiandae doloremque inventore nihil.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company",
      "id": "c8837643-1505-4a2a-bb17-e231e7c72400",
      "created_at": "2023-09-22T15:38:16.607Z",
      "updated_at": "2023-08-12T11:55:03.027Z"
    },
    {
      "body": "Ipsa eveniet modi sed saepe officiis deleniti maiores. Minus eius praesentium autem facere ea. Deserunt voluptates temporibus facilis unde repudiandae error.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "fbf7fe1c-01f9-4cb8-8bf3-082ab9b6b528",
      "created_at": "2023-05-25T02:18:53.947Z",
      "updated_at": "2023-01-26T21:06:10.355Z"
    },
    {
      "body": "Dolor repudiandae itaque sapiente dolores impedit quae nihil. Non non rem consequuntur modi consequatur. Quia ipsa modi corrupti eveniet rem.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "resource_type": "User",
      "id": "332ca1aa-b654-4d47-a37a-0b106d9d284d",
      "created_at": "2023-02-12T07:23:59.152Z",
      "updated_at": "2023-07-19T14:29:09.161Z"
    },
    {
      "body": "Iste sunt ducimus dolor dignissimos. Quaerat modi maiores ipsam perferendis. Exercitationem doloremque quo.",
      "author_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "author_type": "User",
      "resource_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "resource_type": "User",
      "id": "7ae20e46-398b-4510-a622-df2b5a35d76d",
      "created_at": "2023-01-29T18:29:16.974Z",
      "updated_at": "2023-05-26T16:51:41.534Z"
    },
    {
      "body": "Laboriosam quam amet earum id dolor consequatur laborum impedit. Expedita atque quidem fugit aliquam asperiores voluptas corrupti. Aperiam amet vero ab nulla alias quod.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "7e720c42-fa7c-4fda-95de-6984e8540acb",
      "created_at": "2022-11-12T14:46:40.306Z",
      "updated_at": "2023-07-25T00:45:48.569Z"
    },
    {
      "body": "Tenetur repudiandae nemo perspiciatis omnis assumenda. Rem assumenda a veniam incidunt adipisci quis ipsa beatae dolor. Excepturi molestiae veniam dignissimos rerum odio quisquam deleniti sapiente.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "resource_type": "User",
      "id": "8264f62b-ea2a-4bb8-b88d-5156377133ec",
      "created_at": "2023-06-03T12:55:45.761Z",
      "updated_at": "2022-12-11T10:39:15.873Z"
    },
    {
      "body": "Maxime rem tenetur harum excepturi magni. Provident tempora commodi. Molestiae aspernatur eum.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "c14e0f28-1dcd-448b-b9ab-ea398988701d",
      "created_at": "2022-10-11T05:04:12.161Z",
      "updated_at": "2022-11-27T05:32:44.980Z"
    },
    {
      "body": "Corrupti a quos. Occaecati praesentium sed ea qui voluptas dolore. Aspernatur consequatur fuga aperiam commodi deleniti eveniet quaerat.",
      "author_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "author_type": "User",
      "resource_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "resource_type": "User",
      "id": "1be2de02-008d-4524-95bb-2159d9a2d2c2",
      "created_at": "2022-12-17T17:26:19.120Z",
      "updated_at": "2022-11-22T05:17:11.084Z"
    },
    {
      "body": "Officia eligendi accusantium veritatis odio cupiditate dicta. Maiores temporibus facere ad cum. Blanditiis rerum at deleniti accusamus qui voluptatibus saepe.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "resource_type": "User",
      "id": "b6edf3d9-d4fa-4189-bc79-84c5a677efde",
      "created_at": "2022-10-20T06:36:27.556Z",
      "updated_at": "2023-02-18T22:49:25.406Z"
    },
    {
      "body": "Molestias hic doloremque sint pariatur rem rem eum. Maxime illum repellat porro sunt similique recusandae. Quo eaque voluptas commodi repudiandae dolorum necessitatibus omnis.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "resource_type": "User",
      "id": "a13497fe-43c0-4852-8ddf-46188ffec8fc",
      "created_at": "2022-12-27T02:40:00.698Z",
      "updated_at": "2023-08-05T07:53:22.623Z"
    },
    {
      "body": "Libero totam minus recusandae tenetur itaque quod. Ipsum quos inventore. Libero sunt numquam illo harum.",
      "author_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "author_type": "User",
      "resource_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "resource_type": "User",
      "id": "73d3e7c3-631e-4c1c-bae9-d84f0318d32b",
      "created_at": "2023-08-30T06:26:53.575Z",
      "updated_at": "2023-08-12T08:02:20.615Z"
    },
    {
      "body": "Unde laudantium id velit facilis tempore. Ea dolorem temporibus consequuntur ut hic fugit. Labore praesentium sapiente sequi eos repellat eaque fuga doloribus commodi.",
      "author_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "b0e480ac-76e1-4387-9c79-659c1d204663",
      "created_at": "2023-08-15T14:50:47.473Z",
      "updated_at": "2023-08-03T08:12:57.607Z"
    },
    {
      "body": "Temporibus dolore expedita possimus ipsum velit quae neque magnam eum. Velit earum possimus ullam ipsum id quod. Voluptatem doloremque eveniet facere officiis voluptatum.",
      "author_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "author_type": "User",
      "resource_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "resource_type": "User",
      "id": "082c54b2-395d-4d14-8867-e8ad3611ecd9",
      "created_at": "2023-06-16T08:40:19.694Z",
      "updated_at": "2023-04-08T02:05:12.337Z"
    },
    {
      "body": "Temporibus deleniti aspernatur voluptatibus debitis mollitia dignissimos reiciendis facilis reiciendis. Modi aliquid eveniet. Doloremque modi dignissimos.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "d8c8c060-8f8a-4629-b837-227f64986dd7",
      "created_at": "2023-08-30T16:27:10.927Z",
      "updated_at": "2023-06-14T04:13:10.577Z"
    },
    {
      "body": "Nostrum omnis similique maiores sint aut velit. Tempore autem maxime eum praesentium. Aliquid odit nostrum optio architecto sunt odio assumenda culpa.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "resource_type": "User",
      "id": "040de8d7-754f-4b3b-ad48-fe60f9d4c3fd",
      "created_at": "2023-08-02T16:01:27.829Z",
      "updated_at": "2023-05-10T19:04:04.489Z"
    },
    {
      "body": "Ipsa id maxime corrupti itaque voluptatum iure. Voluptate placeat molestiae tenetur blanditiis animi dignissimos impedit atque pariatur. Consequatur quod veniam ullam.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company",
      "id": "41494005-42cb-40fa-b970-0b4d6b84c4dd",
      "created_at": "2023-04-03T23:36:35.366Z",
      "updated_at": "2023-09-21T15:35:58.340Z"
    },
    {
      "body": "Quas sunt possimus. Quam ut quasi in fugiat. Asperiores temporibus dolor quidem tempore occaecati quia.",
      "author_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "4aa9dae8-122f-429b-a93f-661f6c41a72e",
      "created_at": "2022-11-25T02:05:16.853Z",
      "updated_at": "2023-05-07T07:17:31.495Z"
    },
    {
      "body": "Quidem dolores ad amet temporibus blanditiis. Harum molestiae eaque modi accusantium voluptatem officia praesentium ea. Minima dolores temporibus.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "resource_type": "User",
      "id": "d8dd3e29-40c9-4c34-9a24-eee3256a3ad8",
      "created_at": "2023-08-12T17:59:29.639Z",
      "updated_at": "2023-09-10T04:24:35.378Z"
    },
    {
      "body": "Temporibus soluta tenetur quas suscipit libero sapiente libero. Laboriosam eaque cum fugit saepe. Corrupti iste pariatur expedita officiis deserunt odio perferendis repudiandae sint.",
      "author_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "author_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company",
      "id": "cd65476a-2821-44a5-8168-adda26e4c17a",
      "created_at": "2023-07-29T13:07:30.198Z",
      "updated_at": "2023-01-21T02:53:27.210Z"
    },
    {
      "body": "Veniam harum quos labore veritatis soluta. Sint perferendis ab ullam deleniti ratione at. Assumenda natus architecto voluptatem.",
      "author_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "author_type": "User",
      "resource_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "resource_type": "User",
      "id": "d1b06556-b920-4d39-a1da-3cdf84103983",
      "created_at": "2023-02-24T21:14:20.468Z",
      "updated_at": "2023-05-09T03:31:46.421Z"
    },
    {
      "body": "Veritatis quis recusandae quaerat recusandae vel placeat id quasi cumque. Quibusdam magni voluptatem saepe quod reiciendis. Alias saepe aspernatur iste.",
      "author_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "author_type": "User",
      "resource_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "resource_type": "User",
      "id": "23f40af3-b465-4381-94d1-e71358f6fc51",
      "created_at": "2023-05-07T04:12:29.919Z",
      "updated_at": "2023-05-14T06:37:03.916Z"
    },
    {
      "body": "Ea alias possimus. Itaque iste similique. Accusamus corrupti tempore sed quaerat necessitatibus quod fugiat fuga.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "resource_type": "User",
      "id": "8883e537-644b-4ed8-b328-897542097698",
      "created_at": "2022-12-21T08:49:50.901Z",
      "updated_at": "2023-08-10T06:06:50.312Z"
    },
    {
      "body": "Asperiores quam repellat. Labore quos tenetur eius exercitationem. Vel reiciendis nemo error sit beatae officia dolor autem perspiciatis.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "6b12a60d-ec28-444f-a2fb-43e1b4725df5",
      "created_at": "2023-03-06T20:11:42.071Z",
      "updated_at": "2023-07-13T19:31:26.139Z"
    },
    {
      "body": "Quo suscipit dicta blanditiis ipsum blanditiis voluptatem velit doloremque quibusdam. Aliquid sapiente nisi delectus cumque aliquam. Suscipit expedita magni minima fugit praesentium doloremque.",
      "author_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "author_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company",
      "id": "204b3181-4a4c-4e82-94d1-3905b85482af",
      "created_at": "2022-11-09T11:13:25.511Z",
      "updated_at": "2022-12-20T10:46:11.953Z"
    },
    {
      "body": "Vitae quia iusto placeat facilis minus ducimus. Sunt omnis accusantium dolorem ipsa amet repudiandae. Minus nam dolorum illum veritatis autem iusto fugiat modi doloremque.",
      "author_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "author_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company",
      "id": "f4f679e2-877e-4bb7-a201-5665e819d6ab",
      "created_at": "2022-11-12T16:48:49.757Z",
      "updated_at": "2023-04-30T03:57:30.747Z"
    }
  ],
  "Version": [
    {
      "changes": [
        [
          "libero",
          [
            "perferendis sequi molestiae",
            "dolore sint ut"
          ]
        ],
        [
          "hic",
          [
            "Rick Reinger",
            "Eric Daugherty"
          ]
        ],
        [
          "aspernatur ad quaerat",
          [
            "Loretta Moen",
            "Tomas Swaniawski"
          ]
        ]
      ],
      "timestamp": "2022-11-28T00:29:59.439Z",
      "id": "f3b572d5-f42f-4c8d-bea7-0f813246f0e9",
      "created_at": "2023-02-04T06:58:18.926Z",
      "updated_at": "2023-07-11T01:27:18.478Z",
      "actor_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "actor_type": "User",
      "resource_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "resource_type": "User"
    },
    {
      "changes": [
        [
          "delectus sed",
          [
            "quia quis assumenda",
            "ex magnam molestiae"
          ]
        ],
        [
          "officiis temporibus cumque",
          [
            "Felicia Kerluke",
            "Clinton Okuneva"
          ]
        ]
      ],
      "timestamp": "2023-09-24T13:43:31.670Z",
      "id": "110b93c4-8bfe-4a40-ae92-9d1442266c70",
      "created_at": "2023-01-17T21:36:30.512Z",
      "updated_at": "2023-06-28T17:02:05.476Z",
      "actor_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "actor_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "quod cupiditate",
          [
            "https://ripe-cilantro.info/",
            "https://safe-humor.name/"
          ]
        ],
        [
          "rem quibusdam",
          [
            "https://unfortunate-slot.biz/",
            "https://legal-battle.net"
          ]
        ],
        [
          "excepturi facere adipisci",
          [
            "https://unkempt-veldt.name",
            "https://haunting-foot.name"
          ]
        ],
        [
          "cupiditate magnam dicta",
          [
            "https://generous-skylight.com",
            "https://immaterial-vegetation.name/"
          ]
        ]
      ],
      "timestamp": "2023-07-06T08:33:44.745Z",
      "id": "b0e491a8-cd33-4beb-9b23-495d07346139",
      "created_at": "2023-09-09T10:51:22.666Z",
      "updated_at": "2023-01-01T22:47:51.136Z",
      "actor_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "actor_type": "User",
      "resource_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "resource_type": "User"
    },
    {
      "changes": [
        [
          "odit",
          [
            "Magnam odit numquam deleniti vel numquam.",
            "Est laboriosam temporibus nobis."
          ]
        ],
        [
          "tempore",
          [
            null,
            null
          ]
        ]
      ],
      "timestamp": "2023-01-05T23:26:43.435Z",
      "id": "e7ae14f5-ebab-43c7-97a6-c01f5f99e501",
      "created_at": "2023-09-10T13:47:15.227Z",
      "updated_at": "2023-06-25T13:48:06.476Z",
      "actor_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "actor_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "vitae",
          [
            "omnis maiores ipsam",
            null
          ]
        ]
      ],
      "timestamp": "2023-09-02T20:40:56.527Z",
      "id": "69b0e26b-591f-45d8-9801-1b47cff9006f",
      "created_at": "2023-07-09T05:18:13.461Z",
      "updated_at": "2023-02-10T09:32:46.943Z",
      "actor_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "actor_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "commodi",
          [
            86,
            12
          ]
        ]
      ],
      "timestamp": "2023-03-11T02:09:27.511Z",
      "id": "16e34e9b-753c-4958-b0cb-5b6ca01f410b",
      "created_at": "2023-02-19T02:39:51.034Z",
      "updated_at": "2022-12-26T05:51:21.051Z",
      "actor_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "actor_type": "User",
      "resource_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "resource_type": "User"
    },
    {
      "changes": [
        [
          "delectus dignissimos",
          [
            "sequi soluta molestias",
            "corrupti veritatis fuga"
          ]
        ],
        [
          "at cum",
          [
            51,
            93
          ]
        ],
        [
          "culpa",
          [
            "Debitis voluptatem doloribus quidem quaerat illum.",
            "Non in sunt eius sunt blanditiis."
          ]
        ]
      ],
      "timestamp": "2022-12-20T02:33:56.791Z",
      "id": "1f86e5ad-41e4-4ae9-bdc3-bfea2dc3d1fe",
      "created_at": "2023-03-02T04:31:19.935Z",
      "updated_at": "2023-09-02T05:20:22.387Z",
      "actor_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "actor_type": "User",
      "resource_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "resource_type": "User"
    },
    {
      "changes": [
        [
          "totam architecto deleniti",
          [
            "Darnell McLaughlin",
            "Doris Turner"
          ]
        ],
        [
          "vitae natus",
          [
            80,
            72
          ]
        ],
        [
          "sunt distinctio",
          [
            21,
            12
          ]
        ],
        [
          "nobis numquam",
          [
            "quasi reprehenderit consectetur",
            "minima rem veniam"
          ]
        ],
        [
          "placeat magnam",
          [
            "Gerard Deckow",
            "Ms. Judy Mayert"
          ]
        ]
      ],
      "timestamp": "2022-12-13T09:25:25.594Z",
      "id": "3437d0a9-cddb-4040-bbd1-e62bce299707",
      "created_at": "2023-04-24T23:20:48.323Z",
      "updated_at": "2022-10-21T10:46:07.711Z",
      "actor_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "actor_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "ex pariatur debitis",
          [
            "Velit incidunt reiciendis iste non voluptas provident hic eius laboriosam.",
            "Molestias incidunt blanditiis rerum."
          ]
        ],
        [
          "quisquam neque",
          [
            "a libero aliquam",
            null
          ]
        ],
        [
          "veniam quis",
          [
            "Estrella_Connelly@hotmail.com",
            "Ashly.Upton60@hotmail.com"
          ]
        ],
        [
          "labore distinctio",
          [
            "Dr. Spencer Roob",
            "Maggie Cremin MD"
          ]
        ],
        [
          "repellendus esse blanditiis",
          [
            "ea iure veniam",
            "exercitationem beatae voluptate"
          ]
        ]
      ],
      "timestamp": "2023-02-25T07:57:13.318Z",
      "id": "495c3111-5562-48ec-a6a2-6546211a089a",
      "created_at": "2023-06-29T04:18:58.315Z",
      "updated_at": "2023-04-27T13:31:48.849Z",
      "actor_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "actor_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "natus sed suscipit",
          [
            {
              "unchanged": "unchanged",
              "name": "Harry Skiles",
              "amount": 72
            },
            {
              "unchanged": "unchanged",
              "name": "Traci O'Kon",
              "amount": 22
            }
          ]
        ],
        [
          "optio pariatur dolores",
          [
            "commodi eius officiis",
            "quis assumenda ipsa"
          ]
        ]
      ],
      "timestamp": "2023-04-25T04:26:58.392Z",
      "id": "c80adddd-feab-473e-a4be-6801f23593b3",
      "created_at": "2023-01-17T03:02:52.417Z",
      "updated_at": "2022-11-12T08:14:48.855Z",
      "actor_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "actor_type": "User",
      "resource_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "resource_type": "User"
    },
    {
      "changes": [
        [
          "quaerat quidem voluptas",
          [
            "Ipsum voluptatum sed cum.",
            "Quo quod laborum fuga incidunt."
          ]
        ],
        [
          "aspernatur reprehenderit id",
          [
            94,
            3
          ]
        ],
        [
          "aspernatur a",
          [
            "illo optio officia",
            null
          ]
        ],
        [
          "fuga",
          [
            91,
            36
          ]
        ]
      ],
      "timestamp": "2022-11-14T02:55:57.988Z",
      "id": "1d740b3d-655e-49f4-8961-956bc3bb188a",
      "created_at": "2022-11-16T22:18:37.293Z",
      "updated_at": "2023-10-03T13:35:24.951Z",
      "actor_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "actor_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "voluptatum",
          [
            "Exercitationem quidem esse nulla iste sapiente consectetur aut atque et.",
            "Reiciendis sapiente inventore quasi quidem aliquam odit non ea repellendus."
          ]
        ],
        [
          "facilis in",
          [
            {
              "unchanged": "unchanged",
              "name": "Tracey Hintz",
              "amount": 93
            },
            {
              "unchanged": "unchanged",
              "name": "Blanca Hammes",
              "amount": 42
            }
          ]
        ],
        [
          "nihil totam inventore",
          [
            "Alan.Littel27@gmail.com",
            "Henri.Tremblay67@hotmail.com"
          ]
        ]
      ],
      "timestamp": "2023-04-22T20:37:44.682Z",
      "id": "2f334ab0-e302-4d62-8127-f550d7147040",
      "created_at": "2022-12-26T16:35:35.779Z",
      "updated_at": "2023-04-24T11:23:46.410Z",
      "actor_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "actor_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "vel",
          [
            {
              "unchanged": "unchanged",
              "name": "Shari Ledner",
              "amount": 36
            },
            {
              "unchanged": "unchanged",
              "name": "Jessie Boyle",
              "amount": 50
            }
          ]
        ]
      ],
      "timestamp": "2023-03-22T15:04:39.222Z",
      "id": "7fc6e793-7281-4c3d-9d9b-95aa5df11e04",
      "created_at": "2023-06-24T04:38:23.520Z",
      "updated_at": "2022-12-16T05:25:16.520Z",
      "actor_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "actor_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "dolores",
          [
            "Shakira_Nienow@yahoo.com",
            "Emmy_Lueilwitz4@yahoo.com"
          ]
        ],
        [
          "amet tenetur",
          [
            "Allen30@yahoo.com",
            "Jamison_Schneider-Swaniawski74@yahoo.com"
          ]
        ],
        [
          "at dignissimos cupiditate",
          [
            10,
            90
          ]
        ]
      ],
      "timestamp": "2023-07-31T21:55:58.398Z",
      "id": "a15abef4-ae95-46a2-8336-e158429f658e",
      "created_at": "2023-04-14T23:08:43.656Z",
      "updated_at": "2022-10-09T15:28:10.409Z",
      "actor_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "actor_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "fugiat blanditiis",
          [
            "In sequi harum ullam placeat mollitia incidunt.",
            "Totam eaque rerum."
          ]
        ],
        [
          "vel totam",
          [
            "Darren Frami",
            "Mr. Gilbert Labadie"
          ]
        ],
        [
          "dolores iste iste",
          [
            {
              "unchanged": "unchanged",
              "name": "Claire Lindgren",
              "amount": 78
            },
            {
              "unchanged": "unchanged",
              "name": "Mrs. Sonia Kuhlman",
              "amount": 25
            }
          ]
        ]
      ],
      "timestamp": "2022-12-30T02:58:01.551Z",
      "id": "4fa10f42-693b-49fe-bfe0-2fd99b5813ef",
      "created_at": "2023-08-31T07:36:49.960Z",
      "updated_at": "2023-09-03T22:02:58.795Z",
      "actor_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "actor_type": "User",
      "resource_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "resource_type": "User"
    },
    {
      "changes": [
        [
          "vero provident labore",
          [
            "sunt earum animi",
            "excepturi suscipit veniam"
          ]
        ],
        [
          "eum neque consequuntur",
          [
            "Armando Marks",
            "Jodi Beatty"
          ]
        ],
        [
          "corrupti mollitia at",
          [
            "https://interesting-lantern.net/",
            "https://charming-forelimb.net/"
          ]
        ],
        [
          "cupiditate",
          [
            null,
            null
          ]
        ]
      ],
      "timestamp": "2023-09-24T21:27:56.438Z",
      "id": "862d616b-df65-46a1-8298-9b6a9067ab75",
      "created_at": "2023-01-08T19:42:23.621Z",
      "updated_at": "2023-04-10T17:28:54.264Z",
      "actor_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "actor_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "ipsa earum iure",
          [
            81,
            16
          ]
        ],
        [
          "quo laborum",
          [
            "Shawn Swift",
            "Terry Stoltenberg"
          ]
        ],
        [
          "cumque occaecati mollitia",
          [
            "Ebony West-Schneider",
            "Lora Hettinger"
          ]
        ]
      ],
      "timestamp": "2023-02-26T10:14:24.284Z",
      "id": "5ae27bb2-7735-4631-9717-611cace5ccbc",
      "created_at": "2023-01-19T10:24:42.786Z",
      "updated_at": "2023-02-17T09:04:19.835Z",
      "actor_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "actor_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "laboriosam ut",
          [
            "Nesciunt nesciunt tempore ducimus ea quidem est.",
            "Eveniet ullam nam quibusdam."
          ]
        ],
        [
          "aspernatur",
          [
            55,
            63
          ]
        ]
      ],
      "timestamp": "2023-04-09T01:07:30.232Z",
      "id": "79ed1b49-b5ac-464c-9e17-f3ee87beabe2",
      "created_at": "2023-09-21T00:00:59.286Z",
      "updated_at": "2023-08-09T07:20:04.819Z",
      "actor_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "actor_type": "User",
      "resource_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "resource_type": "User"
    },
    {
      "changes": [
        [
          "accusantium aliquid magni",
          [
            "https://mean-notion.com",
            "https://piercing-geology.info/"
          ]
        ]
      ],
      "timestamp": "2023-08-10T22:43:48.338Z",
      "id": "3bce1ec0-11c0-408f-9b92-c80aee544fe5",
      "created_at": "2023-04-21T02:08:30.934Z",
      "updated_at": "2022-12-20T00:07:03.423Z",
      "actor_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "actor_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "distinctio est",
          [
            "Willard Feil",
            "Vincent Gusikowski"
          ]
        ],
        [
          "nesciunt",
          [
            3,
            77
          ]
        ]
      ],
      "timestamp": "2023-07-09T02:11:05.247Z",
      "id": "6613baf7-9b4c-4967-91e5-d01f267ffeb7",
      "created_at": "2023-03-11T14:25:49.020Z",
      "updated_at": "2023-06-16T09:18:47.444Z",
      "actor_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "actor_type": "User",
      "resource_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "resource_type": "User"
    },
    {
      "changes": [
        [
          "doloribus error quisquam",
          [
            "Jacqueline Hoppe",
            "Caroline Stiedemann"
          ]
        ],
        [
          "odit aliquid in",
          [
            {
              "unchanged": "unchanged",
              "name": "Irma Torp",
              "amount": 42
            },
            {
              "unchanged": "unchanged",
              "name": "Aaron Nitzsche",
              "amount": 5
            }
          ]
        ],
        [
          "deleniti",
          [
            {
              "unchanged": "unchanged",
              "name": "Stephanie Ullrich",
              "amount": 27
            },
            {
              "unchanged": "unchanged",
              "name": "Arnold Grady",
              "amount": 7
            }
          ]
        ],
        [
          "eos unde quos",
          [
            "Pariatur saepe rem possimus.",
            "Magni laboriosam porro totam."
          ]
        ]
      ],
      "timestamp": "2023-06-12T19:00:24.141Z",
      "id": "2ee8f771-a9dd-432b-9b97-eed9f9454ef6",
      "created_at": "2022-12-18T00:41:09.659Z",
      "updated_at": "2022-11-21T04:14:52.042Z",
      "actor_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "actor_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "unde ipsa",
          [
            "Ebony Moen",
            "Hannah Wiza"
          ]
        ],
        [
          "totam id",
          [
            "https://entire-row.com/",
            "https://jittery-abnormality.net"
          ]
        ],
        [
          "impedit",
          [
            "molestiae nostrum maiores",
            "accusantium voluptate nesciunt"
          ]
        ],
        [
          "assumenda",
          [
            "impedit reiciendis animi",
            null
          ]
        ]
      ],
      "timestamp": "2023-09-05T03:13:20.529Z",
      "id": "5021063d-6aa4-478e-9fa4-6e1d7157d409",
      "created_at": "2023-03-01T16:44:50.495Z",
      "updated_at": "2022-11-16T10:45:26.987Z",
      "actor_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "actor_type": "User",
      "resource_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "resource_type": "User"
    },
    {
      "changes": [
        [
          "nam",
          [
            "dignissimos magnam esse",
            "facilis eius delectus"
          ]
        ],
        [
          "commodi",
          [
            null,
            null
          ]
        ],
        [
          "aperiam autem ipsa",
          [
            4,
            7
          ]
        ]
      ],
      "timestamp": "2023-07-20T01:36:21.838Z",
      "id": "c33fb77c-9ed0-4820-99f2-4e8c3942abc8",
      "created_at": "2023-03-21T13:15:08.445Z",
      "updated_at": "2023-05-11T09:26:23.102Z",
      "actor_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "actor_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "veritatis vero",
          [
            {
              "unchanged": "unchanged",
              "name": "Jody Mills",
              "amount": 45
            },
            {
              "unchanged": "unchanged",
              "name": "Jean Koepp",
              "amount": 76
            }
          ]
        ],
        [
          "occaecati sequi",
          [
            27,
            92
          ]
        ],
        [
          "eaque autem repellat",
          [
            {
              "unchanged": "unchanged",
              "name": "Lucy Hilll",
              "amount": 68
            },
            {
              "unchanged": "unchanged",
              "name": "Darla Legros",
              "amount": 5
            }
          ]
        ],
        [
          "unde quas",
          [
            79,
            74
          ]
        ]
      ],
      "timestamp": "2023-04-15T19:35:37.631Z",
      "id": "c5a9f964-e9d5-43f2-9549-504208eb428c",
      "created_at": "2023-04-14T11:46:18.075Z",
      "updated_at": "2023-05-15T01:44:43.151Z",
      "actor_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "actor_type": "User",
      "resource_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "resource_type": "User"
    },
    {
      "changes": [
        [
          "consectetur",
          [
            "Elvira McKenzie-Wilderman",
            "Darlene Veum DVM"
          ]
        ]
      ],
      "timestamp": "2023-03-27T16:54:12.776Z",
      "id": "b80ae65b-f671-4a25-b5df-8a078c0f2d6a",
      "created_at": "2023-07-28T05:18:01.625Z",
      "updated_at": "2023-01-30T09:37:51.929Z",
      "actor_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "actor_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "illo",
          [
            {
              "unchanged": "unchanged",
              "name": "Lorraine Mayert",
              "amount": 100
            },
            {
              "unchanged": "unchanged",
              "name": "Sheryl Morar",
              "amount": 88
            }
          ]
        ],
        [
          "dolore",
          [
            null,
            "iusto expedita natus"
          ]
        ],
        [
          "ipsa",
          [
            "Addie.Tromp5@gmail.com",
            "Cristina.Ward94@hotmail.com"
          ]
        ],
        [
          "omnis ut",
          [
            {
              "unchanged": "unchanged",
              "name": "Mrs. Carla Schmitt",
              "amount": 76
            },
            {
              "unchanged": "unchanged",
              "name": "Bertha Nienow",
              "amount": 73
            }
          ]
        ],
        [
          "non",
          [
            {
              "unchanged": "unchanged",
              "name": "Erick Abbott",
              "amount": 65
            },
            {
              "unchanged": "unchanged",
              "name": "Chester Langworth V",
              "amount": 41
            }
          ]
        ]
      ],
      "timestamp": "2023-04-06T23:16:43.392Z",
      "id": "79fb566a-f224-426c-bbaa-7e9afbcdd2c9",
      "created_at": "2023-02-12T23:22:38.362Z",
      "updated_at": "2023-07-04T15:18:27.622Z",
      "actor_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "actor_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "numquam cumque quo",
          [
            "quae fuga sit",
            "tenetur eaque repudiandae"
          ]
        ],
        [
          "nihil architecto",
          [
            null,
            "consectetur ducimus aliquid"
          ]
        ],
        [
          "mollitia impedit",
          [
            "https://livid-pannier.com/",
            "https://easy-necklace.com"
          ]
        ],
        [
          "quos ullam temporibus",
          [
            "voluptas magni vitae",
            "culpa similique quis"
          ]
        ],
        [
          "soluta ad",
          [
            "Sherman Corwin",
            "Melody Anderson"
          ]
        ]
      ],
      "timestamp": "2023-03-19T23:48:43.300Z",
      "id": "29710cf6-a989-4141-99d4-57d5f16c1ac4",
      "created_at": "2022-10-19T07:11:57.691Z",
      "updated_at": "2022-10-26T21:32:01.600Z",
      "actor_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "actor_type": "User",
      "resource_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "resource_type": "User"
    },
    {
      "changes": [
        [
          "quaerat eius",
          [
            "Della Casper",
            "Gwen Harvey"
          ]
        ],
        [
          "minus eos modi",
          [
            "Raoul8@gmail.com",
            "Delta_MacGyver91@hotmail.com"
          ]
        ]
      ],
      "timestamp": "2023-07-30T17:31:19.840Z",
      "id": "2bc226a3-b299-4054-a6ab-c20b70aa7e53",
      "created_at": "2023-09-08T13:19:08.301Z",
      "updated_at": "2023-04-13T12:53:59.128Z",
      "actor_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "actor_type": "User",
      "resource_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "resource_type": "User"
    },
    {
      "changes": [
        [
          "nobis",
          [
            {
              "unchanged": "unchanged",
              "name": "Mrs. Peggy Johnson",
              "amount": 10
            },
            {
              "unchanged": "unchanged",
              "name": "Norman Hermiston",
              "amount": 48
            }
          ]
        ],
        [
          "natus",
          [
            "Est error dolore omnis architecto.",
            "Eveniet itaque ipsa."
          ]
        ]
      ],
      "timestamp": "2022-10-12T11:45:19.740Z",
      "id": "7ff047dd-59d5-4f92-bcbf-0627a9afb613",
      "created_at": "2023-04-05T07:04:34.978Z",
      "updated_at": "2023-01-09T10:59:15.745Z",
      "actor_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "actor_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "beatae doloribus",
          [
            null,
            "quisquam error blanditiis"
          ]
        ],
        [
          "ullam labore",
          [
            null,
            "voluptas adipisci repellendus"
          ]
        ],
        [
          "aspernatur suscipit",
          [
            "https://each-welcome.info",
            "https://zesty-toilet.biz"
          ]
        ],
        [
          "deleniti",
          [
            "Amanda.Bosco@gmail.com",
            "Florence.Morar@hotmail.com"
          ]
        ]
      ],
      "timestamp": "2023-05-03T21:13:40.516Z",
      "id": "74d11765-7a1c-4660-861c-8ce7274d2f42",
      "created_at": "2023-10-05T17:51:32.571Z",
      "updated_at": "2023-07-12T10:18:25.360Z",
      "actor_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "actor_type": "User",
      "resource_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "resource_type": "User"
    },
    {
      "changes": [
        [
          "repellendus voluptate tenetur",
          [
            "Magni delectus qui commodi est non ea quaerat aut.",
            "Beatae similique est nulla alias voluptate explicabo quaerat."
          ]
        ],
        [
          "quas",
          [
            "Virginia Quigley",
            "Dr. Kurt Leffler"
          ]
        ],
        [
          "vero quo",
          [
            "consequuntur cumque fuga",
            null
          ]
        ]
      ],
      "timestamp": "2023-01-09T03:26:16.177Z",
      "id": "c5d8ddd2-4d83-42d1-9af2-79ebcfb97c2c",
      "created_at": "2022-11-22T14:09:17.978Z",
      "updated_at": "2023-02-12T10:04:44.457Z",
      "actor_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "actor_type": "User",
      "resource_id": "7e288004-f125-431c-9369-74649276c454",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "deleniti maxime dicta",
          [
            "eligendi quis accusamus",
            "magnam rem doloremque"
          ]
        ]
      ],
      "timestamp": "2023-04-30T07:14:08.941Z",
      "id": "a1ac50c4-268f-45dc-b1e3-4b36f545bd30",
      "created_at": "2023-03-28T04:16:03.127Z",
      "updated_at": "2023-03-10T17:59:01.793Z",
      "actor_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "actor_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "minus vero",
          [
            {
              "unchanged": "unchanged",
              "name": "Brenda Feest",
              "amount": 20
            },
            {
              "unchanged": "unchanged",
              "name": "Beatrice Bergstrom",
              "amount": 58
            }
          ]
        ],
        [
          "sit quasi occaecati",
          [
            "quaerat sunt asperiores",
            "ducimus mollitia modi"
          ]
        ],
        [
          "deserunt",
          [
            "cum mollitia deserunt",
            "recusandae illum eos"
          ]
        ],
        [
          "soluta quas possimus",
          [
            "earum debitis exercitationem",
            "quod eum reiciendis"
          ]
        ]
      ],
      "timestamp": "2022-11-07T09:33:32.833Z",
      "id": "45db5c43-e0fd-4d6f-ac0e-66d2a1272260",
      "created_at": "2023-09-17T22:34:42.902Z",
      "updated_at": "2023-06-14T00:05:39.669Z",
      "actor_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "actor_type": "User",
      "resource_id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "dolorum",
          [
            "facere aliquid recusandae",
            "blanditiis sunt ut"
          ]
        ],
        [
          "illo",
          [
            64,
            45
          ]
        ],
        [
          "alias distinctio",
          [
            "Jayda_Bogan53@gmail.com",
            "Mustafa.Fritsch20@hotmail.com"
          ]
        ],
        [
          "illum officia accusamus",
          [
            "Perspiciatis voluptas corporis eius non impedit necessitatibus.",
            "Soluta laborum laudantium nobis."
          ]
        ],
        [
          "sapiente cupiditate qui",
          [
            "Asperiores enim laborum dolor magnam soluta adipisci quidem soluta dolores.",
            "Labore voluptate iure."
          ]
        ]
      ],
      "timestamp": "2023-09-14T07:29:49.688Z",
      "id": "7dbabe31-b66b-4806-a6fe-078bd93ce1da",
      "created_at": "2023-03-10T06:44:49.286Z",
      "updated_at": "2023-05-17T21:46:36.624Z",
      "actor_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "actor_type": "User",
      "resource_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "resource_type": "User"
    },
    {
      "changes": [
        [
          "placeat culpa",
          [
            "https://stiff-pillar.info",
            "https://profitable-dependency.org"
          ]
        ],
        [
          "quisquam porro voluptates",
          [
            "https://cavernous-victim.org",
            "https://ironclad-vegetarian.net/"
          ]
        ],
        [
          "facilis consectetur",
          [
            "Edmond Stark",
            "Nathaniel Dooley"
          ]
        ],
        [
          "illum",
          [
            "https://bland-fraud.com",
            "https://total-tent.org"
          ]
        ],
        [
          "ipsa nemo",
          [
            "Atque aliquam atque voluptates sunt dolorem tempore illo voluptate.",
            "Vero labore maxime enim."
          ]
        ]
      ],
      "timestamp": "2022-12-05T22:59:56.027Z",
      "id": "f2ca8491-03f9-49da-aa20-b41719665d9c",
      "created_at": "2023-09-25T01:59:19.293Z",
      "updated_at": "2022-11-22T21:21:02.095Z",
      "actor_id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "actor_type": "User",
      "resource_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "resource_type": "User"
    },
    {
      "changes": [
        [
          "dolorem impedit quam",
          [
            "https://wide-beverage.info",
            "https://hard-shawl.name"
          ]
        ],
        [
          "hic nisi",
          [
            {
              "unchanged": "unchanged",
              "name": "Myron Kessler MD",
              "amount": 49
            },
            {
              "unchanged": "unchanged",
              "name": "Kristi Koss",
              "amount": 89
            }
          ]
        ],
        [
          "officiis facilis velit",
          [
            "Johnathan Reilly-Wiza",
            "Dorothy Donnelly"
          ]
        ],
        [
          "pariatur saepe quibusdam",
          [
            61,
            61
          ]
        ],
        [
          "quia",
          [
            "https://academic-handsaw.com/",
            "https://mixed-fusarium.name/"
          ]
        ]
      ],
      "timestamp": "2022-10-22T07:02:37.916Z",
      "id": "2baa06f3-750e-4184-8868-90790c384cc4",
      "created_at": "2023-04-06T20:45:33.658Z",
      "updated_at": "2023-08-18T14:20:29.379Z",
      "actor_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "actor_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "nam quam libero",
          [
            "Dallas Pfeffer",
            "Merle Powlowski"
          ]
        ],
        [
          "exercitationem error",
          [
            "https://cautious-oxford.org/",
            "https://downright-compost.org/"
          ]
        ],
        [
          "ipsum magnam",
          [
            "nulla ipsam odit",
            null
          ]
        ]
      ],
      "timestamp": "2023-03-16T05:08:38.783Z",
      "id": "5b4c1d3c-b1f2-452f-b5e5-1da162b496a1",
      "created_at": "2023-01-01T05:47:53.387Z",
      "updated_at": "2022-12-21T16:46:44.042Z",
      "actor_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "actor_type": "User",
      "resource_id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "incidunt",
          [
            "Kurt_Pouros@hotmail.com",
            "Trudie_Moen28@yahoo.com"
          ]
        ]
      ],
      "timestamp": "2023-04-15T00:37:39.647Z",
      "id": "0214c26d-8a90-4c14-a18c-addb76852690",
      "created_at": "2023-05-21T03:02:40.484Z",
      "updated_at": "2023-02-07T19:12:57.139Z",
      "actor_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "actor_type": "User",
      "resource_id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "nostrum doloremque ipsam",
          [
            "Otis Lehner",
            "Esther Harvey"
          ]
        ],
        [
          "minus iure tempore",
          [
            "hic sed officia",
            "quidem eius iure"
          ]
        ],
        [
          "rem error assumenda",
          [
            {
              "unchanged": "unchanged",
              "name": "Angela Jacobs",
              "amount": 35
            },
            {
              "unchanged": "unchanged",
              "name": "Charles Stroman IV",
              "amount": 73
            }
          ]
        ],
        [
          "ratione similique",
          [
            "https://exhausted-concrete.com/",
            "https://yearly-borrowing.biz/"
          ]
        ],
        [
          "quia non unde",
          [
            "Cara94@yahoo.com",
            "Jevon_Beatty17@yahoo.com"
          ]
        ]
      ],
      "timestamp": "2022-10-09T18:45:56.362Z",
      "id": "85a3470a-9beb-4981-8d1e-516a9c03bd18",
      "created_at": "2023-10-02T13:10:19.144Z",
      "updated_at": "2023-07-02T07:59:52.876Z",
      "actor_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "actor_type": "User",
      "resource_id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "resource_type": "Company"
    },
    {
      "changes": [
        [
          "excepturi quo sapiente",
          [
            "https://unsightly-label.org",
            "https://woeful-cliff.info/"
          ]
        ],
        [
          "odit sapiente totam",
          [
            67,
            56
          ]
        ],
        [
          "veritatis",
          [
            "Odio vitae accusantium vel ab.",
            "Necessitatibus ratione odio earum."
          ]
        ],
        [
          "iusto",
          [
            "id eum quos",
            "magni velit saepe"
          ]
        ],
        [
          "deleniti",
          [
            "Lamont.Russel@gmail.com",
            "Jade.Robel82@gmail.com"
          ]
        ]
      ],
      "timestamp": "2023-07-26T03:47:42.203Z",
      "id": "7a41451e-5c26-4bdc-8416-9767231ea57d",
      "created_at": "2023-03-05T00:23:15.514Z",
      "updated_at": "2023-05-15T13:56:29.284Z",
      "actor_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "actor_type": "User",
      "resource_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "resource_type": "User"
    }
  ],
  "Webhook": [
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "2c143b57-691e-467f-a16e-52d0efe7a29e",
      "created_at": "2023-10-04T22:02:04.192Z",
      "updated_at": "2023-10-04T23:30:19.983Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "d1a7d318-a690-4039-9d1b-580a2f935571",
      "created_at": "2023-10-05T06:01:10.162Z",
      "updated_at": "2023-10-04T22:03:22.715Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "e7a539f0-3780-4b38-9ebe-fed93f463440",
      "created_at": "2023-10-05T10:04:59.138Z",
      "updated_at": "2023-10-05T00:22:57.684Z"
    },
    {
      "source": "slack",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "e4a21e02-3051-4ac7-bb13-3b3c07770c2b",
      "created_at": "2023-10-04T22:53:36.680Z",
      "updated_at": "2023-10-05T09:59:20.579Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "f338e1f6-39b2-4805-a3db-97d6f1dc1693",
      "created_at": "2023-10-04T23:12:33.905Z",
      "updated_at": "2023-10-05T06:39:48.088Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "48ef4211-5f10-45f8-bb51-98e454a6220e",
      "created_at": "2023-10-05T03:47:20.468Z",
      "updated_at": "2023-10-05T17:31:35.304Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "b5f87fc9-9a22-4a9b-9f7f-f7fada16be38",
      "created_at": "2023-10-05T18:01:22.681Z",
      "updated_at": "2023-10-05T06:10:19.538Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "5881c133-6f57-496a-83b1-08a5ca60154f",
      "created_at": "2023-10-05T17:46:36.609Z",
      "updated_at": "2023-10-05T14:45:44.808Z"
    },
    {
      "source": "slack",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "19b0ead7-2c6a-4130-b3ea-7ebb72642985",
      "created_at": "2023-10-05T14:47:52.646Z",
      "updated_at": "2023-10-05T14:32:06.252Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "cc01b3a3-95cc-4000-bb29-f1e207947616",
      "created_at": "2023-10-05T14:20:29.387Z",
      "updated_at": "2023-10-05T03:06:22.300Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "b41401c5-6af3-4e87-a40b-f6aa426d794d",
      "created_at": "2023-10-05T19:22:53.659Z",
      "updated_at": "2023-10-05T19:13:26.654Z"
    },
    {
      "source": "slack",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "4d01116a-21dd-4dd0-9ceb-ef291ef2f56b",
      "created_at": "2023-10-04T21:33:16.303Z",
      "updated_at": "2023-10-05T08:47:44.983Z"
    },
    {
      "source": "slack",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "f3ed8bb0-3d76-440a-8930-c44a295de0c7",
      "created_at": "2023-10-05T15:14:38.546Z",
      "updated_at": "2023-10-05T14:10:37.022Z"
    },
    {
      "source": "slack",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "5c09c282-a185-4b4a-b5a2-3b80f78764c9",
      "created_at": "2023-10-05T05:53:21.821Z",
      "updated_at": "2023-10-04T23:35:42.635Z"
    },
    {
      "source": "slack",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "0c1edb3e-7dd9-4d9f-b503-26548c6831e5",
      "created_at": "2023-10-05T11:32:07.149Z",
      "updated_at": "2023-10-05T17:59:53.449Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "3441ce57-3431-42a4-9e98-b2eb6a7e0229",
      "created_at": "2023-10-05T10:06:05.037Z",
      "updated_at": "2023-10-05T18:43:04.962Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "7b9dab94-415f-4e26-a876-ebbf595b0e70",
      "created_at": "2023-10-05T11:27:26.141Z",
      "updated_at": "2023-10-05T15:44:29.503Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "d692cd10-6eae-4130-b649-f2216e417eec",
      "created_at": "2023-10-05T03:20:50.890Z",
      "updated_at": "2023-10-05T05:18:46.324Z"
    },
    {
      "source": "slack",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "dd19e6f9-02fc-418c-a95e-4b8760d5b688",
      "created_at": "2023-10-05T01:07:39.068Z",
      "updated_at": "2023-10-05T17:55:04.529Z"
    },
    {
      "source": "slack",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "1daf22a7-23db-4119-834a-dabc4be91727",
      "created_at": "2023-10-05T03:09:07.463Z",
      "updated_at": "2023-10-05T14:27:55.258Z"
    },
    {
      "source": "slack",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "b021b09f-4acd-4ad7-bdc7-7e15c3d637cd",
      "created_at": "2023-10-05T02:48:19.051Z",
      "updated_at": "2023-10-05T11:54:35.761Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "ce54525e-7c67-4057-932e-eb7f9b1b2ef8",
      "created_at": "2023-10-05T19:47:38.453Z",
      "updated_at": "2023-10-04T22:24:06.706Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "003f0c22-f6cf-472e-966b-191ccb4ac1d9",
      "created_at": "2023-10-05T02:10:03.927Z",
      "updated_at": "2023-10-05T15:03:39.589Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "c6e23a72-4653-40fa-8f96-779acdcef314",
      "created_at": "2023-10-05T01:40:10.297Z",
      "updated_at": "2023-10-05T11:34:42.073Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "06ccae9f-bcbc-4c84-a393-b802fb80ed1f",
      "created_at": "2023-10-04T21:29:30.261Z",
      "updated_at": "2023-10-05T05:44:16.560Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "19ea5342-878d-4e35-b1aa-bbfd60b5e2b5",
      "created_at": "2023-10-05T10:36:24.905Z",
      "updated_at": "2023-10-05T10:05:29.632Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "0445a185-dae4-45b7-9710-7ecb56604deb",
      "created_at": "2023-10-05T11:10:48.520Z",
      "updated_at": "2023-10-05T18:27:11.504Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "e71d44df-ba1a-4c9c-bd62-97a2cfed6616",
      "created_at": "2023-10-05T17:48:08.626Z",
      "updated_at": "2023-10-05T17:09:57.145Z"
    },
    {
      "source": "slack",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "c70ccbd9-02e4-49b5-a65d-aa5016afed75",
      "created_at": "2023-10-05T09:37:39.053Z",
      "updated_at": "2023-10-05T08:29:10.639Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "06dbad14-527b-42c0-9f7f-aec4a8d99c14",
      "created_at": "2023-10-05T12:43:44.496Z",
      "updated_at": "2023-10-05T00:34:29.878Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "3e103a7b-2329-4289-88f2-235d1faff355",
      "created_at": "2023-10-04T22:48:57.964Z",
      "updated_at": "2023-10-05T17:07:06.189Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "received",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "b644981c-702b-41a9-905d-d56d30cb7fd0",
      "created_at": "2023-10-05T00:45:10.733Z",
      "updated_at": "2023-10-05T09:54:27.615Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "df756ffb-0b49-4342-99e6-f8ce02960a92",
      "created_at": "2023-10-05T02:16:28.559Z",
      "updated_at": "2023-10-05T13:29:22.696Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "9fa80f27-02ed-4935-9bb9-e8cab624775d",
      "created_at": "2023-10-05T06:40:22.045Z",
      "updated_at": "2023-10-05T17:05:00.656Z"
    },
    {
      "source": "stripe",
      "event": "payout.failed",
      "status": "processed",
      "data": {
        "sample": "data",
        "id": "_someKey"
      },
      "id": "4dd1a488-117a-4db4-bece-8752cb11779d",
      "created_at": "2023-10-05T00:57:14.959Z",
      "updated_at": "2023-10-05T12:37:46.400Z"
    }
  ],
  "Notification": [
    {
      "type": "Task",
      "to_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "to_type": "User",
      "from_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "from_type": "User",
      "object_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "object_type": "User",
      "title": "Porro suscipit eaque quae.",
      "description": "Expedita accusamus iusto non. Eius dolorum tenetur praesentium optio odio.",
      "actions": [
        {
          "label": "Accept",
          "response": "invite=accept"
        },
        {
          "label": "Decline",
          "response": "invite=decline"
        }
      ],
      "action_response": null,
      "read_at": "2023-10-05T02:09:47.779Z",
      "read": false,
      "id": "8a049702-8bc1-4bfb-8ab2-6bebc12ee49a",
      "created_at": "2023-10-04T22:06:43.821Z",
      "updated_at": "2023-10-04T23:23:01.022Z"
    },
    {
      "type": "Simple",
      "to_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "to_type": "User",
      "read": false,
      "read_at": "2023-10-05T12:54:58.423Z",
      "title": "Assumenda reiciendis inventore quaerat consequatur nesciunt sequi veritatis quis quos.",
      "description": "Sit tempora quidem similique quam. Vel dolor enim alias dolorem.",
      "id": "89378db7-c660-431d-9e24-e1338e4b825f",
      "created_at": "2023-10-04T21:17:21.136Z",
      "updated_at": "2023-10-05T03:15:10.369Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": null,
      "read_bloom": [],
      "read": false,
      "publish_at": null,
      "expire_at": "2024-07-13T11:28:11.827Z",
      "read_count": 1405000,
      "title": "Quas debitis repellendus.",
      "description": "Nulla eaque quia deserunt asperiores a molestiae accusantium suscipit consequatur. Tenetur quasi quaerat illum officiis facilis.",
      "link": "https://rotten-worm.biz",
      "id": "5560001b-d8cd-407b-b604-70b9fd23a526",
      "created_at": "2023-10-05T18:21:56.686Z",
      "updated_at": "2023-10-05T07:11:41.864Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": ".joins(:leaderships).where(leaderships: {status: 'active', org_unit_id: OrgUnit.where(state: 'GA')})",
      "read_bloom": [],
      "read": false,
      "publish_at": "2023-08-06T03:55:54.236Z",
      "expire_at": "2023-10-15T04:15:29.241Z",
      "read_count": 846548,
      "title": "Officia veniam earum fuga quos ea quae.",
      "description": "Libero sunt quas repudiandae adipisci mollitia. Quasi officiis assumenda beatae saepe sunt perferendis corrupti alias eum.",
      "link": null,
      "id": "c870a580-5808-45ea-9c4f-b2714c5bf5a8",
      "created_at": "2023-10-05T08:50:59.295Z",
      "updated_at": "2023-10-05T17:54:05.542Z"
    },
    {
      "type": "Simple",
      "to_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "to_type": "User",
      "read": false,
      "read_at": null,
      "title": "Cupiditate consectetur magnam quia quis doloribus ducimus quisquam esse.",
      "description": "Unde recusandae tempora esse rem deleniti sequi odit vel tempora. Ipsum similique nam eligendi mollitia.",
      "id": "b363fbd0-46e9-4b97-b8da-d650cfa4d6ed",
      "created_at": "2023-10-05T15:55:54.325Z",
      "updated_at": "2023-10-05T16:10:22.680Z"
    },
    {
      "type": "Simple",
      "to_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "to_type": "User",
      "read": false,
      "read_at": "2023-10-05T00:01:42.528Z",
      "title": "Dignissimos quaerat corrupti explicabo distinctio mollitia asperiores.",
      "description": "Minus ipsa tempora enim atque rerum a saepe. Consequuntur et veritatis suscipit harum error voluptate sunt temporibus.",
      "id": "36bfb713-fe33-4e51-9784-0cf12b92d00b",
      "created_at": "2023-10-04T20:42:02.095Z",
      "updated_at": "2023-10-05T08:33:53.506Z"
    },
    {
      "type": "Simple",
      "to_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "to_type": "User",
      "read": false,
      "read_at": "2023-10-05T15:40:36.532Z",
      "title": "Ipsam quibusdam blanditiis vitae saepe provident incidunt commodi.",
      "description": "Pariatur minima nemo quo accusamus fugit sint provident est. Vel sunt deleniti neque labore necessitatibus mollitia voluptatum adipisci.",
      "id": "1345e148-47ca-4591-aafc-161e710b342e",
      "created_at": "2023-10-05T11:11:29.341Z",
      "updated_at": "2023-10-05T19:20:31.192Z"
    },
    {
      "type": "Task",
      "to_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "to_type": "User",
      "from_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "from_type": "User",
      "object_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "object_type": "User",
      "title": "Ut doloremque voluptas eligendi sequi aliquam aperiam adipisci aut.",
      "description": "Omnis optio odit cum non corporis occaecati rerum mollitia aspernatur. Ullam omnis repudiandae esse tempora eius id vel.",
      "actions": [
        {
          "label": "Accept",
          "response": "invite=accept"
        },
        {
          "label": "Decline",
          "response": "invite=decline"
        }
      ],
      "action_response": null,
      "read_at": "2023-10-05T15:52:08.242Z",
      "read": false,
      "id": "b82764d3-d7a0-4cee-a303-d7433fb1f299",
      "created_at": "2023-10-05T19:48:34.961Z",
      "updated_at": "2023-10-05T03:58:27.468Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": null,
      "read_bloom": [],
      "read": false,
      "publish_at": "2022-10-09T22:22:10.745Z",
      "expire_at": "2023-08-23T02:05:33.852Z",
      "read_count": 1640303,
      "title": "Iure iure praesentium maiores quod aspernatur culpa.",
      "description": "Repellendus minima doloribus repellat laudantium molestiae quibusdam consequatur. Sequi minima sint atque minima veritatis facilis placeat.",
      "link": "https://gullible-sidestream.com",
      "id": "4562bf06-da7e-4759-9a1d-b94f6feb2409",
      "created_at": "2023-10-05T02:26:35.890Z",
      "updated_at": "2023-10-05T02:07:00.592Z"
    },
    {
      "type": "Task",
      "to_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "to_type": "User",
      "from_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "from_type": "User",
      "object_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "object_type": "User",
      "title": "Pariatur corrupti eaque adipisci nihil modi aut.",
      "description": "Magni ad praesentium error repellat unde quas harum. Ea minus quos occaecati perspiciatis mollitia.",
      "actions": [
        {
          "label": "Accept",
          "response": "invite=accept"
        },
        {
          "label": "Decline",
          "response": "invite=decline"
        }
      ],
      "action_response": null,
      "read_at": "2023-10-05T09:48:23.373Z",
      "read": false,
      "id": "f02f1b18-1d56-4dee-8185-05c36e74e254",
      "created_at": "2023-10-05T04:22:18.844Z",
      "updated_at": "2023-10-05T11:18:20.533Z"
    },
    {
      "type": "Task",
      "to_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "to_type": "User",
      "from_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "from_type": "User",
      "object_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "object_type": "User",
      "title": "Quidem at unde cumque asperiores.",
      "description": "Consequuntur debitis assumenda ipsam eos suscipit earum quae neque occaecati. Iure enim aperiam.",
      "actions": [
        {
          "label": "Accept",
          "response": "invite=accept"
        },
        {
          "label": "Decline",
          "response": "invite=decline"
        }
      ],
      "action_response": null,
      "read_at": "2023-10-04T21:17:35.067Z",
      "read": false,
      "id": "6ebd4542-3ad2-4020-99bb-bd395c9545d0",
      "created_at": "2023-10-05T14:23:11.410Z",
      "updated_at": "2023-10-05T12:06:31.214Z"
    },
    {
      "type": "Simple",
      "to_id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "to_type": "User",
      "read": false,
      "read_at": null,
      "title": "Atque asperiores exercitationem hic deserunt quibusdam fugiat libero.",
      "description": "Facilis architecto similique odio sunt voluptate omnis qui sint enim. At unde vel numquam nostrum voluptatibus tempore cum.",
      "id": "bf09f588-7c8d-4ba0-bb7c-9967d6e04b4d",
      "created_at": "2023-10-04T21:53:08.937Z",
      "updated_at": "2023-10-05T18:17:47.872Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": "active",
      "read_bloom": [],
      "read": false,
      "publish_at": null,
      "expire_at": "2022-12-09T06:35:32.215Z",
      "read_count": 1903304,
      "title": "Non reprehenderit eaque quis porro quam ea nobis iure doloribus.",
      "description": "Quisquam illo eum sapiente dolores cupiditate corrupti. Soluta animi quo beatae voluptate porro libero tempora dolorem vitae.",
      "link": {
        "url": "https://understated-offering.name/",
        "label": "cumque quaerat"
      },
      "id": "78e32123-92c7-45eb-9af8-6dadc0485ce1",
      "created_at": "2023-10-05T09:54:54.313Z",
      "updated_at": "2023-10-05T07:32:13.887Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": "active",
      "read_bloom": [],
      "read": false,
      "publish_at": null,
      "expire_at": "2024-07-16T03:27:52.073Z",
      "read_count": 1693443,
      "title": "Aut deserunt voluptates.",
      "description": "Tempora excepturi deserunt nam voluptatum eos eius id necessitatibus. Molestiae quis dolorum consectetur vel ad eveniet.",
      "link": "https://decimal-version.net/",
      "id": "42a1bb38-b533-4afb-9b44-f016ac05b117",
      "created_at": "2023-10-05T15:35:00.158Z",
      "updated_at": "2023-10-05T04:27:14.962Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": ".joins(:leaderships).where(leaderships: {status: 'active', org_unit_id: 'XXXXXXX'})",
      "read_bloom": [],
      "read": false,
      "publish_at": null,
      "expire_at": "2023-09-14T07:31:41.087Z",
      "read_count": 119156,
      "title": "Tenetur ex aperiam illum voluptatibus omnis quaerat.",
      "description": "Rem sapiente voluptate placeat ipsum ea nesciunt distinctio officiis. Maxime dicta natus nesciunt quaerat et adipisci voluptates ullam.",
      "link": {
        "url": "https://neighboring-ruby.org/",
        "label": "officia ad"
      },
      "id": "23e20afc-c564-44f9-8143-d5f295f0ea91",
      "created_at": "2023-10-05T10:54:11.285Z",
      "updated_at": "2023-10-05T01:01:21.322Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": ".joins(:leaderships).where(leaderships: {status: 'active', org_unit_id: 'XXXXXXX'})",
      "read_bloom": [],
      "read": false,
      "publish_at": "2023-10-02T03:00:16.490Z",
      "expire_at": "2023-11-12T09:27:47.602Z",
      "read_count": 314109,
      "title": "Repellat aut cum consequatur quis sed porro voluptatum placeat.",
      "description": "Iste expedita necessitatibus. Magni itaque tempora necessitatibus pariatur.",
      "link": "https://rough-magic.net",
      "id": "adccdd88-4a36-422d-bc67-64ec06403824",
      "created_at": "2023-10-05T00:14:12.887Z",
      "updated_at": "2023-10-05T19:01:45.493Z"
    },
    {
      "type": "Simple",
      "to_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "to_type": "User",
      "read": false,
      "read_at": "2023-10-05T05:21:17.897Z",
      "title": "Placeat fugiat fugit dolorem sapiente magni.",
      "description": "Officia optio totam dignissimos molestias excepturi libero earum fugit. Soluta neque tempore aliquid libero officia fugit maiores cum.",
      "id": "5ddbbe2a-eac0-4efd-b38f-a71870610b86",
      "created_at": "2023-10-05T01:08:00.690Z",
      "updated_at": "2023-10-05T05:00:43.985Z"
    },
    {
      "type": "Task",
      "to_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "to_type": "User",
      "from_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "from_type": "User",
      "object_id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "object_type": "User",
      "title": "Eaque quasi ducimus velit autem a saepe assumenda.",
      "description": "Veritatis neque provident deserunt magni voluptate consectetur labore similique. Voluptatibus ipsa officiis eaque explicabo nisi numquam aperiam.",
      "actions": [
        {
          "label": "Accept",
          "response": "invite=accept"
        },
        {
          "label": "Decline",
          "response": "invite=decline"
        }
      ],
      "action_response": null,
      "read_at": null,
      "read": false,
      "id": "c9743dba-3f8c-4f2b-b4a3-e517e5302180",
      "created_at": "2023-10-05T02:34:04.823Z",
      "updated_at": "2023-10-05T07:58:40.594Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": ".joins(:leaderships).where(leaderships: {status: 'active', org_unit_id: OrgUnit.where(state: 'GA')})",
      "read_bloom": [],
      "read": false,
      "publish_at": "2024-04-24T10:03:51.072Z",
      "expire_at": "2025-02-06T00:10:16.788Z",
      "read_count": 1049822,
      "title": "Quod cumque error molestias natus.",
      "description": "Ducimus pariatur fugit quo corporis maxime. Tempore ipsam dolorem optio.",
      "link": null,
      "id": "88e39c23-4ef4-4151-911f-e0583aeb002d",
      "created_at": "2023-10-05T13:31:56.734Z",
      "updated_at": "2023-10-05T09:17:26.242Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": ".joins(:leaderships).where(leaderships: {status: 'active', org_unit_id: 'XXXXXXX'})",
      "read_bloom": [],
      "read": false,
      "publish_at": "2023-10-14T00:06:44.080Z",
      "expire_at": "2024-06-09T22:32:43.224Z",
      "read_count": 1687221,
      "title": "Reprehenderit aut fugit neque cum exercitationem doloremque ipsum ad.",
      "description": "Inventore magnam dolorem tenetur. Beatae perferendis ea dolore vel cupiditate.",
      "link": null,
      "id": "ef85b153-9899-4d07-9eee-b7fc53944a4b",
      "created_at": "2023-10-05T10:46:50.059Z",
      "updated_at": "2023-10-05T12:13:08.055Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": ".joins(:leaderships).where(leaderships: {status: 'active', org_unit_id: OrgUnit.where(state: 'GA')})",
      "read_bloom": [],
      "read": false,
      "publish_at": "2023-11-18T13:25:18.467Z",
      "expire_at": "2024-01-06T09:00:19.475Z",
      "read_count": 1121374,
      "title": "Voluptates neque temporibus odio eius nulla adipisci iure distinctio excepturi.",
      "description": "Vero aperiam ullam expedita repellendus ullam sequi quibusdam. Earum facere hic dignissimos eligendi facere dicta.",
      "link": "https://lone-belligerency.biz/",
      "id": "3e596bbb-25d4-4cf1-974d-bcdfb28a1c7e",
      "created_at": "2023-10-04T20:58:05.626Z",
      "updated_at": "2023-10-05T14:53:57.730Z"
    },
    {
      "type": "Task",
      "to_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "to_type": "User",
      "from_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "from_type": "User",
      "object_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "object_type": "User",
      "title": "Provident maiores praesentium.",
      "description": "Debitis provident eligendi dolores corporis. Veniam nihil ex commodi placeat adipisci maxime dicta excepturi.",
      "actions": [
        {
          "label": "Accept",
          "response": "invite=accept"
        },
        {
          "label": "Decline",
          "response": "invite=decline"
        }
      ],
      "action_response": null,
      "read_at": "2023-10-05T00:52:50.032Z",
      "read": false,
      "id": "7bbd91b3-0a75-4a7f-9825-c43edbae41db",
      "created_at": "2023-10-05T06:44:51.809Z",
      "updated_at": "2023-10-05T08:04:16.081Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": ".joins(:leaderships).where(leaderships: {status: 'active', org_unit_id: OrgUnit.where(state: 'GA')})",
      "read_bloom": [],
      "read": false,
      "publish_at": "2023-01-28T05:43:56.507Z",
      "expire_at": "2023-06-28T15:27:27.628Z",
      "read_count": 1352084,
      "title": "At sequi assumenda reiciendis nihil quia quam dignissimos recusandae.",
      "description": "Quod rem deserunt corrupti alias laudantium dicta. Mollitia adipisci possimus at molestiae repellendus officiis temporibus.",
      "link": "https://quizzical-buck.biz/",
      "id": "be4145b1-d3f9-4f5c-8b0c-db7148915f19",
      "created_at": "2023-10-05T01:36:24.476Z",
      "updated_at": "2023-10-05T15:53:36.683Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": "active",
      "read_bloom": [],
      "read": false,
      "publish_at": "2023-11-02T20:33:36.362Z",
      "expire_at": "2024-04-12T19:20:18.928Z",
      "read_count": 658214,
      "title": "Dolores nostrum voluptatem mollitia cum.",
      "description": "Cumque nulla labore perferendis nam doloribus hic. Dolor earum aliquam nihil dolore voluptas optio voluptate numquam ad.",
      "link": null,
      "id": "a85f0db1-e078-4ac7-990f-5911e908c400",
      "created_at": "2023-10-05T09:03:25.681Z",
      "updated_at": "2023-10-05T17:31:54.932Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": ".joins(:leaderships).where(leaderships: {status: 'active', org_unit_id: 'XXXXXXX'})",
      "read_bloom": [],
      "read": false,
      "publish_at": "2022-11-05T23:51:58.887Z",
      "expire_at": "2023-06-08T19:04:10.157Z",
      "read_count": 1626457,
      "title": "Laudantium cumque molestiae voluptatem voluptate.",
      "description": "Error ea occaecati magni suscipit hic repellat esse ea. Sapiente minima dignissimos rem modi.",
      "link": {
        "url": "https://masculine-stylus.org",
        "label": "ducimus provident"
      },
      "id": "cc808902-7702-43f0-884b-0c278abf00e5",
      "created_at": "2023-10-04T21:33:06.901Z",
      "updated_at": "2023-10-05T03:56:03.980Z"
    },
    {
      "type": "Task",
      "to_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "to_type": "User",
      "from_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "from_type": "User",
      "object_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "object_type": "User",
      "title": "Ad adipisci minima sequi nam magni temporibus sunt odit quidem.",
      "description": "Commodi fuga est molestias totam eos placeat. Error id tenetur officiis quas.",
      "actions": [
        {
          "label": "Accept",
          "response": "invite=accept"
        },
        {
          "label": "Decline",
          "response": "invite=decline"
        }
      ],
      "action_response": null,
      "read_at": "2023-10-04T21:37:32.817Z",
      "read": false,
      "id": "2f937352-42c1-47d0-9516-cf5aa8214a13",
      "created_at": "2023-10-05T15:35:50.473Z",
      "updated_at": "2023-10-05T06:24:30.046Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": "active",
      "read_bloom": [],
      "read": false,
      "publish_at": "2023-06-26T20:54:58.163Z",
      "expire_at": "2023-09-20T18:38:52.839Z",
      "read_count": 1784500,
      "title": "Est ab excepturi.",
      "description": "Sint ab minus modi delectus modi facilis nihil cumque. Culpa voluptas ipsam.",
      "link": "https://actual-ironclad.org",
      "id": "04d6e2c8-b415-4f34-b938-552906be3d6a",
      "created_at": "2023-10-05T11:11:50.349Z",
      "updated_at": "2023-10-05T19:29:06.667Z"
    },
    {
      "type": "Simple",
      "to_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "to_type": "User",
      "read": false,
      "read_at": "2023-10-05T17:57:05.072Z",
      "title": "Debitis eius nulla.",
      "description": "Voluptas occaecati consequatur ipsa itaque vel sit in. Cumque repudiandae dolores provident consequuntur.",
      "id": "3aeb76b8-47b7-4813-8fc2-1f2b243dc031",
      "created_at": "2023-10-04T20:58:27.189Z",
      "updated_at": "2023-10-05T20:15:11.302Z"
    },
    {
      "type": "Simple",
      "to_id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "to_type": "User",
      "read": false,
      "read_at": null,
      "title": "Ut explicabo optio quam tempore ipsum laudantium.",
      "description": "Perferendis adipisci quod reprehenderit laudantium unde. Nulla voluptatem modi eius molestiae nesciunt.",
      "id": "fc590126-17bf-4c44-9e84-c54404ea25c5",
      "created_at": "2023-10-05T15:39:04.611Z",
      "updated_at": "2023-10-05T01:16:08.668Z"
    },
    {
      "type": "Task",
      "to_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "to_type": "User",
      "from_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "from_type": "User",
      "object_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "object_type": "User",
      "title": "Eaque perspiciatis dolores quis aspernatur atque deserunt error veniam error.",
      "description": "Pariatur architecto optio corporis sint. Minima eos eos.",
      "actions": [
        {
          "label": "Accept",
          "response": "invite=accept"
        },
        {
          "label": "Decline",
          "response": "invite=decline"
        }
      ],
      "action_response": null,
      "read_at": "2023-10-05T18:17:19.493Z",
      "read": false,
      "id": "f7d03eef-6bcf-45fa-a361-b0fb964410ff",
      "created_at": "2023-10-05T00:38:49.636Z",
      "updated_at": "2023-10-05T14:44:58.466Z"
    },
    {
      "type": "Simple",
      "to_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "to_type": "User",
      "read": false,
      "read_at": null,
      "title": "Omnis occaecati fugiat incidunt placeat sint aspernatur tenetur provident.",
      "description": "In aspernatur porro odit illum praesentium laboriosam quidem perspiciatis amet. Perferendis minus illum ad officia perferendis molestias.",
      "id": "7f129882-fa1d-4ea9-a713-33af86eea305",
      "created_at": "2023-10-05T04:24:54.039Z",
      "updated_at": "2023-10-05T02:28:21.184Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": null,
      "read_bloom": [],
      "read": false,
      "publish_at": "2024-03-17T08:36:51.507Z",
      "expire_at": "2024-06-23T23:27:18.751Z",
      "read_count": 1189560,
      "title": "Libero commodi repellendus distinctio atque a enim voluptate commodi alias.",
      "description": "Totam ut voluptates nesciunt. Laudantium temporibus commodi temporibus iusto similique rem.",
      "link": null,
      "id": "156afbc2-815b-40ec-bee1-e24de92cebba",
      "created_at": "2023-10-05T08:55:08.664Z",
      "updated_at": "2023-10-05T05:33:46.869Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": "active",
      "read_bloom": [],
      "read": false,
      "publish_at": "2024-04-05T01:05:01.193Z",
      "expire_at": "2024-04-21T00:08:38.292Z",
      "read_count": 385459,
      "title": "Corrupti laboriosam ipsam vel neque quam.",
      "description": "Minus ipsa explicabo exercitationem exercitationem sit. Enim at ab necessitatibus sit quam necessitatibus modi rerum.",
      "link": "https://dismal-jute.name/",
      "id": "bfd773b8-dee9-4c83-a1ff-14d3dffabfeb",
      "created_at": "2023-10-05T04:40:13.363Z",
      "updated_at": "2023-10-05T12:03:28.100Z"
    },
    {
      "type": "Task",
      "to_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "to_type": "User",
      "from_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "from_type": "User",
      "object_id": "d295a986-132e-4c9b-98e4-f749559543df",
      "object_type": "User",
      "title": "Iste asperiores quidem.",
      "description": "Distinctio animi sunt. Dolor distinctio eveniet a.",
      "actions": [
        {
          "label": "Accept",
          "response": "invite=accept"
        },
        {
          "label": "Decline",
          "response": "invite=decline"
        }
      ],
      "action_response": null,
      "read_at": "2023-10-05T07:50:49.088Z",
      "read": false,
      "id": "37242326-9169-4add-a740-0e3a748c0b44",
      "created_at": "2023-10-05T11:32:37.912Z",
      "updated_at": "2023-10-05T17:04:19.119Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": "active",
      "read_bloom": [],
      "read": false,
      "publish_at": "2023-07-21T21:38:37.586Z",
      "expire_at": "2023-12-03T17:33:08.672Z",
      "read_count": 334758,
      "title": "Quos magni inventore architecto.",
      "description": "Eveniet dicta illum suscipit sint minima reprehenderit tempore. Voluptate iusto tempora.",
      "link": null,
      "id": "8b97741a-f689-4b98-b227-f4cbb61d7e46",
      "created_at": "2023-10-05T10:46:16.913Z",
      "updated_at": "2023-10-04T20:57:11.195Z"
    },
    {
      "type": "Simple",
      "to_id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "to_type": "User",
      "read": false,
      "read_at": null,
      "title": "Accusantium odit odit maiores maxime perspiciatis laudantium.",
      "description": "Aspernatur consequatur reiciendis temporibus laborum consequatur earum perspiciatis soluta voluptas. Enim ab delectus pariatur.",
      "id": "0855d3fd-61f5-442d-82d1-60bea9097fd9",
      "created_at": "2023-10-05T05:09:04.869Z",
      "updated_at": "2023-10-05T12:54:22.629Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": ".joins(:leaderships).where(leaderships: {status: 'active', org_unit_id: 'XXXXXXX'})",
      "read_bloom": [],
      "read": false,
      "publish_at": "2023-12-19T21:58:10.111Z",
      "expire_at": "2024-10-30T21:21:37.428Z",
      "read_count": 908802,
      "title": "Quod odit perferendis.",
      "description": "Placeat sequi sunt similique. At qui velit commodi fuga porro labore quisquam quo libero.",
      "link": null,
      "id": "b3240f18-3255-41a4-9722-63e8f46bff1d",
      "created_at": "2023-10-04T20:46:45.727Z",
      "updated_at": "2023-10-04T23:37:33.200Z"
    },
    {
      "type": "Task",
      "to_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "to_type": "User",
      "from_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "from_type": "User",
      "object_id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "object_type": "User",
      "title": "Vel at praesentium saepe inventore alias maiores nihil officia accusamus.",
      "description": "Aliquid in est commodi quos animi perferendis explicabo ducimus voluptate. Placeat ipsa excepturi atque error impedit repellat.",
      "actions": [
        {
          "label": "Accept",
          "response": "invite=accept"
        },
        {
          "label": "Decline",
          "response": "invite=decline"
        }
      ],
      "action_response": null,
      "read_at": null,
      "read": false,
      "id": "f2de7382-837e-4d7a-8a3f-0eea10712f25",
      "created_at": "2023-10-05T16:26:12.442Z",
      "updated_at": "2023-10-05T04:06:34.894Z"
    },
    {
      "type": "Simple",
      "to_id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "to_type": "User",
      "read": false,
      "read_at": null,
      "title": "Debitis nam debitis ratione est nostrum nobis hic in eius.",
      "description": "Labore veniam quod adipisci nostrum. Accusantium dolores doloremque aperiam tempora ex nobis officia.",
      "id": "76a336ef-bfff-4c9c-9bb4-3a2bc15ceb0f",
      "created_at": "2023-10-05T11:29:37.306Z",
      "updated_at": "2023-10-05T13:43:03.587Z"
    },
    {
      "type": "Task",
      "to_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "to_type": "User",
      "from_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "from_type": "User",
      "object_id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "object_type": "User",
      "title": "Sint ab eum saepe saepe.",
      "description": "Consequatur voluptatem assumenda ipsum sequi perferendis repudiandae natus recusandae deserunt. Sapiente illo aperiam a ut placeat.",
      "actions": [
        {
          "label": "Accept",
          "response": "invite=accept"
        },
        {
          "label": "Decline",
          "response": "invite=decline"
        }
      ],
      "action_response": null,
      "read_at": null,
      "read": false,
      "id": "8c2a5434-76f1-4b61-8929-f0094c20ae0d",
      "created_at": "2023-10-05T00:15:23.003Z",
      "updated_at": "2023-10-05T16:55:09.632Z"
    },
    {
      "type": "Task",
      "to_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "to_type": "User",
      "from_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "from_type": "User",
      "object_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "object_type": "User",
      "title": "Assumenda quia cumque possimus ab necessitatibus suscipit hic.",
      "description": "Laborum accusantium praesentium quibusdam laboriosam id quibusdam cumque. Iure nisi debitis laudantium.",
      "actions": [
        {
          "label": "Accept",
          "response": "invite=accept"
        },
        {
          "label": "Decline",
          "response": "invite=decline"
        }
      ],
      "action_response": null,
      "read_at": "2023-10-05T06:29:35.257Z",
      "read": false,
      "id": "d2319a5b-1790-486f-96a6-104bdecd8e0e",
      "created_at": "2023-10-05T04:52:20.944Z",
      "updated_at": "2023-10-05T02:28:46.691Z"
    },
    {
      "type": "Simple",
      "to_id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "to_type": "User",
      "read": false,
      "read_at": "2023-10-05T10:04:51.341Z",
      "title": "Id commodi corporis quisquam.",
      "description": "Deserunt reprehenderit facere eveniet fuga vel quas eaque inventore explicabo. Error inventore aliquam eius deserunt vitae.",
      "id": "acd30a62-8ad0-4f81-91d3-15a492f440c9",
      "created_at": "2023-10-05T02:10:31.382Z",
      "updated_at": "2023-10-05T05:23:34.798Z"
    },
    {
      "type": "Global",
      "to_type": "User",
      "to_scope": null,
      "read_bloom": [],
      "read": false,
      "publish_at": null,
      "expire_at": "2023-08-30T12:17:50.925Z",
      "read_count": 1305043,
      "title": "Quaerat quasi nulla.",
      "description": "Incidunt pariatur porro. Quidem vitae vitae molestias facilis nisi voluptatem quidem ab mollitia.",
      "link": {
        "url": "https://official-mantle.name/",
        "label": "consectetur laudantium"
      },
      "id": "ac45254e-13a5-40b7-b5af-a9e77a7aaf1a",
      "created_at": "2023-10-05T05:41:39.278Z",
      "updated_at": "2023-10-05T14:24:13.330Z"
    }
  ],
  "Job": [
    {
      "id": "5ade6809-b018-4768-ad04-ca03275d0506",
      "created_at": "2023-10-04T21:43:17.500Z",
      "updated_at": "2023-10-05T08:08:26.672Z",
      "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
      "sub_class": "Payment:ProcessRefund",
      "run_at": "2023-11-22T15:29:08.479Z",
      "queue": "high",
      "status": "failed",
      "priority": 50,
      "expired_at": "2023-10-05T11:26:23.842Z",
      "error_count": 0,
      "last_error": {},
      "last_error_backtrace": "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      "last_error_message": "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      "finished_at": "2024-07-25T12:47:55.247Z",
      "actions": [
        "retry"
      ],
      "args": [
        {
          "job_id": "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ],
      "data": {}
    },
    {
      "id": "9f7b0f39-b135-47e0-a5a4-e3310e639973",
      "created_at": "2023-10-05T14:14:55.007Z",
      "updated_at": "2023-10-05T03:28:20.799Z",
      "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
      "sub_class": "Notify::Slack",
      "run_at": "2023-12-10T00:29:11.513Z",
      "queue": "long-running",
      "status": "errored",
      "priority": 50,
      "expired_at": "2023-10-05T09:07:28.125Z",
      "error_count": 3,
      "last_error": {},
      "last_error_backtrace": "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_idsapp/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      "last_error_message": "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      "finished_at": "2024-04-01T16:49:47.049Z",
      "actions": [],
      "args": [
        {
          "job_id": "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ],
      "data": {}
    },
    {
      "id": "79d7c57e-2d6b-4757-8dcd-40f27d81ad36",
      "created_at": "2023-10-05T18:31:27.238Z",
      "updated_at": "2023-10-05T05:32:45.310Z",
      "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
      "sub_class": "Notify::Slack",
      "run_at": "2024-08-31T13:56:34.877Z",
      "queue": "high",
      "status": "queued",
      "priority": 1,
      "expired_at": "2023-10-05T07:17:40.238Z",
      "error_count": 3,
      "last_error": {},
      "last_error_backtrace": "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      "last_error_message": "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      "finished_at": "2024-02-07T04:20:53.829Z",
      "actions": [
        "retry"
      ],
      "args": [
        {
          "job_id": "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ],
      "data": {}
    },
    {
      "id": "72153ddc-eeff-4478-ad2b-c2a6796a0d84",
      "created_at": "2023-10-05T15:04:18.167Z",
      "updated_at": "2023-10-05T14:51:27.429Z",
      "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
      "sub_class": "Payment:ProcessRefund",
      "run_at": "2024-06-28T11:52:22.771Z",
      "queue": "default",
      "status": "completed",
      "priority": 100,
      "expired_at": "2023-10-04T21:52:45.317Z",
      "error_count": 3,
      "last_error": {},
      "last_error_backtrace": "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      "last_error_message": "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      "finished_at": "2023-10-12T20:41:48.940Z",
      "actions": [
        "retry"
      ],
      "args": [
        {
          "job_id": "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ],
      "data": {}
    },
    {
      "id": "5c620975-76e0-43c5-82ae-4c7da0b22164",
      "created_at": "2023-10-05T06:54:13.064Z",
      "updated_at": "2023-10-05T05:20:54.697Z",
      "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
      "sub_class": "Mailer::Welcome",
      "run_at": "2024-09-04T17:32:07.795Z",
      "queue": "long-running",
      "status": "failed",
      "priority": 1,
      "expired_at": "2023-10-05T18:35:37.518Z",
      "error_count": 0,
      "last_error": {},
      "last_error_backtrace": "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      "last_error_message": "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      "finished_at": "2024-10-03T05:01:07.401Z",
      "actions": [
        "retry"
      ],
      "args": [
        {
          "job_id": "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ],
      "data": {}
    },
    {
      "id": "da166a23-8016-4bcf-9d58-dd568582e257",
      "created_at": "2023-10-05T02:13:46.603Z",
      "updated_at": "2023-10-05T07:15:10.636Z",
      "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
      "sub_class": "Reports::EndOfMonth",
      "run_at": "2024-08-02T05:53:54.203Z",
      "queue": "default",
      "status": "scheduled",
      "priority": 100,
      "expired_at": "2023-10-05T05:12:37.724Z",
      "error_count": 3,
      "last_error": {},
      "last_error_backtrace": "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      "last_error_message": "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      "finished_at": "2024-02-04T09:55:55.301Z",
      "actions": [],
      "args": [
        {
          "job_id": "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ],
      "data": {}
    },
    {
      "id": "26242081-17e0-451c-ab50-60c00eac4202",
      "created_at": "2023-10-05T12:29:19.381Z",
      "updated_at": "2023-10-05T02:46:29.561Z",
      "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
      "sub_class": "Reports::EndOfMonth",
      "run_at": "2024-04-01T19:47:45.763Z",
      "queue": "default",
      "status": "scheduled",
      "priority": 50,
      "expired_at": "2023-10-05T17:09:25.255Z",
      "error_count": 0,
      "last_error": {},
      "last_error_backtrace": "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      "last_error_message": "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      "finished_at": "2023-10-05T22:07:53.074Z",
      "actions": [],
      "args": [
        {
          "job_id": "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ],
      "data": {}
    },
    {
      "id": "77425a3b-e23a-48ad-ae70-e2ae5908edf1",
      "created_at": "2023-10-05T00:49:25.074Z",
      "updated_at": "2023-10-05T14:16:04.393Z",
      "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
      "sub_class": "Mailer::Welcome",
      "run_at": "2024-08-26T18:45:17.636Z",
      "queue": "default",
      "status": "failed",
      "priority": 50,
      "expired_at": "2023-10-05T04:27:57.031Z",
      "error_count": 0,
      "last_error": {},
      "last_error_backtrace": "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      "last_error_message": "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      "finished_at": "2024-01-19T02:48:01.586Z",
      "actions": [
        "retry"
      ],
      "args": [
        {
          "job_id": "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ],
      "data": {}
    },
    {
      "id": "692df61f-f33d-454c-b89d-d97cb0ad67b9",
      "created_at": "2023-10-05T05:30:14.480Z",
      "updated_at": "2023-10-05T12:55:18.022Z",
      "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
      "sub_class": "Mailer::Welcome",
      "run_at": "2024-06-17T02:36:28.427Z",
      "queue": "low",
      "status": "running",
      "priority": 50,
      "expired_at": "2023-10-05T19:27:31.278Z",
      "error_count": 3,
      "last_error": {},
      "last_error_backtrace": "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      "last_error_message": "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      "finished_at": "2023-10-18T03:06:49.861Z",
      "actions": [],
      "args": [
        {
          "job_id": "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ],
      "data": {}
    },
    {
      "id": "4bdd67a5-ea04-41e2-9f38-36c9341d6357",
      "created_at": "2023-10-05T19:36:00.728Z",
      "updated_at": "2023-10-05T18:55:56.346Z",
      "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
      "sub_class": "Notify::Slack",
      "run_at": "2024-05-04T22:09:29.527Z",
      "queue": "low",
      "status": "queued",
      "priority": 100,
      "expired_at": "2023-10-05T08:43:32.680Z",
      "error_count": 0,
      "last_error": {},
      "last_error_backtrace": "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      "last_error_message": "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      "finished_at": "2024-03-13T08:02:16.951Z",
      "actions": [],
      "args": [
        {
          "job_id": "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ],
      "data": {}
    },
    {
      "id": "7d2b963f-03e8-4ed4-bdc1-1618d74dac78",
      "created_at": "2023-10-05T05:14:08.818Z",
      "updated_at": "2023-10-05T02:10:37.536Z",
      "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
      "sub_class": "Payment:ProcessRefund",
      "run_at": "2024-06-30T13:33:37.245Z",
      "queue": "low",
      "status": "queued",
      "priority": 1,
      "expired_at": "2023-10-05T11:06:38.855Z",
      "error_count": 0,
      "last_error": {},
      "last_error_backtrace": "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      "last_error_message": "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      "finished_at": "2023-10-10T00:01:10.229Z",
      "actions": [],
      "args": [
        {
          "job_id": "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ],
      "data": {}
    },
    {
      "id": "8a933e55-db65-46bd-a5c2-3ccc31282258",
      "created_at": "2023-10-05T08:32:44.851Z",
      "updated_at": "2023-10-05T19:07:39.203Z",
      "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
      "sub_class": "Mailer::Welcome",
      "run_at": "2024-04-02T21:56:20.203Z",
      "queue": "low",
      "status": "scheduled",
      "priority": 100,
      "expired_at": "2023-10-05T09:41:09.216Z",
      "error_count": 0,
      "last_error": {},
      "last_error_backtrace": "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      "last_error_message": "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      "finished_at": "2023-12-13T22:52:18.777Z",
      "actions": [],
      "args": [
        {
          "job_id": "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ],
      "data": {}
    },
    {
      "id": "c324952b-1445-47c1-87a6-2fc5d3e9aaad",
      "created_at": "2023-10-05T04:01:22.742Z",
      "updated_at": "2023-10-05T17:36:40.309Z",
      "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
      "sub_class": "Mailer::Welcome",
      "run_at": "2024-03-09T12:12:17.783Z",
      "queue": "high",
      "status": "running",
      "priority": 50,
      "expired_at": "2023-10-05T17:27:31.443Z",
      "error_count": 3,
      "last_error": {},
      "last_error_backtrace": "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      "last_error_message": "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      "finished_at": "2024-05-06T07:45:24.947Z",
      "actions": [],
      "args": [
        {
          "job_id": "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ],
      "data": {}
    },
    {
      "id": "3a207b95-c580-4862-8409-f4131f4f3d0d",
      "created_at": "2023-10-05T12:36:07.062Z",
      "updated_at": "2023-10-05T18:14:42.822Z",
      "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
      "sub_class": "Mailer::Welcome",
      "run_at": "2024-10-02T17:41:20.082Z",
      "queue": "long-running",
      "status": "errored",
      "priority": 50,
      "expired_at": "2023-10-05T01:49:06.509Z",
      "error_count": 3,
      "last_error": {},
      "last_error_backtrace": "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      "last_error_message": "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      "finished_at": "2024-01-10T03:41:31.641Z",
      "actions": [],
      "args": [
        {
          "job_id": "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ],
      "data": {}
    },
    {
      "id": "19114787-e1d8-4385-a887-815a2c2f5ede",
      "created_at": "2023-10-05T06:48:19.072Z",
      "updated_at": "2023-10-05T08:51:23.429Z",
      "job_class": "ActiveJob::QueueAdapters::QueAdapter::JobWrapper",
      "sub_class": "Mailer::Welcome",
      "run_at": "2024-09-17T00:45:38.366Z",
      "queue": "high",
      "status": "queued",
      "priority": 50,
      "expired_at": "2023-10-05T03:36:16.737Z",
      "error_count": 0,
      "last_error": {},
      "last_error_backtrace": "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      "last_error_message": "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      "finished_at": "2024-01-19T21:48:59.426Z",
      "actions": [
        "retry"
      ],
      "args": [
        {
          "job_id": "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ],
      "data": {}
    }
  ],
  "JobLocker": [
    {
      "id": "7cfc2d00-0f35-4017-ae4b-6cab6d2f24fe",
      "host": "discrete_pollutant",
      "pid": 12535,
      "workers": 1
    },
    {
      "id": "85dc49a7-77ea-468d-aabb-c1b7f45093a3",
      "host": "irresponsible_nuke",
      "pid": 11811,
      "workers": 3
    },
    {
      "id": "7363a961-aabf-444d-b7ad-24c642518bd6",
      "host": "affectionate_tent",
      "pid": 14015,
      "workers": 2
    }
  ],
  "JobReport": [
    {
      "id": "jobs_by_period",
      "data": [
        {
          "period": "2023-10-05T19:31:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 1,
          "failed": 3,
          "completed": 14
        },
        {
          "period": "2023-10-05T19:32:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 4,
          "completed": 7
        },
        {
          "period": "2023-10-05T19:33:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 1,
          "failed": 4,
          "completed": 12
        },
        {
          "period": "2023-10-05T19:34:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 2,
          "completed": 20
        },
        {
          "period": "2023-10-05T19:35:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 5,
          "completed": 2
        },
        {
          "period": "2023-10-05T19:36:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 3,
          "failed": 5,
          "completed": 23
        },
        {
          "period": "2023-10-05T19:37:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 3,
          "failed": 5,
          "completed": 11
        },
        {
          "period": "2023-10-05T19:38:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 0,
          "completed": 6
        },
        {
          "period": "2023-10-05T19:39:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 3,
          "completed": 1
        },
        {
          "period": "2023-10-05T19:40:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 5,
          "completed": 9
        },
        {
          "period": "2023-10-05T19:41:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 0,
          "failed": 4,
          "completed": 3
        },
        {
          "period": "2023-10-05T19:42:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 0,
          "failed": 1,
          "completed": 7
        },
        {
          "period": "2023-10-05T19:43:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 3,
          "failed": 2,
          "completed": 22
        },
        {
          "period": "2023-10-05T19:44:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 0,
          "failed": 4,
          "completed": 13
        },
        {
          "period": "2023-10-05T19:45:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 2,
          "completed": 12
        },
        {
          "period": "2023-10-05T19:46:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 3,
          "failed": 0,
          "completed": 22
        },
        {
          "period": "2023-10-05T19:47:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 0,
          "failed": 4,
          "completed": 21
        },
        {
          "period": "2023-10-05T19:48:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 0,
          "completed": 8
        },
        {
          "period": "2023-10-05T19:49:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 0,
          "failed": 1,
          "completed": 2
        },
        {
          "period": "2023-10-05T19:50:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 0,
          "failed": 1,
          "completed": 4
        },
        {
          "period": "2023-10-05T19:51:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 3,
          "completed": 7
        },
        {
          "period": "2023-10-05T19:52:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 3,
          "failed": 2,
          "completed": 4
        },
        {
          "period": "2023-10-05T19:53:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 0,
          "failed": 0,
          "completed": 0
        },
        {
          "period": "2023-10-05T19:54:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 3,
          "failed": 2,
          "completed": 24
        },
        {
          "period": "2023-10-05T19:55:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 1,
          "failed": 5,
          "completed": 11
        },
        {
          "period": "2023-10-05T19:56:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 3,
          "failed": 5,
          "completed": 8
        },
        {
          "period": "2023-10-05T19:57:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 3,
          "failed": 3,
          "completed": 16
        },
        {
          "period": "2023-10-05T19:58:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 1,
          "failed": 5,
          "completed": 17
        },
        {
          "period": "2023-10-05T19:59:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 5,
          "completed": 11
        },
        {
          "period": "2023-10-05T20:00:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 1,
          "failed": 4,
          "completed": 3
        },
        {
          "period": "2023-10-05T20:01:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 1,
          "failed": 5,
          "completed": 3
        },
        {
          "period": "2023-10-05T20:02:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 4,
          "completed": 15
        },
        {
          "period": "2023-10-05T20:03:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 1,
          "failed": 2,
          "completed": 9
        },
        {
          "period": "2023-10-05T20:04:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 0,
          "failed": 2,
          "completed": 11
        },
        {
          "period": "2023-10-05T20:05:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 0,
          "completed": 24
        },
        {
          "period": "2023-10-05T20:06:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 3,
          "failed": 3,
          "completed": 2
        },
        {
          "period": "2023-10-05T20:07:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 3,
          "completed": 3
        },
        {
          "period": "2023-10-05T20:08:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 1,
          "failed": 1,
          "completed": 18
        },
        {
          "period": "2023-10-05T20:09:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 1,
          "failed": 4,
          "completed": 1
        },
        {
          "period": "2023-10-05T20:10:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 5,
          "completed": 7
        },
        {
          "period": "2023-10-05T20:11:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 3,
          "completed": 18
        },
        {
          "period": "2023-10-05T20:12:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 1,
          "failed": 5,
          "completed": 13
        },
        {
          "period": "2023-10-05T20:13:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 4,
          "completed": 7
        },
        {
          "period": "2023-10-05T20:14:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 1,
          "failed": 2,
          "completed": 19
        },
        {
          "period": "2023-10-05T20:15:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 3,
          "failed": 1,
          "completed": 6
        },
        {
          "period": "2023-10-05T20:16:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 3,
          "failed": 4,
          "completed": 13
        },
        {
          "period": "2023-10-05T20:17:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 0,
          "failed": 4,
          "completed": 20
        },
        {
          "period": "2023-10-05T20:18:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 3,
          "failed": 1,
          "completed": 5
        },
        {
          "period": "2023-10-05T20:19:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 3,
          "failed": 1,
          "completed": 9
        },
        {
          "period": "2023-10-05T20:20:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 1,
          "failed": 4,
          "completed": 14
        },
        {
          "period": "2023-10-05T20:21:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 0,
          "failed": 1,
          "completed": 20
        },
        {
          "period": "2023-10-05T20:22:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 2,
          "failed": 5,
          "completed": 11
        },
        {
          "period": "2023-10-05T20:23:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 3,
          "failed": 1,
          "completed": 17
        },
        {
          "period": "2023-10-05T20:24:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 1,
          "failed": 1,
          "completed": 24
        },
        {
          "period": "2023-10-05T20:25:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 1,
          "failed": 5,
          "completed": 6
        },
        {
          "period": "2023-10-05T20:26:00.000Z",
          "scheduled": 0,
          "queued": 0,
          "running": 0,
          "errored": 0,
          "failed": 2,
          "completed": 12
        },
        {
          "period": "2023-10-05T20:27:00.000Z",
          "scheduled": 0,
          "queued": 6,
          "running": 0,
          "errored": 2,
          "failed": 4,
          "completed": 15
        },
        {
          "period": "2023-10-05T20:28:00.000Z",
          "scheduled": 0,
          "queued": 12,
          "running": 0,
          "errored": 1,
          "failed": 5,
          "completed": 24
        },
        {
          "period": "2023-10-05T20:29:00.000Z",
          "scheduled": 0,
          "queued": 5,
          "running": 0,
          "errored": 0,
          "failed": 5,
          "completed": 0
        },
        {
          "period": "2023-10-05T20:30:00.000Z",
          "scheduled": 0,
          "queued": 18,
          "running": 0,
          "errored": 1,
          "failed": 3,
          "completed": 10
        },
        {
          "period": "2023-10-05T20:31:00.000Z",
          "scheduled": 0,
          "queued": 44,
          "running": 8,
          "errored": 0,
          "failed": 1,
          "completed": 1
        }
      ]
    },
    {
      "id": "jobs_by_type",
      "data": [
        {
          "id": "e7e3020e-98ab-46a4-af55-5b2c13583119",
          "job_class": "minima::nihil",
          "sub_class": "voluptates::pariatur",
          "scheduled": 47374,
          "queued": 16,
          "running": 8,
          "errored": 9,
          "failed": 1,
          "completed": 23
        },
        {
          "id": "4d056c49-fdf1-4bbf-b6e4-e927582cdd81",
          "job_class": "sequi::animi",
          "sub_class": "soluta::odit",
          "scheduled": 85099,
          "queued": 13,
          "running": 16,
          "errored": 2,
          "failed": 20,
          "completed": 12
        },
        {
          "id": "34285b1d-3e24-4302-af3f-6042ed023c9f",
          "job_class": "eum::autem",
          "sub_class": "vero::animi",
          "scheduled": 4924,
          "queued": 4,
          "running": 18,
          "errored": 3,
          "failed": 9,
          "completed": 18
        }
      ]
    },
    {
      "id": "jobs_kpis",
      "data": [
        {
          "scheduled": 76086,
          "queued": 0,
          "running": 1,
          "errored": 0,
          "failed": 0,
          "completed": 0,
          "workers": 1,
          "oldest_queued_at": "2023-10-05T13:42:06.181Z"
        }
      ]
    }
  ],
  "User": [
    {
      "name": "Rachael Harris",
      "type": "User",
      "id": "d295a986-132e-4c9b-98e4-f749559543df",
      "created_at": "2023-05-28T05:25:45.754Z",
      "updated_at": "2023-06-13T04:49:32.155Z"
    },
    {
      "name": "Ms. Gretchen Braun",
      "type": "User",
      "id": "146557a5-9078-4a72-96cd-ab11f5771481",
      "created_at": "2023-05-01T16:24:10.284Z",
      "updated_at": "2022-10-08T03:01:22.496Z"
    },
    {
      "name": "Shelley Borer",
      "type": "User",
      "id": "a010c8d6-d3f2-4d50-91f0-2e6434325742",
      "created_at": "2022-10-08T12:07:05.182Z",
      "updated_at": "2022-12-14T20:50:15.017Z"
    },
    {
      "name": "Lela Okuneva",
      "type": "User",
      "id": "12ac8db1-7e6a-4b32-adb9-3e988b281c6b",
      "created_at": "2023-09-07T03:46:07.840Z",
      "updated_at": "2023-01-05T08:38:50.190Z"
    },
    {
      "name": "Jacqueline Hayes",
      "type": "User",
      "id": "5f09faa6-b0a0-4865-96e8-b4eacb99735a",
      "created_at": "2022-12-17T08:44:50.953Z",
      "updated_at": "2023-04-13T01:51:19.157Z"
    },
    {
      "name": "Dawn Denesik",
      "type": "User",
      "id": "eb5cfc13-346d-46dc-8def-83caf86abc1b",
      "created_at": "2022-10-15T02:27:00.581Z",
      "updated_at": "2023-09-03T21:32:38.990Z"
    },
    {
      "name": "Dr. Ernestine Heidenreich",
      "type": "User",
      "id": "73f600bb-cd2d-4b4a-8bb7-f8eac2b31a3a",
      "created_at": "2023-04-26T11:13:06.229Z",
      "updated_at": "2023-06-30T08:02:05.322Z"
    },
    {
      "name": "Iris Pouros",
      "type": "User",
      "id": "570f3310-3c4d-4be7-9c4c-0ef4c7782f51",
      "created_at": "2022-11-26T08:49:21.983Z",
      "updated_at": "2022-12-13T17:25:18.572Z"
    },
    {
      "name": "Rodolfo Kris",
      "type": "User",
      "id": "d6a114bf-9403-4882-8c0f-b6bab341c5fc",
      "created_at": "2022-12-07T14:24:49.808Z",
      "updated_at": "2023-08-19T10:50:56.443Z"
    },
    {
      "name": "Miss Gina Collins IV",
      "type": "User",
      "id": "5a66c985-944d-4397-b1ab-c295adbcd6cf",
      "created_at": "2023-08-22T00:42:48.873Z",
      "updated_at": "2023-03-17T19:16:09.585Z"
    }
  ],
  "Company": [
    {
      "name": "Bahringer Inc",
      "address": "444 Windler Lakes",
      "status": "active",
      "status_events": [
        {
          "name": "Activate",
          "key": "activate",
          "enabled": false
        },
        {
          "name": "Deactivate",
          "key": "deactivate",
          "enabled": true
        }
      ],
      "share_price": "1.84",
      "market_cap": "317193.79",
      "type": "Company",
      "id": "9f26f514-8a9a-4a36-832b-465d172e5909",
      "created_at": "2022-11-20T06:46:06.962Z",
      "updated_at": "2022-10-24T22:52:58.118Z"
    },
    {
      "name": "Dickens Group",
      "address": "43163 Amari Ridges",
      "status": "inactive",
      "status_events": [
        {
          "name": "Activate",
          "key": "activate",
          "enabled": true
        },
        {
          "name": "Deactivate",
          "key": "deactivate",
          "enabled": false
        }
      ],
      "share_price": "12.79",
      "market_cap": "1976441.84",
      "type": "Company",
      "id": "ab385465-75e2-46ff-9882-f094c4115c66",
      "created_at": "2022-11-07T18:15:53.755Z",
      "updated_at": "2023-06-05T20:09:36.386Z"
    },
    {
      "name": "Kshlerin Group",
      "address": "777 Arianna Prairie",
      "status": "inactive",
      "status_events": [
        {
          "name": "Activate",
          "key": "activate",
          "enabled": true
        },
        {
          "name": "Deactivate",
          "key": "deactivate",
          "enabled": false
        }
      ],
      "share_price": "19.49",
      "market_cap": "748221.96",
      "type": "Company",
      "id": "29e042e3-fea6-4aa7-8f36-649c97154ddc",
      "created_at": "2023-03-16T22:15:52.271Z",
      "updated_at": "2023-06-07T19:40:06.560Z"
    },
    {
      "name": "Wiza and Sons",
      "address": "8163 Altenwerth Brook",
      "status": "onboarding",
      "status_events": [
        {
          "name": "Activate",
          "key": "activate",
          "enabled": true
        },
        {
          "name": "Deactivate",
          "key": "deactivate",
          "enabled": true
        }
      ],
      "share_price": "15.71",
      "market_cap": "1041549.81",
      "type": "Company",
      "id": "7e288004-f125-431c-9369-74649276c454",
      "created_at": "2023-09-05T21:04:03.324Z",
      "updated_at": "2023-02-28T16:20:01.723Z"
    },
    {
      "name": "Bernier - Cummings",
      "address": "679 Kerluke Lock",
      "status": "inactive",
      "status_events": [
        {
          "name": "Activate",
          "key": "activate",
          "enabled": true
        },
        {
          "name": "Deactivate",
          "key": "deactivate",
          "enabled": false
        }
      ],
      "share_price": "4.76",
      "market_cap": "1816131.05",
      "type": "Company",
      "id": "68507ed9-b3fb-4f45-b1e3-e5462f1025a3",
      "created_at": "2022-12-14T11:17:48.405Z",
      "updated_at": "2023-03-28T16:39:29.961Z"
    }
  ]
}
JSON

create_file "app/frontend/components/layout/CustomLayout.jsx", <<~RUBY
import React from 'react'
import { Layout } from 'react-admin'
import { CustomAppBar } from './CustomAppBar'

export const CustomLayout = (props) => (
  <Layout {...props} appBar={CustomAppBar} />
)
RUBY

create_file "app/frontend/components/layout/theme.js", <<~RUBY
// import { indigo, red } from '@mui/material/colors'
import { grey } from '@mui/material/colors'
import { defaultTheme } from 'react-admin'
// import { createTheme } from '@mui/material';

// const darkTheme = createTheme({
//   ...defaultTheme, palette: { mode: 'dark' },
// });

// https://www.color-hex.com/color-palette/44580
export const theme = {
  ...defaultTheme,
  components: {
    ...defaultTheme.components,

    // MuiTextField: {
    //   defaultProps: {
    //       variant: 'outlined',
    //   },
    // },
    // MuiFormControl: {
    //     defaultProps: {
    //         variant: 'outlined',
    //     },
    // },
    MuiToolbar: {
      styleOverrides: {
        root: { alignItems: 'center !important' },
      },
    },
    RaFilterForm: {
      styleOverrides: {
        root: { alignItems: 'center' },
      },
    },
    RaDatagrid: {
      styleOverrides: {
        root: {
          '& .RaDatagrid-headerCell': {
            lineHeight: '1.0em',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: grey[700],
          },
        },
      },
    },
    RaLayout: {
      styleOverrides: {
        root: {
          '& .RaLayout-content': {
            backgroundColor: 'white',
            padding: 20,
            // paddingLeft: 20,
            // paddingRight: 20
            // padding: 0
          },
          '& .RaLayout-appFrame': {
            // marginTop: '48px',
          },
        },
      },
    },
    RaShow: {
      styleOverrides: {
        root: {
          // backgroundColor: "white",
          '& .RaShow-card': { boxShadow: 'none' },
          '& .RaShow-main': { flexWrap: 'wrap' },
          // '& .MuiTabs-flexContainer': { flexWrap: 'wrap' }
        },
      },
    },
    RaEdit: {
      styleOverrides: {
        root: {
          // backgroundColor: "white",
          '& .RaEdit-card': {
            boxShadow: 'none',
          },
        },
      },
    },
    RaCreate: {
      styleOverrides: {
        root: {
          // backgroundColor: "white",
          '& .RaCreate-card': {
            boxShadow: 'none',
          },
        },
      },
    },
  },

  // ...darkTheme,
  // palette: {
  //   type: 'light',
  //   primary: {
  //     main: '#0a568f',
  //   },
  //   secondary: {
  //     main: '#d90522',
  //   },
  //   warning: {
  //     main: '#f7b20e',
  //   },
  //   info: {
  //     main: '#fb5105',
  //   },
  //   background: {
  //     default: '#e5e5ec',
  //   },
  // },
  typography: {
    h2: {
      fontWeight: 800,
    },
    body1: {
      fontWeight: 300,
    },
  },
}

export default theme

// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

// export const themeOptions: ThemeOptions = {
//   palette: {
//     type: 'light',
//     primary: {
//       main: '#0a568f',
//     },
//     secondary: {
//       main: '#d90522',
//     },
//     warning: {
//       main: '#f7b20e',
//     },
//     info: {
//       main: '#fb5105',
//     },
//     background: {
//       default: '#e5e5ec',
//     },
//   },
//   typography: {
//     h2: {
//       fontWeight: 800,
//     },
//     body1: {
//       fontWeight: 200,
//     },
//   },
// };

RUBY



create_file "app/frontend/entrypoints/groovestack-admin.js", <<~RUBY
import React from 'react'

import { AdminApp } from '~/components/AdminApp.jsx'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'))

root.render(React.createElement(AdminApp))
RUBY

create_file "app/frontend/components/AdminApp.jsx", <<~RUBY
import React from 'react'
import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'
import { Jobs } from '@moonlight-labs/core-jobs-fe'

import { mockAuthProvider, mockDataProvider } from '../data/mock-providers'
import { CustomLayout } from './layout/CustomLayout'
import theme from './layout/theme'
import { HomeView } from './pages/HomeView'

const authProvider = await mockAuthProvider()

export const AdminApp = () => {
  return (
    <Admin
    disableTelemetry
    dataProvider={mockDataProvider}
    authProvider={authProvider}
    // loginPage={LoginPage}
    theme={theme}
    dashboard={HomeView}
    layout={CustomLayout}
  >
      <Resource
        name="Job"
        icon={Jobs.Icon}
        edit={Jobs.Edit}
        list={Jobs.List}
        recordRepresentation={Jobs.resourceRepresentation}
      />
    </Admin>
  )
}

RUBY

# # Setup the DB
rails_command "db:create"
rails_command "db:migrate"


# # Configure Vite
# # https://vite-ruby.netlify.app/guide/
run "bundle exec vite install"

## Setup Frontend
# "@moonlight-labs/core-base-fe": "workspace:^",
# "@moonlight-labs/core-comments-fe": "workspace:^",
# "@moonlight-labs/core-jobs-fe": "workspace:^",
# "@moonlight-labs/core-notifications-fe": "workspace:^",
# "@moonlight-labs/core-versions-fe": "workspace:^",
# "@moonlight-labs/core-webhooks-fe": "workspace:^",
# "@mui/material": "^5.14.11",
# "ra-data-fakerest": "^4.12.1",
# "react": ">=18.0.0",
# "react-dom": ">=18.0.0"
run "npm add react react-dom react-admin ra-data-fakerest @mui/material @react-admin/ra-realtime ra-data-simple-rest @mui/material @moonlight-labs/core-jobs-fe"

# # generate(:scaffold, "person name:string")
# # route "root to: 'people#index'"
# # rails_command("db:migrate")

# # after_bundle do
# #   git :init
# #   git add: "."
# #   git commit: %Q{ -m 'Initial commit' }
# # end

after_bundle do
  inject_into_file "config/routes.rb", "  root to: 'application#index', as: :home\n", :before => /^end/

  puts "⚡️ Groovestack App Setup Complete"

  run "./bin/dev"
  # puts ARGV.inspect
end


# [--skip-namespace], [--no-skip-namespace]              # Skip namespace (affects only isolated engines)
# [--skip-collision-check], [--no-skip-collision-check]  # Skip collision check
# -r,          [--ruby=PATH]                                          # Path to the Ruby binary of your choice
#
# -m,          [--template=TEMPLATE]                                  # Path to some application template (can be a filesystem path or URL)
# -d,          [--database=DATABASE]                                  # Preconfigure for selected database (options: mysql/postgresql/sqlite3/oracle/sqlserver/jdbcmysql/jdbcsqlite3/jdbcpostgresql/jdbc)
#                                                        # Default: sqlite3
# [--skip-gemfile], [--no-skip-gemfile]                  # Don't create a Gemfile
# -G,          [--skip-git], [--no-skip-git]                          # Skip .gitignore file
# [--skip-keeps], [--no-skip-keeps]                      # Skip source control .keep files
# -M,          [--skip-action-mailer], [--no-skip-action-mailer]      # Skip Action Mailer files
# [--skip-action-mailbox], [--no-skip-action-mailbox]    # Skip Action Mailbox gem
# [--skip-action-text], [--no-skip-action-text]          # Skip Action Text gem
# -O,          [--skip-active-record], [--no-skip-active-record]      # Skip Active Record files
# [--skip-active-job], [--no-skip-active-job]            # Skip Active Job
# [--skip-active-storage], [--no-skip-active-storage]    # Skip Active Storage files
# -P,          [--skip-puma], [--no-skip-puma]                        # Skip Puma related files
# -C,          [--skip-action-cable], [--no-skip-action-cable]        # Skip Action Cable files
# -S,          [--skip-sprockets], [--no-skip-sprockets]              # Skip Sprockets files
# [--skip-spring], [--no-skip-spring]                    # Don't install Spring application preloader
# [--skip-listen], [--no-skip-listen]                    # Don't generate configuration that depends on the listen gem
# -J,          [--skip-javascript], [--no-skip-javascript]            # Skip JavaScript files
# [--skip-turbolinks], [--no-skip-turbolinks]            # Skip turbolinks gem
# [--skip-jbuilder], [--no-skip-jbuilder]                # Skip jbuilder gem
# -T,          [--skip-test], [--no-skip-test]                        # Skip test files
# [--skip-system-test], [--no-skip-system-test]          # Skip system test files
# [--skip-bootsnap], [--no-skip-bootsnap]                # Skip bootsnap gem
# [--dev], [--no-dev]                                    # Set up the application with Gemfile pointing to your Rails checkout
# [--edge], [--no-edge]                                  # Set up the application with Gemfile pointing to Rails repository
# [--master], [--no-master]                              # Set up the application with Gemfile pointing to Rails repository main branch
# [--rc=RC]                                              # Path to file containing extra configuration options for rails command
# [--no-rc], [--no-no-rc]                                # Skip loading of extra configuration options from .railsrc file
# [--api], [--no-api]                                    # Preconfigure smaller stack for API only apps
# [--minimal], [--no-minimal]                            # Preconfigure a minimal rails app
# -B,          [--skip-bundle], [--no-skip-bundle]                    # Don't run bundle install
# --webpacker, [--webpack=WEBPACK]                                    # Preconfigure Webpack with a particular framework (options: react, vue, angular, elm, stimulus)
# [--skip-webpack-install], [--no-skip-webpack-install]  # Don't run Webpack install
