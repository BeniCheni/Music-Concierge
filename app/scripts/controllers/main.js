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
    user: 'Beni Cheni',
    LAST_FM_API_END_POINT: 'http://ws.audioscrobbler.com/2.0/',
    API_KEY: 'f8f9d955b4b26d87955d54e5ac984857',
    DATA_FORMAT: 'json',
    apiMethod: '',
    artist: ''
};

angular.module('musicConciergeApp')
    .controller('MainCtrl', function ($scope, $http, $templateCache) {

        $scope.checkAnswer = function () {
            if ($scope.answer === $scope.wordGameAlbum) {
                $('#correctAnswer').css('display', 'inline-flex');
                $scope.answer = '';
            }
        };

        $scope.favAlbum = model;
        $scope.answer = '';

        $scope.groovyOnLastfm = function () {
            $scope.method = 'GET';
            model.apiMethod = 'artist.gettopalbums';

            $scope.url = model.LAST_FM_API_END_POINT + '?method=' + model.apiMethod + '&artist=' + $scope.artist +
                            '&api_key=' + model.API_KEY + '&format=' + model.DATA_FORMAT;

            $scope.code = null;
            $scope.response = null;

            $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
                success(function (data, status) {
                    $scope.status = status;
                    $scope.data = data;
                    $scope.wordGameAlbum = data.topalbums.album.randomPick();
                    $scope.resetWordGameQ();
                }).
                error(function (data, status) {
                    $scope.data = data || 'Request failed';
                    $scope.status = status;
                });
        };

        $scope.resetWordGameQ = function () {
            //if (!!$scope.wordGameAlbum) {
                $scope.wordGameQ = $scope.wordGameAlbum.name.shuffle();
            //}
        };
    });