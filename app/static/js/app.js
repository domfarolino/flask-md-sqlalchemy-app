var app = app || angular.module('FlaskMessages', ['ngMaterial']);
    //Config theme
app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('blue')
    .primaryPalette('blue')
    .accentPalette('red');
});