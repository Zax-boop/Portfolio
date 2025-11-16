import supabase from "../general/supabaseclient";

const fetchSportsMedia = async () => {
  try {
    const { data, error } = await supabase
      .from("sports")
      .select("file_path, sport, favorite");

    if (error) {
      throw error;
    }

    const filteredFiles = data?.filter((file) => {
      const ext = file.file_path.split('.').pop()?.toLowerCase();
      return ['jpg', 'jpeg', 'png', 'mp4'].includes(ext || '');
    });

    const filesWithUrls = filteredFiles?.map(file => {
      const { data: urlData, error: urlError } = supabase.storage
        .from("climbing") 
        .getPublicUrl(file.file_path);

      if (urlError) {
        console.error("Error getting public URL for", file.file_path, urlError);
      }

      return {
        name: file.file_path,
        url: urlData?.publicUrl || "",
        sport: file.sport,
        favorite: file.favorite
      };
    });

    return filesWithUrls;
  } catch (error) {
    console.error("Error fetching sports media:", error);
    return [];
  }
};

export default fetchSportsMedia;
