#Barteguiden Backend

This is the server backend for **Barteguiden**.

#Setup

You should only need to run
`npm install`

The server uses MongoDB, which it assumes runs on port __27018__ (note, not _27017_!).

#API

_**Warning**: this is not a complete spec of the API!_

## Get events

To get all events, or events with a specific Id, use

```
GET /api/events/[:event_id]
```

| Auth required? |
|----------------|
|  No            |


## Add/update events

To add a new event, you could either `POST`, without having to specify an Id,
or you could `PUT`, with an Id. When adding a new event, you most likely want
to use `POST`, and when updating an existing event, you want to use `PUT`.

```
POST /api/events/
```

```
GET /api/events/:event_id
```

### Parameters

| Name   | Type   |  Description           |
|--------|--------|------------------------|
| title  | String | The title of the event |
| description | String | Description of the event |
| shows | [{String, String}] | A list of string tuples, describing start- and end time of multiple shows |
| venue | {String, String, String, String} | Name, Address, latitude, and longitude of the event |
| ageLimit | Number | Age limit of the event |
| price | Number | Price of admision for the event |
| tags | [String] | All tags related to the event |
| imageUrl | String | An URL to an image for the event |
| eventUrl | String | An URL to the event website |


| Auth required? |
|----------------|
|  Yes           |

## Removing an event

```
DELETE /api/event/:event_id
```

| Auth required? |
|----------------|
|  Yes           |

## Get users

To get all users, or users with a specific Id, use

```
GET /api/users/[:user_id]
```

| Auth required? |
|----------------|
|  Yes           |


## Add/update users
 
As with Events, use `POST` when adding a new user, and `PUT` when updating an
existing user.

```
POST /api/users/
```

```
GET /api/users/:user_id
```

### Parameters

| Name   | Type   |  Description           |
|--------|--------|------------------------|
| username  | String | Username of the user |
| password | String | Password of the user |

| Auth required? |
|----------------|
|  Yes           |


## Removing  a user

```
DELETE /api/users/:user_id
```

| Auth required? |
|----------------|
|  Yes           |

