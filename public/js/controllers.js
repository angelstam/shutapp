'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });
  }).
  controller('ChatController', function ($scope, socket) {
    $scope.chatLog = [];
    $scope.form = {nickname: ""};

    socket.on('send:time', function (data) {
      $scope.time = data.time;
    });

    $scope.sendText = function(form) {
      if (form.$valid) {
        var obj = {timestamp: (new Date()).toISOString(),
                  nickname: form.nickname,
                  text :    form.text};

        $scope.chatLog.unshift(obj);
        socket.emit('send:text', obj);
        $scope.form.text = "";
      }
    };

    socket.on('newtext', function(data) {
      $scope.chatLog.unshift(data);
    });
  });
