'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('musicConciergeApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

//    it('should have no albums when app launches', function () {
//        expect(scope.todos.length).toBe(0);
//    });

    it('should add albums to the list', function () {
        scope.album = 'Test 1';
        scope.addAlbum();
        expect(scope.albums.length).toBe(1);
    });

    it('should add then remove an album from the list', function () {
        scope.album = 'Test 1';
        scope.addAlbum();
        scope.removeAlbum(0);
        expect(scope.albums.length).toBe(0);
    });
});
