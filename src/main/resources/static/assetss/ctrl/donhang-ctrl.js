app.controller("donhang-ctrl", function ($scope, $http) {
	$scope.orders = null; // mảng chứa list order
	$scope.order;
	$scope.orderDetails;

	//get list order
	$scope.getOrders = function () {
		$http({
			method: 'GET',
			url: "/rest/orders/getall",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(
			function successCallback(response) {// Nếu thành công
				console.log(response.data)
				$scope.orders = response.data;
			},
			function errorCallback(response) { // Nếu thất bại
				$rootScope.AddNotifis("Có lỗi sãy ra trong quá trình lấy dữ liệu", "danger");
			}
		)
	}

	$scope.orderDetail = function (id) {

		$scope.order = $scope.orders.filter(function (order) {
			return order.id == id;
		});
		
		
		
		$http({
			method: 'GET',
			url: "/rest/orders/getalldetail",
			params:{idOrder:id},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(
			function successCallback(response) {// Nếu thành công
				
				$scope.orderDetails = response.data;
			},
			function errorCallback(response) { // Nếu thất bại
				$rootScope.AddNotifis("Có lỗi sãy ra trong quá trình lấy dữ liệu", "danger");
			}
		)
		$('#modal-orderDetail').modal('show');
	}

	$scope.update = function(){
		$http({
			method: 'POST',
			url: "/rest/orders/update",
			data: $scope.order[0],
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(
			function successCallback(response) {// Nếu thành công
				console.log("Cập nhật thành công")
				$scope.getOrders();
				$('#modal-orderDetail').modal('hide');
			},
			function errorCallback(response) { // Nếu thất bại
				console.log(response.data)
			}
		)
	}

	$scope.getOrders();
});