angular.module("umbraco")
    .controller("vp.VimeoPickerCtrl",
        function ($scope, $http, dialogService, vimeoConfig) {
            vimeoConfig.vimeoUserName = $scope.model.config.userName;

            $scope.init = function() {
                if ($scope.model.value && $scope.model.value.videoId !== "") {
                    getVideo($scope.model.value.videoId);
                }
            };

            $scope.remove = function() {
                $scope.videoId = $scope.model.value.videoId = '';
            };

            //dialog
            $scope.openVimeoPicker = function() {
                dialogService.open({
                    template: "/App_Plugins/Vimeo_Picker/vimeopicker.video.list.html",
                    callback: function (data) {
                        getVideo(data);
                    }
                });
            };

            function getVideo(id) {
                var url = 'http://vimeo.com/api/v2/video/' + id + '.json';

                $http({ method: 'GET', url: url })
                    .success(function(data) {
                        $scope.video = data[0];

                        $scope.model.value = {
                            thumbnailSmall: data[0].thumbnail_small
                            ,
                            thumbnailMedium: data[0].thumbnail_medium
                            ,
                            thumbnailLarge: data[0].thumbnail_large
                            ,
                            videoId: data[0].id
                        };

                    })
                    .error(function() {
                        $scope.error = "An Error has occured while loading!";
                    });
            };

            $scope.showAdd = function() {
                if ($scope.model.value && $scope.model.value.videoId !== "") {
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