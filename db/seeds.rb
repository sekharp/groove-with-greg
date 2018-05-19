10.times do |r|
  Record.create(
    artist: Faker::Hipster.word,
    title: Faker::Hipster.sentence.truncate(30),
    year: rand(1958..2018),
    condition: 1
  )
end