$(window).load(function(){

    var persons = new Bloodhound({
    datumTokenizer: function (datum) {
        return Bloodhound.tokenizers.whitespace(datum.value);
    },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    limit: 10,

    source: function (query, process) {
            return $.get('/qs/n:' + query, function (data) {
                return process(data.search_results);
            });
        },

    remote: {
        url: '/qs/n:%QUERY',
        filter: function (persons) {
            // Map the remote source JSON array to a JavaScript array
            return $.map(persons.results, function (person) {
                return {
                    eesnimi: person.eesnimi,
                    perenimi: person.perenimi,
                    isikukood: person.isikukood
                };
            });
        }
    }
});

// Initialize the Bloodhound suggestion engine
persons.initialize();

// Instantiate the Typeahead UI
$('.typeahead').typeahead({
    hint: true,
    highlight: true
}, {
    displayKey: 'isikukood',
    source: persons.ttAdapter(),
    templates: {
        empty: [
            '<div class="empty-message">',
            'kedagi ei leitud',
            '</div>'
        ].join('\n'),
        suggestion: Handlebars.compile('<p><strong>{{eesnimi}}</strong> {{perenimi}}</p>')
    }

});
});
