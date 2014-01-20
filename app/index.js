'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var EmulsionGenerator = module.exports = function EmulsionGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });


  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(EmulsionGenerator, yeoman.generators.Base);

EmulsionGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'projectName',
      message: 'What is the application name?'
    }
  ];

 this.prompt(prompts, function (props) {
    this.projectName = props.projectName;

    cb();
  }.bind(this));

};

EmulsionGenerator.prototype.app = function app() {
  this.mkdir('assets');
  this.mkdir('assets/img');
  this.mkdir('js');
  this.mkdir('css');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.copy('_config.rb', 'config.rb');
};

EmulsionGenerator.prototype.projectfiles = function projectfiles() {
  //this.copy('editorconfig', '.editorconfig');
  //this.copy('jshintrc', '.jshintrc');
  //
};
