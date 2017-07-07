const ExternalScript = require('../helpers/ExternalScript.js')

class MachineLearningController {
  static async getClassify (ctx) {
    let response = await ExternalScript('./scripts/classify.py', ctx.query.values)
    ctx.body = {
      response,
    }
    ctx.status = 200
  }

  static async getTrain (ctx) {
    let response = await ExternalScript('./scripts/train.py', ctx.query.result, ctx.query.values)
    ctx.status = 204
  }
}

module.exports = MachineLearningController
