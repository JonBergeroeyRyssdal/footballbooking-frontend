function OrderHistory() {
  const dummyOrders = [
    { id: 1, pitch: "Frogner Stadion", date: "2025-07-01", time: "18:00", price: 1200 },
    { id: 2, pitch: "Bislett Mini", date: "2025-07-02", time: "17:00", price: 800 }
  ]

  return (
    <div className="container mt-4">
      <h2>Mine fullførte bookinger</h2>
      <ul className="list-group">
        {dummyOrders.map(order => (
          <li key={order.id} className="list-group-item">
            {order.pitch} - {order.date} kl {order.time} ({order.price} kr)
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OrderHistory