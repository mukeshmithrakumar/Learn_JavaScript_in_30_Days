function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    // Google street view Implementation
    // obviously, replace YOUR_API_KEY and YOUR_SIGNATURE
    var streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${address}&key=YOUR_API_KEY&signature=YOUR_SIGNATURE`;
    $body.append(`<img class="bgimg" src="${streetViewUrl}">`);

    // New York Times Implementation
    // obviously, replace all the "X"s with your own API key
    var nyTimesUrl = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q='${cityStr}&sort=newest&api-key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`;

    $.getJSON(nyTimesUrl, function(data){
        $nytHeaderElem.text(`New York Times articles about ${cityStr}`);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append(`<li class="article">
            <a href="${article.web_url}>${article.headline.main}</a>
            <p>${article.snippet}</p>
            </li>`);
        }

    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

    // Wikipedia Implementation
    var wikiUrl = `http://en.wikipedia.org/w/api.php?action=opensearch&search=${cityStr}&format=json&callback=wikiCallback`;

    var wikiRequestTimeout = setTimeout(() => {
        $wikiElem.text("Failed to get Wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            var articleList = response[1];
            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = `http://en.wikipedia.org/wiki/${articleStr}`;
                $wikiElem.append(`<li><a href="${url}">${articleStr}</a></li>`);
            }
            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
}

$('#form-container').submit(loadData);
