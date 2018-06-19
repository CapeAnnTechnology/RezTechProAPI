var faker = require("faker");
// removed pdfkit
// var PDFDocument = require('pdfkit');

faker.seed(42);

var version = '2.0.1';

var appRouter = function (app) {
/**
 * @api {get} /v2.0/ Welcome Message
 * @apiVersion 2.0.1
 * @apiName Welcome
 * @apiGroup General
 *
 * @apiSuccess {String} message Welcome Message.
 * @apiSuccess {String} version Version Number of API.
 */
  app.get("/", function (req, res) {
    res.status(200).send({ message: 'Welcome to our restful API', version: version });
  });
  app.get("/v2.0/", function (req, res) {
    res.status(200).send({ message: 'Welcome to our restful API', version: version });
  });

/**
 * @api {get} /v2.0/user/ Request A User [Random]
 * @apiVersion 2.0.1
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiSuccess {Number} id ID of the User.
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
  app.get("/v2.0/user", function (req, res) {
    var userID = faker.random.number();
    var addressID = faker.random.number();
    var data = ({
      id: userID,
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
 * @api {get} /v2.0/user/:id Request Users Group
 * @apiVersion 2.0.1
 * @apiName GetUsersByID
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Number} id ID of the User.
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
 app.get("/v2.0/users/:num", function (req, res) {
   var users = [];
   var num = req.params.num;
   faker.seed(parseInt(num));
   if (isFinite(num) && num  > 0 ) {
     for (i = 0; i <= num-1; i++) {
       var userID = faker.random.number();
       var addressID = faker.random.number();
       users.push({
           id: userID,
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
 * @api {get} /v2.0/user/:id Request User by ID
 * @apiVersion 2.0.1
 * @apiName GetUserByID
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Number} id ID of the User.
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
 app.get("/v2.0/user/:num", function (req, res) {
   var users = [];
   var num = req.params.num;

   if (isFinite(num) && num  > 0 ) {
     faker.seed(parseInt(num));
     var addressID = faker.random.number();
     user = ({
         id: num,
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
 * @api {get} /v2.0/business/ Request Business [Random]
 * @apiVersion 2.0.0
 * @apiName GetBusiness
 * @apiGroup Businesses
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
  app.get("/v2.0/business", function (req, res) {
    var businessID = faker.random.number();
    var addressID = faker.random.number();
    var data = ({
      id: businessID,
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
 * @api {get} /v2.0/business/:id Request Business
 * @apiVersion 2.0.1
 * @apiName GetBusinessByID
 * @apiGroup Businesses
 *
 * @apiParam {Number} id Business unique ID.
 *
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get("/v2.0/business/:num", function (req, res) {
    var num = req.params.num;

    if (isFinite(num) && num  > 0 ) {
      faker.seed(parseInt(num));
      var addressID = faker.random.number();
     var data = ({
      id: num,
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
 * @api {get} /v2.0/venue/:id Request Venue [Random]
 * @apiVersion 2.0.1
 * @apiName GetVenue
 * @apiGroup Venues
 *
 * @apiSuccess {Number} id ID of the Venue.
 * @apiSuccess {Number} venueID ID of the Venue.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get("/v2.0/venue", function (req, res) {
    var venueID = faker.random.number();
    var addressID = faker.random.number();
    var data = ({
      id: venueID,
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
 * @api {get} /v2.0/venue/:id Request Venue By ID
 * @apiVersion 2.0.0
 * @apiName GetVenueByID
 * @apiGroup Venues
 *
 * @apiParam {Number} id Venue unique ID.
 *
 * @apiSuccess {Number} id ID of the Venue.
 * @apiSuccess {Number} venueID ID of the Venue. 
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get("/v2.0/venue/:num", function (req, res) {
    var num = req.params.num;

    if (isFinite(num) && num  > 0 ) {
      faker.seed(parseInt(num));
      var addressID = faker.random.number();
      var data = ({
        id: num,
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
 * @api {get} /v2.0/address/ Request Address [Random]
 * @apiVersion 2.0.1
 * @apiName GetAddress
 * @apiGroup Addresses
 *
 * @apiSuccess {Number} id ID of the Address.
 * @apiSuccess {Number} addressID ID of the Address. 
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get("/v2.0/address", function (req, res) {
    var addressID = faker.random.number();
    var data = (address(addressID));
    res.status(200).send(data);
  });

/**
 * @api {get} /v2.0/address/:id Request Address by ID
 * @apiVersion 2.0.1
 * @apiName GetAddressByID
 * @apiGroup Addresses
 *
 * @apiParam {Number} id Address unique ID.
 *
 * @apiSuccess {Number} id ID of the Address.
 * @apiSuccess {Number} addressID ID of the Address. 
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get("/v2.0/address/:num", function (req, res) {
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
 * @api {get} /v2.0/owner/:id Request Business Owner
 * @apiVersion 2.0.0
 * @apiName GetOwner
 * @apiGroup Owners
 *
 * @apiParam {Number} id Business unique ID.
 *
 * @apiSuccess {Number} id ID of the Business.
 * @apiSuccess {Number} businessID ID of the Business.
 * @apiSuccess {Number} userID ID of the User.
 * @apiSuccess {Object[]} user  User details.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */

  app.get("/v2.0/owner/:num", function (req, res) {
    var num = req.params.num;
    if (isFinite(num) && num  > 0 ) {
      faker.seed(parseInt(num));
      var userID = faker.random.number();
      var data = ({
        id: num,
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
 * @api {get} /v2.0/owns/:id Request Users Business
 * @apiVersion 2.0.1
 * @apiName GetOwns
 * @apiGroup Owners
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
  app.get("/v2.0/owns/:num", function (req, res) {
    var num = req.params.num;
    if (isFinite(num) && num  > 0 ) {
     faker.seed(parseInt(num));
     var data = ({
      id: num,
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
 * @api {get} /v2.0/manager/:id Request Owner
 * @apiVersion 2.0.1
 * @apiName GetManagers
 * @apiGroup Managers
 *
 * @apiParam {Number} id Venue unique ID.
 *
 * @apiSuccess {Number} id ID of the Venue.
 * @apiSuccess {Number} venueID ID of the Venue.
 * @apiSuccess {Number} userID ID of the User.
 * @apiSuccess {Object[]} user  User details.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get("/v2.0/manager/:num", function (req, res) {
    var num = req.params.num;
    if (isFinite(num) && num  > 0 ) {
     faker.seed(parseInt(num));
     var data = ({
      id: num,
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
 * @api {get} /v2.0/manages/:id Request Manager Venue
 * @apiVersion 2.0.0
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
  app.get("/v2.0/manages/:num", function (req, res) {
    var num = req.params.num;
    if (isFinite(num) && num  > 0 ) {
     faker.seed(parseInt(num));
     var venueID = faker.random.number();
     var data = ({
      id: num,
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
 * @api {get} /v2.0/employees/:id Request Venue Employees
 * @apiVersion 2.0.1
 * @apiName GetEmployees
 * @apiGroup Employees
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

  app.get("/v2.0/employees/:num", function (req, res) {
    var num = req.params.num;
    if (isFinite(num) && num  > 0 ) {
     faker.seed(parseInt(num));
     var employeeCount = faker.random.number() % 10;
     var employees = [];
     for (i = 0; i <= employeeCount; i++) {
        var userID = faker.random.number();
        employees.push({
          id: userID,
          userID: userID,
          user: user(userID),
          createdAt: faker.date.past(),
          createdBy: faker.random.number(),
        });
     }
     var data = ({
      id: num,
      venueID: num,
      employees: employees,
      
    });
     res.status(200).send(data);
    
   } else {
     res.status(400).send({ message: 'invalid ID supplied' });
   }
  });


/**
 * @api {get} /v2.0/employed/:id Request Employment Status
 * @apiVersion 2.0.1
 * @apiName GetEmployment
 * @apiGroup Employees
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

app.get("/v2.0/employed/:num", function (req, res) {
    var num = req.params.num;
    if (isFinite(num) && num  > 0 ) {
     faker.seed(parseInt(num));
     var data = ({
      id: num,
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
 * @api {get} /v2.0/files/ Request File List [Random]
 * @apiVersion 2.0.1
 * @apiName GetFiles
 * @apiGroup Files
 *
 * @apiSuccess {String} createdAt Timestamp of List creation.
 * @apiSuccess {Object[]} files File Details.
 */

app.get("/v2.0/files/", function (req, res) {
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
 * @api {get} /v2.0/file/ Request File Details [Random]
 * @apiVersion 2.0.1
 * @apiName GetFile
 * @apiGroup Files
 *
 * @apiSuccess {Number} id ID of the File.
 * @apiSuccess {Number} fileID ID of the File.
 * @apiSuccess {String} fileExtension Type of File.
 * @apiSuccess {String} fileType Extension of File.
 * @apiSuccess {String} createdAt Timestamp of File creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */

app.get("/v2.0/file/", function (req, res) {
   var fileID = faker.random.number();
   var data = (file(fileID));
   res.status(200).send(data);  
});

/**
 * @api {get} /v2.0/file/:id Request File Details By ID
 * @apiVersion 2.0.0
 * @apiName GetFileByID
 * @apiGroup Files
 *
 * @apiParam {Number} id File unique ID.
 *
 * @apiSuccess {Number} id ID of the File.
 * @apiSuccess {Number} fileID ID of the File.
 * @apiSuccess {String} fileExtension Type of File.
 * @apiSuccess {String} fileType Extension of File.
 * @apiSuccess {String} createdAt Timestamp of File creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */

app.get("/v2.0/file/:num", function (req, res) {
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
 * @api {get} /v2.0/logs/ Request Recent Log Entries
 * @apiVersion 2.0.1
 * @apiName GetLogs
 * @apiGroup Logs
 *
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Object[]} logs Log Entry Details.
 */

  app.get("/v2.0/logs/", function (req, res) {
    var logs = [];
    var num = req.params.num;
    var count = 20;
     for (i = 0; i <= count; i++) {
       logs.push({
        id: num,
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
 * @api {get} /v2.0/log/:id Request Log Entry By ID
 * @apiVersion 2.0.1
 * @apiName LogsByID
 * @apiGroup Logs
 *
 * @apiParam {Number} id Log unique ID.
 *
 * @apiSuccess {Number} id ID of the Log Entry.
 * @apiSuccess {Number} logID ID of the Log Entry.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 * @apiSuccess {String} ipAddress IP Address of User.
 * @apiSuccess {String} referrer Referrering URL.
 * @apiSuccess {String} userAgent User Browser Agent Details.
 * @apiSuccess {String} action Action performed by User.
 */
  app.get("/v2.0/log/:num", function (req, res) {
    var num = req.params.num;
    if (isFinite(num) && num  > 0 ) {
     faker.seed(parseInt(num));
     var data = ({
      id: num,
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
 * @api {get} /v2.0/capacity/:id Request Venue Capacity By ID
 * @apiVersion 2.0.1
 * @apiName GetCapacity
 * @apiGroup Capacities
 *
 * @apiParam {Number} id Venue unique ID. 
 *
 * @apiSuccess {Number} id ID of the Venue.
 * @apiSuccess {Number} venueID ID of the Venue.
 * @apiSuccess {Object[]} venue Venue Details.
 * @apiSuccess {Number} maximum Maximum capcity of venue.
 * @apiSuccess {Number} current Current capcity of venue.
 * @apiSuccess {Number} remaining Remaining capcity of venue.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 */
  app.get("/v2.0/capacity/:num", function (req, res) {
    var num = req.params.num;
    var capacitySeed = faker.random.number();
    faker.seed(parseInt(num));
    var maximum = faker.random.number() % 200;
    faker.seed(capacitySeed);
    var current = faker.random.number() % maximum;
    var data = ({
      id: num,
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
 * @api {get} /v2.0/checklists/:id Request Checklist By Venue ID
 * @apiVersion 2.0.1
 * @apiName GetChecklistByVenueID
 * @apiGroup Checklists
 *
 * @apiParam {Number} id Venue unique ID. 
 *
 * @apiSuccess {Number} id ID of the Checklist.
 * @apiSuccess {Number} checklistID ID of the Checklist.
 * @apiSuccess {Number} venueID ID of the Venue.
 * @apiSuccess {Object[]} venue Venue Details.
 * @apiSuccess {Number} userID ID of the User.
 * @apiSuccess {Object[]} user  User details.
 * @apiSuccess {String} createdAt Timestamp of Request.
 * @apiSuccess {Number} createdBy User ID of generating Checklist.
 */
  app.get("/v2.0/checklists/:num", function (req, res) {
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
      id: num,
      venueID: num,
      venue: venue(num),
      checklists: checklists,
      createdAt: faker.date.recent(),
      createdBy: userID,
    });
    res.status(200).send(data);
  });

/**
 * @api {get} /v2.0/checklists/:id/recent/ Request Recent Checklist By Venue ID From Past 7 Days
 * @apiVersion 2.0.1
 * @apiName GetRecentChecklists
 * @apiGroup Checklists
 *
 * @apiParam {Number} id Venue unique ID. 
 *
 * @apiSuccess {Number} id ID of the Checklist.
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
  app.get("/v2.0/checklists/:num/recent/", function (req, res) {
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
      id: num,
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
 * @api {get} /v2.0/checklists/:id/from/:month/:day/:year/to/:month/:day/:year/ Request Recent Checklist By Venue ID And Date Range
 * @apiVersion 2.0.1
 * @apiName GetChecklistsDateRange
 * @apiGroup Checklists
 *
 * @apiParam {Number} id Venue unique ID. 
 *
 * @apiSuccess {Number} id ID of the Checklist.
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
  app.get("/v2.0/checklists/:num/from/:from_month/:from_day/:from_year/to/", function (req, res) {
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
      id: num,
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
 * @api {get} /v2.0/checklist/:id Request Checklist By ID
 * @apiVersion 2.0.1
 * @apiName GetChecklistByID
 * @apiGroup Checklists
 *
 * @apiParam {Number} id Checklist unique ID. 
 *
 * @apiSuccess {Number} id ID of the Checklist.
 * @apiSuccess {Number} checklistID ID of the Checklist.
 * @apiSuccess {Number} venueID ID of the Venue.
 * @apiSuccess {Object[]} venue Venue Details.
 * @apiSuccess {Number} userID ID of the User.
 * @apiSuccess {Object[]} user  User details.
 * @apiSuccess {String} createdAt Timestamp of Checklist.
 * @apiSuccess {Number} createdBy User ID of generating Checklist.
 */
  app.get("/v2.0/checklist/:num", function (req, res) {
    var num = req.params.num;
    faker.seed(parseInt(num));
    var venueID = faker.random.number();
    var userID = faker.random.number();
    var questionCount = 15;
    var questions = [];

    for (i = 1; i <= questionCount; i++) {
      var question = ({
        id: i,
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
      id: num,
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
 * @api {get} /v2.0/checklist/:id/pdf/ Request Checklist PDF By ID
 * @apiVersion 2.0.1
 * @apiName GetChecklistPDFByID
 * @apiGroup Checklists
 *
 * @apiParam {Number} id Checklist unique ID. 
 *
 * @apiSuccess {File} PDF
 */
  app.get("/v2.0/checklist/:num/pdf/", function (req, res) {
    var num = req.params.num;
    faker.seed(parseInt(num));
    var venueID = faker.random.number();
    var userID = faker.random.number();
    var date = faker.date.recent();
    var questionCount = 15;
    var questions = [];

    for (i = 1; i <= questionCount; i++) {
      var question = ({
        id: i,
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
      id: num,
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
        new hummus.PDFRStreamForFile("./v2.0/assets/pdfs/fp-buildingsafetychecklist.pdf"),
        new hummus.PDFStreamForResponse(res)
    );

    var pageModifier = new hummus.PDFPageModifier(pdfWriter,0);
    var x1 = 495;
    var x2 = 540;
    var q = 0;
    var answerFont = ({
            font:pdfWriter.getFontForFile('./v2.0/assets/fonts/arial.ttf'),
            size:10,
            colorspace:'gray',
            color:0x00
          });

    var smallFont = ({
            font:pdfWriter.getFontForFile('./v2.0/assets/fonts/arial.ttf'),
            size:8,
            colorspace:'gray',
            color:0x00
          });

    var verySmallFont = ({
            font:pdfWriter.getFontForFile('./v2.0/assets/fonts/arial.ttf'),
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
          data.user.certificate.number,
          500,44,
          smallFont)
      .writeText(
          'Expires: '+(data.user.certificate.expiresAt.getUTCMonth() + 1) + '/' +
          data.user.certificate.expiresAt.getUTCDate()+'/'+
          data.user.certificate.expiresAt.getUTCFullYear(),
          500,33,
          verySmallFont)
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
          150,297,
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
          (data.questions[q].date.getUTCMonth() + 1) + '/' +
          data.questions[q].date.getUTCDate()+'/'+
          data.questions[q].date.getUTCFullYear(),
          280,140,
          smallFont)
      .writeText(
          (data.questions[++q].answer)?'X':'',
          x1,105,
          answerFont)
      .writeText(
          (!data.questions[q].answer)?'X':'',
          x2,105,
          answerFont)
      .writeText(
          (data.questions[q].date.getUTCMonth() + 1) + '/' +
          data.questions[q].date.getUTCDate()+'/'+
          data.questions[q].date.getUTCFullYear(),
          170,103,
          smallFont)
      .writeText(
          'Document Prepared By: RezTechPro.com',
          110,15,
          verySmallFont)
      .writeText(
          'Document ID#: '+data.ID,
          230,15,
          verySmallFont)      
      .writeText(
          data.createdAt,
          310,15,
          verySmallFont)
      .writeText(
          data.ipAddress,
          460,15,
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
        id: num,
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
    id: num,
    userID: num,
    prefix: faker.name.prefix(),      
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    suffix: faker.name.suffix(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    certificate: certificate(num),
    phoneNumber: faker.phone.phoneNumber(),
    altPhoneNumber: faker.phone.phoneNumber(),
    addressID: addressID,
    address: address(addressID),
    createdAt: faker.date.past(),
    createdBy: faker.random.number(),
  })
  return data;
}

function certificate(num){
  faker.seed(parseInt(num));
  var certificateID = faker.random.number()
  var data = ({
    id: certificateID,
    certificateID: certificateID,
    number: faker.random.alphaNumeric(15),
    expiresAt: faker.date.future(),
    createdAt: faker.date.past(),
    createdBy: faker.random.number(),
  });
  return data;
}

function file(num){
  faker.seed(parseInt(num));
  var data = ({
    id: num,
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
    id: num,
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
    id: num,
    fileID: num,
    ipAddress: faker.internet.ip(),
    userAgent: faker.internet.userAgent(),
    createdAt: faker.date.past(),
    createdBy: faker.random.number(),
  });
  return data;
}

module.exports = appRouter;

