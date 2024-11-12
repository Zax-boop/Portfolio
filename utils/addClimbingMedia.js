import supabase from "./supabaseclient";

export default async function addClimbingMedia(mediaFile) {
  let mediaURL = "";

  if (mediaFile) {
    const fileName = `${Date.now()}_${mediaFile.name}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from('climbing') 
      .upload(fileName, mediaFile);

    if (storageError) {
      console.error('Error uploading image:', storageError);
      return null;
    }
    
    mediaURL = supabase.storage.from('climbing').getPublicUrl(fileName).data.publicUrl;
  }
  return mediaURL;
}
