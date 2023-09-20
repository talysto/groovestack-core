require 'fabrication'
require 'faker'

Fabricator(:notification, class_name: 'Core::Notifications::Notification') do
  type { ['Core::Notifications::Simple', 'Core::Notifications::Task', 'Core::Notifications::Global'].sample }
  title { Faker::Lorem.sentence }
  description { Faker::Lorem.paragraph }
  to_type { 'User' }
  created_at { Time.now }
  updated_at { Time.now }
end

Fabricator(:simple_notification, from: :notification, class_name: 'Core::Notifications::Simple') do
  type { 'Core::Notifications::Simple' }

  # to_id required
end

Fabricator(:task_notification, from: :notification, class_name: 'Core::Notifications::Task') do
  type { 'Core::Notifications::Task' }

  # to_id required
  # actions required
end

Fabricator(:global_notification, from: :notification, class_name: 'Core::Notifications::Global') do
  type { 'Core::Notifications::Global' }

  # to_scope required
end