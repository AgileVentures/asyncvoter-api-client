require('mocha')
var expect = require('chai').expect;
AsyncVoterApiClient = require('./client')

var client = new AsyncVoterApiClient();

describe('testing base URL functionality', function(){
  it('should return the default production api URL', function(){
    expect(client.baseUrl).to.equal('http://api-production.asyncvoter.agileventures.org');
  });

  it('should update base URL to be a different (test) api URL', function(){
    client.setBaseUrl('http://api-test.asyncvoter.agileventures.org');
    expect(client.baseUrl).to.equal('http://api-test.asyncvoter.agileventures.org');
  });

  it('should reset base URL to be the default production api URL', function(){
    client.resetBaseUrl();
    expect(client.baseUrl).to.equal('http://api-production.asyncvoter.agileventures.org');
  });
});
