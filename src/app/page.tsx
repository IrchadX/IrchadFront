"use client";

import { useState, useEffect, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex((prev) => (prev + 1) % images.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const response = await api.post("/auth", { email, password });
  //     const { accessToken, user } = response.data;

  //     if (accessToken) {
  //       localStorage.setItem("authToken", accessToken);
  //       localStorage.setItem("userRole", user.role);
  //       router.push("/");
  //     } else {
  //       setError("No token received from server. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     if (axios.isAxiosError(error)) {
  //       if (error.response) {
  //         setError(
  //           error.response.data.error || "Invalid credentials. Please try again."
  //         );
  //       } else {
  //         setError("No response from server. Please try again.");
  //       }
  //     } else {
  //       setError("An unexpected error occurred. Please try again later.");
  //     }
  //   }
  // };

  return (
    <div className="flex h-screen bg-cover bg-no-repeat justify-center xl:bg-black" style={{ backgroundColor: "#fff", color: "#000" }}>
      <div className="w-full xl:w-[48%] m-8 xl:m-0 flex flex-col justify-center bg-white px-[25px] sm:px-[50px] md:px-[107px] gap-[60px] xl:overflow-hidden xl:h-full z-20" style={{ boxShadow: "0px 4px 10px 0px rgba(29, 28, 28, 0.15)" }}>
        <h1 className="font-poppins font-semibold text-[24px] text-PrimaryBlack">Bienvenue! 👋</h1>
        {error && <div className="bg-red-100 text-red-700 px-4 py-3 rounded">{error}</div>}
        <form  className="flex flex-col gap-[25px]">
          <input className="p-[15px] w-full rounded-[15px] border" type="email" placeholder="Adresse email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div className="flex p-[15px] w-full rounded-[15px] border justify-between">
            <input className="bg-transparent border-transparent" type={passwordVisible ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" required />
            <span onClick={() => setPasswordVisible(!passwordVisible)}>
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </span>
          </div>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /> Se souvenir de moi
          </label>
          <button type="submit" className="w-full bg-green p-[12px] text-white rounded-[30px] text-[20px]">Se connecter</button>
        </form>
      </div>
      <div className="hidden xl:block xl:w-[52%] relative">
        <div className="absolute inset-0 flex justify-center items-center z-20">
          {/* <Image src={logo} alt="Logo Chu" width={250} height={250} /> */}
        </div>
        <div className="absolute inset-0 bg-[#0F5012] bg-opacity-50 z-10" />
        {/* {images.map((src, index) => (
          <Image key={index} src={src} alt={`Login Image ${index + 1}`} layout="fill" objectFit="cover" className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`} />
        ))} */}
      </div>
    </div>
  );
}