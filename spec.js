require('mocha')
var expect = require('chai').expect;
AsyncVoterApiClient = require('./client')
var client = new AsyncVoterApiClient();

describe('testing base URL functionality', function () {
    beforeEach(function () {
        client.resetBaseUrl();
    });

    it('should return the default production api URL', function () {
        expect(client.baseUrl).to.equal('http://api-production.asyncvoter.agileventures.org');
    });

    it('should update base URL to be a different (test) api URL', function () {
        client.setBaseUrl('http://api-test.asyncvoter.agileventures.org');
        expect(client.baseUrl).to.equal('http://api-test.asyncvoter.agileventures.org');
    });

    it('should reset base URL to be the default production api URL', function () {
        client.setBaseUrl('http://test.com');
        client.resetBaseUrl();
        expect(client.baseUrl).to.equal('http://api-production.asyncvoter.agileventures.org');
    });
});

describe('testing creating a new voter story', function () {
    var testResponse, testData, testErr;
    var newStory = {
        name: 'Create API Client',
        source: '#async_voter',
        userId: '@test_user',
        url: 'https://example.com/create_api_client'
    };

    before(function (done) {
        this.timeout(2500);
        client.setBaseUrl('http://api-test.asyncvoter.agileventures.org');
        client.createStory(newStory, function (err, data, response) {
            testResponse = response;
            testData = data;
            testErr = err;
            done();
        });
    });

    it('should return a code 200', function () {
        expect(testResponse.statusCode).to.equal(200);
    });

    it('should return a null error', function () {
        expect(testErr).to.equal(null);
    });

    it('should return a story with correct name', function () {
        expect(testData.name).to.equal(newStory.name);
    });

    it('should return a story with correct source', function () {
        expect(testData.source).to.equal(newStory.source);
    });

    it('should return a story with correct url', function () {
        expect(testData.url).to.equal(newStory.url);
    });

    it('should return a story with correct userId', function () {
        expect(testData.userId).to.equal(newStory.userId);
    });
});

describe('testing updating a voter story', function () {
   var storyId;
    var newStory = {
        name: 'Update API Client',
        source: '#async_voter_test',
        userId: '@test_user',
        url: 'https://example.com/update_api_client'
    };
   before(function (done) {
       this.timeout(2500);
       client.setBaseUrl('http://api-test.asyncvoter.agileventures.org');
       client.createStory(newStory, function (err, data, response) {
           storyId = data._id;
           done();
       });
   });

    it('should update story with a size and return a code 200', function (done) {
        var updates = {size: '1'};
        client.updateStory(storyId, updates, function(err, data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data.size).to.equal('1');
            done();
        });
    });

    it('should change the existing size of a story and return a code 200', function (done) {
        var updates = {size: '3'};
        client.updateStory(storyId, updates, function(err, data, response) {
            expect(response.statusCode).to.equal(200);
            expect(data.size).to.equal('3');
            done();
        });
    });

});