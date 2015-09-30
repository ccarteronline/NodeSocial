'use strict';

describe('Testing the test controller: SampleCtrl', function () {
    beforeEach(module('sampleApp'));

    var sampleCtrl, scope;

    beforeEach(inject(function ($controller, $rootScope){
        scope = $rootScope;
        sampleCtrl = $controller('SampleCtrl', {
            $scope: scope
        });
    }));

    it('should say hello', function () {
        expect(scope.hello).toBe('Hello Chris');
    });

    it('should change content when clicked', function () {
        var defautRes = 'Click to see';
        scope.awesomeMethod();
        expect(scope.clickedResult).toBe('YOU CLICKED! Results: 4927');
    });


});