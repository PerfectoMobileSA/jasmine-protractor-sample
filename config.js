
let perfectoReporting = require('perfecto-reporting');

var perfectoReporter =
{
    jasmineStarted: function(suiteInfo) {
        // put insome info on jasmine started
      },
     
    suiteStarted: (result) => {
        // here you can add some custom code to execute when each suite is started
    },
    specStarted: (result) => {
        // each spec will be a test in Perfecto Reporting
        reportingClient.testStart(result.fullName);
    },
    specDone: (result) => {
        // ending the test
        // here we report about test end event

        if (result.status === 'failed') {
        // on a failure we report the failure message and stack trace

        console.log('Test status is: ' + result.status);
        const failure = result.failedExpectations[result.failedExpectations.length - 1];

        reportingClient.testStop({
            status: perfectoReporting.Constants.results.failed,
            message: `${failure.message} ${failure.stack}`
            });

        } else {
            // on success we report that the test has passed
            console.log('Test status is: ' + result.status);
            reportingClient.testStop({
            status: perfectoReporting.Constants.results.passed
            });
        }
    },
    suiteDone: (result) => {
        // when the suite is done we print in the console its description and status
        console.log('Suite done: ' + result.description + ' was ' + result.status);
    }

};


exports.config = {
    seleniumAddress: 'https://<your_cloud_name>.perfectomobile.com/nexperience/perfectomobile/wd/hub/fast',
    specs: ['spec/*.spec.js'],
    //Use multiCapabilities to achieve parallel execution
    multiCapabilities:  [
        {

        'platformName' : 'iOS',
        'deviceName' : '<device_id>',
        'bundleId' : 'com.apple.calculator',
        'browserName' : 'mobileOS',
        'securityToken' : '<your_security_token>'
        },
        {
        'platformName' : 'iOS',
        'deviceName' : '<device_id>',
        'bundleId' : 'com.apple.calculator',
        'browserName' : 'mobileOS',
         'securityToken' : '<your_security_token>'
        }
    ],
    //default page loading timeout in ms
    getPageTimeout: 10000,

    //set perfecto reporter
    onPrepare:  async () => {
        jasmine.getEnv().addReporter(perfectoReporter);
        browser.ignoreSynchronization=true;
        var perfectoExecutionContext =  await new perfectoReporting.Perfecto.PerfectoExecutionContext({
            webdriver: browser,
            job: {jobName: "JasmineProtractorPerfectoCI",buildNumber:3},
            tags: ['jasmine protractor tests']
          });
        reportingClient = await new perfectoReporting.Perfecto.PerfectoReportingClient(perfectoExecutionContext);

    },
    //set jasmine options
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 1000000,
      }
}
