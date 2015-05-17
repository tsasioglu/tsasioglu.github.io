"use strict";

/**
 * @ngdoc function
 * @name blogFeedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the blogFeedApp
 */
angular.module("blogFeedApp")
  .controller("MainCtrl", ["$scope", "XmlService", function ($scope, XmlService) {
    
  	$scope.posts = [];
  	$scope.search = {full : true, mini : true, dev : true, finance : true};

  	var loadPosts = function(url, tags) {
  		XmlService.downloadXml(url).then(function(xml) {
     
	    var replaceAll = function(string, search, replacement) {
	    	return string.split(search).join(replacement);
	    }

	    var posts = xml.find('item');

	    _.each(posts, function(post) {
    		var element = $(post);
			var description = element.find("description").html();
			var start = 11;
			var postCutoff = description.indexOf("&#8230;");

			if(postCutoff != -1)
				var end = description.indexOf("&#8230;") - 1;
			else
				var end = description.indexOf("<img alt=\"\" border=\"0\" src=\"https://pixel.wp.com/b.gif?host=");
						
			var summary = $("<div/>").html(description.substring(start, end)).text();

			$scope.posts.push({
				title: element.find("title").text(),
				link: element.find("guid").text(), //why doesn't link work?
				summary : summary + "...",
				pubDate: new Date(element.find("pubDate").text()),
				tags: tags
			});
	      });

	    });	
  	}

  	var addManual = function(title, pubDate, link, tags, summary) {
		$scope.posts.push({
			title: title,
			link: link,
			summary : summary + "...",
			pubDate: new Date(pubDate),
			tags: tags
		});
  	}

    loadPosts("https://thingsishouldknowasadeveloper.wordpress.com/feed/#", ["dev", "mini"]);
    loadPosts("https://thingsishouldknowasafinanceworker.wordpress.com/feed/#", ["finance", "mini"]);  

    addManual("NLog (really) quick start", "23 Apr 2015", "http://sasioglu.co.uk/nunit.html", ["dev", "full"], "Why NLog? It’s powerful, actively developed, has decent documentation, a wide user base and supports Silverlight and Windows Phone. It might take an extra 5 minutes setting up the base config, but it’s worth it. 3 Step Setup 1. Install using NuGet 2. Add the following to your App.config inside the <configuration> element");
    
    $scope.searchFilter = function () {
	    return function (post) {
	      var show =  ($scope.search.dev && _.contains(post.tags, "dev")
	      	  || $scope.search.finance && _.contains(post.tags, "finance"))
	      	  &&
	      	  ($scope.search.full && _.contains(post.tags, "full")
	      	  || $scope.search.mini && _.contains(post.tags, "mini"));

	    	//console.log(post.title + " : " + show);

	      return show;
    	}
  	};

  	$scope.uniqueTags = function(posts) {
  		var tags = _.map(posts, function(post) { return post.tags });
		var flatTags = [].concat.apply([], tags);
		_.each(flatTags, function(tag) {
			$scope.search[tag] = true;
		});
  		return _.uniq(flatTags);
  	};
   
  }]);
