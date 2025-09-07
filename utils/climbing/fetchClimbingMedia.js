import supabase from "../general/supabaseclient";

const fetchClimbingMedia = async () => {
    try {
        const { data, error } = await supabase
            .storage
            .from('climbing')  // Specify the bucket name
            .list('', { recursive: true });  // List all files

        if (error) {
            throw error;
        }

        const filteredFiles = data?.filter((file) => {
            const ext = file.name.split('.').pop()?.toLowerCase();
            return ['jpg', 'jpeg', 'png', 'mp4'].includes(ext || '');
        });

        const filesWithUrls = filteredFiles?.map(file => {
            const filePath = supabase.storage.from('climbing').getPublicUrl(file.name);
            return { name: file.name, url: filePath };
        });
        return filesWithUrls;
    } catch (error) {
        console.error("Error fetching climbing media:", error);
        return [];
    }
};

export default fetchClimbingMedia;
