class Engineer < ApplicationRecord
  validates :name, presence: true
  validates :photo, presence: true
  validates :consultancy_fee, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :speciality, presence: true
  validates :about, presence: true
end
