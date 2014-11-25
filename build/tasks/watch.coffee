module.exports = ->
  @loadNpmTasks 'grunt-contrib-watch'

  @config 'watch',
    'chrome-extension':
      files: [
        'chrome-extension/**/*'
        '!chrome-extension/dist/**/*'
        'shared/**/*'
      ]

      tasks: [
        'chrome-extension'
        'es6'
      ]

    'firefox-extension':
      files: [
        'firefox-extension/**/*'
        '!firefox-extension/dist/**/*'
        'shared/**/*'
      ]

      tasks: [
        'firefox-extension'
        'es6'
      ]
