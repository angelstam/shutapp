'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });
  }).
  controller('MyCtrl1', function ($scope, socket) {
    $scope.chatLog = [];

    socket.on('send:time', function (data) {
      $scope.time = data.time;
    });

    $scope.sendText = function(data) {
      var obj = {timestamp: (new Date()).toString(),
                nickname: data.nickname,
                text :    data.text};

      $scope.chatLog.unshift(obj);
      socket.emit('send:text', obj);
    };

    socket.on('newtext', function(data) {
      $scope.chatLog.unshift(data);
    });
  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  });
