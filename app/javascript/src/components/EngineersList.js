import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEngineers, engineersState } from '../redux/engineers/engineersSlice';

function EngineersList() {
  const dispatch = useDispatch();
  const { engineers, error, status } = useSelector(engineersState);
  const [selectedEngineer, setSelectedEngineer] = useState(null); // State to store selected engineer
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [currentIndex, setCurrentIndex] = useState(0); // Index of the first engineer to display
  const carouselRef = useRef(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEngineers());
    }
  }, [dispatch, status]);

  const openModal = (engineer) => {
    setSelectedEngineer(engineer);
    const homeMain = document.querySelector('.home-main');
    if (homeMain) {
      homeMain.style.position = 'relative';
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEngineer(null);
    setIsModalOpen(false);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, engineers.length - 1));
  };

  return (
      <div className="engineers-list w-100" style={{ overflowX: 'hidden' }}>
        <button onClick={handlePrevClick} disabled={currentIndex === 0}>Previous</button>

        <div className="carousel" ref={carouselRef} style={{ display: 'flex', flexDirection: 'row', transition: 'transform 0.5s ease' }}>
          {engineers.slice(currentIndex, currentIndex + 3).map((engineer) => (
              <div key={engineer.id} onClick={() => openModal(engineer)} style={{ cursor: 'pointer' }}>
                <img className="engineer-img" src={engineer.photo} alt={engineer.name} />
                <p>{engineer.name}</p>
                <p>{engineer.speciality}</p>
              </div>
          ))}
        </div>
        {isModalOpen && (
            <div className="modal" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}>
              <div className="modal-content d-flex justify-content-start">
                <div>
                  <span className="close" onClick={closeModal}>&times;</span>
                </div>
                <h2>{selectedEngineer.name}</h2>
                <p>{selectedEngineer.speciality}</p>
                {/* Add more details as needed */}
              </div>
            </div>
        )}
        <button onClick={handleNextClick} disabled={currentIndex + 3 >= engineers.length}>Next</button>
      </div>
  );

}

export default EngineersList;
