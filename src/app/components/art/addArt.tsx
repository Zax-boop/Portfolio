import React, { useState } from "react"
import supabase from "../../../../utils/general/supabaseclient"

type AddArtProps = {
  onUpload?: () => void
}

export default function AddArt({ onUpload }: AddArtProps) {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [description, setDescription] = useState("")
  const [dateDrawn, setDateDrawn] = useState("")
  const [isGif, setIsGif] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null
    setFile(selected)
    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected))
      setIsGif(selected.type === "image/gif") 
    } else {
      setPreviewUrl(null)
      setIsGif(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return setError("Please select a file")

    setLoading(true)
    setError("")

    try {
      const fileName = `${Date.now()}_${file.name}`
      const { error: storageError } = await supabase.storage
        .from("art_bucket")
        .upload(fileName, file)

      if (storageError) throw storageError
      const { data: publicUrlData } = supabase.storage
        .from("art_bucket")
        .getPublicUrl(fileName)

      const imageUrl = publicUrlData.publicUrl
      const { error: tableError } = await supabase
        .from("art")
        .insert([
          {
            description,
            image: imageUrl,
            date_drawn: dateDrawn,
            gif: isGif,
          },
        ])

      if (tableError) throw tableError

      setFile(null)
      setPreviewUrl(null)
      setDescription("")
      setDateDrawn("")
      setIsGif(false)

      if (onUpload) onUpload()
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error uploading art:", err.message)
        setError(err.message)
      } else {
        console.error("Unexpected error:", err)
        setError("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

return (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col max-w-md w-full p-6 bg-gray-900/90 text-white rounded-2xl shadow-lg gap-4 backdrop-blur-md"
  >
    <h2 className="text-2xl font-bold mb-2">Add New Art</h2>

    <input
      type="file"
      accept="image/*,image/gif"
      onChange={handleFileChange}
      className="p-2 border border-gray-700 rounded bg-gray-800 text-white"
    />

    {previewUrl && (
      <div className="flex justify-center">
        {isGif ? (
          <img
            src={previewUrl}
            alt="GIF Preview"
            className="w-48 h-auto object-cover rounded-xl shadow-md border border-gray-700 mt-2"
          />
        ) : (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-48 h-auto object-cover rounded-xl shadow-md border border-gray-700 mt-2"
          />
        )}
      </div>
    )}

    <input
      type="text"
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="p-2 border border-gray-700 rounded bg-gray-800 text-white"
    />

    <input
      type="date"
      value={dateDrawn}
      onChange={(e) => setDateDrawn(e.target.value)}
      className="p-2 border border-gray-700 rounded bg-gray-800 text-white"
    />

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={isGif}
        onChange={(e) => setIsGif(e.target.checked)}
        className="accent-purple-600"
      />
      Is GIF
    </label>

    {error && <p className="text-red-500">{error}</p>}

    <button
      type="submit"
      disabled={loading}
      className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 disabled:opacity-50"
    >
      {loading ? "Uploading..." : "Upload"}
    </button>
  </form>
)
}
