//about page
import React from 'react';
import Image from 'next/image';
import './page.css';

export default function about() {

    return (
        <div className="about px-6 py-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-4 mb-4 lg:mb-0 text-center">
                <div className="flex-1">
                    <h2 className="about-title text-4xl font-bold mb-4">About Us</h2>
                    <p className="about-description text-lg">
                        At Studium, we believe that focused minds create powerful futures. In a world of endless distractions, we set out to build a study platform that prioritizes <span className="highlight">concentration</span>, <span className="highlight">integrity</span>, and <span className="highlight">smart learning</span>.
                    </p>
                </div>
                
                <div className="flex-1">
                    <Image 
                    className="rounded-md shadow-lg" 
                    src="/images/about-img1.png" 
                    alt="About Image 1" 
                    width={1000} 
                    height={500} 
                    />
                </div>
            </div>
                
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-16 lg:ml-10 lg:mr-10">
                <div className="flex-1">
                    <Image
                    className="rounded-md shadow-lg"
                    src="/images/about-img2.jpg"
                    alt="About Image 2"
                    width={450}
                    height={400}
                    />
                </div>

                <div className="flex-1 text-center lg:text-left mt-4">
                    <h2 className="about-title text-4xl font-bold mb-4 text-center">Our Mission</h2>
                    <ul className="space-y-6 text-base about-description text-center">
                        <li>
                            <p className="feature-heading">Lockdown Mode</p>
                            <p className="text-lg">Helping users stay focused by limiting distractions and browser access during study sessions.</p>
                        </li>

                        <li>
                            <p className="feature-heading">Custom Study Sets</p>
                            <p className="text-lg">Allowing learners to build, organize, and revisit personalized flashcards and material.</p>
                        </li>

                        <li>
                            <p className="feature-heading">AI-Powered Study Tools</p>
                            <p className="text-lg">Offering AI recommendations and dynamic content tailored to your needs.</p>
                        </li>

                        <li>
                            <p className="feature-heading">Focus Mode</p>
                            <p className="text-lg">Encouraging study habits by locking sessions for a set period of uninterrupted learning.</p>
                        </li>

                        <li>
                            <p className="feature-heading">Progress Tracking</p>
                            <p className="text-lg">Keeping a history of study sessions so users can see their growth and patterns.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}