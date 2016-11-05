var app = angular.module("clock", []);

app.controller("clockCtrl", function ($scope, $interval) {
    $scope.breakTime = 5;
    $scope.sessionTime = 25;
    $scope.breakTimeUp = function () {
        $scope.breakTime += 1
    };
    $scope.breakTimeDown = function () {
        $scope.breakTime -= 1
    };
    $scope.sessionTimeUp = function () {
        $scope.sessionTime += 1
    };
    $scope.sessionTimeDown = function () {
        $scope.sessionTime -= 1
    };
    var s = 0;
    var interval;
    var flag = 0;

    var total = 0;
    $scope.display = $scope.sessionTime + ":0" + s;
    $scope.canvas = function (current, total) {

        pos = ((current * 60 + s) / (total * 60)) * 2 * Math.PI;
        console.log(pos);
        var can = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(150, 150, 148, 0, pos);
        ctx.strokeStyle = "#FFF";
        ctx.lineWidth = 5;
        ctx.stroke();
    };
    $scope.canvas(1, 1);
    $scope.countDown = function () {


        if (s <= 0 && $scope.minutesLeft <= 0 && flag === 0) {
            $scope.minutesLeft = $scope.breakTime;
            total = $scope.breakTime;
            flag = 1;
            $("#break").css("color", "green");
            $("#session").css("color", "white");
        }
        if (s <= 0 && $scope.minutesLeft <= 0 && flag === 1) {
            $scope.minutesLeft = $scope.sessionTime;
            total = $scope.sessionTime;
            flag = 0;
            $("#session").css("color", "green");
            $("#break").css("color", "white");

        }
        if (s <= 0) {
            $scope.minutesLeft -= 1;
            s = 60;
        }
        s -= 1;
        if (s < 10) {
            $scope.display = $scope.minutesLeft + ":0" + s;
        } else {
            $scope.display = $scope.minutesLeft + ":" + s;
        }
        console.log($scope.display);
        $scope.canvas($scope.minutesLeft, total);


    }
    $scope.start = function () {

        $scope.minutesLeft = $scope.sessionTime;
        $("#session").css("color", "green");
        $("#start").css("visibility", "hidden");
        $("#pause").css("visibility", "visible");
        //s = 0;
        total = $scope.sessionTime;
        interval = $interval(function () {
            $scope.countDown();

        }, 1000);

    }
    $scope.pause = function () {
        $interval.cancel(interval);
        $("#break").css("color", "white");
        $("#session").css("color", "white");
        $("#start").css("visibility", "visible");
        $("#pause").css("visibility", "hidden");
        s = 0;

    }
});