// Dashboard.js
import React, { useState, useEffect } from 'react';
import "./dashboard.css";
import banner from "../../Assets/image65.png";
import { IoIosPersonAdd } from "react-icons/io";
import { GiTrophy } from "react-icons/gi";
import Banner2 from "../../Assets/BANNER2.png"
import { MdTimer } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import Addparticpant from '../../Modals/Addparticpant';
import { useSelector } from 'react-redux';
import Footer from '../Footer/Footer';

const ITEMS_PER_PAGE = 10;

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const participants = useSelector((state) => state.Participants.participants);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const filteredParticipants = participants.filter(participant =>
    participant.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredParticipants.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentParticipants = filteredParticipants.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const banners = [
    banner,
    Banner2
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [banners.length]);

  return (
    <>
      <div className="dashboard">
        <div className="header">
          <h1 className="title">LEADERBOARD</h1>
          <div className="header-right">
            <span onClick={toggleModal} className="add-participant">
              <IoIosPersonAdd />
            </span>
          </div>
        </div>

        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div className="carousel" style={{ width: "100vw", objectFit: "contain", margin: "30px 0px" }}>
            <img src={banners[currentBannerIndex]} alt="banner" style={{ height: "35vh", width: "88vw", objectFit: "fill", borderRadius: "1rem" }}  />
          </div>
          </div>
        

        <div className="search-wrapper">
          <FiSearch className="search-icon" />
          <input
            type="text"
            className="search"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className='list-container'>
          <li className='list-row'>
            <div className="name">
              <GiTrophy /> Name
            </div>
            <div className="time">
              <MdTimer /> TIMER
            </div>
          </li>
          {currentParticipants.map((entry, index) => (
            <li key={index} className={`list-row ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}>
              <div className="name">
                {index === 0 && <GiTrophy className="trophy gold" />}
                {index === 1 && <GiTrophy className="trophy silver" />}
                {index === 2 && <GiTrophy className="trophy bronze" />}
                {index + 1 + startIndex}. {entry.Name}
              </div>
              <div className="time">
                {entry.Time}
              </div>
            </li>
          ))}
        </div>

        <div className='pagination'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`pagination-button ${index + 1 === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className='pagination-button'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>

        {isModalOpen && <Addparticpant toggleModal={toggleModal} />}
      </div>
      <Footer/>
    </>
  );
}

export default Dashboard;
