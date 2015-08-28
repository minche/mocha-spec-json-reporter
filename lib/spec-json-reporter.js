var Base = require('mocha').reporters.Base,
  fs = require('fs')

/**
 * Expose `SpecJsonReporter`.
 */

exports = module.exports = SpecJsonReporter

/**
 * Initialize a new `SpecJsonReporter` reporter.
 *
 * @param {Runner} runner
 * @api public
 */

var tests = []
var info = {}
var browser = {}


function SpecJsonReporter(runner) {

  runner.on('pass', function(test){
    info = test.ctx.mochaOptions
    browser = test.ctx.browser

    if(test.ctx.case_id && test.ctx.case_id>0){
      var data = {}
      data.case_id = test.ctx.case_id
      data.name = test.title
      data.state = test.state
      data.duration = test.duration
      tests.push(data)
    }
    console.log(test.state + " " + test.title)
  })

  runner.on('fail', function(test, err){
    browser = test.ctx.browser
    info = test.ctx.mochaOptions
    if(test.ctx.case_id && test.ctx.case_id>0){
      var data = {}
      data.case_id = test.ctx.case_id
      data.name = test.title
      data.state = test.state
      data.duration = test.duration
      data.err = err
      tests.push(data)
    }
    console.log(test.state + " " + test.title)

  })

  runner.on('end', function(){
    fs.writeFileSync("reports/"new Date().toString() + ".json", JSON.stringify({info: info, browser: browser, tests:tests}, null, 4))
    console.log("File written to " + new Date().toString())
  })
}
