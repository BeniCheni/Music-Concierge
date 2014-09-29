'use strict';

/**
 * @ngdoc function
 * @name musicConciergeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the musicConciergeApp
 */
var model = {
    user: 'Beni Cheni'
};

angular.module('musicConciergeApp')
  .controller('MainCtrl', function ($scope, localStorageService) {
    $scope.favAlbum = model;

    var albumsInCookie = localStorageService.get('albums');

    $scope.albums = albumsInCookie && albumsInCookie.split('\n') || [];

    $scope.$watch('albums', function () {
        localStorageService.add('albums', $scope.albums.join('\n'));
    }, true);

    $scope.addAlbum = function () {
        $scope.albums.push($scope.album);
        $scope.album = '';
    };

    $scope.removeAlbum = function (index) {
        $scope.albums.splice(index, 1);
    };
  });