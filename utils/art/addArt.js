import supabase from "../general/supabaseclient"

export async function addArt({ file, description, date_drawn, isGif }) {
  try {
    const fileName = `${Date.now()}_${file.name}`
    const { data: storageData, error: storageError } = await supabase.storage
      .from("art_bucket")
      .upload(fileName, file)

    if (storageError) throw storageError
    const { data: publicUrlData } = supabase.storage
      .from("art_bucket")
      .getPublicUrl(fileName)

    const imageUrl = publicUrlData.publicUrl
    const { data: tableData, error: tableError } = await supabase
      .from("art")
      .insert([
        {
          description,
          image: imageUrl,
          date_drawn,
          gif: isGif,
        },
      ])
      .select()

    if (tableError) throw tableError
    return tableData
  } catch (err) {
    console.error("Error adding art:", err.message)
    return null
  }
}
