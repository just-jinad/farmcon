import React from 'react';

const Card = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-4 p-4" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="card16 bg-white shadow-md rounded-lg overflow-hidden" style={{ width: '15rem' }}>
          <img src="https://i.pinimg.com/564x/73/fc/b6/73fcb675e2a92cb12d6532141bfb7fc5.jpg" className="card-img-top w-full h-48 object-cover" alt="Card 1" />
          <div className="p-4">
            <h5 className="card-title font-bold text-lg">Card Title 1</h5>
            <h6 className="card-subtitle mb-2 text-gray-600">Card Subtitle 1</h6>
            <p className="card-text text-gray-700">
              This is a short description for card 1.
            </p>
          </div>
        </div>

        <div className="card16 bg-white shadow-md rounded-lg overflow-hidden" style={{ width: '15rem' }}>
          <img src="https://i.pinimg.com/564x/73/fc/b6/73fcb675e2a92cb12d6532141bfb7fc5.jpg" className="card-img-top w-full h-48 object-cover" alt="Card 2" />
          <div className="p-4">
            <h5 className="card-title font-bold text-lg">Card Title 2</h5>
            <h6 className="card-subtitle mb-2 text-gray-600">Card Subtitle 2</h6>
            <p className="card-text text-gray-700">
              This is a short description for card 2.
            </p>
          </div>
        </div>

        <div className="card16 bg-white shadow-md rounded-lg overflow-hidden" style={{ width: '15rem' }}>
          <img src="https://i.pinimg.com/564x/59/72/c8/5972c81c39a2a36158e9a782674821de.jpg" className="card-img-top w-full h-48 object-cover" alt="Card 3" />
          <div className="p-4">
            <h5 className="card-title font-bold text-lg">Card Title 3</h5>
            <h6 className="card-subtitle mb-2 text-gray-600">Card Subtitle 3</h6>
            <p className="card-text text-gray-700">
              This is a short description for card 3.
            </p>
          </div>
        </div>

        <div className="card16 bg-white shadow-md rounded-lg overflow-hidden" style={{ width: '15rem' }}>
          <img src="https://i.pinimg.com/564x/20/de/e2/20dee2e437354a7fdee5abf6f8ec631f.jpg" className="card-img-top w-full h-48 object-cover" alt="Card 4" />
          <div className="p-4">
            <h5 className="card-title font-bold text-lg">Card Title 4</h5>
            <h6 className="card-subtitle mb-2 text-gray-600">Card Subtitle 4</h6>
            
          </div>
            <button className="card16-btn">Learn more</button>
        </div>

        <div className="card16">
      <div className="card16-header">
        <img src="https://images.pexels.com/photos/33227/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&w=600" alt="nature-pic-CSSnippets"/>
      </div>
      <div className="card16-details">
        <h1 className="card16-title">Title</h1>
        <p className="card16-text">
          Lorem Ipsum is simply dummy text.
        </p>
        <button className="card16-btn">Learn more</button>
      </div>
    </div>
      </div>




      
    </>
  );
};

export default Card;
