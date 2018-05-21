# Groove with Greg

This repo contains a basic CRUD app for maintaining a record collection. You can find the app [deployed to production on Heroku](https://groove-with-greg.herokuapp.com).

Features include:

* Create, view, update and delete records
* Table view for all records in collection
* Search for records within collection
* Inline edit records through double-click table cells
* Change table page size
* Sort table columns for records by ID, title, artist, year and condition
* View records by number per year in horizontal bar chart

![A screenshot of the app in action](https://i.imgur.com/FDpAEtO.gif)

## Boilerplate Code

This repo was forked from the boilerplate repo "List of Ingredients" that has a simple Rails 5 API with a basic React frontend. You can find more information on that tutorial and code here: [A Rock Solid, Modern Web Stack—Rails 5 API + ActiveAdmin + Create React App on Heroku](https://blog.heroku.com/a-rock-solid-modern-web-stack).

## Getting Started

To run this app locally, run the following commands in your terminal:

```shell
git clone https://github.com/heroku/groove-with-greg.git
cd groove-with-greg
bundle
yarn --cwd client install
bin/rake db:migrate db:seed start
```

## Questions, Suggestions, Comments?

Get in touch by adding an [issue](https://github.com/sekharp/groove-with-greg/issues).
