import supabase from "../general/supabaseclient";

export default async function deleteGames(gameId, rank) {
  try {
    const { data: deletedGame, error: deleteError } = await supabase
      .from('video_game_rankings')
      .delete()
      .eq('id', gameId);

    if (deleteError) {
      console.error('Error deleting game:', deleteError);
      return null;
    }
    const { data: gamesToUpdate, error: fetchError } = await supabase
      .from('video_game_rankings')
      .select('*')
      .gt('rank', rank);

    if (fetchError) {
      console.error('Error fetching games to update:', fetchError);
      return null;
    }
    gamesToUpdate.sort((a, b) => a.rank - b.rank);
    for (const game of gamesToUpdate) {
      const { error: updateError } = await supabase
        .from('video_game_rankings')
        .update({ rank: game.rank - 1 })
        .eq('id', game.id);

      if (updateError) {
        console.error(`Error updating rank for game ID ${game.id}:`, updateError);
        return null;
      }
    }

    return { deletedGame, updatedGame: gamesToUpdate };
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}
