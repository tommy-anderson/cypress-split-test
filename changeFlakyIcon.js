// find the html report and change the flaky icon color so it's more visible

const fs = require('fs');
const path = require('path');

const reportFolder = path.join(__dirname, 'cypress/reports');
// filename may change, so we need to find it, it should be a single .html file
const reportFiles = fs.readdirSync(reportFolder).filter((filename) => filename.endsWith('.html'));
if (reportFiles.length !== 1) {
  throw new Error(`Expected a single .html report file, but found ${reportFiles.length} files`);
}
const reportFile = path.join(reportFolder, reportFiles[0]);
console.log('reportFile:', reportFile);

// read the file and find the flaky icon by its class name which starts with `test--context-icon---`
const reportHtml = fs.readFileSync(reportFile, 'utf8');
// let's find the first "{" character after the class name, so we can replace the color
console.log('Searching for flaky icon style...');
const flakyIconIndex = reportHtml.indexOf('test--context-icon---');
if(!flakyIconIndex){
    console.warn('No flaky icon found');
    console.warn('Either no flaky tests were found or the class name changed')
    process.exit(0);
}
console.log('Flaky icon found');
const flakyIconStyleIndex = reportHtml.indexOf('{', flakyIconIndex);
const flakyIconStyleEndIndex = reportHtml.indexOf('}', flakyIconIndex);
const flakyIconStyle = reportHtml.substring(flakyIconStyleIndex + 1, flakyIconStyleEndIndex);
if(!flakyIconStyle){
    throw new Error('No style found for the flaky icon');
}
console.log('flakyIconStyle:', flakyIconStyle);

// for some reason there might be two colors in the style
const colorCount = flakyIconStyle.split('color').length - 1;
console.log(colorCount, 'colors found for the flaky icon');
// remove all color styles
const flakyIconStyleNoColor = flakyIconStyle.replace(/color:.*;/g, '');
console.log('flakyIconStyleNoColor:', flakyIconStyleNoColor);
// now we add the orange color
const flakyIconStyleNew = flakyIconStyleNoColor + ';color:orange;';
console.log('flakyIconStyleNew:', flakyIconStyleNew);
// replace the style in the html
console.log('Replacing flaky icon style...');
const reportHtmlNew = reportHtml.replace(flakyIconStyle, flakyIconStyleNew);
console.log('Flaky icon style replaced, writing the new html report...');
// write the new html
fs.writeFileSync(reportFile, reportHtmlNew);
console.log('New html report written');
