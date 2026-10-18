function timeToMinutes(time) {
  const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;

  let hours = Number(match[1]) % 12;
  if (match[3].toUpperCase() === "PM") hours += 12;

  return hours * 60 + Number(match[2]);
}

export function filterAndSortBuses(buses, { acFilter, seatFilter, sortBy }) {
  return buses
    .filter((bus) => {
      if (acFilter === "ac" && !bus.is_ac) return false;
      if (acFilter === "non-ac" && bus.is_ac) return false;

      const seatType = (bus.seat_type || "").toLowerCase();
      if (seatFilter === "sleeper" && !seatType.includes("sleeper")) return false;
      if (seatFilter === "seater" && !seatType.includes("seater")) return false;

      return true;
    })
    .sort((a, b) => sortBy === "price"
      ? a.fare - b.fare
      : timeToMinutes(a.departure) - timeToMinutes(b.departure));
}