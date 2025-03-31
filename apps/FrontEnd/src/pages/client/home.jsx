import React, { useState, useEffect  } from 'react'
import Navbar from '../../component/nav'
import Footer from '../../component/footer'
import './client.css'
import { Link } from "react-router-dom";
import steakImage from "../../assets/home_background.png";
import HomeCenter from "../../assets/home_center.jpg";
import DownArrow from "../../assets/down_arrow.png"
import Location from "../../assets/location.png"
import emailjs from 'emailjs-com';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("");
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const db = getDatabase();
        const userRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserRole(data.role);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      email,
      message,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert('Message sent successfully!');
          setEmail('');
          setMessage('');
          setLoading(false);
        },
        (error) => {
          alert('Failed to send message. Please try again.');
          console.error(error);
          setLoading(false);
        }
      );
  };

  return (
    <>
      <Navbar />
      {/* Section 1 */}
      <section className="lg:flex home-top h-screen justify-between items-center p-16 z-10">
        <div className="grid-rows-2">
          <div className="space-y-16">
            <div className="tracking-wider">
              <h1 className="text-5xl font-bold text-yellow-500 text-shadow-black text-shadow-lg">Got plans for tonight's party?</h1>
              <p className="mt-8 text-4xl">Let me help you find a seat!</p>
            </div>
            <div className="flex space-x-8">
                <a href="#about-us" className="text-white px-4 py-2 border-1 border-dashed rounded-full tracking-wider hover:bg-white hover:text-black transition-all duration-200 hover:scale-110">
                  About us
                </a>
                {userRole !== "staff" && ( // ซ่อนปุ่ม Reserve now ถ้าเป็น staff
                  <Link to="/reservation" className="flex items-center bg-yellow-600 shadow-black shadow-lg px-4 py-2 rounded-full leading-none font-bold text-lg tracking-wider hover:bg-transparent hover:border-1 hover:border-yellow-500 transition-all duration-200 hover:scale-110">
                    Reserve now
                  </Link>
                )}
              </div>

          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-200 hover:scale-120">
          <a href="#about-us"><img src={DownArrow} alt="icon" className="h-16" /></a>
        </div>

        <div>
          <img src={steakImage} alt="Steak" className="w-120" />
        </div>
      </section>

      {/* Section 2 */}
      <section id="about-us" className="home-center flex justify-between items-center lg:flex">
        <div className="w-1/2 ml-10 space-y-12 tracking-wider">
          <h1 className="text-4xl font-bold tracking-widest">
            Why QUEUETY?
          </h1>
          <p className="text-md">
            Skip the long lines! QUEUETY helps you book your restaurant queue in advance, ensuring a smooth and stress-free dining experience, while listening to live music every night.
          </p>
          <p className="text-md">
            See you at KMUTNB 1518 Pracharat 1 Road, Wongsawang, Bangsue, Bangkok 10800
          </p>
          <div className="flex items-end gap-2">
            <img src={Location} alt="icon" className="h-6 " />
            <a href="https://maps.app.goo.gl/cVtarRDmgXwUcxC58" target="_blank" rel="noopener noreferrer" className="text-gray-300 underline underline-offset-4 hover:text-white transition-all duration-200">view on map</a>
          </div>
        </div>

        <div>
          <img src={HomeCenter} alt="img" className="h-90" />
        </div>
      </section>

      {/* Section 3 - Contact Us */}
      <section id="contact-us" className="home-bottom flex justify-center p-16 mb-0">
        <form className="w-1/2" onSubmit={handleSubmit}>
          <h2 className="text-4xl font-bold tracking-wider">
            Contact us
          </h2>
          <p className="tracking-wider mt-4">
            Need assistance or have a question? Let me help you.
          </p>
          <div className="mt-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              className="input text-black w-full mt-1 p-2 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mt-6">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="block p-2 w-full text-sm text-black bg-white rounded-lg border focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message..."
              required
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-600 shadow-black shadow-lg px-4 py-2 rounded-full leading-none font-bold text-lg tracking-wider hover:bg-transparent hover:border-1 hover:border-yellow-500 transition-all duration-200 hover:scale-110"
            >
              {loading ? 'Sending...' : 'SUBMIT'}
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  )
}

export default Home;
