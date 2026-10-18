
import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import ResultsHeader from "./components/ResultsHeader";
import Filters from "./components/Filters";
import ResultsState from "./components/ResultsState";
import BusCard from "./components/BusCard";
import { searchBuses } from "./api/buses";
import { filterAndSortBuses } from "./utils/busUtils";

function App() {
  const [source, setSource] = useState("Bangalore");
  const [destination, setDestination] = useState("Mumbai");
  const [journeyDate, setJourneyDate] = useState("2026-08-09");

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const [acFilter, setAcFilter] = useState("all");
  const [seatFilter, setSeatFilter] = useState("all");
  const [sortBy, setSortBy] = useState("price");

  async function handleSearch(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSearched(true);
    setBuses([]);

    try {
      const data = await searchBuses({
        source: source.trim(),
        destination: destination.trim(),
        journeyDate,
      });
      setBuses(data.buses);
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Could not connect to the server. Check that the backend is running."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredBuses = filterAndSortBuses(buses, { acFilter, seatFilter, sortBy });

  return (
    <main className="page">
      <Header />

      <section className="hero">
        <p className="eyebrow">YOUR JOURNEY STARTS HERE</p>
        <h1>Find your next bus.</h1>
        <p className="subtitle">
          Compare buses, departure times and fares in one place.
        </p>

        <SearchForm
          source={source}
          destination={destination}
          journeyDate={journeyDate}
          loading={loading}
          onSourceChange={setSource}
          onDestinationChange={setDestination}
          onJourneyDateChange={setJourneyDate}
          onSubmit={handleSearch}
        />
      </section>

      <section className="results-section">
        <ResultsHeader
          count={filteredBuses.length}
          visible={searched && !loading && !error}
        />

        {searched && buses.length > 0 && (
          <Filters
            acFilter={acFilter}
            seatFilter={seatFilter}
            sortBy={sortBy}
            onAcFilterChange={setAcFilter}
            onSeatFilterChange={setSeatFilter}
            onSortChange={setSortBy}
          />
        )}

        <ResultsState
          searched={searched}
          loading={loading}
          error={error}
          hasBuses={buses.length > 0}
          hasFilteredBuses={filteredBuses.length > 0}
          onRetry={handleSearch}
        />

        {!loading && !error && filteredBuses.map((bus) => (
          <BusCard bus={bus} key={bus.trip_id} />
        ))}
      </section>
    </main>
  );
}

export default App;
