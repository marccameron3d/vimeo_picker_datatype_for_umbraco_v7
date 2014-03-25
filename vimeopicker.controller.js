angular.module("umbraco")
    .controller("vp.VimeoPickerCtrl",
        function ($scope, $http, dialogService, vimeoConfig) {
            vimeoConfig.vimeoUserName = $scope.model.config.userName;

            $scope.init = function () {
                if ($scope.model.value && $scope.model.value !== "") {
                    getVideo($scope.model.value);
                }
            };

            $scope.remove = function () {
                $scope.videoId = $scope.model.value = '';
            };

            //dialog
            $scope.openVimeoPicker = function () {
                dialogService.open({
                    template: "/App_Plugins/Vimeo_Picker/vimeopicker.video.list.html",
                    callback: function (data) {
                        $scope.model.value = data;
                        getVideo(data);
                    }
                });
            };

            function getVideo(id) {
                var url = 'http://vimeo.com/api/v2/video/' + id + '.json';

                $http({ method: 'GET', url: url })
                    .success(function (data) {
                        $scope.video = data[0];
                    })
                    .error(function () {
                        $scope.error = "An Error has occured while loading!";
                    });
            };

            $scope.showAdd = function () {
                if ($scope.model.value && $scope.model.value !== "") {
                    return false;
                }

                return true;
            };
        })
    .controller("vp.VimeoPickerDialogCtrl",
        function ($scope, $http, vimeoConfig) {

            $scope.init = function () {
                $scope.videoId = '';
                var url = 'http://vimeo.com/api/v2/' + vimeoConfig.vimeoUserName + '/videos.json';
                $http({ method: 'GET', url: url })
                    .success(function (data) {
                        $scope.videos = data;
                    })
                    .error(function () {
                        $scope.error = "An Error has occured while loading!";
                    });
            };

            $scope.select = function () {
                $scope.submit($scope.videoId);
            };
        })
    .value('vimeoConfig', {
        vimeoUserName: ''
    });