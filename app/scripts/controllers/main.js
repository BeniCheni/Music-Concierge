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
    wordGameAnswer: ''
};

angular.module('musicConciergeApp')
    .controller('MainCtrl', function ($scope, $http, $templateCache) {
        $scope.favAlbum = model;
        $scope.answer = '';

        $scope.checkAnswer = function () {
            if ($scope.answer === $scope.wordGameAlbum.name) {
                $('#correctAnswer').css('display', 'block');
                $scope.answer = '';
            }
        };

        $scope.resetWordGameQ = function () {
            if ($scope.wordGameAlbum !== '') {
                $('#shuffledWordHolder').css('display', 'none');
                $('#wordGameDiv').css('display', 'inline');
                $scope.wordGameQ = $scope.wordGameAlbum.name.shuffle();
            } else if ($scope.wordGameAlbum === '') {
                $('#wordGameDiv').css('display', 'none');
                $('#shuffledWordHolder').css('display', 'inline');
                $scope.wordGameQ = '';
            }
        };

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
                    $('#noTotal').css('display', 'none');
                    $('#error').css('display', 'none');
                    $('.result').css('display', 'none');

                    if (data.hasOwnProperty('topalbums')) {
                        if (!data.topalbums.hasOwnProperty('total')) {
                            $('.results').css('display', 'block');
                            $scope.data = data;
                            $scope.wordGameAlbum = data.topalbums.album.randomPick();
                            $scope.resetWordGameQ(1);
                            return;
                        }
                    }

                    if (data.hasOwnProperty('topalbums')) {
                        if (data.topalbums.hasOwnProperty('total')) {
                            if (data.topalbums.total === '0') {
                                $('#noTotal').css('display', 'block');
                            }
                        }
                        $scope.wordGameAlbum = '';
                        $scope.resetWordGameQ();
                        return;
                    }

                    if (data.hasOwnProperty('error')) {
                        $('#error').css('display', 'block');
                        $scope.error = data.error;
                        $scope.message = data.message;
                        $scope.wordGameAlbum = '';
                        $scope.resetWordGameQ();
                        return;
                    }
                }).
                error(function (data, status) {
                    $scope.data = data || 'Request failed';
                    $scope.status = status;
                });
        };
    });