var faker = require("faker");
// removed pdfkit
// var PDFDocument = require('pdfkit');

faker.seed(42);

var appRouter = function (app) {

  app.get("/", function (req, res) {
    res.status(200).send({ message: 'Welcome to our restful API' });
  });

/**
 * @api {get} /user/ Request A User [Random]
 * @apiVersion 1.0.1
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiSuccess {Number} ID ID of the User.
 * @apiSuccess {Number} userID ID of the User.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} username Username of the User.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {Number} addressID Address ID of the User.
 * @apiSuccess {Object[]} address  Address of the User.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get("/user", function (req, res) {
    var userID = faker.random.number();
    var addressID = faker.random.number();
    var data = ({
      ID: userID,
      userID: userID,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      addressID: addressID,
      address: address(addressID),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
    res.status(200).send(data);
  });

/**
 * @api {get} /user/:id Request Users Group
 * @apiVersion 1.0.1
 * @apiName GetUsersByID
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Number} ID ID of the User.
 * @apiSuccess {Number} userID ID of the User.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} username Username of the User.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {Number} addressID Address ID of the User.
 * @apiSuccess {Object[]} address  Address of the User.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
 app.get("/users/:num", function (req, res) {
   var users = [];
   var num = req.params.num;
   var addressID = faker.random.number();
   if (isFinite(num) && num  > 0 ) {
     for (i = 0; i <= num-1; i++) {
       var userID = faker.random.number();
       users.push({
           ID: userID,
           userID: userID,
           firstName: faker.name.firstName(),
           lastName: faker.name.lastName(),
           username: faker.internet.userName(),
           email: faker.internet.email(),
           addressID: addressID,
           address: address(addressID),
           createdAt: faker.date.past(),
           createdBy: faker.random.number(),
        });
     }

     res.status(200).send(users);
    
   } else {
     res.status(400).send({ message: 'invalid number supplied' });
   }

 });

/**
 * @api {get} /user/:id Request User by ID
 * @apiVersion 1.0.1
 * @apiName GetUserByID
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Number} ID ID of the User.
 * @apiSuccess {Number} userID ID of the User.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} username Username of the User.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {Number} addressID Address ID of the User.
 * @apiSuccess {Object[]} address  Address of the User.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
 app.get("/user/:num", function (req, res) {
   var users = [];
   var num = req.params.num;

   if (isFinite(num) && num  > 0 ) {
     faker.seed(parseInt(num));
     var addressID = faker.random.number();
     user = ({
         ID: num,
         prefix: faker.name.prefix(),      
         firstName: faker.name.firstName(),
         lastName: faker.name.lastName(),
         suffix: faker.name.suffix(),
         username: faker.internet.userName(),
         email: faker.internet.email(),
         password: faker.internet.password(),
         phoneNumber: faker.phone.phoneNumber(),
         altPhoneNumber: faker.phone.phoneNumber(),
         addressID: addressID,
         address: address(addressID),
         createdAt: faker.date.past(),
         createdBy: faker.random.number(),

      });
   
     res.status(200).send(user);
    
   } else {
     res.status(400).send({ message: 'invalid number supplied' });
   }

 });

/**
 * @api {get} /business/ Request Business [Random]
 * @apiVersion 1.0.1
 * @apiName GetBusiness
 * @apiGroup Businesses
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
  app.get("/business", function (req, res) {
    var businessID = faker.random.number();
    var addressID = faker.random.number();
    var data = ({
      ID: businessID,
      businessID: businessID,
      name: faker.company.companyName(),
      email: faker.internet.email(),
      addressID: addressID,
      address: address(addressID),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
    res.status(200).send(data);
  });

/**
 * @api {get} /business/:id Request Business
 * @apiVersion 1.0.1
 * @apiName GetBusinessByID
 * @apiGroup Businesses
 *
 * @apiParam {Number} id Business unique ID.
 *
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get("/business/:num", function (req, res) {
    var num = req.params.num;

    if (isFinite(num) && num  > 0 ) {
      faker.seed(parseInt(num));
      var addressID = faker.random.number();
     var data = ({
      ID: num,
      name: faker.company.companyName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.phoneNumber(),
      faxNumber: faker.phone.phoneNumber(),
      addressID: addressID,
      address: address(addressID),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
      
    });

     res.status(200).send(data);
    
   } else {
     res.status(400).send({ message: 'invalid ID supplied' });
   }
  });

/**
 * @api {get} /venue/:id Request Venue [Random]
 * @apiVersion 1.0.1
 * @apiName GetVenue
 * @apiGroup Venues
 *
 * @apiSuccess {Number} ID ID of the Venue.
 * @apiSuccess {Number} venueID ID of the Venue.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get("/venue", function (req, res) {
    var venueID = faker.random.number();
    var addressID = faker.random.number();
    var data = ({
      ID: venueID,
      venueID: venueID,
      name: faker.company.companyName(),
      email: faker.internet.email(),
      addressID: addressID,
      address: address(addressID),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
    res.status(200).send(data);
  });

/**
 * @api {get} /venue/:id Request Venue By ID
 * @apiVersion 1.0.1
 * @apiName GetVenueByID
 * @apiGroup Venues
 *
 * @apiParam {Number} id Venue unique ID.
 *
 * @apiSuccess {Number} ID ID of the Venue.
 * @apiSuccess {Number} venueID ID of the Venue. 
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get("/venue/:num", function (req, res) {
    var num = req.params.num;

    if (isFinite(num) && num  > 0 ) {
      faker.seed(parseInt(num));
      var addressID = faker.random.number();
      var data = ({
        ID: num,
        venueID: num,
        name: faker.company.companyName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
        faxNumber: faker.phone.phoneNumber(),
        addressID: addressID,
        address: address(addressID),
        createdAt: faker.date.past(),
        createdBy: faker.random.number(),      
      });
      res.status(200).send(data);
   } else {
     res.status(400).send({ message: 'invalid ID supplied' });
   }
  });

/**
 * @api {get} /address/ Request Address [Random]
 * @apiVersion 1.0.1
 * @apiName GetAddress
 * @apiGroup Addresses
 *
 * @apiSuccess {Number} ID ID of the Address.
 * @apiSuccess {Number} addressID ID of the Address. 
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get("/address", function (req, res) {
    var addressID = faker.random.number();
    var data = (address(addressID));
    res.status(200).send(data);
  });

/**
 * @api {get} /address/:id Request Address by ID
 * @apiVersion 1.0.1
 * @apiName GetAddressByID
 * @apiGroup Addresses
 *
 * @apiParam {Number} id Address unique ID.
 *
 * @apiSuccess {Number} ID ID of the Address.
 * @apiSuccess {Number} addressID ID of the Address. 
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get("/address/:num", function (req, res) {
    var num = req.params.num;
    if (isFinite(num) && num  > 0 ) {
       faker.seed(parseInt(num));
       var data = (address(num));
       res.status(200).send(data);
   } else {
     res.status(400).send({ message: 'invalid ID supplied' });
   }
  });


/**
 * @api {get} /owner/:id Request Business Owner
 * @apiVersion 1.0.1
 * @apiName GetOwner
 * @apiGroup Owners
 *
 * @apiParam {Number} id Business unique ID.
 *
 * @apiSuccess {Number} ID ID of the Business.
 * @apiSuccess {Number} businessID ID of the Business.
 * @apiSuccess {Number} userID ID of the User.
 * @apiSuccess {Object[]} user  User details.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */

  app.get("/owner/:num", function (req, res) {
    var num = req.params.num;
    if (isFinite(num) && num  > 0 ) {
      faker.seed(parseInt(num));
      var userID = faker.random.number();
      var data = ({
        ID: num,
        businessID: num,
        userID: userID,
        user: user(userID),
        createdAt: faker.date.past(),
        createdBy: faker.random.number(),
      });
     res.status(200).send(data);    
   } else {
     res.status(400).send({ message: 'invalid ID supplied' });
   }
  });


/**
 * @api {get} /owns/:id Request Users Business
 * @apiVersion 1.0.1
 * @apiName GetOwns
 * @apiGroup Owners
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
  app.get("/owns/:num", function (req, res) {
    var num = req.params.num;
    if (isFinite(num) && num  > 0 ) {
     faker.seed(parseInt(num));
     var data = ({
      ID: num,
      businessID: faker.random.number(),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
     res.status(200).send(data);
    
   } else {
     res.status(400).send({ message: 'invalid ID supplied' });
   }
  });

/**
 * @api {get} /manager/:id Request Owner
 * @apiVersion 1.0.1
 * @apiName GetManagers
 * @apiGroup Managers
 *
 * @apiParam {Number} id Venue unique ID.
 *
 * @apiSuccess {Number} ID ID of the Venue.
 * @apiSuccess {Number} venueID ID of the Venue.
 * @apiSuccess {Number} userID ID of the User.
 * @apiSuccess {Object[]} user  User details.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get("/manager/:num", function (req, res) {
    var num = req.params.num;
    if (isFinite(num) && num  > 0 ) {
     faker.seed(parseInt(num));
     var data = ({
      ID: num,
      userID: faker.random.number(),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
     res.status(200).send(data);
    
   } else {
     res.status(400).send({ message: 'invalid ID supplied' });
   }
  });

/**
 * @api {get} /manages/:id Request Manager Venue
 * @apiVersion 1.0.1
 * @apiName GetManagerVenue
 * @apiGroup Managers
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {Number} remaining Remaining capcity of venue.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 */
  app.get("/manages/:num", function (req, res) {
    var num = req.params.num;
    if (isFinite(num) && num  > 0 ) {
     faker.seed(parseInt(num));
     var venueID = faker.random.number();
     var data = ({
      ID: num,
      userID: num,
      venueID: venueID,
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
     res.status(200).send(data);
    
   } else {
     res.status(400).send({ message: 'invalid ID supplied' });
   }
  });

/**
 * @api {get} /employees/:id Request Venue Employees
 * @apiVersion 1.0.1
 * @apiName GetEmployees
 * @apiGroup Employees
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

  app.get("/employees/:num", function (req, res) {
    var num = req.params.num;
    if (isFinite(num) && num  > 0 ) {
     faker.seed(parseInt(num));
     var employeeCount = faker.random.number() % 10;
     var employees = [];
     for (i = 0; i <= employeeCount; i++) {
        var userID = faker.random.number();
        employees.push({
          ID: userID,
          userID: userID,
          user: user(userID),
          createdAt: faker.date.past(),
          createdBy: faker.random.number(),
        });
     }
     var data = ({
      ID: num,
      venueID: num,
      employees: employees,
      
    });
     res.status(200).send(data);
    
   } else {
     res.status(400).send({ message: 'invalid ID supplied' });
   }
  });


/**
 * @api {get} /employed/:id Request Employment Status
 * @apiVersion 1.0.1
 * @apiName GetEmployment
 * @apiGroup Employees
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

app.get("/employed/:num", function (req, res) {
    var num = req.params.num;
    if (isFinite(num) && num  > 0 ) {
     faker.seed(parseInt(num));
     var data = ({
      ID: num,
      userID: num,
      venueID: faker.random.number(),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
     res.status(200).send(data);
    
   } else {
     res.status(400).send({ message: 'invalid ID supplied' });
   }
});


/**
 * @api {get} /files/ Request File List [Random]
 * @apiVersion 1.1.1
 * @apiName GetFiles
 * @apiGroup Files
 *
 * @apiSuccess {String} createdAt Timestamp of List creation.
 * @apiSuccess {Object[]} files File Details.
 */

app.get("/files/", function (req, res) {
  var files = [];  
  var fileCount = faker.random.number() % 20;
  for (i = 0; i <= fileCount; i++) {
    fileID = faker.random.number();
    files.push(file(fileID));
  }
   var data = ({
      createdAt: faker.date.past(),
      files: files,      
    });
   res.status(200).send(data);
 });

/**
 * @api {get} /file/ Request File Details [Random]
 * @apiVersion 1.1.1
 * @apiName GetFile
 * @apiGroup Files
 *
 * @apiSuccess {Number} ID ID of the File.
 * @apiSuccess {Number} fileID ID of the File.
 * @apiSuccess {String} fileExtension Type of File.
 * @apiSuccess {String} fileType Extension of File.
 * @apiSuccess {String} createdAt Timestamp of File creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */

app.get("/file/", function (req, res) {
   var fileID = faker.random.number();
   var data = (file(fileID));
   res.status(200).send(data);  
});

/**
 * @api {get} /file/:id Request File Details By ID
 * @apiVersion 1.0.1
 * @apiName GetFileByID
 * @apiGroup Files
 *
 * @apiParam {Number} id File unique ID.
 *
 * @apiSuccess {Number} ID ID of the File.
 * @apiSuccess {Number} fileID ID of the File.
 * @apiSuccess {String} fileExtension Type of File.
 * @apiSuccess {String} fileType Extension of File.
 * @apiSuccess {String} createdAt Timestamp of File creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */

app.get("/file/:num", function (req, res) {
  var num = req.params.num;
  if (isFinite(num) && num  > 0 ) {
   faker.seed(parseInt(num));
   var data = (file(num));
   res.status(200).send(data);  
 } else {
   res.status(400).send({ message: 'invalid ID supplied' });
 }
});

/**
 * @api {get} /logs/ Request Recent Log Entries
 * @apiVersion 1.0.1
 * @apiName GetLogs
 * @apiGroup Logs
 *
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Object[]} logs Log Entry Details.
 */

  app.get("/logs/", function (req, res) {
    var logs = [];
    var num = req.params.num;
    var count = 20;
     for (i = 0; i <= count; i++) {
       logs.push({
        ID: num,
        logID: num,
        createdAt: faker.date.past(),
        createdBy: faker.random.number(),
        idAddress: faker.internet.ip(),
        referrer: faker.internet.url(),
        userAgent: faker.internet.userAgent(),
        action: faker.hacker.ingverb(),

      });
     }
     var data = ({
      createdAt: faker.date.past(),
      logs: logs,      
    });
     res.status(200).send(data);    
  }); 

/**
 * @api {get} /log/:id Request Log Entry By ID
 * @apiVersion 1.0.1
 * @apiName LogsByID
 * @apiGroup Logs
 *
 * @apiParam {Number} id Log unique ID.
 *
 * @apiSuccess {Number} ID ID of the Log Entry.
 * @apiSuccess {Number} logID ID of the Log Entry.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 * @apiSuccess {String} ipAddress IP Address of User.
 * @apiSuccess {String} referrer Referrering URL.
 * @apiSuccess {String} userAgent User Browser Agent Details.
 * @apiSuccess {String} action Action performed by User.
 */
  app.get("/log/:num", function (req, res) {
    var num = req.params.num;
    if (isFinite(num) && num  > 0 ) {
     faker.seed(parseInt(num));
     var data = ({
      ID: num,
      logID: num,
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
      ipAddress: faker.internet.ip(),
      referrer: faker.internet.url(),
      userAgent: faker.internet.userAgent(),
      action: faker.hacker.ingverb(),
    });
     res.status(200).send(data);
    
   } else {
     res.status(400).send({ message: 'invalid ID supplied' });
   }
  });  


/**
 * @api {get} /capacity/:id Request Venue Capacity By ID
 * @apiVersion 1.1.1
 * @apiName GetCapacity
 * @apiGroup Capacities
 *
 * @apiParam {Number} id Venue unique ID. 
 *
 * @apiSuccess {Number} ID ID of the Venue.
 * @apiSuccess {Number} venueID ID of the Venue.
 * @apiSuccess {Object[]} venue Venue Details.
 * @apiSuccess {Number} maximum Maximum capcity of venue.
 * @apiSuccess {Number} current Current capcity of venue.
 * @apiSuccess {Number} remaining Remaining capcity of venue.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 */
  app.get("/capacity/:num", function (req, res) {
    var num = req.params.num;
    var capacitySeed = faker.random.number();
    faker.seed(parseInt(num));
    var maximum = faker.random.number() % 200;
    faker.seed(capacitySeed);
    var current = faker.random.number() % maximum;
    var data = ({
      ID: num,
      venueID: num,
      venue: venue(num),
      maximum: maximum,
      current: current,
      remaining: maximum - current,
      createdAt: faker.date.recent(),
      createdBy: -1,
    });
    res.status(200).send(data);
  });

/**
 * @api {get} /checklists/:id Request Checklist By Venue ID
 * @apiVersion 1.1.2
 * @apiName GetChecklistByVenueID
 * @apiGroup Checklists
 *
 * @apiParam {Number} id Venue unique ID. 
 *
 * @apiSuccess {Number} ID ID of the Checklist.
 * @apiSuccess {Number} checklistID ID of the Checklist.
 * @apiSuccess {Number} venueID ID of the Venue.
 * @apiSuccess {Object[]} venue Venue Details.
 * @apiSuccess {Number} userID ID of the User.
 * @apiSuccess {Object[]} user  User details.
 * @apiSuccess {String} createdAt Timestamp of Request.
 * @apiSuccess {Number} createdBy User ID of generating Checklist.
 */
  app.get("/checklists/:num", function (req, res) {
    var num = req.params.num;
    checklists = [];
    faker.seed(parseInt(num));
    var venueID = faker.random.number();
    var userID = faker.random.number();
    var checklistCount = faker.random.number() % 30;
    for (i = 0; i <= checklistCount; i++) {
      checklistID = faker.random.number();
      checklists.push(checklist(checklistID));
    }
    var data = ({
      ID: num,
      venueID: num,
      venue: venue(num),
      checklists: checklists,
      createdAt: faker.date.recent(),
      createdBy: userID,
    });
    res.status(200).send(data);
  });

/**
 * @api {get} /checklists/:id/recent/ Request Recent Checklist By Venue ID From Past 7 Days
 * @apiVersion 1.1.2
 * @apiName GetRecentChecklists
 * @apiGroup Checklists
 *
 * @apiParam {Number} id Venue unique ID. 
 *
 * @apiSuccess {Number} ID ID of the Checklist.
 * @apiSuccess {Number} checklistID ID of the Checklist.
 * @apiSuccess {Number} venueID ID of the Venue.
 * @apiSuccess {Object[]} venue Venue Details.
 * @apiSuccess {String} fromDate Timestamp of Range Start.
 * @apiSuccess {String} toDate Timestamp of Range End.
 * @apiSuccess {Number} userID ID of the User.
 * @apiSuccess {Object[]} user  User details.
 * @apiSuccess {String} createdAt Timestamp of Request.
 * @apiSuccess {Number} createdBy User ID of generating Checklist.
 */
  app.get("/checklists/:num/recent/", function (req, res) {
    var num = req.params.num;
    checklists = [];
    faker.seed(parseInt(num));
    var venueID = faker.random.number();
    var userID = faker.random.number();
    var checklistCount = faker.random.number() % 30;
    for (i = 0; i <= checklistCount; i++) {
      checklistID = faker.random.number();
      checklists.push(checklist(checklistID));
    }
    var fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 7);    
    var toDate = new Date();
    var data = ({
      ID: num,
      venueID: num,
      venue: venue(num),
      rangeFrom: fromDate,
      rangeTo: toDate,
      checklists: checklists,
      createdAt: faker.date.recent(),
      createdBy: userID,
    });
    res.status(200).send(data);
  });  

  /**
 * @api {get} /checklists/:id/from/:month/:day/:year/to/:month/:day/:year/ Request Recent Checklist By Venue ID And Date Range
 * @apiVersion 1.1.2
 * @apiName GetChecklistsDateRange
 * @apiGroup Checklists
 *
 * @apiParam {Number} id Venue unique ID. 
 *
 * @apiSuccess {Number} ID ID of the Checklist.
 * @apiSuccess {Number} checklistID ID of the Checklist.
 * @apiSuccess {Number} venueID ID of the Venue.
 * @apiSuccess {Object[]} venue Venue Details.
 * @apiSuccess {String} fromDate Timestamp of Range Start.
 * @apiSuccess {String} toDate Timestamp of Range End.
 * @apiSuccess {Number} userID ID of the User.
 * @apiSuccess {Object[]} user  User details.
 * @apiSuccess {String} createdAt Timestamp of Request.
 * @apiSuccess {Number} createdBy User ID of generating Checklist.
 */
  app.get("/checklists/:num/from/:from_month/:from_day/:from_year/to/", function (req, res) {
    var num = req.params.num;
    var from_month = req.params.from_month;
    var from_day = req.params.from_day;
    var from_year = req.params.from_year;
    var fromDate = new Date(from_year,from_month-1,from_day);

    var to_month = req.params.from_month;
    var to_day = req.params.from_day;
    var to_year = req.params.from_year;
    var toDate = new Date(to_year,to_month-1,to_day);

    checklists = [];
    faker.seed(parseInt(num));
    var venueID = faker.random.number();
    var userID = faker.random.number();
    var checklistCount = faker.random.number() % 30;
    for (i = 0; i <= checklistCount; i++) {
      checklistID = faker.random.number();
      checklists.push(checklist(checklistID));
    }
    var data = ({
      ID: num,
      venueID: num,
      venue: venue(num),
      rangeFrom: fromDate,
      rangeTo: toDate,
      checklists: checklists,
      createdAt: faker.date.recent(),
      createdBy: userID,
    });
    res.status(200).send(data);
  });  

/**
 * @api {get} /checklist/:id Request Checklist By ID
 * @apiVersion 1.1.2
 * @apiName GetChecklistByID
 * @apiGroup Checklists
 *
 * @apiParam {Number} id Checklist unique ID. 
 *
 * @apiSuccess {Number} ID ID of the Checklist.
 * @apiSuccess {Number} checklistID ID of the Checklist.
 * @apiSuccess {Number} venueID ID of the Venue.
 * @apiSuccess {Object[]} venue Venue Details.
 * @apiSuccess {Number} userID ID of the User.
 * @apiSuccess {Object[]} user  User details.
 * @apiSuccess {String} createdAt Timestamp of Checklist.
 * @apiSuccess {Number} createdBy User ID of generating Checklist.
 */
  app.get("/checklist/:num", function (req, res) {
    var num = req.params.num;
    faker.seed(parseInt(num));
    var venueID = faker.random.number();
    var userID = faker.random.number();
    var questionCount = 15;
    var questions = [];

    for (i = 1; i <= questionCount; i++) {
      var question = ({
        ID: i,
        questionID: i,
        answer: (faker.random.number() %10 > 7)?1:0,
        date: faker.date.recent(),
        capcity: faker.random.number() % 200,
        name: faker.name.prefix() + ' ' + 
              faker.name.firstName() + ' ' + 
              faker.name.lastName() + ' ' + 
              faker.name.suffix(),
      });
      questions.push(question);
    }
    var data = ({
      ID: num,
      checklistID: num,
      venueID: venueID,
      venue: venue(venueID),
      userID: userID,
      user: user(userID),
      questions: questions,
      createdAt: faker.date.recent(),
      createdBy: userID,
    });
    res.status(200).send(data);
  });

/**
 * @api {get} /checklist/:id/pdf/ Request Checklist PDF By ID
 * @apiVersion 1.1.3
 * @apiName GetChecklistPDFByID
 * @apiGroup Checklists
 *
 * @apiParam {Number} id Checklist unique ID. 
 *
 * @apiSuccess {File} PDF
 */
  app.get("/checklist/:num/pdf/", function (req, res) {
    var num = req.params.num;
    faker.seed(parseInt(num));
    var venueID = faker.random.number();
    var userID = faker.random.number();
    var date = faker.date.recent();
    var questionCount = 15;
    var questions = [];

    for (i = 1; i <= questionCount; i++) {
      var question = ({
        ID: i,
        questionID: i,
        answer: (faker.random.number() %10 > 2)?1:0,
        date: faker.date.past(),
        capacity: faker.random.number() % 200,
        name: faker.name.prefix() + ' ' + 
              faker.name.firstName() + ' ' + 
              faker.name.lastName() + ' ' + 
              faker.name.suffix(),
      });
      questions.push(question);
    }

    var data = ({
      ID: num,
      checklistID: num,
      venueID: venueID,
      venue: venue(venueID),
      userID: userID,
      user: user(userID),
      questions: questions,
      ipAddress: faker.internet.ip(),
      userAgent: faker.internet.userAgent(),
      createdAt: date,
      createdBy: userID,
    });
    
    var hummus = require('hummus');
    // var pdfWriter = hummus.createWriter(new hummus.PDFStreamForResponse(res));
    var inFilePath = '';
    
    var pdfWriter = hummus.createWriterToModify(
        new hummus.PDFRStreamForFile("./assets/pdfs/fp-buildingsafetychecklist.pdf"),
        new hummus.PDFStreamForResponse(res)
    );

    var pageModifier = new hummus.PDFPageModifier(pdfWriter,0);
    var x1 = 495;
    var x2 = 540;
    var q = 0;
    var answerFont = ({
            font:pdfWriter.getFontForFile('./assets/fonts/arial.ttf'),
            size:10,
            colorspace:'gray',
            color:0x00
          });

    var smallFont = ({
            font:pdfWriter.getFontForFile('./assets/fonts/arial.ttf'),
            size:8,
            colorspace:'gray',
            color:0x00
          });

    var verySmallFont = ({
            font:pdfWriter.getFontForFile('./assets/fonts/arial.ttf'),
            size:6,
            colorspace:'gray',
            color:0x00
          });

    

    pageModifier
      .startContext()
      .getContext()
      .writeText(
          (data.createdAt.getUTCMonth() + 1) + '/' +
          data.createdAt.getUTCDate()+'/'+
          data.createdAt.getUTCFullYear(),
          268,668,
          answerFont)
      .writeText(
          data.user.prefix + ' ' + data.user.firstName + ' ' + data.user.lastName + ' ' + data.user.suffix,
          185,44,
          answerFont)
      .writeText(
          (data.questions[q].answer)?'X':'',
          x1,600,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,600,
          answerFont)
      .writeText(
          (data.questions[++q].answer)?'X':'',
          x1,555,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,555,
          answerFont)
      .writeText(
          (data.questions[++q].answer)?'X':'',
          x1,530,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,530,
          answerFont)
      .writeText(
          (data.questions[++q].answer)?'X':'',
          x1,505,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,505,
          answerFont)
      .writeText(
          (data.questions[++q].answer)?'X':'',
          x1,480,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,480,
          answerFont)
      .writeText(
          (data.questions[++q].answer)?'X':'',
          x1,455,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,455,
          answerFont)
      .writeText(
          (data.questions[++q].answer)?'X':'',
          x1,430,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,430,
          answerFont)
      .writeText(
          (data.questions[q].date.getUTCMonth() + 1) + '/' +
          data.questions[q].date.getUTCDate()+'/'+
          data.questions[q].date.getUTCFullYear(),
          360,435,
          smallFont)
      .writeText(
          (data.questions[++q].answer)?'X':'',
          x1,410,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,410,
          answerFont)
      .writeText(
          (data.questions[++q].answer)?'X':'',
          x1,380,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,380,
          answerFont)
      .writeText(
          data.questions[q].name,
          60,370,
          smallFont)
      .writeText(
          (data.questions[++q].answer)?'X':'',
          x1,340,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,340,
          answerFont)
      .writeText(
          data.questions[q].name,
          320,335,
          smallFont)
      .writeText(
          (data.questions[++q].answer)?'X':'',
          x1,300,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,300,
          answerFont)
      .writeText(
          data.questions[q].capacity,
          150,295,
          smallFont)
      .writeText(
          (data.questions[q].date.getUTCMonth() + 1) + '/' +
          data.questions[q].date.getUTCDate()+'/'+
          data.questions[q].date.getUTCFullYear(),
          135,285,
          smallFont)
      .writeText(
          (data.questions[++q].answer)?'X':'',
          x1,250,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,250,
          answerFont)
      .writeText(
          (data.questions[q].date.getUTCMonth() + 1) + '/' +
          data.questions[q].date.getUTCDate()+'/'+
          data.questions[q].date.getUTCFullYear(),
          300,250,
          smallFont)
      .writeText(
          (data.questions[++q].answer)?'X':'',
          x1,220,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,220,
          answerFont)
      .writeText(
          (data.questions[q].date.getUTCMonth() + 1) + '/' +
          data.questions[q].date.getUTCDate()+'/'+
          data.questions[q].date.getUTCFullYear(),
          300,215,
          smallFont)
      .writeText(
          (data.questions[++q].answer)?'X':'',
          x1,145,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,145,
          answerFont)
      .writeText(
          (data.questions[++q].answer)?'X':'',
          x1,105,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,105,
          answerFont)
      .writeText(
          'Document Prepared By: RezTechPro.com',
          100,15,
          verySmallFont)
      .writeText(
          data.createdAt,
          260,15,
          verySmallFont)
      .writeText(
          data.ipAddress,
          430,15,
          verySmallFont)


    ; // end writeText

    console.log((data.questions[0].answer)?'X':'0');
    console.log((!data.questions[0].answer)?'X':'0');
    console.log((data.questions[1].answer)?'X':'0');
    console.log((!data.questions[1].answer)?'X':'0');

    pageModifier
      .endContext()
      .writePage();

    pdfWriter.end();

    // pdfWriter.writePage(page);
    // pdfWriter.end();


    res.end();

  });
    


} // end appRouter;


/*****
*
* Static Functions
*
*****/

function address(num){
  faker.seed(parseInt(num));
  var data = ({
        ID: num,
        adddressID: num,
        streetAddress: faker.address.streetAddress(),
        secondaryAddress: faker.address.secondaryAddress(),
        city: faker.address.city(),
        county: faker.address.county(),
        state: faker.address.state(),
        zipCode: faker.address.zipCode(),
        country: faker.address.country(),
        phoneNumber: faker.phone.phoneNumber()
      });
  return data;
}

function user(num){
  faker.seed(parseInt(num));
  var addressID = faker.random.number();
  var data = ({
    ID: num,
    userID: num,
    prefix: faker.name.prefix(),      
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    suffix: faker.name.suffix(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phoneNumber: faker.phone.phoneNumber(),
    altPhoneNumber: faker.phone.phoneNumber(),
    addressID: addressID,
    address: address(addressID),
    createdAt: faker.date.past(),
    createdBy: faker.random.number(),
  })
  return data;
}

function file(num){
  faker.seed(parseInt(num));
  var data = ({
    ID: num,
    fileID: num,
    fileName: faker.system.commonFileName(),
    fileType: faker.system.commonFileType(),
    fileExtension: faker.system.commonFileExt(),
    createdAt: faker.date.past(),
    createdBy: faker.random.number(),
  });
  return data;
}

function venue(num){
  faker.seed(parseInt(num));
  var addressID = faker.random.number();
  var data = ({
    ID: num,
    venueID: num,
    name: faker.company.companyName(),
    email: faker.internet.email(),
    addressID: addressID,
    address: address(addressID),
    createdAt: faker.date.past(),
    createdBy: faker.random.number(),
  });
  return data;
}

function checklist(num){
  faker.seed(parseInt(num));
  var data = ({
    ID: num,
    fileID: num,
    ipAddress: faker.internet.ip(),
    userAgent: faker.internet.userAgent(),
    createdAt: faker.date.past(),
    createdBy: faker.random.number(),
  });
  return data;
}

module.exports = appRouter;

