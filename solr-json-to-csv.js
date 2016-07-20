// 'use strict';

const process = require('child_process'),
    fs = require('fs'),
    http = require('http');


var server = http.createServer(function (req, res) {
    res.writeHead(200, {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="export.csv";',
        }
    );

    var url = 'http://localhost:7997/solr/vb_popbio/export?q=accession:*&fl=accession,collection_date_range_ss,phenotype_value_f,label_s&sort=accession+asc';
    var childProcess = process.spawn('node', ['child.js', url]);
    // var childProcess = process.fork('child.js', [url]);
    childProcess.stdout.pipe(res);

    // process.stdout.pipe(res);

});
server.listen(8000);
