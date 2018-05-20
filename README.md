# Groove with Greg

This repo is a basic CRUD app for maintaining a record collection.

![A screenshot of the app in action](https://i.imgur.com/FDpAEtO.mp4)

Features include:

* Create, view, update and delete records
* Table view for all records in collection
* Search for records within collection
* Inline edit records through double-click table cells
* Change table page size
* Sort table columns for records by ID, title, artist, year and condition
* View records by number per year in horizontal bar chart

## Boilerplate Code

This repo was forked from the boilerplate repo "List of Ingredients" that has a simple Rails 5 API with a basic React frontend. You can find more information on that tutorial and code here: [A Rock Solid, Modern Web Stack—Rails 5 API + ActiveAdmin + Create React App on Heroku](https://blog.heroku.com/a-rock-solid-modern-web-stack).

## Getting Started

```shell
git clone https://github.com/heroku/groove-with-greg.git
cd groove-with-greg
bundle
yarn --cwd client install
bin/rake db:migrate db:seed start
```

Once you're ready to deploy to [Heroku](https://www.heroku.com), run:

```shell
heroku apps:create
heroku buildpacks:add heroku/nodejs --index 1
heroku buildpacks:add heroku/ruby --index 2
git push heroku master
heroku run rake db:seed
heroku open
```

Or you can click this button to deploy straight to Heroku from this repository:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Success!

## Questions, Suggestions, Comments?

Get in touch by adding an [issue](https://github.com/sekhar/groove-with-greg/issues).
