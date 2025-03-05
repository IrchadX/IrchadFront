"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import loginImg from "../assets/loginimg.png";
import logo from "../assets/logoirchad.png"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <div className="flex h-screen bg-cover bg-no-repeat justify-center xl:bg-black" style={{ backgroundColor: "#fff", color: "#000" }}>
      <div className="w-full xl:w-[48%] m-8 xl:m-0 flex flex-col justify-center items-center  bg-white px-[25px] sm:px-[50px] md:px-[107px] gap-[60px] xl:overflow-hidden xl:h-full z-20" >
   <div className="flex justify-center w-full"> 
      <Image
    src={logo}
    alt="Login Image"
    quality={100}
    priority  
    width={300}
    height={300}
  />
  </div>
        {error && <div className="bg-red-100 text-red-700 px-4 py-3 rounded">{error}</div>}
        <form className="flex w-full flex-col gap-[25px]">
          <input 
            className="bg-main/5 p-[15px] w-full rounded-[8px] border border-black/30" 
            type="email" 
            placeholder="Adresse email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <div className=" bg-main/5 flex p-[15px] w-full rounded-[8px] border  border-black/30 justify-between">
            <input 
              className="bg-transparent border-transparent" 
              type={passwordVisible ? "text" : "password"} 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Mot de passe" 
              required 
            />
            <span onClick={() => setPasswordVisible(!passwordVisible)}>
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </span>
          </div>
          <label className="flex items-center">
            <input 
              type="checkbox" 
              className="mr-2" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)} 
            /> 
            Se souvenir de moi
          </label>
          <button 
            type="submit" 
            className="w-full bg-main p-[12px] text-white rounded-[12px] text-[20px]"
          >
            Se connecter
          </button>
        </form>
      </div>
      
      <div className="hidden xl:block xl:relative xl:py-[15px]  xl:w-[52%] flex justify-center items-center">
  <Image
    src={loginImg}
    alt="Login Image"
    quality={100}
    priority
    className="object-contain object-center block" 
    style={{
      maxWidth: 'calc(100% - 10px)', 
      maxHeight: 'calc(100% - 10px)' 
    }}
  />
</div>
    </div>
  );
}