# asyncvoter-api-client

Node JS Client for the [Agile Ventures Async Voter API](https://github.com/AgileVentures/asyncvoter-api).

:warning: This module is still being developed and is not currently production ready.

## How to use

Having required the module you first need to create an instance of the Client.

```javascript
AsyncVoterApiClient = require('asyncvoter-api-client')

var client = new AsyncVoterApiClient();
```

## Update API base URL
By default the client will make requests to the production API endpoint, however the endpoint that
is used can be updated using the `setBaseUrl` option.

```javascript
client.setBaseUrl('https://new.api.endpoint.com');
```

## Reset API Base URL
The base URL can be reset back to the production API endpoint at any time by using the `resetBaseUrl` option.

```javascript
client.resetBaseUrl();
```

## Stories

**Listing all stories**

```javascript
client.getAllStories(function(err, data, response) {
  if (err) {
    console.log(err.message);
  } else {
    console.log(data);
    console.log(response.statusCode);
  }
});
```

Output:

```javascript
[ { _id: '5a1c09fb9904c700a3d3628a',
    updatedAt: '2017-11-27T16:23:00.657Z',
    createdAt: '2017-11-27T12:50:03.442Z',
    name: 'Create API Client',
    size: '3',
    url: 'https://waffle.io/AgileVentures/asyncvoter-slack-command/cards/59de3d6e8bf7c300a73014bc',
    source: '@async_voter',
    __v: 0 },
  { _id: '5a15aaa89904c700a3d36288',
    updatedAt: '2017-11-22T16:49:44.640Z',
    createdAt: '2017-11-22T16:49:44.640Z',
    name: 'document the API',
    size: '0',
    url: 'https://github.com/AgileVentures/AsyncVoter/issues/69',
    __v: 0 },
  { _id: '5a15ac639904c700a3d36289',
    updatedAt: '2017-11-22T16:57:07.373Z',
    createdAt: '2017-11-22T16:57:07.373Z',
    name: 'test test',
    size: '3',
    url: 'test_url',
    __v: 0 } ]
```
**Listing a specific story**

```javascript

var storyId = '5a1c09fb9904c700a3d3628a';
client.getStory(storyId, function(err, data, response) {
  if (err) {
    console.log(err.message);
  } else {
    console.log(data);
    console.log(response.statusCode);
  }
});
```

Output:

```javascript
{ _id: '5a1c09fb9904c700a3d3628a',
  updatedAt: '2017-11-27T16:23:00.657Z',
  createdAt: '2017-11-27T12:50:03.442Z',
  name: 'Create API Client',
  size: '3',
  url: 'https://waffle.io/AgileVentures/asyncvoter-slack-command/cards/59de3d6e8bf7c300a73014bc',
  source: '@async_voter',
  __v: 0 }
```

**Creating a new story**

```javascript
var story = {
    name: 'Create new API Client', 
    source: '#async_voter', 
    userId: '@slack_user',
    size: 2, 
    url: 'https://waffle.io/AgileVentures/asyncvoter-slack-command/cards/59de3d6e8bf7c300a73014bc' 
};

client.createStory(story, function(err, data, response) {
  if (err) {
    console.log(err.message);
  } else {
    console.log(data);
    console.log(response.statusCode);
  }
});
```

Output:

```javascript
{ __v: 0,
  updatedAt: '2017-11-27T18:11:56.189Z',
  createdAt: '2017-11-27T18:11:56.189Z',
  name: 'Create new API Client',
  size: '2',
  url: 'https://waffle.io/AgileVentures/asyncvoter-slack-command/cards/59de3d6e8bf7c300a73014bc',
  source: '#async_voter',
  _id: '5a1c556c9904c700a3d3628e' }
  ```

 **Updating a story**

 ```javascript
var storyId = '5a1c556c9904c700a3d3628e';

var story = {size: '3'};

client.updateStory(storyId, story, function(err, data, response) {
  if (err) {
    console.log(err.message);
  } else {
    console.log(data);
    console.log(response.statusCode);
  }
});

  ```

Output:

```javascript
{ _id: '5a1c556c9904c700a3d3628e',
  updatedAt: '2017-11-27T18:15:35.550Z',
  createdAt: '2017-11-27T18:11:56.189Z',
  name: 'Create new API Client',
  size: '3',
  url: 'https://waffle.io/AgileVentures/asyncvoter-slack-command/cards/59de3d6e8bf7c300a73014bc',
  source: '#async_voter',
  __v: 0 }
```

## Votes

**Creating a vote**

```javascript
var storyId = '5a1c556c9904c700a3d3628e';
var vote = {
  userId: '@testuser',
  size: '3'
};

client.createVote(storyId, vote, function(err, data, response) {
  if (err) {
    console.log(err.message);
  } else {
    console.log(data);
    console.log(response.statusCode);
  }
});
```

Output:

```javascript
{ __v: 0,
  story: '5a1c556c9904c700a3d3628e',
  size: '3',
  userId: '@testuser',
  _id: '5a1c579d9904c700a3d3628f' }
```

**List all votes for a story**

```javascript
var storyId = '5a1c556c9904c700a3d3628e';

client.getVotesForStory(storyId, function(err, data, response) {
  if (err) {
    console.log(err.message);
  } else {
    console.log(data);
    console.log(response.statusCode);
  }
});
```

Output:

```javascript
[ { _id: '5a1c579d9904c700a3d3628f',
    story: '5a1c556c9904c700a3d3628e',
    size: '3',
    userId: '@testuser',
    __v: 0 },
  { _id: '5a1c57f29904c700a3d36290',
    story: '5a1c556c9904c700a3d3628e',
    size: '2',
    userId: '@slac_user',
    __v: 0 },
  { _id: '5a1c58049904c700a3d36291',
    story: '5a1c556c9904c700a3d3628e',
    size: '3',
    userId: '@new_user',
    __v: 0 } ]
```