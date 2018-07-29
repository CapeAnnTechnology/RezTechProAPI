const faker = require('faker');
// removed pdfkit
// var PDFDocument = require('pdfkit');

faker.seed(42);

const version = '2.0.1';

const CONTACTS_COLLECTION = 'contacts';
const CHECKLISTS_COLLECTION = 'checklists';

/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const Business = require('../models/Business');
const Certificate = require('../models/Certificate');
const Checklist = require('../models/Checklist');
const Event = require('../models/Event');
const Inspection = require('../models/Inspection');
const License = require('../models/License');
const Log = require('../models/Log');
const Rsvp = require('../models/Rsvp');
const User = require('../models/User');
const Venue = require('../models/Venue');

const appRouter = function (app, db) {
/** ***
*
* Static Functions
*
**** */

  function certificate(num) {
    faker.seed(parseInt(num, 10));
    const certificateID = faker.random.number();
    const data = ({
      id: certificateID,
      certificateID,
      number: faker.random.alphaNumeric(15),
      expiresAt: faker.date.future(),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
    return data;
  }

  function address(num) {
    faker.seed(parseInt(num, 10));
    const data = ({
      id: num,
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
      addressID,
      address: address(addressID),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
    return data;
  }



  function file(num) {
    faker.seed(parseInt(num, 10));
    const data = ({
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

  function venue(num) {
    faker.seed(parseInt(num, 10));
    const addressID = faker.random.number();
    const data = ({
      id: num,
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
      id: num,
      fileID: num,
      ipAddress: faker.internet.ip(),
      userAgent: faker.internet.userAgent(),
      createdAt: faker.date.past(),
      createdBy: faker.random.number(),
    });
    return data;
  }

  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: process.env.AUTH0_API_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithm: 'RS256',
  });

  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[process.env.NAMESPACE] || [];
    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send({message: 'Not authorized for admin access'});
    }
  }

  // Generic error handler used by all endpoints.
  function handleError(res, reason, message, code) {
    console.log(`ERROR: ${reason}`);
    res.status(code || 500).json({ error: message });
  }

/*
 |--------------------------------------
 | API Routes
 |--------------------------------------
 */

 const _eventListProjection = 'title startDatetime endDatetime viewPublic';
 const _checklistListProjection = 'title startDatetime endDatetime viewPublic';
 const _businessListProjection = 'title location phoneNumber faxNumber viewPublic comments';
 const _venueListProjection = 'title location phoneNumber viewPublic';
 const _logListProjection = 'action additional fileName ipAddress level lineNumber message referrer timestamp userAgent viewPublic';

/**
 * @api {get} /v2.0/ Welcome Message
 * @apiVersion 2.0.1
 * @apiName Welcome
 * @apiGroup General
 *
 * @apiSuccess {String} message Welcome Message.
 * @apiSuccess {String} version Version Number of API.
 */
  app.get('/', (req, res) => {
    res.status(200).send({ message: 'Welcome to our restful API', version });
  });
  app.get('/v2.0/', (req, res) => {
    res.status(200).send({ message: 'Welcome to our restful API', version });
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
  app.get('/v2.0/user', (req, res) => {
    const userID = faker.random.number();
    const addressID = faker.random.number();
    const data = ({
      id: userID,
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
  app.get('/v2.0/users/:num', (req, res) => {
    const users = [];
    const num = req.params.num;
    faker.seed(parseInt(num, 10));
    if (Number.isFinite(num) && num > 0) {
      for (let i = 0; i <= num - 1; i += 1) {
        const userID = faker.random.number();
        const addressID = faker.random.number();
        users.push({
          id: userID,
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
  app.get('/v2.0/user/:num', (req, res) => {
    const num = req.params.num;

    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const addressID = faker.random.number();
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
 * @api {get} /v2.0/business/ Request Business [Random]
 * @apiVersion 2.0.3
 * @apiName GetBusiness
 * @apiGroup Businesses
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
  app.get('/v2.0/businesses', (req, res) => {
    Business.find({}, _businessListProjection, (err, businesses) => {
      let businessArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (businesses) {
        businesses.forEach(business => {
          businessArr.push(business);
        });
      }
      res.send(businessArr);
    });
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
  app.get('/v2.0/business/:id', jwtCheck, (req, res) => {
    Business.findById(req.params.id, (err, business) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!business) {
        return res.status(400).send({message: 'Business not found.'});
      }
      res.send(business);
    });
  });

  /**
 * @api {get} /v2.0/business/:businessId/venues Venues by business ID
 * @apiVersion 2.0.1
 * @apiName PostContacts
 * @apiGroup Contacts
 *
 * @apiParam {Number} id Business ID
 *
 * @apiSuccess {Object} Venues
 *
 * @apiFailure {String} message 'Failed'
 */
  app.get('/v2.0/business/:businessId/venues', jwtCheck, adminCheck, (req, res) => {
    Venue.find({businessId: req.params.businessId}, (err, venues) => {
      let venuesArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (venues) {
        venues.forEach(venue => {
          venuesArr.push(venue);
        });
      }
      res.send(venuesArr);
    });
  });

  /**
 * @api {get} /v2.0/venues Request Venues [List]
 * @apiVersion 2.0.1
 * @apiName GetVenue
 * @apiGroup Venues
 *
 * @apiSuccess {Number} id ID of the Venue.
 * @apiSuccess {Number} venueID ID of the Venue.
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */
  app.get('/v2.0/venues', (req, res) => {
    Venue.find({}, _venueListProjection, (err, venues) => {
      let venueArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (venues) {
        venues.forEach(venue => {
          venueArr.push(venue);
        });
      }
      res.send(venueArr);
    });
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
  app.get('/v2.0/venue/:id', jwtCheck,(req, res) => {
    Venue.findById(req.params.id, (err, venue) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!venue) {
        return res.status(400).send({message: 'Venue not found.'});
      }
      res.send(venue);
    });
  });


/**
 * @api {get} /v2.0/business/:businessId/venues Venues by business ID
 * @apiVersion 2.0.1
 * @apiName PostContacts
 * @apiGroup Contacts
 *
 * @apiParam {Number} id Business ID
 *
 * @apiSuccess {Object} Venues
 *
 * @apiFailure {String} message 'Failed'
 */
  app.get('/v2.0/venue/:venueId/checklists', jwtCheck, adminCheck, (req, res) => { // jwtCheck, adminCheck,
    Checklist.find({venueId: req.params.venueId}, (err, checklists) => {
      let checklistsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (checklists) {
        checklists.forEach(checklist => {
          checklistsArr.push(checklist);
        });
      }
      res.send(checklistsArr);
    });
  });

/**
 * @api {get} /v2.0/venue/:venueId/inspections Inspections by venue ID
 * @apiVersion 2.0.1
 * @apiName GetVenueInspections
 * @apiGroup Venues
 *
 * @apiParam {Number} id Venue ID
 *
 * @apiSuccess {Object} Inspections
 *
 * @apiFailure {String} message 'Failed'
 */
  app.get('/v2.0/venue/:venueId/inspections', jwtCheck, adminCheck, (req, res) => {
    Inspection.find({venueId: req.params.venueId}, (err, inspections) => {
      let inspectionsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (inspections) {
        inspections.forEach(inspection => {
          inspectionsArr.push(inspection);
        });
      }
      res.send(inspectionsArr);
    })
    .populate('userId')
    .populate('venueId');
  });


  /**
 * @api {get} /v2.0/inspection/:id Request Checklist By ID
 * @apiVersion 2.0.2
 * @apiName GetInspectionByID
 * @apiGroup Inspections
 *
 * @apiParam {Number} id Inspection unique ID.
 *
 * @apiSuccess {Number} id ID of the Inspection.
 * @apiSuccess {Number} venueID ID of the Venue.
 * @apiSuccess {Object[]} venue Venue Details.
 * @apiSuccess {Number} userID ID of the User.
 * @apiSuccess {Object[]} user  User details.
 * @apiSuccess {String} createdAt Timestamp of Request.
 * @apiSuccess {Number} createdBy User ID of generating Checklist.
 */
 app.get('/v2.0/inspection/:id', jwtCheck, adminCheck, (req, res) => {
    Inspection.findById(req.params.id, (err, inspection) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!inspection) {
        return res.status(400).send({message: 'Inspection not found.'});
      }
      res.send(inspection);
    })
    .populate({
      path: 'userId',
      populate: { path: 'certificates' }
    })
    .populate('venueId');
  });

/**
 * @api {get} /v2.0/log/new Create Log Entries
 * @apiVersion 2.0.1
 * @apiName PostLog
 * @apiGroup Logs
 *
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Object[]} logs Log Entry Details.
 */
  app.post('/v2.0/inspection/:venueId/new', jwtCheck, adminCheck, (req, res) => {
    Inspection.findOne({
        type: req.body.type,
        inspectionDatetime: req.body.inspectionDatetime,
        expirationDatetime: req.body.expirationDatetime,
        venueId: req.params.venueId
      }, (err, existingInspection) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (existingInspection) {
        return res.status(409).send({message: 'You have already created an Inspection with this type, venue and date/time.'});
      }
      const inspection = new Inspection({
        type: req.body.type,
        inspectionDatetime: req.body.inspectionDatetime,
        expirationDatetime: req.body.expirationDatetime,
        userId: req.body.userId,
        timestamp: req.body.timestamp,
        userAgent: req.get('User-Agent'),
        referrer: req.headers.referer,
        ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        version: req.body.version,
        venueId: req.params.venueId
      });
      inspection.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(inspection);
      });
    });
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
  app.get('/v2.0/address', (req, res) => {
    const addressID = faker.random.number();
    const data = (address(addressID));
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
  app.get('/v2.0/address/:num', (req, res) => {
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

  app.get('/v2.0/owner/:num', (req, res) => {
    const num = req.params.num;
    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const userID = faker.random.number();
      const data = ({
        id: num,
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
  app.get('/v2.0/owns/:num', (req, res) => {
    const num = req.params.num;
    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const data = ({
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
  app.get('/v2.0/manager/:num', (req, res) => {
    const num = req.params.num;
    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const data = ({
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
  app.get('/v2.0/manages/:num', (req, res) => {
    const num = req.params.num;
    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const venueID = faker.random.number();
      const data = ({
        id: num,
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

  app.get('/v2.0/employees/:num', (req, res) => {
    const num = req.params.num;
    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const employeeCount = faker.random.number() % 10;
      const employees = [];
      for (let i = 0; i <= employeeCount; i += 1) {
        const userID = faker.random.number();
        employees.push({
          id: userID,
          userID,
          user: user(userID),
          createdAt: faker.date.past(),
          createdBy: faker.random.number(),
        });
      }
      const data = ({
        id: num,
        venueID: num,
        employees,

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

  app.get('/v2.0/employed/:num', (req, res) => {
    const num = req.params.num;
    if (Number.isFinite(num) && num > 0) {
      faker.seed(parseInt(num, 10));
      const data = ({
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

  app.get('/v2.0/files/', (req, res) => {
    const files = [];
    const fileCount = faker.random.number() % 20;
    for (let i = 0; i <= fileCount; i += 1) {
      const fileID = faker.random.number();
      files.push(file(fileID));
    }
    const data = ({
      createdAt: faker.date.past(),
      files,
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

  app.get('/v2.0/file/', (req, res) => {
    const fileID = faker.random.number();
    const data = (file(fileID));
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

  app.get('/v2.0/file/:num', (req, res) => {
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
 * @api {get} /v2.0/logs/ Request Recent Log Entries
 * @apiVersion 2.0.1
 * @apiName GetLogs
 * @apiGroup Logs
 *
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Object[]} logs Log Entry Details.
 */
app.get('/v2.0/logs', jwtCheck, adminCheck, (req, res) => {
    // console.log(req.get('User-Agent'));
    // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log(ip);

    Log.find({},
      _logListProjection, (err, logs) => {
      let logsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (logs) {
        logs.forEach(log => {
          logsArr.push(log);
        });
      }
      res.send(logsArr);
    });
  });

/**
 * @api {get} /v2.0/log/new Create Log Entries
 * @apiVersion 2.0.1
 * @apiName PostLog
 * @apiGroup Logs
 *
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Object[]} logs Log Entry Details.
 */
  app.post('/v2.0/log/new', (req, res) => { // jwtCheck, adminCheck,
    Log.findOne({
      message: req.body.message,
      level: req.body.level,
      timestamp: req.body.timestamp}, (err, existingEvent) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (existingEvent) {
        return res.status(409).send({message: 'You have already created an log with this message, level and date/time.'});
      }
      const log = new Log({
        action: req.body.action,
        data: req.body.data,
        ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        referrer: req.headers.referer,
        additional: req.body.additional,
        fileName: req.body.fileName,
        level: req.body.level,
        lineNumber: req.body.level,
        message: req.body.message,
        timestamp: req.body.timestamp,
        viewPublic: req.body.viewPublic
      });
      log.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(log);
      });
    });
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
  app.get('/v2.0/log/:id', jwtCheck, adminCheck, (req, res) => {
    Log.findById(req.params.id, (err, log) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!log) {
        return res.status(400).send({message: 'Log Entry not found.'});
      }
      res.send(log);
    });
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
  app.get('/v2.0/capacity/:num', (req, res) => {
    const num = req.params.num;
    const capacitySeed = faker.random.number();
    faker.seed(parseInt(num, 10));
    const maximum = faker.random.number() % 200;
    faker.seed(capacitySeed);
    const current = faker.random.number() % maximum;
    const data = ({
      id: num,
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
   * @api {get} /v2.0/contacts/ Request Contacts
   * @apiVersion 2.0.1
   * @apiName GetContacts
   * @apiGroup Contacts
   *
   * @apiSuccess {Object} contacts Contacts
   *
   * @apiFailure {String} message 'Failed to create new contact.'
   */
  app.get('/v2.0/contacts', (req, res) => {
    db.collection(CONTACTS_COLLECTION).find({}).toArray((err, docs) => {
      if (err) {
        handleError(res, err.message, 'Failed to get contacts.');
      } else {
        res.status(200).json(docs);
      }
    });
  });

  /**
 * @api {post} /v2.0/contacts/ Create New Contact
 * @apiVersion 2.0.1
 * @apiName PostContacts
 * @apiGroup Contacts
 *
 * @apiParam {object} body New Contacts
 *
 * @apiSuccess {Number} Contact ID
 *
 * @apiFailure {String} message 'Failed to create new contact.'
 */
  app.post('/v2.0/contacts', (req, res) => {
    const newContact = req.body;
    newContact.createDate = new Date();

    if (!(req.body.firstName || req.body.lastName)) {
      handleError(res, 'Invalid user input', 'Must provide a first or last name.', 400);
    }

    db.collection(CONTACTS_COLLECTION).insertOne(newContact, (err, doc) => {
      if (err) {
        handleError(res, err.message, 'Failed to create new contact.');
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  });


  /**
 * @api {get} /v2.0/events/ list of public events starting in the future
 * @apiVersion 2.0.1
 * @apiName PostContacts
 * @apiGroup Events
 *
 * @apiSuccess {Object} Events
 *
 * @apiFailure {String} message 'Failed to create new contact.'
 */
  app.get('/v2.0/events', (req, res) => {
    Event.find({viewPublic: true, startDatetime: { $gte: new Date() }},
      _eventListProjection, (err, events) => {
      let eventsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (events) {
        events.forEach(event => {
          eventsArr.push(event);
        });
      }
      res.send(eventsArr);
    });
  });

  /**
 * @api {get} /v2.0/events/admin list of all events, public and private (admin only)
 * @apiVersion 2.0.1
 * @apiName PostContacts
 * @apiGroup Events
 *
 *
 * @apiSuccess {Object} Events
 *
 * @apiFailure {String} message 'Failed'
 */
  app.get('/v2.0/events/admin', jwtCheck, adminCheck, (req, res) => {
    Event.find({}, _eventListProjection, (err, events) => {
      let eventsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (events) {
        events.forEach(event => {
          eventsArr.push(event);
        });
      }
      res.send(eventsArr);
    });
  });



/**
 * @api {get} /v2.0/event/:id event by event ID
 * @apiVersion 2.0.1
 * @apiName GetEventById
 * @apiGroup Events
 *
 * @apiParam {Number} id Event ID
 *
 * @apiSuccess {Object} Events
 *
 * @apiFailure {String} message 'Failed'
 */
  app.get('/v2.0/event/:id', jwtCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!event) {
        return res.status(400).send({message: 'Event not found.'});
      }
      res.send(event);
    });
  });


/**
 * @api {get} /v2.0/events/:userId event by user ID
 * @apiVersion 2.0.1
 * @apiName GetEventsByUserId
 * @apiGroup Events
 *
 * @apiParam {Number} id User ID
 *
 * @apiSuccess {Object} Events
 *
 * @apiFailure {String} message 'Failed'
 */
  app.get('/v2.0/events/:userId', jwtCheck, (req, res) => {
    Rsvp.find({userId: req.params.userId}, 'eventId', (err, rsvps) => {
      const _eventIdsArr = rsvps.map(rsvp => rsvp.eventId);
      const _rsvpEventsProjection = 'title startDatetime endDatetime';
      let eventsArr = [];

      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (rsvps) {
        Event.find(
          {_id: {$in: _eventIdsArr}, startDatetime: { $gte: new Date() }},
          _rsvpEventsProjection, (err, events) => {
          if (err) {
            return res.status(500).send({message: err.message});
          }
          if (events) {
            events.forEach(event => {
              eventsArr.push(event);
            });
          }
          res.send(eventsArr);
        });
      }
    });
  });

/**
 * @api {post} /v2.0/event/new Post new event
 * @apiVersion 2.0.1
 * @apiName PostEventNew
 * @apiGroup Contacts
 *
 * @apiParam {Number} id Event ID
 *
 * @apiSuccess {Object} Events
 *
 * @apiFailure {String} message 'Failed'
 */
  app.post('/v2.0/event/new', jwtCheck, adminCheck, (req, res) => {
    Event.findOne({
      title: req.body.title,
      location: req.body.location,
      startDatetime: req.body.startDatetime}, (err, existingEvent) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (existingEvent) {
        return res.status(409).send({message: 'You have already created an event with this title, location, and start date/time.'});
      }
      const event = new Event({
        title: req.body.title,
        location: req.body.location,
        startDatetime: req.body.startDatetime,
        endDatetime: req.body.endDatetime,
        description: req.body.description,
        viewPublic: req.body.viewPublic
      });
      event.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(event);
      });
    });
  });


 /**
 * @api {put} /v2.0/event/:id Update Event by Id
 * @apiVersion 2.0.1
 * @apiName PutEventbyId
 * @apiGroup Events
 *
 * @apiParam {Number} id Event ID
 *
 * @apiSuccess {Object} Event
 *
 * @apiFailure {String} message 'Failed'
 */
  app.put('/v2.0/event/:id', jwtCheck, adminCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!event) {
        return res.status(400).send({message: 'Event not found.'});
      }
      event.title = req.body.title;
      event.location = req.body.location;
      event.startDatetime = req.body.startDatetime;
      event.endDatetime = req.body.endDatetime;
      event.viewPublic = req.body.viewPublic;
      event.description = req.body.description;

      event.save(err => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(event);
      });
    });
  });

/**
 * @api {delete} /v2.0/event/:id Delete Event by Id
 * @apiVersion 2.0.1
 * @apiName DeleteEventById
 * @apiGroup Events
 *
 * @apiParam {Number} id Event ID
 *
 * @apiSuccess {Object} Event
 *
 * @apiFailure {String} message 'Failed'
 */
  app.delete('/v2.0/event/:id', jwtCheck, adminCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!event) {
        return res.status(400).send({message: 'Event not found.'});
      }
      Rsvp.find({eventId: req.params.id}, (err, rsvps) => {
        if (rsvps) {
          rsvps.forEach(rsvp => {
            rsvp.remove();
          });
        }
        event.remove(err => {
          if (err) {
            return res.status(500).send({message: err.message});
          }
          res.status(200).send({message: 'Event and RSVPs successfully deleted.'});
        });
      });
    });
  });


 /**
 * @api {get} /v2.0/event/:eventId/rsvps RSVPs by event ID
 * @apiVersion 2.0.1
 * @apiName PostContacts
 * @apiGroup Contacts
 *
 * @apiParam {Number} id Event ID
 *
 * @apiSuccess {Object} Rsvps
 *
 * @apiFailure {String} message 'Failed'
 */
  app.get('/v2.0/event/:eventId/rsvps', jwtCheck, (req, res) => {
    Rsvp.find({eventId: req.params.eventId}, (err, rsvps) => {
      let rsvpsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (rsvps) {
        rsvps.forEach(rsvp => {
          rsvpsArr.push(rsvp);
        });
      }
      res.send(rsvpsArr);
    });
  });



/**
 * @api {post} /v2.0/rsvp/new Create New RSVP
 * @apiVersion 2.0.1
 * @apiName PostRsvpNew
 * @apiGroup RSVPs
 *
 * @apiSuccess {Object} Rsvp
 *
 * @apiFailure {String} message 'Failed'
 */
  app.post('/v2.0/rsvp/new', jwtCheck, (req, res) => {
    Rsvp.findOne({eventId: req.body.eventId, userId: req.body.userId}, (err, existingRsvp) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (existingRsvp) {
        return res.status(409).send({message: 'You have already RSVPed to this event.'});
      }
      const rsvp = new Rsvp({
        userId: req.body.userId,
        name: req.body.name,
        eventId: req.body.eventId,
        attending: req.body.attending,
        guests: req.body.guests,
        comments: req.body.comments
      });
      rsvp.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(rsvp);
      });
    });
  });


// PUT (edit) an existing RSVP
/**
 * @api {put} /v2.0/rsvp/:id Edit an existing RSVP
 * @apiVersion 2.0.1
 * @apiName PutRSVP
 * @apiGroup RSVPs
 *
 * @apiParam {Number} id RSVP ID
 *
 * @apiSuccess {Object} Rsvp
 *
 * @apiFailure {String} message 'Failed'
 */
  app.put('/v2.0/rsvp/:id', jwtCheck, (req, res) => {
    Rsvp.findById(req.params.id, (err, rsvp) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!rsvp) {
        return res.status(400).send({message: 'RSVP not found.'});
      }
      if (rsvp.userId !== req.user.sub) {
        return res.status(401).send({message: 'You cannot edit someone else\'s RSVP.'});
      }
      rsvp.name = req.body.name;
      rsvp.attending = req.body.attending;
      rsvp.guests = req.body.guests;
      rsvp.comments = req.body.comments;

      rsvp.save(err => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(rsvp);
      });
    });
  });

  /**
 * @api {get} /v2.0/checklists/ list of public checklists starting in the future
 * @apiVersion 2.0.1
 * @apiName GetChecklists
 * @apiGroup Checklists
 *
 * @apiSuccess {Object} Checklists
 *
 * @apiFailure {String} message 'Failed to create new contact.'
 */
  app.get('/v2.0/checklists', (req, res) => {
    Checklist.find({viewPublic: true, startDatetime: { $lte: new Date() }},
      _checklistListProjection, (err, checklists) => {
      let checklistArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (checklists) {
        checklists.forEach(checklist => {
          checklistArr.push(checklist);
        });
      }
      res.send(checklistArr);
    });
  });


  /**
 * @api {post} /v2.0/checklists/ Create New Checklist
 * @apiVersion 2.0.1
 * @apiName PostChecklist
 * @apiGroup Checklists
 *
 * @apiParam {object} body New Checklist
 *
 * @apiSuccess {Number} Checklist ID
 *
 * @apiFailure {String} message 'Failed to create new checklist.'
 */
  app.post('/v2.0/checklist', (req, res) => {
    const newChecklist = req.body;
    newChecklist.createDate = new Date();
    newChecklist.createdAt = newChecklist.createDate;

    if (!req.body.venueID || !req.body.userID) {
      handleError(res, 'Invalid user input', 'Must provide a venueID and userID', 400);
    } else {
      db.collection(CHECKLISTS_COLLECTION).insertOne(newChecklist, (err, doc) => {
        if (err) {
          handleError(res, err.message, 'Failed to create new checklist.');
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    }
  });

  /**
 * @api {get} /v2.0/checklists/admin list of all checklists, public and private (admin only)
 * @apiVersion 2.0.1
 * @apiName GetChecklists
 * @apiGroup Checklists
 *
 *
 * @apiSuccess {Object} Events
 *
 * @apiFailure {String} message 'Failed'
 */
  app.get('/v2.0/checklists/admin', jwtCheck, adminCheck, (req, res) => {
    Checklist.find({}, _checklistListProjection, (err, checklists) => {
      let checklistsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (checklists) {
        checklists.forEach(checklist => {
          checklistArr.push(checklist);
        });
      }
      res.send(checklistArr);
    });
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
 app.get('/v2.0/checklist/:id', jwtCheck, (req, res) => {
    Checklist.findById(req.params.id, (err, checklist) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!checklist) {
        return res.status(400).send({message: 'Checklist not found.'});
      }
      res.send(checklist);
    })
    .populate({
      path: 'userId',
      populate: { path: 'certificates' }
    })
    .populate('venueId');
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
  app.get('/v2.0/checklists/:num', (req, res) => {
    const num = req.params.num;
    const checklists = [];
    faker.seed(parseInt(num, 10));
    const userID = faker.random.number();
    const checklistCount = faker.random.number() % 30;
    for (let i = 0; i <= checklistCount; i += 1) {
      const checklistID = faker.random.number();
      checklists.push(checklist(checklistID));
    }
    const data = ({
      id: num,
      venueID: num,
      venue: venue(num),
      checklists,
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
  app.get('/v2.0/checklists/:num/recent/', (req, res) => {
    const num = req.params.num;
    const checklists = [];
    faker.seed(parseInt(num, 10));
    const userID = faker.random.number();
    const checklistCount = faker.random.number() % 30;
    for (let i = 0; i <= checklistCount; i += 1) {
      const checklistID = faker.random.number();
      checklists.push(checklist(checklistID));
    }
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 7);
    const toDate = new Date();
    const data = ({
      id: num,
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
 * @api {get} /v2.0/checklists/:id/from/:month/:day/:year/to/:month/:day/:year/
  Request Recent Checklist By Venue ID And Date Range
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
  app.get('/v2.0/checklists/:num/from/:from_month/:from_day/:from_year/to/', (req, res) => {
    const num = req.params.num;
    const fromMonth = req.params.from_month;
    const fromDay = req.params.from_day;
    const fromYear = req.params.from_year;
    const fromDate = new Date(fromYear, fromMonth - 1, fromDay);

    const toMonth = req.params.from_month;
    const toDay = req.params.from_day;
    const toYear = req.params.from_year;
    const toDate = new Date(toYear, toMonth - 1, toDay);

    const checklists = [];
    faker.seed(parseInt(num, 10));
    const venueID = faker.random.number();
    const userID = faker.random.number();
    const checklistCount = faker.random.number() % 30;
    for (let i = 0; i <= checklistCount; i += 1) {
      const checklistID = faker.random.number();
      checklists.push(checklist(checklistID));
    }
    const data = ({
      id: num,
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
  app.get('/v2.0/checklist/:num', (req, res) => {
    const num = req.params.num;
    faker.seed(parseInt(num, 10));
    const venueID = faker.random.number();
    const userID = faker.random.number();
    const questionCount = 15;
    const questions = [];

    for (let i = 1; i <= questionCount; i += 1) {
      const question = ({
        id: i,
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
      id: num,
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
 * @api {post} /v2.0/checklist/new Post new checklist
 * @apiVersion 2.0.1
 * @apiName PostChecklistNew
 * @apiGroup Checklists
 *
 * @apiSuccess {Object} Checklist
 *
 * @apiFailure {String} message 'Failed'
 */
  app.post('/v2.0/checklist/new', jwtCheck, adminCheck, (req, res) => {
    Checklist.findOne({
      title: req.body.title,
      location: req.body.location,
      startDatetime: req.body.startDatetime}, (err, existingChecklist) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (existingChecklist) {
        return res.status(409).send({message: 'You have already created an checklist with this title, location, and start date/time.'});
      }
      const checklist = new Checklist({
        venueId: req.body.venueId,
        userId: req.body.userId,
        timestamp: req.body.timestamp,
        version: req.body.version,
        ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        question_1: String,
        question_2: String,
        question_3: String,
        question_4: String,
        question_5: String,
        question_6: String,
        question_7: String,
        question_7_date: { type: Date, required: true },
        question_8: String,
        question_9: String,
        question_9_person: String,
        question_10: String,
        question_10_person: String,
        question_11: String,
        question_11_capacity: Number,
        question_11_date: { type: Date, required: true },
        question_12: String,
        question_12_date: { type: Date, required: true },
        question_13: String,
        question_13_date: { type: Date, required: true },
        question_14: String,
        question_14_date: { type: Date, required: true },
        question_15: String,
        question_15_date: { type: Date, required: true }

      });
      checklist.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(checklist);
      });
    });
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
  app.get('/v2.0/checklist/:id/pdf/', (req, res) => {
    Checklist.findById(req.params.id, (err, checklist) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!checklist) {
        return res.status(400).send({message: 'Checklist not found.'});
      }

    console.log(checklist);
    console.log(checklist.userId.user_metadata);
    // const num = req.params.id;
    // faker.seed(parseInt(num, 10));
    // const venueID = checklist.venueId;
    // const userID = checklist.userId;
    // const date = checklist.timestamp;

    // const data = ({
    //   id: num,
    //   checklistID: num,
    //   venueID,
    //   venue: venue(venueID),
    //   userID,
    //   user: user(userID),
    //   questions,
    //   ipAddress: faker.internet.ip(),
    //   userAgent: faker.internet.userAgent(),
    //   createdAt: date,
    //   createdBy: userID,
    // });

    const hummus = require('hummus');

    const pdfWriter = hummus.createWriterToModify(
      new hummus.PDFRStreamForFile('./v2.0/assets/pdfs/fp-buildingsafetychecklist.pdf'),
      new hummus.PDFStreamForResponse(res),
    );

    const pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);
    const x1 = 495;
    const x2 = 540;
    let q = 0;
    const answerFont = ({
      font: pdfWriter.getFontForFile('./v2.0/assets/fonts/arial.ttf'),
      size: 10,
      colorspace: 'gray',
      color: 0x00,
    });

    const smallFont = ({
      font: pdfWriter.getFontForFile('./v2.0/assets/fonts/arial.ttf'),
      size: 8,
      colorspace: 'gray',
      color: 0x00,
    });

    const verySmallFont = ({
      font: pdfWriter.getFontForFile('./v2.0/assets/fonts/arial.ttf'),
      size: 6,
      colorspace: 'gray',
      color: 0x00,
    });


    pageModifier
      .startContext()
      .getContext()
      .writeText(
        `${checklist.timestamp.getUTCMonth() + 1}/${
          checklist.timestamp.getUTCDate()}/${
          checklist.timestamp.getUTCFullYear()}`,
        268, 668,
        answerFont,
      )
      .writeText(
        `${checklist.userId.user_metadata.prefix} ${checklist.userId.user_metadata.given_name} ${checklist.userId.user_metadata.family_name} ${checklist.userId.user_metadata.suffix}`,
        185, 44,
        answerFont,
      )
      .writeText(
        checklist.userId.certificates[0].number,
        500, 44,
        smallFont,
      )
      .writeText(
        `Expires: ${checklist.userId.certificates[0].endDatetime.getUTCMonth() + 1}/${
          checklist.userId.certificates[0].endDatetime.getUTCDate()}/${
          checklist.userId.certificates[0].endDatetime.getUTCFullYear()}`,
        500, 33,
        verySmallFont,
      )
      .writeText(
        (checklist.question_1 == 'true') ? 'X' : '',
        x1, 600,
        answerFont,
      )
      .writeText(
        (checklist.question_1 == 'false') ? 'X' : '',
        x2, 600,
        answerFont,
      )
      .writeText(
        (checklist.question_2 == 'true') ? 'X' : '',
        x1, 555,
        answerFont,
      )
      .writeText(
        (checklist.question_2 == 'false') ? 'X' : '',
        x2, 555,
        answerFont,
      )
      .writeText(
        (checklist.question_3 == 'true') ? 'X' : '',
        x1, 530,
        answerFont,
      )
      .writeText(
        (checklist.question_3 == 'false') ? 'X' : '',
        x2, 530,
        answerFont,
      )
      .writeText(
        (checklist.question_4 == 'true') ? 'X' : '',
        x1, 505,
        answerFont,
      )
      .writeText(
        (checklist.question_4 == 'false') ? 'X' : '',
        x2, 505,
        answerFont,
      )
      .writeText(
        (checklist.question_5 == 'true') ? 'X' : '',
        x1, 480,
        answerFont,
      )
      .writeText(
        (checklist.question_5 == 'false') ? 'X' : '',
        x2, 480,
        answerFont,
      )
      .writeText(
        (checklist.question_6 == 'true') ? 'X' : '',
        x1, 455,
        answerFont,
      )
      .writeText(
        (checklist.question_6 == 'false') ? 'X' : '',
        x2, 455,
        answerFont,
      )
      .writeText(
        (checklist.question_7 == 'true') ? 'X' : '',
        x1, 430,
        answerFont,
      )
      .writeText(
        (checklist.question_7 == 'false') ? 'X' : '',
        x2, 430,
        answerFont,
      )
      .writeText(
        `${checklist.question_7_date.getUTCMonth() + 1}/${
          checklist.question_7_date.getUTCDate()}/${
          checklist.question_7_date.getUTCFullYear()}`,
        360, 435,
        smallFont,
      )
      .writeText(
        (checklist.question_8 == 'true') ? 'X' : '',
        x1, 410,
        answerFont,
      )
      .writeText(
        (checklist.question_8 == 'false') ? 'X' : '',
        x2, 410,
        answerFont,
      )
      .writeText(
        (checklist.question_9 == 'true') ? 'X' : '',
        x1, 380,
        answerFont,
      )
      .writeText(
        (checklist.question_9 == 'false') ? 'X' : '',
        x2, 380,
        answerFont,
      )
      .writeText(
        checklist.question_9_person,
        60, 370,
        smallFont,
      )
      .writeText(
        (checklist.question_10 == 'true') ? 'X' : '',
        x1, 340,
        answerFont,
      )
      .writeText(
        (checklist.question_10 == 'false') ? 'X' : '',
        x2, 340,
        answerFont,
      )
      .writeText(
        checklist.question_10_person,
        320, 335,
        smallFont,
      )
      .writeText(
        (checklist.question_11 == 'true') ? 'X' : '',
        x1, 300,
        answerFont,
      )
      .writeText(
        (checklist.question_11 == 'false') ? 'X' : '',
        x2, 300,
        answerFont,
      )
      .writeText(
        checklist.question_11_capacity,
        150, 297,
        smallFont,
      )
      .writeText(
        `${checklist.question_11_date.getUTCMonth() + 1}/${
          checklist.question_11_date.getUTCDate()}/${
          checklist.question_11_date.getUTCFullYear()}`,
        135, 285,
        smallFont,
      )
      .writeText(
        (checklist.question_12 == 'true') ? 'X' : '',
        x1, 250,
        answerFont,
      )
      .writeText(
        (checklist.question_12 == 'false') ? 'X' : '',
        x2, 250,
        answerFont,
      )
      .writeText(
        `${checklist.question_12_date.getUTCMonth() + 1}/${
          checklist.question_12_date.getUTCDate()}/${
          checklist.question_12_date.getUTCFullYear()}`,
        300, 250,
        smallFont,
      )
      .writeText(
        (checklist.question_13 == 'true') ? 'X' : '',
        x1, 220,
        answerFont,
      )
      .writeText(
        (checklist.question_13 == 'false') ? 'X' : '',
        x2, 220,
        answerFont,
      )
      .writeText(
        `${checklist.question_13_date.getUTCMonth() + 1}/${
          checklist.question_13_date.getUTCDate()}/${
          checklist.question_13_date.getUTCFullYear()}`,
        300, 215,
        smallFont,
      )
      .writeText(
        (checklist.question_14 == 'true') ? 'X' : '',
        x1, 145,
        answerFont,
      )
      .writeText(
        (checklist.question_14 == 'false') ? 'X' : '',
        x2, 145,
        answerFont,
      )
      .writeText(
        `${checklist.question_14_date.getUTCMonth() + 1}/${
          checklist.question_14_date.getUTCDate()}/${
          checklist.question_14_date.getUTCFullYear()}`,
        280, 140,
        smallFont,
      )
      .writeText(
        (checklist.question_15 == 'true') ? 'X' : '',
        x1, 105,
        answerFont,
      )
      .writeText(
        (checklist.question_15 == 'false') ? 'X' : '',
        x2, 105,
        answerFont,
      )
      .writeText(
        `${checklist.question_15_date.getUTCMonth() + 1}/${
          checklist.question_15_date.getUTCDate()}/${
          checklist.question_15_date.getUTCFullYear()}`,
        170, 103,
        smallFont,
      )
      .writeText(
        'Prepared By: RezTechPro.com',
        85, 16,
        verySmallFont,
      )
      .writeText(
        `ID#: ${checklist._id}`,
        175, 16,
        verySmallFont,
      )
      .writeText(
        checklist.timestamp,
        280, 16,
        verySmallFont,
      )
      .writeText(
        `IP Addr: ${checklist.ipAddress}`,
        470, 16,
        verySmallFont,
      ); // end writeText

    pageModifier
      .endContext()
      .writePage();

    pdfWriter.end();

    // pdfWriter.writePage(page);
    // pdfWriter.end();


    res.end();

    })
    .populate({
      path: 'userId',
      populate: { path: 'certificates' }
    })
    .populate('venueId'); // end findById
  }); // end checklist/:id/pdf



}; // end appRouter;


module.exports = appRouter;

