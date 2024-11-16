"use client"

import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/header';
import PoppingLetters from '../components/poppingLetters';
import BookForm from '../components/bookModal';
import FadeInSection from '../components/fadeIn';
import Image from 'next/image';
import circe from "../../../public/circe.jpg"
import atss from "../../../public/atss.jpg"
import sisyphus from "../../../public/sisyphus.jpg"
import fetchBooks from "../../../utils/fetchBooks.js"
import ImageTrack from '../components/ImageTrack';

export default function TVRanking() {
    const [books, setBooks] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true)
    const bookRefs = useRef<any>([]);

    useEffect(() => {
        const getBooks = async () => {
            const data = await fetchBooks();
            if (data) {
                setBooks(data);
                bookRefs.current = data.map(() => React.createRef());
            }
            setLoading(false);
        };

        getBooks();
    }, []);

    const scrollToBook = (index: any) => {
        if (bookRefs.current[index]) {
            bookRefs.current[index].current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col w-full h-full items-center'>
            <Header />
            <div className="relative flex items-center justify-center w-full h-[80vh] mt-10 overflow-hidden">
                <div className="absolute inset-0 flex w-full h-full overflow-hidden">
                    <div className='w-1/3 h-full'>
                        <Image
                            src={circe}
                            alt='Circe'
                            className={`w-full h-full object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadingComplete={() => setIsLoading(false)}
                        />
                    </div>
                    <div className='w-1/3 h-full'>
                        <Image
                            src={atss}
                            alt='Atss'
                            className={`w-full h-full object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadingComplete={() => setIsLoading(false)}
                        />
                    </div>
                    <div className='w-1/3 h-full'>
                        <Image
                            src={sisyphus}
                            alt='Sisyphus'
                            className={`w-full h-full object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoadingComplete={() => setIsLoading(false)}
                        />
                    </div>
                </div>
                <PoppingLetters text="Books" className="absolute text-white text-6xl font-bold z-10 text-center" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className='mt-4'>
                <ImageTrack data={books} onImageClick={scrollToBook} width={"w-[12rem]"} />
            </div>
            <div className="flex flex-col w-4/5 mt-8">
                <BookForm />
                <p className='mt-1'>*Disclaimer: This is just my opinion and what I enjoyed reading the most regardless of critical bias. Moreover, I chose not to rank the books I read just because each book feels too unique to compare to one another.</p>
                <hr className="border-t border-gray-300" />
                {books.map((book: any, index: number) => (
                    <FadeInSection 
                    key={book.id || `${book.name}-${book.author}-${index}`} 
                    ref={bookRefs.current[index]}
                    className="flex flex-col space-y-4 mt-8">
                        <div className="flex flex-row">
                            <img
                                src={book.image}
                                alt={`${book.name} album cover`}
                                className={`w-[19.14rem] h-[30rem] min-w-[19.14rem] min-h-[30rem] object-cover mb-4 transform transition-transform hover:scale-105 duration-300 ${isLoading
                                    ? "scale-110 blur-2xl grayscale"
                                    : "scale-100 blur-0 grayscale-0"
                                    }`}
                                onLoadedData={e => setIsLoading(false)}
                            />
                            <div className='ml-4'>
                                <p className="text-6xl text-white">{book.name}</p>
                                <p className="text-3xl text-gray-400">{book.author}</p>
                                <p className="text-lg mt-2">{book.comments}</p>
                            </div>
                        </div>
                        {index < books.length - 1 && <hr className="border-t border-gray-300 my-4" />}
                    </FadeInSection>
                ))}
            </div>
        </div>
    );
}
