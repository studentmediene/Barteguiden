Barteguiden
======================

A webapp and server that lets the event planners control which events that show up in Barteguiden.

##Setup

You'll need `Node`, `grunt`, `bower`, `mongodb`,`imagemagick` and `compass`.

Clone the repo with

    git clone git@github.com:Studentmediene/Barteguiden.git

`cd` into the directory and run

    npm install
    bower install
    grunt

This might take some time. Now, the site should be available at `http://localhost:9000/`

## Test user

To add a test user with the username and password `test`
Run `export NODE_ENV='development'` before  running `grunt`

## MongoDB startup

The server uses MongoDB, which it assumes runs on port __27018__ (note, not _27017_!)
You may use `sudo mongod --port=27018` to start it

## Loading events from database for testing
You may want to change the argument to `CronJob` in `server/import/import_scripts/jobs.js` to a pattern occuring more often (like `'00 * * * * 0-6'`) for debugging purposes.

## Build

    grunt build

The minified files are now in the dist folder.

##API

_**Warning**: this is not a complete spec of the API!_

### Get events

To get all events, or events with a specific Id, use

```
GET /api/events/[:event_id]
```

| Auth required? |
|----------------|
|  No            |


### Add/update events

To add a new event, you could either `POST`, without having to specify an Id,
or you could `PUT`, with an Id. When adding a new event, you most likely want
to use `POST`, and when updating an existing event, you want to use `PUT`.

```
POST /api/events/
```

```
PUT /api/events/:event_id
```

#### Parameters

| Name   | Type   |  Description           |
|--------|--------|------------------------|
| title  | String | The title of the event |
| description | String | Description of the event |
| startAt | Date | Start time of event |
| endAt | Date | End time of event (optional)
| venue | Object | Name, Address, latitude, and longitude of the event |
| ageLimit | Number | Age limit of the event |
| price | Number | Price of admision for the event |
| tags | [String] | All tags related to the event |
| isPromoted | Boolean | Featured event |
| isPublished | Boolean |
| imageUrl | String | An URL to an image for the event |
| eventUrl | String | An URL to the event website |


| Auth required? |
|----------------|
|  Yes           |


### Removing an event

```
DELETE /api/event/:event_id
```

| Auth required? |
|----------------|
|  Yes           |


### Get venues

To get all venues, or venues with a specific Id, use

```
GET /api/venues/[:venue_id]
```

| Auth required? |
|----------------|
|  No            |


### Add/update venues

To add a new venue, you could either `POST`, without having to specify an Id,
or you could `PUT`, with an Id. When adding a new venue, you most likely want
to use `POST`, and when updating an existing venue, you want to use `PUT`.

```
POST /api/venues/
```

```
PUT /api/venues/:venue_id
```


##### Parameters

| Name | Type | Description |
|------|------|-------------|
| name | String | Name of the location | 
| address | String | The locations address |
| latitude | Number | Latitude |
| longitude | Number | Longitude |


| Auth required? |
|----------------|
|  Yes           |


### Removing a venue

```
DELETE /api/venues/:venue_id
```

| Auth required? |
|----------------|
|  Yes           |


### Get users

To get all users, or users with a specific Id, use

```
GET /api/users/[:user_id]
```

| Auth required? |
|----------------|
|  Yes           |


### Add/update users
 
As with Events, use `POST` when adding a new user, and `PUT` when updating an
existing user.

```
POST /api/users/
```

```
PUT /api/users/:user_id
```

#### Parameters

| Name   | Type   |  Description           |
|--------|--------|------------------------|
| username  | String | Username of the user |
| password | String | Password of the user |

| Auth required? |
|----------------|
|  Yes           |


### Removing a user

```
DELETE /api/users/:user_id
```

| Auth required? |
|----------------|
|  Yes           |

