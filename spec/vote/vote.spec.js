require('mocha')
var expect = require('chai').expect;
AsyncVoterApiClient = require('../../client')
var client = new AsyncVoterApiClient();
var storyId;

before(function(done) {
    this.timeout(2500);
    var newStory = {
        name: 'Story for testing votes',
        source: '#async_voter_test',
        userId: '@test_user',
        url: 'https://example.com/testing_votes'
    };
    client.setBaseUrl('http://api-test.asyncvoter.agileventures.org');
    client.createStory(newStory, function (err, data, response) {
        storyId = data._id;
        done();
    });
});

describe('testing creating a vote for a story', function () {
    var testResponse, testData, testErr;
    var newVote = {
        userId: '@test_user',
        size: '3'
    };

    before(function (done) {
        this.timeout(2500);
        client.setBaseUrl('http://api-test.asyncvoter.agileventures.org');
        client.createVote(storyId, newVote, function (err, data, response) {
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

    it('should return a vote with a valid story', function () {
        expect(testData.story).to.equal(storyId);
    });

    it('should return a vote with a valid userId', function () {
        expect(testData.userId).to.equal(newVote.userId);
    });

    it('should return a vote with a valid size', function () {
        expect(testData.size).to.equal(newVote.size);
    });

});

describe('testing getting all votes for a story', function () {
    var newVote = {
        userId: '@test_user1',
        size: '1'
    };
    var newVoteId;

    before(function (done) {
        this.timeout(2500);
        client.setBaseUrl('http://api-test.asyncvoter.agileventures.org');
        client.createVote(storyId, newVote, function (err, data, response) {
            newVoteId = data._id;
            done();
        });
    });

    it('should return a code 200', function (done) {
        client.getVotesForStory(storyId, function (err, data, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return a null error', function (done) {
        client.getVotesForStory(storyId, function (err, data, response) {
            expect(err).to.equal(null);
            done();
        });
    });

    it('should return an array', function (done) {
        client.getVotesForStory(storyId, function (err, data, response) {
            expect(data).to.be.an('array');
            done();
        });
    });

    it('should return at least one vote with a valid _id, story, userId and size', function (done) {
        client.getVotesForStory(storyId, function (err, data, response) {
            expect(data[data.length - 1]).to.deep.include({
                _id: newVoteId,
                story: storyId,
                userId: newVote.userId,
                size: newVote.size });
            done();
        });
    });
});