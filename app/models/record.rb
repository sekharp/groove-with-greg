class Record < ApplicationRecord
	validates :artist, presence: true
	validates :title, presence: true
	validates :year, presence: true
	validates :status, presence: true
  enum status: [ :new, :mint, :good, :acceptable, :bad ]
end
