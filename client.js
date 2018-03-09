var RestClient = require('node-rest-client').Client;

var restClient = new RestClient();

var client = function () {
  var defaultBaseUrl = 'http://api-production.asyncvoter.agileventures.org'
  this.restClient = new RestClient();
  this.baseUrl = defaultBaseUrl;

  this.setBaseUrl= function(url) {
    this.baseUrl = url
  };

  this.resetBaseUrl = function(){
    this.baseUrl = defaultBaseUrl
  };

  this.getAllStories = function (callback) {
    var url = this.baseUrl + '/stories';
    var args = {};
    this.restClient.get(url, args, function (data, response) {
      if (response.statusCode == 200) {
        callback(null, data, response)
      } else {
        callback(new Error('There was and issue'));
      }
    });
  };

  this.getStory = function (storyId, callback) {
    var url = this.baseUrl + '/stories';
    var args = {};
    url = url + '/' + storyId;
    this.restClient.get(url, args, function (data, response) {
      if (response.statusCode == 200) {
        callback(null, data, response)
      } else {
        callback(new Error('There was and issue'));
      }
    });
  };

  this.createStory = function (story, callback) {
    var url = this.baseUrl + '/stories';
    var args = {
      data: story,
      headers: { "Content-Type": "application/json" }
    };
    this.restClient.post(url, args, function (data, response) {
      if (response.statusCode == 200) {
        callback(null, data, response)
      } else {
        callback(new Error('failed to create story on ' + this.baseUrl + ' - ' + JSON.stringify(response) ));
      }
    });
  };

  this.updateStory = function (storyId,fields, callback) {
    var url = this.baseUrl + '/stories';
    url = url + '/' + storyId;
    var args = {
      data: fields,
      headers: { "Content-Type": "application/json" }
    };
    this.restClient.put(url, args, function (data, response) {
      if (response.statusCode == 200) {
        callback(null, data, response)
      } else {
        callback(new Error('There was and issue'));
      }
    });
  };

  this.createVote = function (storyId, fields, callback) {
    var url = this.baseUrl + '/stories';
    url = url + '/' + storyId + '/votes';
    var args = {
      data: fields,
      headers: { "Content-Type": "application/json" }
    };
    this.restClient.post(url, args, function (data, response) {
      if (response.statusCode == 200) {
        callback(null, data, response)
      } else {
        callback(new Error('There was and issue'));
      }
    });
  };

  this.getVotesForStory = function (storyId, callback) {
    var url = this.baseUrl + '/stories';
    var args = {};
    url = url + '/' + storyId + '/votes';
    this.restClient.get(url, args, function (data, response) {
      if (response.statusCode == 200) {
        callback(null, data, response)
      } else {
        callback(new Error('There was and issue'));
      }
    });
  };

};

module.exports = client;