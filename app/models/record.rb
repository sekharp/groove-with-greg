class Record < ApplicationRecord
	validates :artist, presence: true
	validates :title, presence: true
	validates :year, presence: true
	validates :condition, presence: true
  enum condition: [ :mint, :good, :acceptable, :bad ]
end
