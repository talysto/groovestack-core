module Core
  module Base 
    module Listener
      extend ::ActiveSupport::Concern

      CORE_LISTENER = true

      module ClassMethods
        def init(throttle_seconds: 0)
          raise 'listener must define class method init'
        end

        def throttle(seconds)
          wait = false 

          return Proc.new do |&block|
            unless wait
              wait = true 
              
              Thread.new do 
                block.call
                
                sleep(seconds)

                wait = false
              end
            end
          end
        end
      end
    end
    
    module Listeners
      class InitAll 
        def self.run(throttle_seconds: 0)
          core_listeners = ObjectSpace.each_object(Class).select { |klass| klass.const_defined?(:CORE_LISTENER) && klass.const_get(:CORE_LISTENER) }
          core_listeners.map { |listener| listener.init(throttle_seconds: throttle_seconds) }.flatten
        end
      end

      class Database
        attr_accessor :db_channel, :connection, :connection_instance

        def initialize(db_channel)
          @db_channel = db_channel
          @connection = nil
          @connection_instance = nil
        end

        def listen
          Rails.logger.info "Listening to #{db_channel}"
          ::ActiveRecord::Base.connection_pool.with_connection do |connection|
            @connection = connection

            @connection_instance = connection.instance_variable_get(:@connection)
            
            begin
              connection_instance.async_exec "LISTEN #{db_channel}"

              loop do
                connection_instance.wait_for_notify do |channel, pid, payload|
                  yield payload if block_given?
                end
              end
            ensure
              unlisten
            end
          end
        end

        def unlisten
          connection_instance.async_exec "UNLISTEN #{db_channel}"
        end

        def disconnect 
          ::ActiveRecord::Base.connection_pool.checkin(connection)
        end
      end
    end
  end
end