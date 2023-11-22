module ApplicationCable
  class Connection < ActionCable::Connection::Base
		include Core::Auth::ActionCable::Connection
  end
end
