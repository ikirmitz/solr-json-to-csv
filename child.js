/**
 * Created by Ioann on 20/7/2016.
 */

const     request = require('request'),
    jsonCsv = require('json-csv'),
    jsonStream = require('JSONStream');

var stream = jsonStream.parse('*.docs.*');

// stream.on('data', function(data) {
//     console.log('value:', data);
// });

var options = {
    fields: [
        {
            name: 'accession',
            label: 'Accession',
            quoted: false
        },
        {
            name: 'collection_date_range_ss',
            label: 'Collection date range',
            quoted: true,
            filter: function (dates) {
                var newDates = [];
                for (var i = 0, len = dates.length; i < len; i++) {
                    // console.dir(dates[i])
                    newDates.push(dates[i].replace(/[\[\]]/g, ''));
                }
                return newDates
            }
        },
        {
            name: 'phenotype_value_f',
            label: 'Phenotype_value',
            quoted: false
        },
        {
            name: 'label_s',
            label: 'Label',
            quoted: true

        }

    ]
};

// console.log(process.argv[2]);

request({url: process.argv[2]})
// request({url: 'http://localhost:7997/solr/vb_popbio/export?q=accession:*&fl=accession,collection_date_range_ss,phenotype_value_f,label_s&sort=accession+asc'})
    .pipe(stream)
    .pipe(jsonCsv.csv(options))
    .pipe(process.stdout);