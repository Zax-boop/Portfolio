import { useState } from "react";
import supabase from "../../../../utils/general/supabaseclient";
import { PlusIcon } from "lucide-react";

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void; 
}

const AddMediaModal = ({ isOpen, onClose, onUploadSuccess }: AddMediaModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sportInput, setSportInput] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !sportInput) return;

    setUploading(true);
    try {
      const { error: uploadError } = await supabase.storage
        .from("climbing")
        .upload(selectedFile.name, selectedFile, { upsert: true });

      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase
        .from("sports")
        .insert({
          file_path: selectedFile.name,
          sport: sportInput,
          favorite: isFavorite,
        });

      if (insertError) throw insertError;

      setSelectedFile(null);
      setSportInput("");
      setIsFavorite(false);
      onClose();

      onUploadSuccess();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload media. Check console.");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 text-black">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <PlusIcon className="w-5 h-5" /> Add New Media
        </h2>

        <div className="flex flex-col gap-4">
          <input type="file" onChange={handleFileChange} />

          <input
            type="text"
            placeholder="Sport (e.g. climbing, skating)"
            value={sportInput}
            onChange={(e) => setSportInput(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
            />
            Favorite
          </label>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Media"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMediaModal;
