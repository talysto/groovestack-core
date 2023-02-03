require 'double_entry'

DoubleEntry::Line.class_eval do
  scope :by_scope_id, ->(id) { where(scope: id) }
  scope :by_partner_scope_id, ->(partner_id) { where(partner_scope: partner_id) }
  scope :by_detail_id, ->(id) { where(detail_id: id) }
end