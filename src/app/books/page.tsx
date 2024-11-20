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
import SignInForm from '../components/signIn';
import DeleteBook from '../components/deleteBook';
import UpdateBookModal from '../components/updateBook';

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
            <SignInForm />
            <div className="relative flex items-center justify-center w-full xs:h-[15rem] sm:h-[30rem] xl:h-[80vh] mt-10 overflow-hidden">
                <div className="absolute inset-0 flex w-full h-full overflow-hidden">
                    <div className='w-1/3 h-full'>
                        <Image
                            src={circe}
                            alt='Circe'
                            className={`w-full h-full object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoad={() => setIsLoading(false)}
                        />
                    </div>
                    <div className='w-1/3 h-full'>
                        <Image
                            src={atss}
                            alt='Atss'
                            priority
                            className={`w-full h-full object-fill duration-700 ease-in-out group-hover:opacity-75 ${isLoading
                                ? "scale-110 blur-2xl grayscale"
                                : "scale-100 blur-0 grayscale-0"
                                }`}
                            onLoad={() => setIsLoading(false)}
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
                            onLoad={() => setIsLoading(false)}
                        />
                    </div>
                </div>
                <PoppingLetters text="Books" className="absolute text-white xs:text-2xl sm:text-6xl font-bold z-10 text-center" />
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className='mt-4'>
                <ImageTrack data={books} onImageClick={scrollToBook} width={"xs:w-[5.336rem] sm:w-[8rem] xl:w-[12rem]"} />
            </div>
            <div className="flex flex-col xs:w-[95%] sm:w-4/5 xs:mt-2 sm:mt-8">
                <BookForm />
                <p className='xs:text-xs sm:text-base sm:mt-2 xl:mt-0'>*Disclaimer: This is just my opinion and what I enjoyed reading the most regardless of critical bias. Moreover, I chose not to rank the books I read just because each book feels too unique to compare to one another.</p>
                <hr className="border-t border-gray-300" />
                {books.map((book: any, index: number) => (
                    <FadeInSection
                        key={book.id || `${book.name}-${book.author}-${index}`}
                        ref={bookRefs.current[index]}
                        className="flex flex-col xl:space-y-4 xs:mt-4 xl:mt-8">
                        <div className="flex flex-row">
                            <img
                                src={book.image}
                                alt={`${book.name} album cover`}
                                className={`xs:h-[10rem] xs:w-[6.38rem] xs:min-h-[10rem] xs:min-w-[6.38rem] sm:h-[15rem] sm:w-[9.57rem] 
                                    sm:min-h-[15rem] sm:min-w-[9.57rem] xl:w-[19.14rem] xl:h-[30rem] xl:min-w-[19.14rem] xl:min-h-[30rem] object-cover mb-4 transform transition-transform hover:scale-105 duration-300 ${isLoading
                                        ? "scale-110 blur-2xl grayscale"
                                        : "scale-100 blur-0 grayscale-0"
                                    }`}
                                onLoadedData={e => setIsLoading(false)}
                            />
                            <div className='xs:ml-2 sm:ml-4 w-full'>
                                <div className='flex flex-row w-full justify-between'>
                                    <p className="xs:text-xl sm:text-4xl xl:text-6xl text-white">{book.name}</p>
                                    <div className='flex flex-row items-center gap-2'>
                                        <DeleteBook id={book.id} />
                                        <UpdateBookModal book={book} />
                                    </div>
                                </div>
                                <p className="xs:text-base sm:text-lg xl:text-3xl text-gray-400">{book.author}</p>
                                <p className="xs:text-[0.5rem] sm:text-sm xl:text-lg xs:mt-0.5 sm:mt-1 xl:mt-2">{book.comments}</p>
                            </div>
                        </div>
                        {index < books.length - 1 && <hr className="border-t border-gray-300 xs:my-1 sm:my-2 xl:my-4"/>}
                    </FadeInSection>
                ))}
            </div>
        </div>
    );
}
