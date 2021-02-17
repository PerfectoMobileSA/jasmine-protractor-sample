
describe('Test apple caculator', ()=> {
    

    var singleRun = ()=>{
        let EC = protractor.ExpectedConditions;
        it(' 1 + 2 = 3', () => {
            
            browser.wait(EC.presenceOf(element(by.xpath('//*[@label="1"]|//*[@resource-id="com.sec.android.app.popupcalculator:id/bt_01"]'))),10000);

            element(by.xpath('//*[@label="1"]|//*[@resource-id="com.sec.android.app.popupcalculator:id/bt_01"]')).click();
            element(by.xpath('//*[@label="add"]|//*[@resource-id="com.sec.android.app.popupcalculator:id/bt_add"]')).click();
            element(by.xpath('//*[@label="2"]|//*[@resource-id="com.sec.android.app.popupcalculator:id/bt_02"]')).click();
            element(by.xpath('//*[@label="equals"]|//*[@resource-id="com.sec.android.app.popupcalculator:id/bt_equal"]')).click();
            expect(element(by.xpath('//*[@label="Result"]|//*[@resource-id="com.sec.android.app.popupcalculator:id/txtCalc"]')).getText()).toEqual("3");
           
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
