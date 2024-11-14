"use client"

import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import show_placeholder from "../../../public/show_placeholder.svg"
import Image from 'next/image';
import addBook from "../../../utils/addBook"

export default function BookForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [comments, setComments] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [coverImage, setCoverImage] = useState<any>(show_placeholder);
    const [nameFocus, setNameFocus] = useState(false);
    const [authorFocus, setAuthorFocus] = useState(false);
    const [commentFocus, setCommentFocus] = useState(false);

    const handleFileChange = (e: any) => {
        // console.log(e.target.files[0])
        setImageFile(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0])
        setCoverImage(url)
        // setCoverImage(e.target.files[0]);        
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const result = await addBook(name, author, comments, imageFile);
        setIsModalOpen(false);
    };


    return (
        <div className={`flex flex-col w-full items-center justify-center`}>
            <div className={`flex flex-row w-full justify-end`}>
                <label onClick={e => setIsModalOpen(true)} className="flex items-center gap-2 self-start pl-3 mr-4 py-2 bg-black border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                    Add Book
                    <PlusIcon className="w-5 h-5 mr-2" />
                </label>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-black w-full max-w-[60rem] p-6 rounded-lg shadow-lg relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
                        <form onSubmit={handleSubmit} className="space-y-4 flex w-full flex-col">
                            <div className='flex flex-row w-full'>
                                <div className='w-1/2 self-start flex flex-col items-center gap-3'>
                                    <Image src={coverImage} width={255.2} height={400} alt='placeholder' className='transform transition-transform hover:scale-105 duration-300 object-cover w-[15.95rem] h-[25rem]'/>
                                    <label className="flex flex-row justify-center items-center gap-2 pl-3 mr-4 py-2 bg-black border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                                        {coverImage === show_placeholder ? "Choose Cover" : "Change Cover"}
                                        <PlusIcon className="w-5 h-5 mr-2" />
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                                <div className='flex flex-col w-1/2 ml-2 gap-4'>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            className="w-full bg-transparent text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                            placeholder="Book Name"
                                            value={name}
                                            onFocus={e => setNameFocus(true)}
                                            onBlur={() => setNameFocus(false)}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <span
                                            className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${nameFocus || name ? "w-full" : "w-0"
                                                }`}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            className="w-full bg-transparent text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                            placeholder="Author"
                                            value={author}
                                            onFocus={e => setAuthorFocus(true)}
                                            onBlur={() => setAuthorFocus(false)}
                                            onChange={(e) => setAuthor(e.target.value)}
                                        />
                                        <span
                                            className={`absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-300 ${authorFocus || author ? "w-full" : "w-0"
                                                }`}
                                        />
                                    </div>
                                    <div className="relative group">
                                        <textarea
                                            className="w-full bg-transparent text-2xl outline-none text-white border-b-[1px] border-white/[0.2] focus:border-white"
                                            placeholder="Comments"
                                            value={comments}
                                            onFocus={e => setCommentFocus(true)}
                                            onBlur={() => setCommentFocus(false)}
                                            onChange={(e) => setComments(e.target.value)}
                                            rows={3} 
                                        />
                                        <span
                                            className={`absolute bottom-1.5 left-0 h-[2px] bg-white transition-all duration-300 ${commentFocus || comments ? "w-full" : "w-0"
                                                }`}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
