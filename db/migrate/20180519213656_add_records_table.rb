class AddRecordsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :records do |t|
      t.string :artist
      t.string :title
      t.integer :year
      t.integer :condition, default: 1

      t.timestamps
    end
  end
end
