(function (window) {
    'use strict';

    function cloneObject(obj) {
        var o = {};
        for (var item in obj) {
            o[item] = obj[item];
        }
        return o;
    }
    // Your starting point. Enjoy the ride!
    angular.module('todo', [])
        .controller('listController', ['$scope', function ($scope) {
            //新加条目模板
            $scope.newItem = {
                content: '',
                done: false,
                index: 0,
                edit: false,
                input: null
            };
            //所有条目
            $scope.list = [];
            //用于分类显示的数组
            $scope.show = [];
            //            $scope.input = '<input class="edit" value="Create a TodoMVC template" ng-model = "l.content" ng-show = "l.edit" ng-keypress = "editItem($event,l.index)" ng-blur = "editBlur(l.index)" set-focus = "l.focus">'
            //全选标识
            $scope.selectAllFlag = false;
            //存储剩余数目的变量及控制          
            $scope.left = 0;

            function addLeft() {
                $scope.left++;
            }

            function subLeft() {
                $scope.left--;
            }

            /*//input edit
            function edit = function(eCode,item){
                if (eCode == 'Enter' && item.content.length > 0) {
                    return true;
                }esle{
                    return false;
                }
            }*/
            $scope.addItem = function (e) {
                //如果输入Enter
                if (e.code == 'Enter' && $scope.newItem.content.length > 0) {
                    //设置新项目index
                    $scope.newItem.index = $scope.list.length;
                    //克隆新项目
                    var o = cloneObject($scope.newItem);
                    //新项目入栈
                    $scope.list.push(o);
                    //清空新项目
                    $scope.newItem.content = '';
                    //增加一个可以显示的未完成项
                    $scope.show.push(true);
                    addLeft();
                }


            };

            //编辑项
            //显示编辑框
            $scope.startEdit = function (index, $event) {
                $scope.list[index].edit = true;
                setTimeout(function (){
                    $scope.list[index].input.focus();
                }, 300);
                console.log($scope.list[index].input)




            }
            //填写内容
            $scope.editItem = function (e, index) {
                if (e.code == 'Enter' && $scope.list[index].content.length > 0) {
                    $scope.list[index].edit = false;
                    //                    $scope.editBlur();
                    console.log('enter');
                }
                console.log(e.code);
            }
            //input失去焦点
            $scope.editBlur = function (index) {
                if ($scope.list[index].content.length == 0) {
                    $scope.list[index].content = '太快了,还没来及写些东西!';
                }
                $scope.list[index].edit = false;
            }

            //删除项
            $scope.remove = function (index) {
                if ($scope.list[index].done == false) {
                    subLeft();
                }
                $scope.list.splice(index, 1);
                //重新写入index
                var len = $scope.list.length
                for (var i = 0; i < len; i++) {
                    $scope.list[i].index = i;
                }
                //                console.log($scope.list);

            };


            //获取所有项完成状态
            function getStutas() {
                var temp = [];
                for (var i = 0, len = $scope.list.length; i < len; i++) {
                    temp[i] = $scope.list[i].done;
                }
                return temp;
            }
            //显示所有项
            $scope.showAll = function () {
                var temp = getStutas();
                for (var i = 0, len = temp.length; i < len; i++) {
                    temp[i] = true;
                }
                $scope.show = temp;
                //                console.log('all' + $scope.show);
            };
            //显示未完成项
            $scope.showActive = function () {
                var temp = getStutas();
                for (var i = 0, len = temp.length; i < len; i++) {
                    temp[i] = !temp[i];
                }
                $scope.show = temp;
                //                console.log('active' + $scope.show);
            };
            //显示完成项
            $scope.showComplete = function () {
                $scope.show = getStutas();

                //                console.log('complete' + $scope.show);
            };
            //toggle selected
            $scope.toggleSelected = function (index) {
                if ($scope.list[index].done == false) {
                    addLeft();
                } else {
                    subLeft();
                }
            }
            //全选/全不选
            $scope.toggleAll = function () {
                var len = $scope.list.length;
                if ($scope.selectAllFlag == false) {
                    $scope.selectAllFlag = true;
                    $scope.left = 0;

                } else {

                    $scope.selectAllFlag = false;
                    $scope.left = len;
                }
                for (var i = 0; i < len; i++) {
                    $scope.list[i].done = $scope.selectAllFlag;
                }

            };
            //删除所有完成项
            $scope.clearComplete = function () {
                for (var i = $scope.list.length - 1; i >= 0; i--) {
                    if ($scope.list[i].done == true) {
                        $scope.remove(i);
                    }
                }
                $scope.showAll();
            };

        }])
        .directive('setFocus', function () {
            /*return {
                scope: {
                    aa: '@setFocus'
                },
                link: function (scope, element, attrs) {

                    return setAFocus = function () {
                        if (true) {
                            setTimeout(function () {
                                element[0].focus();
                            }, 100);
//                            console.log('if ok');
                        }
//                        console.log(scope.aa == false+'')
//                         console.log(scope.aa)



                    }
                }
            }*/
            return {
                scope: false,
                link: function (scope, element, attrs) {
                    //scope[attrs.setFocus].input = element[0];
                    //console.log(scope.l)
                    scope.l.input = element[0];
                }
            }
        })
})(window);
