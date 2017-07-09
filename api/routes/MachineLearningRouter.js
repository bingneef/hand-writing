const Router = require('koa-router')
const MachineLearningController = require('../controllers').MachineLearningController
let MachineLearningRouter = new Router()

MachineLearningRouter.get('/classify', MachineLearningController.getClassify);
MachineLearningRouter.get('/train', MachineLearningController.getTrain);
MachineLearningRouter.get('/fit', MachineLearningController.getFit);

module.exports = MachineLearningRouter
