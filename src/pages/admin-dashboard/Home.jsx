import React from 'react'
// import Card from '../../components/frontcomponent/Card'
import Typewriter from '../../components/frontcomponent/Typewriter'
import wheat from '../../assets/images/wheat image.png'
import corn from '../../assets/images/wheat image.png'

import Footer from '../../components/frontcomponent/Footer'

const Home = () => {
 
  return (
   <>
    <div className="container-fluid" >
    <div className="col-md-6 text-center p-4 md:p-10">
      <h4 className="mt-4 mb-4 text-xl">🌱 Grow. Snap. Sell. Buy.🌱</h4>
      <p className="text-base" data-aos="fade-up">
        <Typewriter
          text="Welcome to FarmCon, your number one online platform for buying and selling farm produce"
          speed={50}
        />
        <br />
        With FarmCon, selling your farm-fresh goods has never been easier. From the fertile lands of Nigeria to your customers' tables, the process is simple. Cultivate your crops with care, capture their vibrant essence in a snap, and upload them to FarmCon.
      </p>
      <button className='button39 mt-3 text-green-600  '>
        
         Get started
       </button>
    </div>

    <div className="col-md-6 flex justify-center items-center md:justify-end md:items-start mt-3 mb-3">
      {/* <img
        className="rounded-lg mt-2 w-full md:w-4/5 lg:w-3/5 max-h-96"
        src="https://i.pinimg.com/736x/e1/04/b7/e104b7ba5937fa428b036581bc3876dc.jpg"
        alt=""
      /> */}
    </div>

</div>
    

      <div>
      <div className="container mx-auto p-8">
        <h3 className="text-2xl text-center font-semibold mb-4">Why Choose Us</h3>
        <p className="text-lg mb-8 text-center">
          At FarmCon, we understand the unique challenges and opportunities that Nigerian farmers face. That's why we've created a platform specifically tailored to meet the needs of local farmers like you. Here are just a few reasons why you should choose FarmCon:
        </p>
     

      <div className="flex flex-wrap -mx-4 ">
        <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
          <div className="mb-6">
            <i className="bi bi-truck text-4xl"></i>
            <h6 className="text-xl font-semibold mt-2">Seamless Selling Experience</h6>
            <p className="text-sm mt-1">
              With FarmCon, selling your goods is quick, easy, and hassle-free. Our user-friendly platform allows you to upload photos of your produce, set your prices, and connect with eager buyers from across Nigeria.
            </p>
          </div>

          <div className="mb-6">
            <i className="bi bi-alarm text-4xl"></i>
            <h6 className="text-xl font-semibold mt-2">24/7 support</h6>
            <p className="text-sm mt-1">
              As a FarmCon member, you'll have access to a wealth of resources and support to help you succeed. From marketing tips to agricultural advice, we're here to help you grow your business and achieve your goals.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-4">
          <div className="mb-6">
            <i className="bi bi-shop text-4xl"></i>
            <h6 className="text-xl font-semibold mt-2">Fair and Transparent Pricing</h6>
            <p className="text-sm mt-1">
              Our streamlined online platform makes shopping effortless, offering an intuitive browsing experience to find your perfect pieces with ease.
            </p>
          </div>

          <div className="mb-6 p-2">
            <i className="bi bi-tools text-4xl"></i>
            <h6 className="text-xl font-semibold mt-2">Empowering Local Farmers</h6>
            <p className="text-sm mt-1">
              FarmCon is committed to empowering Nigerian farmers by providing them with a direct avenue to showcase and sell their produce. We believe in the importance of supporting local agriculture and helping farmers thrive in their communities.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 mx-auto">
        {/* <img
          className=""
          src="https://i.pinimg.com/564x/2c/51/7b/2c517b86dcfe44019cb2a9beb9847212.jpg"
          alt=""
        /> */}
      </div>
    </div>
        </div>

        <div className="container mx-auto p-4 flex flex-wrap">
      <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
        <img
          className="rounded-lg w-full h-auto"
          src="https://i.pinimg.com/564x/60/33/07/60330796f0538d179979516bc159f4eb.jpg"
          alt="Farming"
        />
      </div>
      <div className="w-full lg:w-2/3 px-4">
        <h3 className="text-2xl font-semibold mb-4">FarmCon - Your Simple Farming Solution</h3>
        <p className="text-lg mb-8">
          At FarmCon, we're here to offer a straightforward platform to help you kickstart your farming journey. As a budding farmer, you may not have a large team behind you, and that's okay. Here's what we bring to the table:
        </p>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
            <h6 className="text-xl font-semibold mb-2">Easy Listing Process</h6>
            <p className="text-sm mb-4">
              List your farm produce quickly and effortlessly on FarmCon's platform. With just a few simple steps, you can showcase your goods to potential buyers without any hassle.
            </p>

            <h6 className="text-xl font-semibold mb-2">Transparent Transactions</h6>
            <p className="text-sm mb-4">
              Experience transparent transactions with FarmCon's secure payment system. We prioritize honesty and integrity in all our dealings, ensuring a fair and trustworthy marketplace for all.
            </p>
          </div>

          <div className="w-full md:w-1/2 px-4">
            <h6 className="text-xl font-semibold mb-2">User-Friendly Interface</h6>
            <p className="text-sm mb-4">
              Navigate FarmCon's user-friendly platform with ease. Our simple interface makes it easy to upload listings, connect with buyers, and manage your farm business efficiently, even with just one person.
            </p>

            <h6 className="text-xl font-semibold mb-2">Basic Farming Tips and Resources</h6>
            <p className="text-sm mb-4">
              Access basic farming tips and resources tailored for beginners. While we may not have a large team of experts, we strive to provide helpful information and guidance to support you along the way.
            </p>
          </div>
        </div>
        <button
          className="bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Explore
        </button>
      </div>
    </div>

        <div className="flex justify-center items-center">
      <h5 className='text-3xl'>What would you like to sell? or buy </h5>

        </div>
    <div className="relative flex items-center justify-center mt-40 bg-gray-800">
     
      <div  className="circle-ball  border border-green-300   p-2  ext-white flex items-center justify-center">
      <img src={corn}  alt="" />
      </div>
      <div className="circle-ball   border   text-white flex items-center justify-center">
        <img src={wheat}  alt="" />
      </div>
      <div className="circle-ball   border    text-white flex items-center justify-center">
      <img src={corn}  alt="" />
      </div>
      <div className="circle-ball       text-white flex items-center justify-center">
      <img src={wheat}  alt="" />
      </div>
      <div className="circle-ball     border text-white flex items-center justify-center">
        <img src={corn}  alt="" />
      </div>
      <div className="circle-ball    border  text-white flex items-center justify-center">
      <img src={wheat}  alt="" />
      </div>
    </div>

    <Footer/>
   </>
  )
}

export default Home