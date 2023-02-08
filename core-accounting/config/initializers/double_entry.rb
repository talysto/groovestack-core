require 'double_entry'

DoubleEntry.configure do |config|
  config.json_metadata = true
  config.scope_identifier_max_length = 1024
  config.account_identifier_max_length = 1024
end