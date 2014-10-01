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
        $scope.resetWordGameQ = function () {
            if ($scope.albums.length > 0) {
                $scope.wordGameAlbum = $scope.albums.randomPick();
                if (!!$scope.wordGameAlbum) {
                    $scope.wordGameQ = $scope.wordGameAlbum.shuffle();
                }
            }
        };

        $scope.checkAnswer = function () {
            if ($scope.answer === $scope.wordGameAlbum) {
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
            $scope.resetWordGameQ();
        };

        $scope.removeAlbum = function (index) {
            $scope.albums.splice(index, 1);
            $scope.resetWordGameQ();
        };

        var albumsInCookie = localStorageService.get('albums');
        $scope.albums = albumsInCookie && albumsInCookie.split('\n') || [];
        $scope.resetWordGameQ();
        $scope.favAlbum = model;
        $scope.answer = '';
    });