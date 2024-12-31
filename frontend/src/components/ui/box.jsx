import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

export const Box = ({name , git , linkedIn  }) => {
    return (
        <div className="flex flex-col space-y-4 pt-2 m-3">
        
                    <div className={`text-lg font-semibold p-4 rounded-xl flex items-center justify-center gap-2`}>
                      
                      {name}   
                      
                      <div></div>
                      <a href={git}><FaGithub></FaGithub></a>
                      <a href={linkedIn}><FaLinkedin></FaLinkedin></a>
                      </div>  
        </div>
    );
};