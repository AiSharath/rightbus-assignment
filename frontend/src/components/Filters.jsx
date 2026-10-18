function Filters({ acFilter, seatFilter, sortBy, onAcFilterChange, onSeatFilterChange, onSortChange }) {
  return (
    <div className="filters">
      <label>
        AC type
        <select value={acFilter} onChange={(event) => onAcFilterChange(event.target.value)}>
          <option value="all">All buses</option>
          <option value="ac">AC</option>
          <option value="non-ac">Non-AC</option>
        </select>
      </label>
      <label>
        Seat type
        <select value={seatFilter} onChange={(event) => onSeatFilterChange(event.target.value)}>
          <option value="all">All seats</option>
          <option value="sleeper">Sleeper</option>
          <option value="seater">Seater</option>
        </select>
      </label>
      <label>
        Sort by
        <select value={sortBy} onChange={(event) => onSortChange(event.target.value)}>
          <option value="price">Price: low to high</option>
          <option value="departure">Earliest departure</option>
        </select>
      </label>
    </div>
  );
}

export default Filters;