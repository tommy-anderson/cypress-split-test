
const folderPath = process.argv[2];
if(!folderPath) {
    console.error("Usage: node reportFlakyTests.js <folderPath>")
    process.exit(1)
}

const fs = require('fs');
const path = require('path');

// we need to find all the xml files in the folder and its subfolders
const xmlFiles = (function findXmlFiles(folderPath) {
    const files = fs.readdirSync(folderPath);
  
    return files.reduce((xmlFiles, file) => {
      const filePath = path.join(folderPath, file);
      const stat = fs.statSync(filePath);
  
      if (stat.isDirectory()) {
        return xmlFiles.concat(findXmlFiles(filePath));
      } else if (stat.isFile() && file.endsWith(".xml")) {
        return xmlFiles.concat(filePath);
      } else {
        return xmlFiles;
      }
    }, []);
  })(folderPath);
console.log('Found XML files:', xmlFiles);
// we need to parse all the xml files and find the flaky tests
// to find flaky tests we need to read each xml file and look at the 
// testsuites.testsuite.testcase elements and find the ones that have a flakyRetries attribute

const flakyTests = []

xmlFiles.forEach(xmlFile => {
    const {parseString} = require('xml2js')
    const xml = fs.readFileSync(xmlFile, 'utf8')
    parseString(xml, (err, result) => {
        if(err) {
            console.error('Error parsing xml file:', xmlFile, err)
            return
        }
        const rootTestSuites = result.testsuites
        const testSuites = rootTestSuites.testsuite.filter((suite)=>suite.$.name!=='Root Suite')
        testSuites.forEach((testSuite) => {
            const suiteName = testSuite.$.name
            const fileName = testSuite.$.file
            const testCases = testSuite.testcase.map(testCase => testCase.$)
            const flakyTestCases = testCases
                .filter(testCase => testCase.flakyRetries)
                .map(testCase => (`${fileName} > ${suiteName} -> ${testCase.name} (flakyRetries: ${testCase.flakyRetries})`));

            flakyTests.push(...flakyTestCases)
        })
    })
})

console.log(flakyTests)