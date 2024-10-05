import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
        <div className="banner">

            <img src={imageUrl} alt="aboutImg" />
        </div>
        <div className="banner">
            <p>Biography</p>
            <h3>Who We Are</h3>
            <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente repudiandae unde nulla aspernatur officiis itaque dolorum sed tenetur,
                 ratione corrupti. Est, distinctio officia et voluptatibus eum consequatur placeat vero accusantium eius vel 
                 quasi a doloremque tempora dolor impedit recusandae temporibus, amet atque? Deleniti molestiae quam reiciendis eos veritatis quasi atque.
            </p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            <p>Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat neque deserunt mollitia, ut incidunt voluptates maxime unde aut 
                corporis ipsa nostrum quam libero aspernatur? Esse doloremque provident dolor obcaecati 
                facere quo recusandae animi ducimus vero
            </p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dicta voluptatem eos itaque.</p>
            <p>Lorem, ipsum dolor.</p>

        </div>
    </div>
  )
}

export default Biography