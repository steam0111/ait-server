const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const isAuthenticated = require('../middleware/isAuthenticated');
const isCaregiver = require('../middleware/isCaregiver');
const verifyToken = require('../middleware/verifyToken');
const check = require('express-validator').check;

module.exports = function (passport) {
  router.get('/', require('./pages/main').get);
  router.get(
    '/personalArea/:page',
    isAuthenticated,
    require('./pages/personal_area'),
  );
  router.get(
    '/publicProfile/admins/id:_id',
    isAuthenticated,
    require('./pages/public_profile').get,
  );
  router.get(
    '/publicProfile/coaches/id:_id',
    isAuthenticated,
    require('./pages/public_profile').get,
  );
  router.get(
    '/publicProfile/students/id:_id',
    isAuthenticated,
    isCaregiver,
    require('./pages/public_profile').get,
  );
  router.get(
    '/test_settings/id:_id',
    isAuthenticated,
    require('./pages/test_settings').get,
  );
  router.get('/developers', isAuthenticated, require('./pages/developers').get);

  router.post(
    '/signup',
    passport.authenticate('signup', {
      successRedirect: '/personalArea/1',
      failureRedirect: '/',
      failureFlash: true,
    }),
  );
  router.post(
    '/login',
    passport.authenticate('login', {
      successRedirect: '/personalArea/1',
      failureRedirect: '/',
      failureFlash: true,
    }),
  );
  router.get('/signout', function (req, res) {
    req.logout()
    res.redirect('/')
  });

  //router.post('/restore-password', require('./restore_password').post);
  router.post('/forgot_password', require('./forgot_password').post);
  router.post('/reset_password', require('./reset_password').post);
  router.get('/reset_password', require('./reset_password').get);

  router.post('/addNewAdmin', isAuthenticated, require('./add/admin').post);
  router.post('/addNewCoach', isAuthenticated, require('./add/caregiver').post);
  router.post('/addNewStudent', isAuthenticated, require('./add/pid').post);

  router.post(
    '/delete-pid/id:_id',
    isAuthenticated,
    isCaregiver,
    require('./delete_pid').post,
  );
  router.post(
    '/deleteAdmin/id:_id',
    isAuthenticated,
    require('./delete_admin').post,
  );
  router.post(
    '/deleteCoach/id:_id',
    isAuthenticated,
    require('./delete_caregiver').post,
  );
  router.post(
    '/updateStudent/id:_id',
    isAuthenticated,
    isCaregiver,
    require('./update_pid').post,
  );

  // MoneyGame
  router.get(
    '/configure/money-game/id:_id',
    isAuthenticated,
    require('./applications/money_game/configure').get,
  );
  router.post(
    '/configure/money-game/id:_id',
    isAuthenticated,
    require('./applications/money_game/configure').post,
  );

  // MoneyGame Second
  router.get(
    '/configure/money-game-second/id:_id',
    isAuthenticated,
    require('./applications/money_game_second/configure').get,
  );
  router.post(
    '/configure/money-game-second/id:_id',
    isAuthenticated,
    require('./applications/money_game_second/configure').post,
  );

  // modules
  router.get('/modules/:page', isAuthenticated, require('./modules/list'));
  router.post('/addNewModule', isAuthenticated, require('./modules/add').post);
  router.get(
    '/modules/detail/id:_id',
    isAuthenticated,
    require('./modules/detail').get,
  );
  router.post(
    '/delete-module/id:_id',
    isAuthenticated,
    require('./modules/delete').post,
  ) ;
  router.post(
    '/searchModule',
    isAuthenticated,
    require('./modules/search_module').post,
  );
  router.post(
      '/resetSearchModule',
      isAuthenticated,
      require('./modules/reset_search_module').post,
  );
  router.post(
      '/approve-module/id:_id',
      isAuthenticated,
      require('./modules/approve').post,
  );

  // configuration module
  router.get(
    '/api/configuration_module/applications/items/:currentPage?/:itemsPerPage?',
    require('./configuration_module/applications').getItems,
  );
  router.get(
    '/api/configuration_module/applications/item/:_id',
    require('./configuration_module/applications').getItem,
  );
  router.post(
    '/api/configuration_module/applications/item/',
    require('./configuration_module/applications').addItem,
  );
  router.put(
    '/api/configuration_module/applications/item/:_id',
    check('name', 'Name is a required field').not().isEmpty(),
    check('descriptionCode').not().isEmpty(),
    check('defaultSettings').not().isEmpty(),
    require('./configuration_module/applications').updateItem,
  );
  router.delete(
    '/api/configuration_module/applications/item/:_id',
    require('./configuration_module/applications').deleteItem,
  );

  router.get(
    '/api/configuration_module/settings/item/:application_id/:user_id',
    require('./configuration_module/settings').getItem,
  );

  router.put(
    '/api/configuration_module/settings/item/:application_id/:user_id',
    require('./configuration_module/settings').updateItem,
  );

  // swagger definition
  const swaggerDefinition = require('../swagger.json')

  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
  };

  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options)

  // serve swagger
  router.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  });

  /*-----------------
      **** API ****
  *-----------------/
  
 /**
   * @swagger
   * /api/v1/login/get-pictograms:
   *   get:
   *     tags:
   *       - ""
   *     summary: "Get pictograms for PID authorization"
   *     description: ""
   *     produces:
   *       - application/json
   *     responses:
   *       200:  
   *        description: Pictograms successfully received
   *        examples:
   *           application/json: {"pictograms": [ {"value": "_1", "image": "test-ait.herokuapp.com/system_images/pictograms/1.png" },
   *            {"value": "_12", "image": "test-ait.herokuapp.com/system_images/pictograms/12.png" } ] }
   *            
   */

  router.get(
    '/api/v1/login/get-pictograms',
    require('./api/v1/login/get_pictograms').get,
  )

  /**
   * @swagger
   * /api/v1/login/pid:
   *   post:
   *     tags:
   *       - ""
   *     summary: "PID authorization"
   *     description: ""
   *     produces:
   *       - application/json
   *     parameters:
   *     - name: "login"
   *       in: "x-www-form-urlencoded"
   *       description: "PID login"
   *       required: true
   *       type: "string"
   *     - name: "password"
   *       in: "x-www-form-urlencoded"
   *       description: "PID password"
   *       required: true
   *       type: "string"
   *     responses:
   *       200:
   *        description: The PID was successfully authorized
   *        examples:
   *           application/json: { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTdkMWE1ZjI5MGNjMGRhMDIzYTQwYyIsImlhdCI6MTU0NTA2NDg2OSwiZXhwIjoxNTQ1MTUxMjY5fQ.Qb-klBvif8IhW4YXAoOftdLSpiqBgl7wMTsj0gMxPsU" }
   *       401:
   *         description: Invalid data entered
   *         examples:
   *           application/json:
   *            {
   *              errors:
   *              [
   *                {
   *                 "id": 1, "title": Required fields are not filled, "detail": "login, password are required"
   *                },{
   *                 "id": 2, "code": password-Invalid, "title": Invalid data entered, "detail": "The number of characters in the password must be from 4 to 7"
   *                },{
   *                 "id": 2, "code": login-Invalid, "title": Invalid data entered, "detail": "Incorrectly specified login"
   *                },{
   *                 "id": 2, "code": login-and-password-Invalid, "title": Invalid data entered, "detail": "You entered an incorrect login or password"
   *                 }
   *              ]
   *            }
   *
   */
  router.post('/api/v1/login/pid', require('./api/v1/login/login_pid').post)

  /**
   * @swagger
   * /api/v1/information/pid:
   *   post:
   *     tags:
   *       - ""
   *     summary: "Information about PID"
   *     description: ""
   *     produces:
   *       - application/json
   *     parameters:
   *     - name: "x-access-token"
   *       in: "header"
   *       description: "PID token"
   *       required: true
   *       type: "string"
   *     responses:
   *       200:
   *        description: Information about PID is successfully received
   *        examples:
   *           application/json: { "id": "5c4573204b457d9e38ff18b7",  "login": "tim.zaitsev123", "name": "Tima",
   *           "age": 22, "gender": "male", "caregiver_ID": "5b3e4dd2512813264c6a0925"  }
   *       401:
   *         description: Invalid data entered
   *         examples:
   *           application/json:
   *            {
   *              errors:
   *              [
   *               {
   *                "id": 1, "title": Required fields are not filled, "detail": "Empty token value"
   *                },{
   *                "id": 2, "code": token-Invalid, "title": Invalid data entered, "detail": "Invalid token entered, or token expired"
   *                },{
   *                "id": 2, "token": token-Invalid, "title": Invalid data entered, "detail": "The PID with the token entered has been deleted."
   *                }
   *              ]
   *            }
   *
   */
  router.post(
    '/api/v1/information/pid',
    verifyToken,
    require('./api/v1/information_pid').post,
  )

  /**
   * @swagger
   * /api/v1/applications/moneygame/get/settings:
   *   post:
   *     tags:
   *       - ""
   *     summary: "Get settings for MoneyGame"
   *     description: ""
   *     produces:
   *       - application/json
   *     parameters:
   *     - name: "x-access-token"
   *       in: "header"
   *       description: "PID token"
   *       required: true
   *       type: "string"
   *     responses:
   *       200:
   *        description: Information about settings for MoneyGame
   *        examples:
   *           application/json: { "progressBar": true, backBtn: "test-ait.herokuapp.com/application/applicationImages/MoneyGame/backBtn/1.png",
   *           "nextBtn": "...", "againBtn": "...", "wallet": "...", "basket": "..." }
   *       401:
   *         description: Invalid data entered
   *         examples:
   *           application/json:
   *            {
   *              errors:
   *              [
   *               {
   *                "id": 1, "title": Required fields are not filled, "detail": "Empty token value"
   *                },{
   *                "id": 2, "code": token-Invalid, "title": Invalid data entered, "detail": "Invalid token entered, or token expired"
   *                },{
   *                "id": 2, "token": token-Invalid, "title": Invalid data entered, "detail": "The PID with the token entered has been deleted."
   *                }
   *              ]
   *            }
   *
   */
  router.post(
    '/api/v1/applications/moneygame/get/settings',
    verifyToken,
    require('./api/v1/applications/moneygame/get_settings').post,
  )

  /**
   * @swagger
   * /api/v1/applications/moneygame/get/currency:
   *   post:
   *     tags:
   *       - ""
   *     summary: "Get currency for MoneyGame"
   *     description: ""
   *     produces:
   *       - application/json
   *     parameters:
   *     - name: "x-access-token"
   *       in: "header"
   *       description: "PID token"
   *       required: true
   *       type: "string"
   *     responses:
   *       200:
   *        description: Information about currency for MoneyGame
   *        examples:
   *           application/json: {
   *           banknotes: [{ "count": 5, "image": "test-ait.herokuapp.com/system_images/currency/euro/banknotes/5.png" },
   *           { "count": 10, "image": "test-ait.herokuapp.com/system_images/currency/euro/banknotes/10.png" }],
   *           coins: [{ "count": 0.01, "image": "test-ait.herokuapp.com/system_images/currency/euro/coins/0,01.png" }],
   *           currency: "euro"
   *           }
   *       401:
   *         description: Invalid data entered
   *         examples:
   *           application/json:
   *            {
   *              errors:
   *              [
   *               {
   *                "id": 1, "title": Required fields are not filled, "detail": "Empty token value"
   *                },{
   *                "id": 2, "code": token-Invalid, "title": Invalid data entered, "detail": "Invalid token entered, or token expired"
   *                },{
   *                "id": 2, "token": token-Invalid, "title": Invalid data entered, "detail": "The PID with the token entered has been deleted."
   *                }
   *              ]
   *            }
   *
   */
  router.post(
    '/api/v1/applications/moneygame/get/currency',
    verifyToken,
    require('./api/v1/applications/moneygame/get_currency').post,
  )

  /**
   * @swagger
   * /api/v1/applications/moneygame-second/get/currency:
   *   post:
   *     tags:
   *       - ""
   *     summary: "Get currency for MoneyGame SECOND"
   *     description: ""
   *     produces:
   *       - application/json
   *     parameters:
   *     - name: "x-access-token"
   *       in: "header"
   *       description: "PID token"
   *       required: true
   *       type: "string"
   *     responses:
   *       200:
   *        description: Information about currency for MoneyGame SECOND
   *        examples:
   *           application/json: {
   *           banknotes: [{ "count": 5, "image": "test-ait.herokuapp.com/system_images/currency/euro/banknotes/5.png" },
   *           { "count": 10, "image": "test-ait.herokuapp.com/system_images/currency/euro/banknotes/10.png" }],
   *           coins: [{ "count": 0.01, "image": "test-ait.herokuapp.com/system_images/currency/euro/coins/0,01.png" }],
   *           currency: "euro"
   *           }
   *       401:
   *         description: Invalid data entered
   *         examples:
   *           application/json:
   *            {
   *              errors:
   *              [
   *               {
   *                "id": 1, "title": Required fields are not filled, "detail": "Empty token value"
   *                },{
   *                "id": 2, "code": token-Invalid, "title": Invalid data entered, "detail": "Invalid token entered, or token expired"
   *                },{
   *                "id": 2, "token": token-Invalid, "title": Invalid data entered, "detail": "The PID with the token entered has been deleted."
   *                }
   *              ]
   *            }
   *
   */

  router.post(
    '/api/v1/applications/moneygame-second/get/currency',
    verifyToken,
    require('./api/v1/applications/moneygame_second/get_currency').post,
  )

  /**
   * @swagger
   * /api/v1/applications/moneygame-second/get/settings:
   *   post:
   *     tags:
   *       - ""
   *     summary: "Get settings for MoneyGame SECOND"
   *     description: ""
   *     produces:
   *       - application/json
   *     parameters:
   *     - name: "x-access-token"
   *       in: "header"
   *       description: "PID token"
   *       required: true
   *       type: "string"
   *     responses:
   *       200:
   *        description: Information about settings for MoneyGame SECOND
   *        examples:
   *           application/json: { "progressBar": true, backBtn: "test-ait.herokuapp.com/application/applicationImages/MoneyGame/backBtn/1.png",
   *           "nextBtn": "...", "againBtn": "...", "wallet": "...", "basket": "...", "correctChoiсe": "...", "incorrectChoice": "...",
   *           "textChoiсe": "OK", "showTextChoiсe": false, "backgroundColor": "#fff" }
   *       401:
   *         description: Invalid data entered
   *         examples:
   *           application/json:
   *            {
   *              errors:
   *              [
   *               {
   *                "id": 1, "title": Required fields are not filled, "detail": "Empty token value"
   *                },{
   *                "id": 2, "code": token-Invalid, "title": Invalid data entered, "detail": "Invalid token entered, or token expired"
   *                },{
   *                "id": 2, "token": token-Invalid, "title": Invalid data entered, "detail": "The PID with the token entered has been deleted."
   *                }
   *              ]
   *            }
   *
   */
  router.post(
    '/api/v1/applications/moneygame-second/get/settings',
    verifyToken,
    require('./api/v1/applications/moneygame_second/get_settings').post,
  )

  return router
}
