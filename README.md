# taste-of-home
## General Information
***
Taste of Home is an app that allows a user to locate hard-to-find regional and international food items, pin their locations on a map, and save and share their favorite food establishments. It was created in June 2016 as a final project by [Evan Druce](https://github.com/drucee/), [Saralis Rivera](https://github.com/sarariv/), [Megan Swanby](https://github.com/nycswan), and [Adam Zmudzinski](https://github.com/nova840/), all students in Phase 3 of [Dev Bootcamp](http://www.devbootcamp.com) in New York, NY.
Taste of Home was written in Ruby on Rails, and uses Foundation for styling and the [Yelp API](https://www.yelp.com/developers/documentation/v2/overview).
## Getting Started
***
If you are running the app locally, go through the standard `rake db:create rake db:migrate rake db:seed` procedure before starting your server with `rails s`. Once you are up and running, go to the signup link on the bottom-right corner of the index page to register for the site. After registration, you will be taken immediately to your user profile page. Click the Home button to return to the index page.
## Searching the Map
***
Searching for a food item (please use quotes around multi-word items for better search results) and location (search accepts US zip codes, as well as US and international place names) on the index page will drop up to five pins on the map. The corresponding businesses for each pin, along with a photo, Yelp star rating, and number of Yelp reviews, will appear on the right side of the page. Map pins are also clickable and will bring up an infowindow showing the business name and giving the option to add the business to the user's favorites.
## Business Information
***
Clicking on a business name will bring up the show page for that particular business. On the business show page, users can see detailed information about a particular business, including street address, phone number, and all tags previously associated with that business. Users will also be able to add comments to the business' page. If a user is logged in, they will be able to add new tags to the business, add that business to their favorites, or append the business to a previously created curated list.
## User Profiles, Curated Lists, and Favorites
Clicking on your username on the index page will bring up the user profile page. The user profile contains a link to a page showing all of the user's previously created curated lists. Clicking on a list will bring up the list's show page, which contains links to all places that have been added to that list. On the user profile page, there is also a blank form for creating a new, empty curated list with name and description. If the user has saved favorite places, links to those will show up at the bottom of the user profile page.
## License
***
This project is licensed under the terms of the MIT license.
