const faker = require('faker');
// removed pdfkit
// var PDFDocument = require('pdfkit');

const version = '1.1.3';
faker.seed(42);

const appRouter = function (app) {
  /** ***
*
* Static Functions
*
**** */

  function address(num) {
    faker.seed(parseInt(num, 10));
    const data = ({
      ID: num,
      adddressID: num,
      streetAddress: faker.address.streetAddress(),
      secondaryAddress: faker.address.secondaryAddress(),
      city: faker.address.city(),
      county: faker.address.county(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
      country: faker.address.country(),
      phoneNumber: faker.phone.phoneNumber(),
    });
    return data;
  }

  function user(num) {
    faker.seed(parseInt(num, 10));
    const addressID = faker.random.number();
    const data = ({
      ID: num,
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
      addressID,
      address: address(addressID),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
    return data;
  }

  function certificate(num) {
    faker.seed(parseInt(num, 10));
    const certificateID = faker.random.number();
    const data = ({
      ID: certificateID,
      certificateID,
      number: faker.random.alphaNumeric(15),
      expiresAt: faker.date.future(),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
    return data;
  }

  function file(num) {
    faker.seed(parseInt(num, 10));
    const data = ({
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

  function venue(num) {
    faker.seed(parseInt(num, 10));
    const addressID = faker.random.number();
    const data = ({
      ID: num,
      venueID: num,
      name: faker.company.companyName(),
      email: faker.internet.email(),
      addressID,
      address: address(addressID),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
    return data;
  }

  function checklist(num) {
    faker.seed(parseInt(num, 10));
    const data = ({
      ID: num,
      fileID: num,
      ipAddress: faker.internet.ip(),
      userAgent: faker.internet.userAgent(),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
    return data;
  }

  /**
 * @api {get} /v1.0/ Welcome Message
 * @apiVersion 1.1.3
 * @apiName Welcome
 * @apiGroup General
 *
 * @apiSuccess {String} message Welcome Message.
 * @apiSuccess {String} version Version Number of API.
 */
  app.get('/v1.0/', (req, res) => {
    res.status(200).send({ message: 'Welcome to our restful API', version });
  });

  /**
 * @api {get} /v1.0/user/ Request A User [Random]
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
  app.get('/v1.0/user', (req, res) => {
    const userID = faker.random.number();
    const addressID = faker.random.number();
    const data = ({
      ID: userID,
      userID,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      addressID,
      address: address(addressID),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
    res.status(200).send(data);
  });

  /**
 * @api {get} /v1.0/user/:id Request Users Group
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
  app.get('/v1.0/users/:num', (req, res) => {
    const users = [];
    const num = req.params.num;
    const addressID = faker.random.number();
    if (Number.isFinite(num) && num > 0) {
      for (let i = 0; i <= num - 1; i += 1) {
        const userID = faker.random.number();
        users.push({
          ID: userID,
          userID,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
          addressID,
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
 * @api {get} /v1.0/user/:id Request User by ID
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
  app.get('/v1.0/user/:num', (req, res) => {
    const users = [];
    const num = req.params.num;

    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const addressID = faker.random.number();
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
        addressID,
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
 * @api {get} /v1.0/business/ Request Business [Random]
 * @apiVersion 1.0.1
 * @apiName GetBusiness
 * @apiGroup Businesses
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
  app.get('/v1.0/business', (req, res) => {
    const businessID = faker.random.number();
    const addressID = faker.random.number();
    const data = ({
      ID: businessID,
      businessID,
      name: faker.company.companyName(),
      email: faker.internet.email(),
      addressID,
      address: address(addressID),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
    res.status(200).send(data);
  });

  /**
 * @api {get} /v1.0/business/:id Request Business
 * @apiVersion 1.0.1
 * @apiName GetBusinessByID
 * @apiGroup Businesses
 *
 * @apiParam {Number} id Business unique ID.
 *
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get('/v1.0/business/:num', (req, res) => {
    const num = req.params.num;

    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const addressID = faker.random.number();
      const data = ({
        ID: num,
        name: faker.company.companyName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
        faxNumber: faker.phone.phoneNumber(),
        addressID,
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
 * @api {get} /v1.0/venue/:id Request Venue [Random]
 * @apiVersion 1.0.1
 * @apiName GetVenue
 * @apiGroup Venues
 *
 * @apiSuccess {Number} ID ID of the Venue.
 * @apiSuccess {Number} venueID ID of the Venue.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get('/v1.0/venue', (req, res) => {
    const venueID = faker.random.number();
    const addressID = faker.random.number();
    const data = ({
      ID: venueID,
      venueID,
      name: faker.company.companyName(),
      email: faker.internet.email(),
      addressID,
      address: address(addressID),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
    res.status(200).send(data);
  });

  /**
 * @api {get} /v1.0/venue/:id Request Venue By ID
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
  app.get('/v1.0/venue/:num', (req, res) => {
    const num = req.params.num;

    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const addressID = faker.random.number();
      const data = ({
        ID: num,
        venueID: num,
        name: faker.company.companyName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
        faxNumber: faker.phone.phoneNumber(),
        addressID,
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
 * @api {get} /v1.0/address/ Request Address [Random]
 * @apiVersion 1.0.1
 * @apiName GetAddress
 * @apiGroup Addresses
 *
 * @apiSuccess {Number} ID ID of the Address.
 * @apiSuccess {Number} addressID ID of the Address.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get('/v1.0/address', (req, res) => {
    const addressID = faker.random.number();
    const data = (address(addressID));
    res.status(200).send(data);
  });

  /**
 * @api {get} /v1.0/address/:id Request Address by ID
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
  app.get('/v1.0/address/:num', (req, res) => {
    const num = req.params.num;
    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const data = (address(num));
      res.status(200).send(data);
    } else {
      res.status(400).send({ message: 'invalid ID supplied' });
    }
  });


  /**
 * @api {get} /v1.0/owner/:id Request Business Owner
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

  app.get('/v1.0/owner/:num', (req, res) => {
    const num = req.params.num;
    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const userID = faker.random.number();
      const data = ({
        ID: num,
        businessID: num,
        userID,
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
 * @api {get} /v1.0/owns/:id Request Users Business
 * @apiVersion 1.0.1
 * @apiName GetOwns
 * @apiGroup Owners
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
  app.get('/v1.0/owns/:num', (req, res) => {
    const num = req.params.num;
    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const data = ({
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
 * @api {get} /v1.0/manager/:id Request Owner
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
  app.get('/v1.0/manager/:num', (req, res) => {
    const num = req.params.num;
    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const data = ({
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
 * @api {get} /v1.0/manages/:id Request Manager Venue
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
  app.get('/v1.0/manages/:num', (req, res) => {
    const num = req.params.num;
    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const venueID = faker.random.number();
      const data = ({
        ID: num,
        userID: num,
        venueID,
        createdAt: faker.date.past(),
        createdBy: faker.random.number(),
      });
      res.status(200).send(data);
    } else {
      res.status(400).send({ message: 'invalid ID supplied' });
    }
  });

  /**
 * @api {get} /v1.0/employees/:id Request Venue Employees
 * @apiVersion 1.0.1
 * @apiName GetEmployees
 * @apiGroup Employees
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

  app.get('/v1.0/employees/:num', (req, res) => {
    const num = req.params.num;
    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const employeeCount = faker.random.number() % 10;
      const employees = [];
      for (let i = 0; i <= employeeCount; i += 1) {
        const userID = faker.random.number();
        employees.push({
          ID: userID,
          userID,
          user: user(userID),
          createdAt: faker.date.past(),
          createdBy: faker.random.number(),
        });
      }
      const data = ({
        ID: num,
        venueID: num,
        employees,

      });
      res.status(200).send(data);
    } else {
      res.status(400).send({ message: 'invalid ID supplied' });
    }
  });


  /**
 * @api {get} /v1.0/employed/:id Request Employment Status
 * @apiVersion 1.0.1
 * @apiName GetEmployment
 * @apiGroup Employees
 *
 * @apiParam {Number} id User unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

  app.get('/v1.0/employed/:num', (req, res) => {
    const num = req.params.num;
    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const data = ({
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
 * @api {get} /v1.0/files/ Request File List [Random]
 * @apiVersion 1.1.1
 * @apiName GetFiles
 * @apiGroup Files
 *
 * @apiSuccess {String} createdAt Timestamp of List creation.
 * @apiSuccess {Object[]} files File Details.
 */

  app.get('/v1.0/files/', (req, res) => {
    const files = [];
    const fileCount = faker.random.number() % 20;
    for (let i = 0; i <= fileCount; i += 1) {
      fileID = faker.random.number();
      files.push(file(fileID));
    }
    const data = ({
      createdAt: faker.date.past(),
      files,
    });
    res.status(200).send(data);
  });

  /**
 * @api {get} /v1.0/file/ Request File Details [Random]
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

  app.get('/v1.0/file/', (req, res) => {
    const fileID = faker.random.number();
    const data = (file(fileID));
    res.status(200).send(data);
  });

  /**
 * @api {get} /v1.0/file/:id Request File Details By ID
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

  app.get('/v1.0/file/:num', (req, res) => {
    const num = req.params.num;
    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const data = (file(num));
      res.status(200).send(data);
    } else {
      res.status(400).send({ message: 'invalid ID supplied' });
    }
  });

  /**
 * @api {get} /v1.0/logs/ Request Recent Log Entries
 * @apiVersion 1.0.1
 * @apiName GetLogs
 * @apiGroup Logs
 *
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Object[]} logs Log Entry Details.
 */

  app.get('/v1.0/logs/', (req, res) => {
    const logs = [];
    const num = req.params.num;
    const count = 20;
    for (let i = 0; i <= count; i += 1) {
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
    const data = ({
      createdAt: faker.date.past(),
      logs,
    });
    res.status(200).send(data);
  });

  /**
 * @api {get} /v1.0/log/:id Request Log Entry By ID
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
  app.get('/v1.0/log/:num', (req, res) => {
    const num = req.params.num;
    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const data = ({
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
 * @api {get} /v1.0/capacity/:id Request Venue Capacity By ID
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
  app.get('/v1.0/capacity/:num', (req, res) => {
    const num = req.params.num;
    const capacitySeed = faker.random.number();
    faker.seed(parseInt(num, 10));
    const maximum = faker.random.number() % 200;
    faker.seed(capacitySeed);
    const current = faker.random.number() % maximum;
    const data = ({
      ID: num,
      venueID: num,
      venue: venue(num),
      maximum,
      current,
      remaining: maximum - current,
      createdAt: faker.date.recent(),
      createdBy: -1,
    });
    res.status(200).send(data);
  });

  /**
 * @api {get} /v1.0/checklists/:id Request Checklist By Venue ID
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
  app.get('/v1.0/checklists/:num', (req, res) => {
    const num = req.params.num;
    checklists = [];
    faker.seed(parseInt(num, 10));
    const venueID = faker.random.number();
    const userID = faker.random.number();
    const checklistCount = faker.random.number() % 30;
    for (let i = 0; i <= checklistCount; i += 1) {
      checklistID = faker.random.number();
      checklists.push(checklist(checklistID));
    }
    const data = ({
      ID: num,
      venueID: num,
      venue: venue(num),
      checklists,
      createdAt: faker.date.recent(),
      createdBy: userID,
    });
    res.status(200).send(data);
  });

  /**
 * @api {get} /v1.0/checklists/:id/recent/ Request Recent Checklist By Venue ID From Past 7 Days
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
  app.get('/v1.0/checklists/:num/recent/', (req, res) => {
    const num = req.params.num;
    checklists = [];
    faker.seed(parseInt(num, 10));
    const venueID = faker.random.number();
    const userID = faker.random.number();
    const checklistCount = faker.random.number() % 30;
    for (let i = 0; i <= checklistCount; i += 1) {
      checklistID = faker.random.number();
      checklists.push(checklist(checklistID));
    }
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 7);
    const toDate = new Date();
    const data = ({
      ID: num,
      venueID: num,
      venue: venue(num),
      rangeFrom: fromDate,
      rangeTo: toDate,
      checklists,
      createdAt: faker.date.recent(),
      createdBy: userID,
    });
    res.status(200).send(data);
  });

  /**
 * @api {get} /v1.0/checklists/:id/from/:month/:day/:year/to/:month/:day/:year/ Request Recent Checklist By Venue ID And Date Range
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
  app.get('/v1.0/checklists/:num/from/:from_month/:from_day/:from_year/to/', (req, res) => {
    const num = req.params.num;
    const from_month = req.params.from_month;
    const from_day = req.params.from_day;
    const from_year = req.params.from_year;
    const fromDate = new Date(from_year, from_month - 1, from_day);

    const to_month = req.params.from_month;
    const to_day = req.params.from_day;
    const to_year = req.params.from_year;
    const toDate = new Date(to_year, to_month - 1, to_day);

    checklists = [];
    faker.seed(parseInt(num, 10));
    const venueID = faker.random.number();
    const userID = faker.random.number();
    const checklistCount = faker.random.number() % 30;
    for (let i = 0; i <= checklistCount; i += 1) {
      checklistID = faker.random.number();
      checklists.push(checklist(checklistID));
    }
    const data = ({
      ID: num,
      venueID: num,
      venue: venue(num),
      rangeFrom: fromDate,
      rangeTo: toDate,
      checklists,
      createdAt: faker.date.recent(),
      createdBy: userID,
    });
    res.status(200).send(data);
  });

  /**
 * @api {get} /v1.0/checklist/:id Request Checklist By ID
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
  app.get('/v1.0/checklist/:num', (req, res) => {
    const num = req.params.num;
    faker.seed(parseInt(num, 10));
    const venueID = faker.random.number();
    const userID = faker.random.number();
    const questionCount = 15;
    const questions = [];

    for (let i = 1; i <= questionCount; i += 1) {
      const question = ({
        ID: i,
        questionID: i,
        answer: (faker.random.number() % 10 > 7) ? 1 : 0,
        date: faker.date.recent(),
        capcity: faker.random.number() % 200,
        name: `${faker.name.prefix()} ${
          faker.name.firstName()} ${
          faker.name.lastName()} ${
          faker.name.suffix()}`,
      });
      questions.push(question);
    }
    const data = ({
      ID: num,
      checklistID: num,
      venueID,
      venue: venue(venueID),
      userID,
      user: user(userID),
      questions,
      createdAt: faker.date.recent(),
      createdBy: userID,
    });
    res.status(200).send(data);
  });

  /**
 * @api {get} /v1.0/checklist/:id/pdf/ Request Checklist PDF By ID
 * @apiVersion 1.1.3
 * @apiName GetChecklistPDFByID
 * @apiGroup Checklists
 *
 * @apiParam {Number} id Checklist unique ID.
 *
 * @apiSuccess {File} PDF
 */
  app.get('/v1.0/checklist/:num/pdf/', (req, res) => {
    const num = req.params.num;
    faker.seed(parseInt(num, 10));
    const venueID = faker.random.number();
    const userID = faker.random.number();
    const date = faker.date.recent();
    const questionCount = 15;
    const questions = [];

    for (let i = 1; i <= questionCount; i += 1) {
      const question = ({
        ID: i,
        questionID: i,
        answer: (faker.random.number() % 10 > 2) ? 1 : 0,
        date: faker.date.past(),
        capacity: faker.random.number() % 200,
        name: `${faker.name.prefix()} ${
          faker.name.firstName()} ${
          faker.name.lastName()} ${
          faker.name.suffix()}`,
      });
      questions.push(question);
    }

    const data = ({
      ID: num,
      checklistID: num,
      venueID,
      venue: venue(venueID),
      userID,
      user: user(userID),
      questions,
      ipAddress: faker.internet.ip(),
      userAgent: faker.internet.userAgent(),
      createdAt: date,
      createdBy: userID,
    });

    const hummus = require('hummus');
    // var pdfWriter = hummus.createWriter(new hummus.PDFStreamForResponse(res));
    const inFilePath = '';

    const pdfWriter = hummus.createWriterToModify(
      new hummus.PDFRStreamForFile('./v1.0/assets/pdfs/fp-buildingsafetychecklist.pdf'),
      new hummus.PDFStreamForResponse(res),
    );

    const pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);
    const x1 = 495;
    const x2 = 540;
    let q = 0;
    const answerFont = ({
      font: pdfWriter.getFontForFile('./v1.0/assets/fonts/arial.ttf'),
      size: 10,
      colorspace: 'gray',
      color: 0x00,
    });

    const smallFont = ({
      font: pdfWriter.getFontForFile('./v1.0/assets/fonts/arial.ttf'),
      size: 8,
      colorspace: 'gray',
      color: 0x00,
    });

    const verySmallFont = ({
      font: pdfWriter.getFontForFile('./v1.0/assets/fonts/arial.ttf'),
      size: 6,
      colorspace: 'gray',
      color: 0x00,
    });


    pageModifier
      .startContext()
      .getContext()
      .writeText(
        `${data.createdAt.getUTCMonth() + 1}/${
          data.createdAt.getUTCDate()}/${
          data.createdAt.getUTCFullYear()}`,
        268, 668,
        answerFont,
      )
      .writeText(
        `${data.user.prefix} ${data.user.firstName} ${data.user.lastName} ${data.user.suffix}`,
        185, 44,
        answerFont,
      )
      .writeText(
        data.user.certificate.number,
        500, 44,
        smallFont,
      )
      .writeText(
        `Expires: ${data.user.certificate.expiresAt.getUTCMonth() + 1}/${
          data.user.certificate.expiresAt.getUTCDate()}/${
          data.user.certificate.expiresAt.getUTCFullYear()}`,
        500, 33,
        verySmallFont,
      )
      .writeText(
        (data.questions[q].answer) ? 'X' : '',
        x1, 600,
        answerFont,
      )
      .writeText(
        (!data.questions[q].answer) ? 'X' : '',
        x2, 600,
        answerFont,
      )
      .writeText(
        (data.questions[++q].answer) ? 'X' : '',
        x1, 555,
        answerFont,
      )
      .writeText(
        (!data.questions[q].answer) ? 'X' : '',
        x2, 555,
        answerFont,
      )
      .writeText(
        (data.questions[++q].answer) ? 'X' : '',
        x1, 530,
        answerFont,
      )
      .writeText(
        (!data.questions[q].answer) ? 'X' : '',
        x2, 530,
        answerFont,
      )
      .writeText(
        (data.questions[++q].answer) ? 'X' : '',
        x1, 505,
        answerFont,
      )
      .writeText(
        (!data.questions[q].answer) ? 'X' : '',
        x2, 505,
        answerFont,
      )
      .writeText(
        (data.questions[++q].answer) ? 'X' : '',
        x1, 480,
        answerFont,
      )
      .writeText(
        (!data.questions[q].answer) ? 'X' : '',
        x2, 480,
        answerFont,
      )
      .writeText(
        (data.questions[++q].answer) ? 'X' : '',
        x1, 455,
        answerFont,
      )
      .writeText(
        (!data.questions[q].answer) ? 'X' : '',
        x2, 455,
        answerFont,
      )
      .writeText(
        (data.questions[++q].answer) ? 'X' : '',
        x1, 430,
        answerFont,
      )
      .writeText(
        (!data.questions[q].answer) ? 'X' : '',
        x2, 430,
        answerFont,
      )
      .writeText(
        `${data.questions[q].date.getUTCMonth() + 1}/${
          data.questions[q].date.getUTCDate()}/${
          data.questions[q].date.getUTCFullYear()}`,
        360, 435,
        smallFont,
      )
      .writeText(
        (data.questions[++q].answer) ? 'X' : '',
        x1, 410,
        answerFont,
      )
      .writeText(
        (!data.questions[q].answer) ? 'X' : '',
        x2, 410,
        answerFont,
      )
      .writeText(
        (data.questions[++q].answer) ? 'X' : '',
        x1, 380,
        answerFont,
      )
      .writeText(
        (!data.questions[q].answer) ? 'X' : '',
        x2, 380,
        answerFont,
      )
      .writeText(
        data.questions[q].name,
        60, 370,
        smallFont,
      )
      .writeText(
        (data.questions[++q].answer) ? 'X' : '',
        x1, 340,
        answerFont,
      )
      .writeText(
        (!data.questions[q].answer) ? 'X' : '',
        x2, 340,
        answerFont,
      )
      .writeText(
        data.questions[q].name,
        320, 335,
        smallFont,
      )
      .writeText(
        (data.questions[++q].answer) ? 'X' : '',
        x1, 300,
        answerFont,
      )
      .writeText(
        (!data.questions[q].answer) ? 'X' : '',
        x2, 300,
        answerFont,
      )
      .writeText(
        data.questions[q].capacity,
        150, 297,
        smallFont,
      )
      .writeText(
        `${data.questions[q].date.getUTCMonth() + 1}/${
          data.questions[q].date.getUTCDate()}/${
          data.questions[q].date.getUTCFullYear()}`,
        135, 285,
        smallFont,
      )
      .writeText(
        (data.questions[++q].answer) ? 'X' : '',
        x1, 250,
        answerFont,
      )
      .writeText(
        (!data.questions[q].answer) ? 'X' : '',
        x2, 250,
        answerFont,
      )
      .writeText(
        `${data.questions[q].date.getUTCMonth() + 1}/${
          data.questions[q].date.getUTCDate()}/${
          data.questions[q].date.getUTCFullYear()}`,
        300, 250,
        smallFont,
      )
      .writeText(
        (data.questions[++q].answer) ? 'X' : '',
        x1, 220,
        answerFont,
      )
      .writeText(
        (!data.questions[q].answer) ? 'X' : '',
        x2, 220,
        answerFont,
      )
      .writeText(
        `${data.questions[q].date.getUTCMonth() + 1}/${
          data.questions[q].date.getUTCDate()}/${
          data.questions[q].date.getUTCFullYear()}`,
        300, 215,
        smallFont,
      )
      .writeText(
        (data.questions[++q].answer) ? 'X' : '',
        x1, 145,
        answerFont,
      )
      .writeText(
        (!data.questions[q].answer) ? 'X' : '',
        x2, 145,
        answerFont,
      )
      .writeText(
        `${data.questions[q].date.getUTCMonth() + 1}/${
          data.questions[q].date.getUTCDate()}/${
          data.questions[q].date.getUTCFullYear()}`,
        280, 140,
        smallFont,
      )
      .writeText(
        (data.questions[++q].answer) ? 'X' : '',
        x1, 105,
        answerFont,
      )
      .writeText(
        (!data.questions[q].answer) ? 'X' : '',
        x2, 105,
        answerFont,
      )
      .writeText(
        `${data.questions[q].date.getUTCMonth() + 1}/${
          data.questions[q].date.getUTCDate()}/${
          data.questions[q].date.getUTCFullYear()}`,
        170, 103,
        smallFont,
      )
      .writeText(
        'Document Prepared By: RezTechPro.com',
        110, 15,
        verySmallFont,
      )
      .writeText(
        `Document ID#: ${data.ID}`,
        230, 15,
        verySmallFont,
      )
      .writeText(
        data.createdAt,
        310, 15,
        verySmallFont,
      )
      .writeText(
        data.ipAddress,
        460, 15,
        verySmallFont,
      )
    ; // end writeText

    console.log((data.questions[0].answer) ? 'X' : '0');
    console.log((!data.questions[0].answer) ? 'X' : '0');
    console.log((data.questions[1].answer) ? 'X' : '0');
    console.log((!data.questions[1].answer) ? 'X' : '0');

    pageModifier
      .endContext()
      .writePage();

    pdfWriter.end();

    // pdfWriter.writePage(page);
    // pdfWriter.end();


    res.end();
  });
}; // end appRouter;


module.exports = appRouter;

