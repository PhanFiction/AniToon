# README

# To run the project locally 
1. run bundle install
2. Follow instructions from https://github.com/ghoshRitesh12/aniwatch-api to create your own api
3. Go to config/application.rb and replace $anitoon_api = ENV['ANITOON_API'] with your api environment variable
4. Run rails db:create then rails db:migrate

## Feature

- Sign up and create a new account
- Sign in with Google
- Log in and log out securely
- Save anime
- Watch anime
- Search anime 

### Future plan

- [ ] Add feature to allow groups of people to stream anime together
- [ ] Add comment section for the anime
- [ ] Update homepage layout
- [ ] Add custom profile picture

## Technology Used

- Ruby on Rails
- PostgreSQL
- React.js
- TailwindCSS

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
