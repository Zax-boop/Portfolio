import supabase from "../general/supabaseclient";

/**
 * Fetches rank change per album compared to ~1 week ago
 * @returns {Promise<Object>} keyed by album_id
 */
export default async function getAlbumRankHistory() {
  const { data, error } = await supabase
    .from("album_ranking_history")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching album rank history:", error);
    return {};
  }

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const albumComparisons = {};

  const grouped = {};
  for (const row of data) {
    if (!grouped[row.album_id]) grouped[row.album_id] = [];
    grouped[row.album_id].push(row);
  }

  for (const [albumId, changes] of Object.entries(grouped)) {
    let closest = changes[0];
    let minDiff = Math.abs(new Date(changes[0].updated_at).getTime() - weekAgo.getTime());

    for (const row of changes) {
      const diff = Math.abs(new Date(row.updated_at).getTime() - weekAgo.getTime());
      if (diff < minDiff) {
        closest = row;
        minDiff = diff;
      }
    }

    albumComparisons[albumId] = {
      week_ago_rank: closest.previous_rank,
    };
  }

  return albumComparisons;
}
