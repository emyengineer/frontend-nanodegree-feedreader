/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This our second test - A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('Ensure URL is defined and not Empty', function() {
                allFeeds.forEach(function(feed){
                    expect(feed.url).toBeDefined();
                    expect(feed.url).not.toBe('');
                });
         });

        /* This is the 3rd test - that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('Ensure NAME is defined and not Empty', function() {
                allFeeds.forEach(function(feed){
                    expect(feed.name).toBeDefined();
                    expect(feed.name).not.toBe('');
                });
         });
    });


    /* Defining a new test suite named "The menu" */
    describe('The Menu', function(){
        var body, menuIcon;
        beforeEach(function() {
            body = $('#body');
            menuIcon = $('.menu-icon-link');
        });
        /* This is our 4th test - that ensures the menu element is
         * hidden by default.It is done by analyzing the HTML and
         * the CSS to determine how hiding/showing of the menu element
         * is performed.
         */
         it('Menu Element is hidden by default', function() {
            expect(body.hasClass('menu-hidden')).toBeTruthy();
         });
         /* This is our 5th test - that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * have two expectations: the first shows if the menu display when
          * clicked and does it hide when clicked again.
          */
          it('Ensure the menu changes visibility when the menu icon is clicked', function() {
                menuIcon.trigger('click');          
                expect(body.hasClass('menu-hidden')).not.toBeTruthy();
                menuIcon.trigger('click');
                expect(body.hasClass('menu-hidden')).toBeTruthy();
          });
    });      
    /* Defining a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This is our 6th test - that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        var feedsData ;
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedsData = $('.feed .entry');
                done();
            });           
        });

         it('Ensure when loadFead is called, there is at least .entry element in .feed container', function(done) {
            expect(feedsData.length >= 1 ).toBeTruthy();
            done();
         });
    });
    /* Defining a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* This is our 7th test -  that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * We are taking into consideration that loadFeed() is asynchronous.
         */
          var firstFeed,
              secondFeed; 

        //Handling jasmine.DEFAULT_TIMEOUT_INTERVAL Error 
        // By increasing its value to 10000 then resetting it back 
        // to the default value after the asynchronous call is used
          var originalTimeout;

        beforeEach(function(done) {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

                loadFeed(0, function() {
                    firstFeed = $('.feed').html();     
                    loadFeed(1, done);
                });           
        });

        it('Ensure when New Feed is Loaded the content changes', function(done){
           secondFeed = $('.feed').html();
            expect(firstFeed).not.toBe(secondFeed);
            setTimeout(function(){
                done();
                }, 9000);
        });

        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
}());
