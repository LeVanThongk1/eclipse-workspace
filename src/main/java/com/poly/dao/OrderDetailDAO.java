package com.poly.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.poly.entity.Order;
import com.poly.entity.OrderDetail;

public interface OrderDetailDAO extends JpaRepository<OrderDetail, Long> {
//	@Query(value = "SELECT sum(o.price * o.quantity) FROM OrderDetails o", nativeQuery = true)
//	String countSumOrder();
	List<OrderDetail> findByOrder(Order order);
}

