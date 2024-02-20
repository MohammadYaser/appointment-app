# app/models/user.rb

class User < ApplicationRecord
  # Validations
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 8 }

  # Relationships
  has_many :consultations, dependent: :destroy

  # Secure password
  has_secure_password

  # Custom method to authenticate user by username
  def self.authenticate(username, password)
    user = find_by(username: username)
    user if user && user.authenticate(password)
  end
end
