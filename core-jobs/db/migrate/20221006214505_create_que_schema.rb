# frozen_string_literal: true

class CreateQueSchema < ActiveRecord::Migration[6.0]
  def up
    # Whenever you use Que in a migration, always specify the version you're
    # migrating to. If you're unsure what the current version is, check the
    # changelog.
    
    return if Que.db_version >= 8 # Que is already installed at the highest version

    if Que.db_version.zero? # Que is not installed here so install the highest version
      Que.migrate!(version: 8)
      return
    end

    (Que.db_version + 1..8).each { |v| Que.migrate!(version: v) } # catch que up to the highest version
  end

  def down
    # Migrate to version 0 to remove Que entirely.

    Que.migrate!(version: 0)
  end
end
