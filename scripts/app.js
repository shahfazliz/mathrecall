var app = angular.module('mathRecall', [])
.controller('testRecall', function($scope){
    function randomNumber(max, min){
        return Math.floor(Math.random()*(max+1-min)+min);
    }
    function randomOperator(){
        var result = randomNumber(4,1);
        switch (result) {
            case 1:
                result = '+';
                break;
            case 2:
                result = '-';
                break;
            case 3:
                result = 'x';
                break;
            case 4:
                result = '/';
                break;
        }
        return result;
    }
    function initNumbers(operator){
        var result = {};
        switch (operator) {
            case '+':
                result.firstNumber  = randomNumber(9,1);
                result.secondNumber = randomNumber(9,1);
                result.initResult   = result.firstNumber + result.secondNumber;
                break;
            case '-':
                result.initResult   = randomNumber(9,1);
                result.secondNumber = randomNumber(result.initResult,0);
                result.firstNumber  = result.initResult + result.secondNumber;
                break;
            case 'x':
                result.firstNumber  = randomNumber(9,1);
                result.secondNumber = randomNumber(9,1);
                result.initResult   = result.firstNumber * result.secondNumber;
                break;
            case '/':
                result.initResult   = randomNumber(9,1);
                result.secondNumber = randomNumber(9,1);
                result.firstNumber  = result.initResult * result.secondNumber;
                break;
        }
        return result;
    }
    
    $scope.operator     = randomOperator();
    var computedNumber  = initNumbers($scope.operator);
    $scope.firstNumber  = computedNumber.firstNumber;
    $scope.secondNumber = computedNumber.secondNumber;
    $scope.result       = '';
    
    var startTime = new Date().getTime();
    
    function reInitQuestion(){
        $scope.operator     = randomOperator();
        computedNumber      = initNumbers($scope.operator);
        $scope.firstNumber  = computedNumber.firstNumber;
        $scope.secondNumber = computedNumber.secondNumber;
        $scope.result       = '';
        startTime    = new Date().getTime();
    }
    
    $scope.addNumber = function(number){
        $scope.result = Number($scope.result<10?'' + $scope.result + number:Number(($scope.result+'').slice(1,2) + number));
        if($scope.result == computedNumber.initResult){
            $scope.notifyResult = 'Correct!  ' + $scope.firstNumber + ' ' + $scope.operator + ' ' + $scope.secondNumber + ' = ' + computedNumber.initResult;
            $scope.timeTaken    = 'Time taken: ' + (new Date().getTime() - startTime)/1000 + 's';
            reInitQuestion();
        }
    };
    $scope.clearNumber = function(){
        $scope.result = '';
    };
});