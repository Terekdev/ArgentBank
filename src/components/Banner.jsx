import React from 'react';
import '../sass/components/_Banner.scss';

function Banner () {
    return (
        <div className='banner'>
            <section className='intro'>
                <p className='soustitre'>No fees.</p>
                <p className='soustitre'>No minimum deposit.</p>
                <p className='soustitre'>High interest rates.</p>
                <p className='text'>Open a savings account with Argent Bank today!</p>
            </section>
        </div>
    )
}

export default Banner