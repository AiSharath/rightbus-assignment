function BusCard({ bus }) {
  return (
    <article className="bus-card">
      <div className="bus-main">
        <div className="operator">
          <div className="operator-icon">B</div>
          <div>
            <h3>{bus.operator}</h3>
            <p>{bus.bus_type}</p>
          </div>
        </div>
        <div className="journey-time"><strong>{bus.departure}</strong><span>Departure</span></div>
        <div className="duration">
          <span>{Math.floor(bus.duration_minutes / 60)}h {bus.duration_minutes % 60}m</span>
          <div className="duration-line" />
          <small>Journey</small>
        </div>
        <div className="journey-time"><strong>{bus.arrival}</strong><span>Arrival</span></div>
        <div className="fare"><strong>₹{Number(bus.fare).toLocaleString("en-IN")}</strong><span>per seat</span></div>
      </div>
      <div className="bus-footer">
        <div className="bus-tags">
          <span className="tag">{bus.is_ac ? "AC" : "Non-AC"}</span>
          <span className="tag">{bus.seat_type}</span>
          <span className="tag">{bus.available_seats} seats available</span>
        </div>
        <span className="trip-id">{bus.trip_id}</span>
      </div>
    </article>
  );
}

export default BusCard;