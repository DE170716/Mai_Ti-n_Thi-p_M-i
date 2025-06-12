import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';

const InvitationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #fff0f5, #ffe4e9, #fcd1d9);
  position: relative;
  overflow: hidden;
  font-family: 'Playfair Display', serif;
  padding: 20px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://www.transparenttextures.com/patterns/flowers.png') repeat;
    opacity: 0.1;
    z-index: 1;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.97);
  max-width: 750px;
  width: 100%;
  border-radius: 35px;
  box-shadow: 0 20px 60px rgba(252, 209, 217, 0.4), 0 0 25px rgba(255, 255, 255, 0.3);
  overflow: hidden;
  position: relative;
  z-index: 2;
  animation: fadeIn 2.5s ease-in-out;

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(60px) scale(0.8); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  @media (max-width: 600px) {
    border-radius: 25px;
    margin: 10px;
  }
`;

const CardHeader = styled.div`
  background: linear-gradient(90deg, #ffe4e9, #fcd1d9);
  padding: 40px;
  text-align: center;
  border-bottom: 5px solid #ffffff;
  position: relative;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent 70%);
    animation: sparkle 4s infinite;
  }

  @keyframes sparkle {
    0% { transform: translate(0, 0); }
    50% { transform: translate(15px, 15px); }
    100% { transform: translate(0, 0); }
  }

  h1 {
    font-size: 3rem;
    color: #4a2c40;
    margin: 0;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    letter-spacing: 1px;
  }

  p {
    font-size: 1.3rem;
    color: #6b4e71;
    margin: 10px 0;
    font-style: italic;
  }

  @media (max-width: 600px) {
    padding: 25px;
    h1 { font-size: 2rem; }
    p { font-size: 1.1rem; }
  }
`;

const CardBody = styled.div`
  padding: 50px;
  text-align: center;

  @media (max-width: 600px) {
    padding: 25px;
  }
`;

const GraduateInfo = styled.div`
  margin-bottom: 30px;

  .photo-frame {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    border: 8px solid #ffffff;
    margin: 0 auto 25px;
    position: relative;
    background: url('/im.jpg') center/cover;
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.5), 0 0 50px rgba(252, 209, 217, 0.3);
    animation: glow 2.5s infinite;

    &:before {
      content: '🌸';
      position: absolute;
      top: -20px;
      left: -20px;
      font-size: 2.5rem;
      animation: spin 10s linear infinite;
    }
    &:after {
      content: '🌸';
      position: absolute;
      bottom: -20px;
      right: -20px;
      font-size: 2.5rem;
      animation: spin 10s linear infinite reverse;
    }
  }

  @keyframes glow {
    0% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.5), 0 0 50px rgba(252, 209, 217, 0.3); }
    50% { box-shadow: 0 0 50px rgba(255, 255, 255, 0.7), 0 0 70px rgba(252, 209, 217, 0.5); }
    100% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.5), 0 0 50px rgba(252, 209, 217, 0.3); }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  h2 {
    font-size: 2.5rem;
    color: #d81b60;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  p {
    font-size: 1.3rem;
    color: #555;
    margin: 5px 0;
  }

  @media (max-width: 600px) {
    .photo-frame {
      width: 180px;
      height: 180px;
      border: 6px solid #ffffff;
    }
    h2 { font-size: 1.8rem; }
    p { font-size: 1.1rem; }
  }
`;

const EventDetails = styled.div`
  background: rgba(255, 240, 245, 0.6);
  padding: 25px;
  border-radius: 20px;
  margin: 25px 0;
  border: 1px solid #ffe4e9;

  h3 {
    font-size: 2rem;
    color: #4a2c40;
    margin: 0 0 15px;
    position: relative;
    display: inline-block;

    &:before {
      content: '✨';
      position: absolute;
      left: -30px;
      font-size: 1.5rem;
    }
    &:after {
      content: '✨';
      position: absolute;
      right: -30px;
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: #333;
    margin: 10px 0;
  }

  @media (max-width: 600px) {
    padding: 15px;
    h3 { font-size: 1.5rem; }
    p { font-size: 1rem; }
  }
`;

const Message = styled.div`
  font-size: 1.2rem;
  color: #6b4e71;
  font-style: italic;
  margin-top: 25px;
  padding: 20px;
  border-left: 5px solid #ffe4e9;
  background: rgba(255, 240, 245, 0.3);

  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 15px;
  }
`;

const Petals = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;

  .petal {
    position: absolute;
    font-size: 1.5rem;
    animation: fall linear infinite;
  }

  @keyframes fall {
    0% { transform: translateY(-100vh) rotate(0deg); }
    100% { transform: translateY(100vh) rotate(720deg); }
  }
`;

const App = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [petals, setPetals] = useState([]);

  // Generate petals for both sides
  useEffect(() => {
    const numberOfPetalsPerSide = 8; // Moderate number of petals
    const leftPetals = Array.from({ length: numberOfPetalsPerSide }).map((_, i) => ({
      id: `${i}-left`,
      left: `${Math.random() * 5}%`, // Very close to left edge
      duration: `${5 + Math.random() * 3}s`, // Smooth animation
      top: `${Math.random() * 100}%`, // Random vertical distribution
    }));
    const rightPetals = Array.from({ length: numberOfPetalsPerSide }).map((_, i) => ({
      id: `${i}-right`,
      left: `${95 + Math.random() * 5}%`, // Very close to right edge
      duration: `${5 + Math.random() * 3}s`,
      top: `${Math.random() * 100}%`,
    }));
    setPetals([...leftPetals, ...rightPetals]);
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
      />
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={100} />}
      <InvitationContainer>
        <Petals>
          {petals.map((petal) => (
            <div
              key={petal.id}
              className="petal"
              style={{
                left: petal.left,
                top: petal.top,
                animationDuration: petal.duration,
                opacity: 0.8, // Subtle transparency
                transform: `rotate(${Math.random() * 360}deg)`, // Random initial rotation
              }}
            >
              🌸
            </div>
          ))}
        </Petals>
        <Card>
          <CardHeader>
            <h1>Thiệp Mời Lễ Tốt Nghiệp</h1>
            <p>Thân mời bạn đến chung vui ngày trọng đại của tôi!</p>
          </CardHeader>
          <CardBody>
            <GraduateInfo>
              <div className="photo-frame"></div>
              <h2>Nguyễn Thị Mai Tiên</h2>
              <p>Cử nhân ngành Khoa Học Tự Nhiên</p>
              <p>Trường Đại học Sư Phạm - ĐHĐN</p>
            </GraduateInfo>
            <EventDetails>
              <h3>Thông Tin Buổi Lễ</h3>
              <p><strong>Thời gian:</strong> 9:00 AM, Chủ Nhật, ngày 21/06/2025</p>
              <p><strong>Địa điểm:</strong> Sảnh A5, 459 Tôn Đức Thắng, Hoà Khánh Nam, Liên Chiểu, Đà Nẵng</p>
            </EventDetails>
            <Message>
              <p>
                Sự hiện diện của bạn là niềm vinh hạnh lớn lao trong khoảnh khắc đáng nhớ này.
                Hãy cùng tôi tạo nên một ngày thật ý nghĩa nhé!
              </p>
            </Message>
          </CardBody>
        </Card>
      </InvitationContainer>
    </>
  );
};

export default App;