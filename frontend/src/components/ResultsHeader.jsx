function ResultsHeader({ count, visible }) {
  return (
    <div className="results-heading">
      <div>
        <p className="eyebrow">TRAVEL OPTIONS</p>
        <h2>Available buses</h2>
      </div>
      {visible && <span className="result-count">{count} buses</span>}
    </div>
  );
}

export default ResultsHeader;