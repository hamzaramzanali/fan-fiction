import React from 'react'
import DailyCharacter from '../components/DailyCharacter';

function HomePage() {
    return (
        <div>
             {/* <DailyCharacter /> */}
            <div className="wrapper">
                <div className="news-item hero-item">
                </div>
                <div className="news-item standard-item">
                <div>
                        <h3 className='blurb'>
                            Calling all Marvel Fans! Join us on the journey to create your own marvel fan fiction adventure. Given prompts to start you off based on characters, comics, movies, games and more, you are able to add your own edge of creativity.
                        </h3>
                    </div>
                </div>
                <div className="news-item standard-item">
                </div>
                <div className="news-item standard-item">
                </div>
            </div>
        </div>
    )
}

export default HomePage;