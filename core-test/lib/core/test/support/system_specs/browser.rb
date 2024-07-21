module SystemSpecs
  module Browser
    def refresh_page
      page.driver.browser.navigate.refresh
    end

    # LOGGING
    def log_browser_logs
      browser_logs = page.driver.browser.logs.get(:browser)
      puts "Browser Logs:"
      browser_logs.each { |log| puts log.message }
    end

    def log_network_requests
      performance_logs = page.driver.browser.logs.get(:performance)
      network_requests = performance_logs.select { |entry| 
        JSON.parse(entry.message)['message']['method'].start_with?('Network.')
      }
      
      puts "\nNetwork Requests:"
      network_requests.each do |request|
        details = JSON.parse(request.message)['message']
        puts "URL: #{details['params']['request']['url']}" if details['params']['request']
      end
    end

    def log_gql_network_requests
      performance_logs = page.driver.browser.logs.get(:performance)
      network_requests = performance_logs.select { |entry| 
        JSON.parse(entry.message)['message']['method'].start_with?('Network.')
      }

      gql_requests = network_requests.select do |request|
        details = JSON.parse(request.message)['message']
        details['params']['request'] && details['params']['request']['url'].include?('/graphql')
      end
      
      puts "\nNetwork Requests:"
      gql_requests.each do |request|
        details = JSON.parse(request.message)['message']
        postData = JSON.parse(details['params']['request']['postData'])
        puts "#{details['params']['request']['url']}\n\toperationName: #{postData['operationName']}\n\tvariables: #{postData['variables']}"
      end
    end
  end
end