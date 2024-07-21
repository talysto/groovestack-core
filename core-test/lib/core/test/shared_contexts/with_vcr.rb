# frozen_string_literal: true

RSpec.shared_context 'with vcr', vcr: true do
  before do
    ENV['TEST_ONE_SIGNAL'] = 'true'
  end

  after do
    ENV['TEST_ONE_SIGNAL'] = nil
  end

  around do |example|
    VCR.use_cassette(cassette_name) do
      example.run
    end
  end
end

def cassette_name
  spec_meta = RSpec.current_example.metadata

  begin
    "#{spec_meta[:file_path].gsub('./spec/', '').gsub('_spec.rb',
                                                      '')}/#{vcr_cassette_name}"
  rescue StandardError
    "#{spec_meta[:file_path].gsub('./spec/', '')}:#{spec_meta[:line_number]}"
  end
end
