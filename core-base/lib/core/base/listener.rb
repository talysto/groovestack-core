module Core
  module Base 
    class Listener 
      def self.init_all
        # TODO clean this up
        core_listeners = Core.constants.select { |c| c != :Base }.map {|c| Core.const_get(c).constants.select {|c2| c2 == :Listener}.map {|c2| Core.const_get(c).const_get(c2)}}.flatten
        core_listeners.map(&:init_all).flatten
      end
    end
  end
end