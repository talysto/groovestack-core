require 'double_entry'

DoubleEntry.configure do |config|
  config.json_metadata = true
  config.scope_identifier_max_length = 1024
  config.account_identifier_max_length = 1024
end

# DoubleEntry::Line.class_eval do
#   scope :by_scope_id, ->(id) { where(scope: id) }
#   scope :by_partner_scope_id, ->(partner_id) { where(partner_scope: partner_id) }
#   scope :by_detail_id, ->(id) { where(detail_id: id) }
# end