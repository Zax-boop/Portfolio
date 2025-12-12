import supabase from "../general/supabaseclient"

export async function addScrap({ file_path, description, date }) {
  try {
    const fileName = `${Date.now()}_${file_path.name}`
    const { data: storageData, error: storageError } = await supabase.storage
      .from("scrapbook_bucket")
      .upload(fileName, file_path)

    if (storageError) throw storageError
    const { data: publicUrlData } = supabase.storage
      .from("scrapbook_bucket")
      .getPublicUrl(fileName)

    const imageUrl = publicUrlData.publicUrl
    const { data: tableData, error: tableError } = await supabase
      .from("scrapbook")
      .insert([
        {
          description,
          file_path: imageUrl,
          date,
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
