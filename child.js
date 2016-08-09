/**
 * Created by Ioann on 20/7/2016.
 */

"use strict";

const request = require('request'),
    jsonCsv = require('json-csv'),
    jsonStream = require('JSONStream');

var stream = jsonStream.parse('*.docs.*');

// stream.on('data', function(data) {
//     console.log('value:', data);
// });

var options = {};
var path = process.argv[3];
// console.log(process.argv[3]);

if (/irExport$/.test(path)) {
    options = {
        fields: [
            {
                name: 'exp_accession_s',
                label: 'Accession',
                quoted: false
            },
            {
                name: 'exp_bundle_name_s',
                label: 'Record type',
                quoted: false
            },
            {
                name: 'exp_species_s',
                label: 'Species',
                quoted: false
            },
            {
                name: 'exp_sample_type_s',
                label: 'Sample type',
                quoted: false
            },
            {
                name: 'exp_sample_size_i',
                label: 'Sample size',
                quoted: false
            },
            {
                name: 'exp_label_s',
                label: 'Label',
                quoted: true
            },
            {
                name: 'exp_collection_date_range_ss',
                label: 'Collection date range',
                quoted: true,
                filter: function (dates) {
                    var newDates = [];
                    for (var i = 0, len = dates.length; i < len; i++) {
                        // console.dir(dates[i])
                        newDates.push(dates[i].replace(/[\[\]]/g, ''));
                    }
                    return newDates
                },
            },
            {
                name: 'exp_collection_protocols_ss',
                label: 'Collection protocols',
                quoted: true
            },
            {
                name: 'exp_projects_ss',
                label: 'Projects',
                quoted: true
            },
            {
                name: 'exp_geo_coords_s',
                label: 'Coordinates',
                quoted: true
            },
            {
                name: 'exp_geolocations_ss',
                label: 'Locations',
                quoted: true
            },
            {
                name: 'exp_phenotype_type_s',
                label: 'Phenotype type',
                quoted: false
            },
            {
                name: 'exp_insecticide_s',
                label: 'Insecticide',
                quoted: true

            },
            {
                name: 'exp_protocols_ss',
                label: 'Protocols',
                quoted: true
            },
            {
                name: 'exp_concentration_f',
                label: 'Concentration',
                quoted: false
            },
            {
                name: 'exp_concentration_unit_s',
                label: 'Concentration unit',
                quoted: false
            },
            {
                name: 'exp_duration_f',
                label: 'Duration',
                quoted: false
            },
            {
                name: 'exp_duration_unit_s',
                label: 'Duration unit',
                quoted: false
            },
            {
                name: 'exp_phenotype_value_f',
                label: 'Phenotype value',
                quoted: false
            },
            {
                name: 'exp_phenotype_value_unit_s',
                label: 'Phenotype value unit',
                quoted: false
            },
            {
                name: 'exp_phenotype_value_type_s',
                label: 'Phenotype value type',
                quoted: false
            }

        ]
    };
} else {
    options = {
        fields: [
            {
                name: 'exp_accession_s',
                label: 'Accession',
                quoted: false
            },
            {
                name: 'exp_bundle_name_s',
                label: 'Record type',
                quoted: false
            },
            {
                name: 'exp_species_s',
                label: 'Species',
                quoted: false
            },
            {
                name: 'exp_sample_type_s',
                label: 'Sample type',
                quoted: false
            },
            {
                name: 'exp_label_s',
                label: 'Label',
                quoted: true
            },
            {
                name: 'exp_collection_date_range_ss',
                label: 'Collection date range',
                quoted: true,
                filter: function (dates) {
                    var newDates = [];
                    for (var i = 0, len = dates.length; i < len; i++) {
                        // console.dir(dates[i])
                        newDates.push(dates[i].replace(/[\[\]]/g, ''));
                    }
                    return newDates
                },
            },
            {
                name: 'exp_collection_protocols_ss',
                label: 'Collection protocols',
                quoted: true
            },
            {
                name: 'exp_projects_ss',
                label: 'Projects',
                quoted: true
            },
            {
                name: 'exp_geo_coords_s',
                label: 'Coordinates',
                quoted: true
            },
            {
                name: 'exp_geolocations_ss',
                label: 'Locations',
                quoted: true
            }

        ]
    };
}




// console.log(process.argv[2]);
var url = process.argv[2];
request
    .get(url)
    .on('error', function (err) {
        process.send({type: 2, error: err})
    })
    .on('response', function (response) {
        // console.log(response.statusCode); // 200
        if (response.statusCode == 200) {
            process.send({type: 0, response: response})
        } else {
            process.send({type: 1, response: response})


        }
    })
    .pipe(stream)
    .pipe(jsonCsv.csv(options))
    .pipe(process.stdout);


stream.on('end', function () {
    // console.log('End of stream, exiting now');
    // process.exit(0);
    process.exitCode = 0;
});