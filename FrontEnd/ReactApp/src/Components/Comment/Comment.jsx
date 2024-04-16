import React from 'react';


const CommentList = () => {
    return (
        <section className="dark:bg-gray-900 py-8 lg:py-16 antialiased">
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-100 dark:text-white">Comments (20)</h2>
                </div>
                <form className="mb-6">
                    <div className="py-2 px-3 mb-4 rounded-lg rounded-t-lg border border-gray-400 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="3"
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                            placeholder="Write a comment..." required></textarea>
                    </div>
                    <button type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Post comment
                    </button>
                </form>
                <article className="p-6 text-base rounded-lg dark:bg-gray-900">
                    <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                            <p className="inline-flex items-center mr-3 text-sm text-gray-100 dark:text-white font-semibold"><img
                                className="mr-2 w-6 h-6 rounded-full"
                                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                alt="Michael Gough" />Michael Gough</p>
                            <p className="text-sm text-gray-400 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                                title="February 8th, 2022">Feb. 8, 2022</time></p>
                        </div>
                     
                    </footer>
                    <p className="text-gray-100 dark:text-gray-300">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                        instruments for the UX designers. The knowledge of the design tools are as important as the
                        creation of the design strategy.</p>
                </article>
            </div>
        </section>
    );
};

export default CommentList;
