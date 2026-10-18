function ResultsState({ searched, loading, error, hasBuses, hasFilteredBuses, onRetry }) {
  if (!searched) {
    return <MessagePanel icon="↗" title="Where would you like to go?" text="Enter your journey details above to see available buses." />;
  }

  if (loading) {
    return <MessagePanel status icon={<span className="spinner" />} title="Finding your buses..." text="Please wait while we retrieve available trips." />;
  }

  if (error) {
    return (
      <MessagePanel error title="We couldn't load the buses" text={error}>
        <button className="secondary-button" onClick={onRetry}>Try again</button>
      </MessagePanel>
    );
  }

  if (!hasBuses) return <MessagePanel title="No buses found" text="Try a different route or journey date." />;
  if (!hasFilteredBuses) return <MessagePanel title="No buses match your filters" text="Change your AC or seat-type filters to see more buses." />;

  return null;
}

function MessagePanel({ status, error, icon, title, text, children }) {
  return (
    <div className={`message-panel${error ? " error-panel" : ""}`} role={status ? "status" : error ? "alert" : undefined}>
      {icon && <span className={status ? undefined : "message-icon"}>{icon}</span>}
      <h3>{title}</h3>
      <p>{text}</p>
      {children}
    </div>
  );
}

export default ResultsState;