import supabase from "../general/supabaseclient";

export default async function deleteTV(tvId, rank) {
  try {
    const { data: deletedTV, error: deleteError } = await supabase
      .from('tv_rankings')
      .delete()
      .eq('id', tvId);

    if (deleteError) {
      console.error('Error deleting tv:', deleteError);
      return null;
    }
    const { data: tvToUpdate, error: fetchError } = await supabase
      .from('tv_rankings')
      .select('*')
      .gt('rank', rank);

    if (fetchError) {
      console.error('Error fetching tv to update:', fetchError);
      return null;
    }
    tvToUpdate.sort((a, b) => a.rank - b.rank);
    for (const tv of tvToUpdate) {
      const { error: updateError } = await supabase
        .from('tv_rankings')
        .update({ rank: tv.rank - 1 })
        .eq('id', tv.id);

      if (updateError) {
        console.error(`Error updating rank for tv ID ${tv.id}:`, updateError);
        return null;
      }
    }

    return { deletedTV, updatedTV: tvToUpdate };
  } catch (err) {
    console.error('Unexpected error:', err);
    return null;
  }
}
