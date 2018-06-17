var faker = require("faker");

faker.seed(42);

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
 * @apiName GetBusinessByID
 * @apiGroup Businesses
 *
 * @apiParam {Number} id Business unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
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
 * @api {get} /venue/:id Request Venue
 * @apiName GetVenue
 * @apiGroup Venues
 *
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
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
 * @api {get} /venue/:id Request Venue
 * @apiName GetVenueByID
 * @apiGroup Venues
 *
 * @apiParam {Number} id Venue unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
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
 * @apiName GetAddress
 * @apiGroup Addresses
 *
 */
  app.get("/address", function (req, res) {
    var addressID = faker.random.number();
    var data = (address(addressID));
    res.status(200).send(data);
  });

/**
 * @api {get} /address/:id Request Address by ID
 * @apiName GetAddressByID
 * @apiGroup Addresses
 *
 * @apiParam {Number} id Address unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
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
 * @api {get} /owns/:id Request Owner
 * @apiName GetOwns
 * @apiGroup Owners
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
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
 * @api {get} /manages/:id Request Owner
 * @apiName GetOwns
 * @apiGroup Management
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
     var data = ({
      ID: num,
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
 * @api {get} /employees/:id Request Venue Employees
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
 * @api {get} /owns/:id Request Employment Status
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
 * @api {get} /file/:id Request File Details
 * @apiName GetFile
 * @apiGroup Files
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

app.get("/file/:num", function (req, res) {
  var num = req.params.num;
  if (isFinite(num) && num  > 0 ) {
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
   res.status(200).send(data);
  
 } else {
   res.status(400).send({ message: 'invalid ID supplied' });
 }
});

/**
 * @api {get} /logs/ Request Recent Log Entries
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
 * @api {get} /capacity/:id Request Venue Capacity
 * @apiVersion 1.0.1
 * @apiName GetCapacity
 * @apiGroup Capacities
 *
 * @apiParam {Number} id Venue unique ID. 
 *
 * @apiSuccess {Number} ID ID of the Venue.
 * @apiSuccess {Number} venueID ID of the Venue.
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
      maximum: maximum,
      current: current,
      remaining: maximum - current,
      createdAt: faker.date.recent(),
      createdBy: -1,
    });
    res.status(200).send(data);
  });

} // end appRouter;

module.exports = appRouter;