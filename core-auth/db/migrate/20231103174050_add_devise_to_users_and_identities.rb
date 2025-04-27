# frozen_string_literal: true

class AddDeviseToUsersAndIdentities < ActiveRecord::Migration[7.0]
  def change # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    # Add authentication columns to the existing users table
    change_column_default :users, :email, from: nil, to: ""
    change_column_null :users, :email, false

    change_table :users do |t|
      ## Database authenticatable
      t.string :encrypted_password, null: false, default: "" if Groovestack::Auth.devise_modules.include?(:database_authenticatable)

      ## Recoverable
      if Groovestack::Auth.devise_modules.include?(:recoverable)
        t.string   :reset_password_token
        t.datetime :reset_password_sent_at
      end

      ## Rememberable
      t.datetime :remember_created_at if Groovestack::Auth.devise_modules.include?(:rememberable)

      ## Trackable
      if Groovestack::Auth.devise_modules.include?(:trackable)
        t.integer  :sign_in_count, default: 0, null: false
        t.datetime :current_sign_in_at
        t.datetime :last_sign_in_at
        t.string   :current_sign_in_ip
        t.string   :last_sign_in_ip
      end

      ## Confirmable
      if Groovestack::Auth.devise_modules.include?(:confirmable)
        t.string   :confirmation_token
        t.datetime :confirmed_at
        t.datetime :confirmation_sent_at
        t.string   :unconfirmed_email # Only if using reconfirmable
      end

      ## Lockable
      if Groovestack::Auth.devise_modules.include?(:lockable)
        t.integer  :failed_attempts, default: 0, null: false # Only if lock strategy is :failed_attempts
        t.string   :unlock_token # Only if unlock strategy is :email or :both
        t.datetime :locked_at
      end
    end

    add_index :users, :reset_password_token, unique: true if Groovestack::Auth.devise_modules.include?(:recoverable)
    add_index :users, :confirmation_token, unique: true if Groovestack::Auth.devise_modules.include?(:confirmable)
    add_index :users, :unlock_token, unique: true if Groovestack::Auth.devise_modules.include?(:lockable)

    # Add Omniauth-related columns to the existing identities table
    change_table :identities do |t|
      t.jsonb :omniauth_data
    end
  end
end
