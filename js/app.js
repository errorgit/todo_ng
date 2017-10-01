(function (window, angular) {
    'use strict';
    var todos = {};
    angular.module('todo', ['ngRoute'])
        .controller('listController', ['$scope', '$routeParams', '$window', function ($scope, $routeParams, $window) {
           
                todos = $window.localStorage.todos ? JSON.parse($window.localStorage.todos) : {
                list: [],
                left: [0]
            };

            function save() {
                $window.localStorage.todos = JSON.stringify(todos);
//                console.log('save');
                //                console.log(sa);
            }
            //保存新输入内容
            $scope.newItem = '';
            //当前编辑index
            $scope.editIndex = -1;
            //保存所有条目对象
            //$scope.list = todos.list;
            $scope.list = todos.list;
//             console.log($scope.list);
            //全选标识
            $scope.selectAllFlag = false;
            //存储剩余数目的变量及控制          
            $scope.left = todos.left;

            function addLeft() {
                $scope.left[0]++;
            }

            function subLeft() {
                $scope.left[0]--

            }

            $scope.add = function () {
                if ($scope.newItem.length > 0) {
                    $scope.list.push({
                        index: $scope.list.length,
                        content: $scope.newItem,
                        done: false
                    });
                    //清空新项目
                    $scope.newItem = '';
                    //modify count of left
                    addLeft();
                }
                save();
            };

            //编辑项
            //显示编辑框
            $scope.modify = function (index) {
                if($scope.list[index].done == false){
                    $scope.editIndex = index;
                }
                
//                save();
            }
            //填写内容
            $scope.save = function (index) {

                if ($scope.list[index].content == '') {
                    $scope.list[index].content = '呃....'
                }
                //取消编辑状态
                $scope.editIndex = -1;
                save();
            }
            //input失去焦点
            $scope.editBlur = function () {}

            //删除项
            $scope.remove = function (index) {
                if ($scope.list[index].done == false) {
                    subLeft();
                }
                $scope.list.splice(index, 1);
                //重新写入index,数据量不大的话应该没问题,如果数据量大,考虑使用其他数据结构
                var len = $scope.list.length
                for (var i = 0; i < len; i++) {
                    $scope.list[i].index = i;
                }
                //                console.log($scope.list);
                save();

            };
            //toggle selected
            $scope.changeLeft = function (index) {
                if ($scope.list[index].done == false) {
                    addLeft();
                } else {
                    subLeft();
                }
                save();
            }
            //全选/全不选
            $scope.toggleAll = function () {
                var len = $scope.list.length;
                if ($scope.selectAllFlag == false) {
                    $scope.selectAllFlag = true;
                    $scope.left[0] = 0;

                } else {

                    $scope.selectAllFlag = false;
                    $scope.left[0] = len;
                }
                for (var i = 0; i < len; i++) {
                    $scope.list[i].done = $scope.selectAllFlag;
                }
                save();

            };
            //按需显示
            $scope.showOption = {};
            var status = $routeParams.name;
            switch (status) {
                case undefined:
                    {
                        $scope.showOption = {}
                    }
                    break;
                case 'active':
                    {
                        $scope.showOption = {
                            done: false
                        }
                    }
                    break;
                case 'completed':
                    {
                        $scope.showOption = {
                            done: true
                        }
                    }
                    break;
                default:
                    {
                        $scope.showOption = {}
                    }
            }
            //            console.log('status:' + status);
            //            console.log('showOption:' + $scope.showOption);
            //删除所有完成项
            $scope.clearComplete = function () {
                for (var i = $scope.list.length - 1; i >= 0; i--) {
                    if ($scope.list[i].done == true) {
                        $scope.remove(i);
                    }
                }
                save();
            };

        }])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
            $routeProvider
                .when('/:name?', {
                    templateUrl: 'main',
                    controller: 'listController'
                })

    }])
})(window, angular);
