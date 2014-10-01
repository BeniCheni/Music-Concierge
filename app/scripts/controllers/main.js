'use strict';

/**
 * @ngdoc function
 * @name musicConciergeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the musicConciergeApp
 */

/*global $:false */

var model = {
    user: 'Beni Cheni'
};

angular.module('musicConciergeApp')
    .controller('MainCtrl', function ($scope, localStorageService) {
        var albumsInCookie = localStorageService.get('albums');
        $scope.albums = albumsInCookie && albumsInCookie.split('\n') || [];
        model.wordGameAlbum = $scope.albums.randomPick();
        model.wordGameQ = model.wordGameAlbum.shuffle();
        $scope.favAlbum = model;
        $scope.answer = '';

        $scope.checkAnswer = function () {
            if ($scope.answer === $scope.favAlbum.wordGameAlbum) {
                $('#correctAnswer').css('display', 'inline-flex');
                $scope.answer = '';
            }
        };

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