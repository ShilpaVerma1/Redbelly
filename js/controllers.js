angular.module('starter.controllers', ['filters'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) 
{

  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() 
  {
    console.log('Doing login', $scope.loginData);

    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('imgCtrl', function($scope,$ionicSlideBoxDelegate,$http) 
{
  $ionicSlideBoxDelegate.update();
 /*$scope.aimages=[{
   src: 'img/pic1.jpg',
 },
 {
   src: 'img/pic2.jpg'
 },
 {
   src: 'img/pic3.jpg'
 }]*/

  $scope.aimages = [];
 $http.get("http://redbellyrecords.com.au/wp-content/themes/vantage/slider-api.php")
	.success(function(response)
	{
    angular.forEach(response, function (child) 
  {
    var img = child.image_url;
    $scope.aimages.push({ 
       src: img
    });
})
 $ionicSlideBoxDelegate.$getByHandle('image-viewer').update();
});


})

.controller('PlaylistsCtrl', function($scope,$ionicSlideBoxDelegate,$http,$sce) 
{


 /* $scope.images=[{
   src: 'img/pic1.jpg',
 },
 {
   src: 'img/pic2.jpg'
 },
 {
   src: 'img/pic3.jpg'
 }]*/
  
 /* $scope.images = [];
 $http.get("http://redbellyrecords.com.au/wp-content/themes/vantage/slider-api.php")
	.success(function(response)
	{
    angular.forEach(response, function (child) 
  {
    var img=child.image_url;
    $scope.images.push({ 
       src: img
    });
})
console.log($scope.images);
});*/

 $scope.Allimages=[{
   src: 'img/videos.jpg',
 },
 {
   src: 'img/albums.jpg'
 },
 {
   src: 'img/artists.jpg'
 }]

 $scope.slidePrevious = function() 
 {
        $ionicSlideBoxDelegate.previous();
}
   $scope.slideNext = function() 
    {
        $ionicSlideBoxDelegate.next();
    }
     $ionicSlideBoxDelegate.update();

     $scope.Videos = [];
    function geturl(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) 
    {
        return match[2];
    } 
    else
     {
        return 'error';
    }
}
  $http.get("http://redbellyrecords.com.au/wp-json/wp/v2/video")
	.success(function(response)
	{
  angular.forEach(response, function (child) {
    var img=child.content.rendered;
    var x;
    if(img!=null)
    {
      x= 'https://www.youtube.com/embed/'+ geturl(img)
    }
    else
    {
      x=''
    }
    $scope.Videos.push({ 
       images: $sce.trustAsResourceUrl(x)
    });
})	
});
})
.controller('AlbumCtrl', function($scope, $stateParams,$http) {
  $scope.livelinks = [];
  $http.get("http://redbellyrecords.com.au/wp-json/wp/v2/posts")
	.success(function(response)
	{
  angular.forEach(response, function (child) 
  {
    var img=child.better_featured_image.source_url;
    var id=child.id;
    var x;
    if(x!=null)
    {
      x='img'
    }
    else
    {
      x=''
    }
    $scope.livelinks.push({ 
       images: img,
       id:id
    });
})
});
})
.controller('VideoCtrl', function($scope, $stateParams,$http,$sce) {
   $scope.Videos = [];
    function geturl(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } 
    else
     {
        return 'error';
    }
}
  $http.get("http://redbellyrecords.com.au/wp-json/wp/v2/video")
	.success(function(response)
	{
  angular.forEach(response, function (child) {
    var img=child.content.rendered;
    var x;
    if(img!=null)
    {
      x= 'https://www.youtube.com/embed/'+ geturl(img)
    }
    else
    {
      x=''
    }
    $scope.Videos.push({ 
       images: $sce.trustAsResourceUrl(x)
    });
})
 console.log($scope.Videos);	
});
})

.controller('InfoCtrl', function($scope, $stateParams,$http,$sce)
{
  var id = $stateParams.vid;
 $http.get("http://redbellyrecords.com.au/wp-json/wp/v2/posts/" +id)
.success(function(response)
{
 var str=response.content.rendered;
 var a=String(str).slice(32,113);
 var b = a.replace('"', "");
 var c = b.replace('"', "");
response.content.rend=c;
  $scope.info = response;   
 })
})
.controller('ArtistCtrl', function($scope, $stateParams,$http)
 {
  $scope.Artistsimgs = [];
  $http.get("http://redbellyrecords.com.au/wp-content/themes/vantage/artist-api.php")
	.success(function(response)
	{
    angular.forEach(response, function (child) {
    var img=child.custom_link;
    var x;
    if(x!=null)
    {
      x='img'
    }
    else
    {
      x=''
    }
    $scope.Artistsimgs.push({ 
       images: img,
    });
})
 console.log( $scope.Artistsimgs);	
});
})
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
