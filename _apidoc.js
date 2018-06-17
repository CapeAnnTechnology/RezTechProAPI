/**
 * @api {get} /files/ Request File List
 * @apiVersion 1.0.1
 * @apiName GetFiles
 * @apiGroup Files
 *
 * @apiSuccess {String} createdAt Timestamp of User creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */

 /**
 * @api {get} /file/ Request File Details [Random]
 * @apiVersion 1.0.1
 * @apiName GetFile
 * @apiGroup Files
 *
 * @apiParam {Number} id File unique ID.
 *
 * @apiSuccess {Number} ID ID of the File.
 * @apiSuccess {Number} fileID ID of the File.
 * @apiSuccess {String} createdAt Timestamp of File creation.
 * @apiSuccess {Number} createdBy User ID of generating User.
 */

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