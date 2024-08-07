require 'fabrication'
require 'faker'

Fabricator(:core_webhooks_event, class_name: 'Core::Webhooks::Event') do
  source { Faker::Lorem.word }
  status { Core::Webhooks::Event.aasm.states.map(&:name).sample }
  event { Faker::Lorem.word }
  headers { JSON.parse(Faker::Json.add_depth_to_json(json: Faker::Json.shallow_json(width: rand(1..10)), width: rand(1..4))) }
  data { JSON.parse(Faker::Json.add_depth_to_json(json: Faker::Json.shallow_json(width: rand(1..10)), width: rand(1..4))) }
end

Fabricator(:received_core_webhooks_event, from: :core_webhooks_event) do
  status { :received }
end

Fabricator(:processed_core_webhooks_event, from: :core_webhooks_event) do
  status { :processed }
end