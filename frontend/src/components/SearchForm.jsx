function SearchForm({
  source,
  destination,
  journeyDate,
  loading,
  onSourceChange,
  onDestinationChange,
  onJourneyDateChange,
  onSubmit,
}) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <label>
        From
        <input value={source} onChange={(event) => onSourceChange(event.target.value)} placeholder="Source city" required />
      </label>
      <label>
        To
        <input value={destination} onChange={(event) => onDestinationChange(event.target.value)} placeholder="Destination city" required />
      </label>
      <label>
        Journey date
        <input type="date" value={journeyDate} onChange={(event) => onJourneyDateChange(event.target.value)} required />
      </label>
      <button className="search-button" type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search buses"}
      </button>
    </form>
  );
}

export default SearchForm;