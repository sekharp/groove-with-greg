10.times do |r|
  Record.create(
    artist: Faker::Hipster.word,
    title: Faker::Hipster.sentence.truncate(50),
    year: rand(1958..2018),
    condition: 1
  )
end