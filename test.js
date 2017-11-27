AsyncVoterApiClient = require('./client')

var client = new AsyncVoterApiClient();

var story = {
  name: 'Create API Client', 
  source: '@async_voter', 
  size: 2, 
  url: 'https://waffle.io/AgileVentures/asyncvoter-slack-command/cards/59de3d6e8bf7c300a73014bc' 
}

// client.createStory(story, function(err, data, response){
//   console.log(data);
//   console.log('\n\nStatus: ' + response.statusCode);
// });

client.getAllStories(function(err, data, response){
  console.log(data);
  console.log('\n\nStatus: ' + response.statusCode);
});

var storyId = '5a1c09fb9904c700a3d3628a';

client.getStory(storyId, function(err, data, response){
  console.log(data);
  console.log('\n\nStatus: ' + response.statusCode);
});




