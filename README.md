#Barteguiden Backend

This is the server backend for **Barteguiden**.


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
| Title  | String | The title of the event |


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






