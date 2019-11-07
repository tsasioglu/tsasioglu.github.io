 angular.module("blogFeedApp")
    .factory("XmlService", ["$q", function($q) {
        
        var downloadXml = function(url) {
            var yql = "https://query.yahooapis.com/v1/public/yql?q=" + encodeURIComponent("select * from xml where url='" + url + "'") + "&format=xml&callback=?";
            var deferred = $q.defer();

            $.getJSON(yql, function (data)
            {
                var xml = $(data.results[0]);
                deferred.resolve(xml);                
            });

            return deferred.promise;
        };
        
        return {
            downloadXml : downloadXml
        };
        
    }]);