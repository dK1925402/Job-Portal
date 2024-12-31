import React from 'react';
import { FaWhatsapp } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { SiLinktree } from "react-icons/si";
import { FaHandBackFist } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa6";

import { Box } from '../ui/box.jsx';
import { FaCode } from "react-icons/fa";
import { useIsMobile } from '../Responsive.jsx';


import {Facebook, LinkedIn, Twitter, WhatsApp} from '../ui/icon.jsx';
import { Bounce } from '../ui/bounce.jsx';

const Footer = () => {

 const isMobile = useIsMobile();
 const space = isMobile ? "-space-y-10 flex-col items-start" : "";
 

  return (
    <footer className="bg-gray-800 text-white py-10">


      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info Section */}
          <div className="flex flex-col space-y-4">
           <Bounce> <h2 className="text-2xl text-orange-600 font-extrabold">Sarvagya Nirakar</h2></Bounce>
            <p className="text-sm opacity-80">
              We are working for Youth Empowerment & Nation Building to grow India in every possible way. Join us in making the world a better place.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-blue-600 transition-colors" aria-label="Facebook">
             <Facebook />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-blue-400 transition-colors" aria-label="Twitter">
                <Twitter></Twitter>
              </a>
              <a href="https://www.linkedin.com/company/sarvagya-nirakar-community/" className="text-white hover:text-blue-700 transition-colors" aria-label="LinkedIn">
                <LinkedIn></LinkedIn>
              </a>

              <a href="https://chat.whatsapp.com/JnikmOrj1Uo78vziNxsMIz" target="_blank" rel="noopener noreferrer">
 <WhatsApp></WhatsApp>

</a>



            </div>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-500">Home</a></li>
              <li><a href="/jobs" className="hover:text-blue-500">Jobs</a></li>
              <li><a href="/browse" className="hover:text-blue-500">Browse</a></li>
              <li><a href="/event" className="hover:text-blue-500">Event</a></li>
            </ul>
          </div>

          {/* Join Us Section */}


          {/* Contact Info Section */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <p className="text-sm opacity-80">Have questions? Get in touch with us!</p>

            <div></div>

            <div className='flex justify-center items-center gap-2 bg-teal-500 text-xl py-4 font-bold rounded-xl cursor-pointer' onClick={() => window.location = 'mailto:sarvagyanirakarcommunity@gmail.com'}> <span><MdOutlineEmail  ></MdOutlineEmail></span> Contact Us</div>
          </div>

          <div className="flex flex-col space-y-4 pt-2 m-3">

            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdf_3hpQrXK4QC1pP4qWdH8CwUJGixMWRNvanVZ_u53iyZiRA/viewform"><div className="text-lg font-semibold bg-green-600 p-4 rounded-xl flex items-center justify-center">
              <FaHandBackFist className='m-2' />
              Join Our Community</div></a>

            <a href="https://docs.google.com/forms/d/e/1FAIpQLSduAtyEzXpjdGxSkIVHKPPEfSm61UFWfpIjBLaSp4-vNw_W8A/viewform"><div className="text-lg font-semibold bg-orange-500 p-4 rounded-xl flex items-center justify-center">
              <FaHandshake className='m-2' />
              Patnership With SNC </div></a>


            <a href="https://linktr.ee/sarvagyanirakarcommunity?utm_source=linktree_admin_share"><div className="text-lg font-semibold bg-sky-500 p-4 rounded-xl flex items-center justify-center">
              <SiLinktree className='m-2' />
              Link Tree</div></a>
            {/* <p className="text-sm opacity-80">Stay updated with the latest news .</p> */}

          </div>


        </div>


        
        <div className='flex items-center gap-2 my-5 text-lg font-semibold'> <FaCode></FaCode> Developers Section </div>
                  <div className={`flex border-t border-gray-700 justify-start ${space}`}>
                 

<div><Box name="Azad" git="https://github.com/Azad88101" linkedIn="https://www.linkedin.com/in/azad88101/" ></Box></div>
<div><Box name="Dhruv Kumar" git="https://github.com/dK1925402/" linkedIn="https://www.linkedin.com/dhruv-kumar-0232322a3/" ></Box></div>
<div><Box name="Girdhari Sharma" git="https://github.com/GIRDHARISHARMAAA" linkedIn="https://www.linkedin.com/in/girdhari-sharma-a5b0a5298/" ></Box></div>


                  </div>



        {/* Footer Bottom */}
        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          <p>© 2024 Sarvagya Nirakar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
