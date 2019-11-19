
describe('Test apple caculator', ()=> {
    

    var singleRun = ()=>{
        let EC = protractor.ExpectedConditions;
        it(' 1 + 2 = 3', () => {
            
            browser.wait(EC.presenceOf(element(by.xpath('//*[@label="1"]'))),10000);

            element(by.xpath('//*[@label="1"]')).click();
            element(by.xpath('//*[@label="add"]')).click();
            element(by.xpath('//*[@label="2"]')).click();
            element(by.xpath('//*[@label="equals"]')).click();
            expect(element(by.xpath('//*[@label="Result"]')).getText()).toEqual("3");
           
        });

        it(' 3 - 2 = 1', () => {
            
            browser.wait(EC.presenceOf(element(by.xpath('//*[@label="1"]'))),10000);

            element(by.xpath('//*[@label="3"]')).click();
            element(by.xpath('//*[@label="subtract"]')).click();
            element(by.xpath('//*[@label="2"]')).click();
            element(by.xpath('//*[@label="equals"]')).click();
            expect(element(by.xpath('//*[@label="Result"]')).getText()).toEqual("1");
           
        });
    }
    //repetitive executions
    for (let index = 0; index < 2; index++) {
        singleRun();
        
    }
    //teardown on finish all
    afterAll(()=>{
        browser.close();
    });
  });
