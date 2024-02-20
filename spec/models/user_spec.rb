# spec/models/user_spec.rb

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:username) }
    it { should validate_presence_of(:password) }
    it { should validate_length_of(:password).is_at_least(8) }
  end

  describe 'associations' do
    it { should have_many(:consultations).dependent(:destroy) }
  end

  describe '.authenticate' do
    let!(:user) { create(:user, username: 'test_user', password: 'password123') }

    it 'returns the user if the username and password are correct' do
      authenticated_user = User.authenticate('test_user', 'password123')
      expect(authenticated_user).to eq(user)
    end

    it 'returns nil if the username or password is incorrect' do
      authenticated_user = User.authenticate('test_user', 'wrong_password')
      expect(authenticated_user).to be_nil
    end
  end
end
