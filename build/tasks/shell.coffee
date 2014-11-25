module.exports = ->
  @loadNpmTasks 'grunt-shell'

  env = process.env

  # https://code.google.com/p/selenium/wiki/ChromeDriver#Requirements
  if process.platform is 'linux'
    chrome = '/usr/bin/google-chrome'
  else if process.platform is 'darwin'
    chrome = '"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"'

  if process.platform is 'linux'
    python2 = 'cd build/tools ; grep -Rl python . | xargs sed -ri "s/([^!]|^)python(\\s|$)/\\1python2\\2/g"'
  else if process.platform is 'darwin'
    python2 = ''

  # Only run the s3 task if Travis is building master and not in a pull
  # request.
  if env.TRAVIS_PULL_REQUEST is 'false' and env.TRAVIS_BRANCH is 'master'
    s3 = 'grunt s3-sync'
  else
    s3 = ''

  @config 'shell',
    'chrome-extension':
      command: [
        chrome
        '--pack-extension=chrome-extension/dist/tipsy'
        '--pack-extension-key=chrome-extension/key.pem'
        '--no-message-box'
      ].join(' ')

    'python2':
      command: python2

    's3':
      command: s3
