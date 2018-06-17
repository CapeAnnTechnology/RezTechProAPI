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
 * @api {get} /user/ Request A User information
 * @apiVersion 1.0.1
 * @apiName GetUser
 * @apiGroup User
 *
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
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
 * @api {get} /user/:id Request Users information
 * @apiName GetUsersByID
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
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
 * @api {get} /user/:id Request User information
 * @apiName GetUserByID
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
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
 * @api {get} /business/:id Request Business information
 * @apiName GetBusiness
 * @apiGroup Business
 *
 * @apiParam {Number} id Business unique ID.
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
 * @api {get} /business/:id Request Business information
 * @apiName GetBusinessByID
 * @apiGroup Business
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
 * @api {get} /venue/:id Request Venue information
 * @apiName GetVenue
 * @apiGroup Venue
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
 * @api {get} /venue/:id Request Venue information
 * @apiName GetVenueByID
 * @apiGroup Venue
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
 * @api {get} /address/:id Request Address information
 * @apiName GetAddress
 * @apiGroup Address
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
  app.get("/address", function (req, res) {
    var addressID = faker.random.number();
    var data = (address(addressID));
    res.status(200).send(data);
  });

/**
 * @api {get} /address/:id Request Address information
 * @apiName GetAddressByID
 * @apiGroup Address
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
 * @api {get} /owner/:id Request Owner information
 * @apiName GetOwner
 * @apiGroup Ownership
 *
 * @apiParam {Number} id Business unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

  app.get("/owner/:num", function (req, res) {
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
 * @api {get} /owns/:id Request Owner information
 * @apiName GetOwns
 * @apiGroup Ownership
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
 * @api {get} /owns/:id Request Owner information
 * @apiName GetOwns
 * @apiGroup Ownership
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
 * @api {get} /owns/:id Request Owner information
 * @apiName GetOwns
 * @apiGroup Ownership
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
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
 * @api {get} /owns/:id Request Owner information
 * @apiName GetOwns
 * @apiGroup Ownership
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
 * @api {get} /owns/:id Request Owner information
 * @apiName GetOwns
 * @apiGroup Ownership
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
 * @api {get} /owns/:id Request Owner information
 * @apiName GetOwns
 * @apiGroup Ownership
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
 * @api {get} /owns/:id Request Owner information
 * @apiName Logs
 * @apiGroup Log
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

  app.get("/logs/", function (req, res) {
    var data = [];
    var num = req.params.num;
    var count = 20;
     for (i = 0; i <= count; i++) {
       data.push({
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
     res.status(200).send(data);    
  }); 

/**
 * @api {get} /log/:id Request recent log information
 * @apiName LogsByID
 * @apiGroup Log
 *
 * @apiParam {Number} id Log unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
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
      idAddress: faker.internet.ip(),
      referrer: faker.internet.url(),
      userAgent: faker.internet.userAgent(),
      action: faker.hacker.ingverb(),
    });
     res.status(200).send(data);
    
   } else {
     res.status(400).send({ message: 'invalid ID supplied' });
   }
  });  

} // end appRouter;

module.exports = appRouter;