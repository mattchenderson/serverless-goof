const util = require('util');
const fs = require('fs');
const qs = require('qs');
const url = require('url');
const templateName = 'template';
const dust = require('dustjs-linkedin');
const readFileAsync = util.promisify(fs.readFile);
const renderAsync = util.promisify(dust.render);

module.exports = async function (context, req) {

    const template = await readFileAsync('./Todo/render.dust', 'utf8');

    let compiledTemplate = dust.compile(template, templateName);
    dust.loadSource(compiledTemplate);
    var candidate = url.parse(req.originalUrl).query;

    var params = qs.parse(candidate);

    const rendered = await renderAsync(templateName, {
        device: params.device
    });
    context.log(rendered);

    context.res = {
        status: 200,
        body: rendered,
        headers: {
            "Content-Type": "text/html"
        }
    };

};