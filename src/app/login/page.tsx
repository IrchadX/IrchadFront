"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginImg from "../../../public/assets/loginimg.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // For debugging
    console.log("Attempting login with:", { email });

    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
      console.log("Sending request to:", apiUrl);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
        mode: "cors",
      });

      console.log("Response status:", response.status);

      let data;
      try {
        data = await response.json();
        console.log("Response data:", data);
      } catch (jsonError) {
        console.error("Failed to parse JSON response:", jsonError);
        const textResponse = await response.text();
        console.log("Raw response:", textResponse);
        throw new Error("Invalid response format from server");
      }

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: Authentication failed`);
      }

      // Store the access token and user in localStorage
      localStorage.setItem("accessToken", data.access_token);
      console.log("Token stored successfully");

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("User data stored successfully");

      // Get user role
      const userRole = data.user?.role;

      // Redirect based on role
      if (userRole === "admin") {
        router.push("/admin/users");
      } else if (userRole === "decideur") {
        router.push("/decideur/dashboard");
      } else if (userRole === "commercial") {
        router.push("/commercial/");
      } else {
        router.push("/");
      }

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-cover bg-no-repeat justify-center xl:bg-black" style={{ backgroundColor: "#fff", color: "#000" }}>
      <div className="w-full xl:w-[48%] m-8 xl:m-0 flex flex-col justify-center items-center  bg-white px-[25px] sm:px-[50px] md:px-[107px] gap-[60px] xl:overflow-hidden xl:h-full z-20">
        <div className="flex justify-center w-full">
          <Image src="/assets/logoirchad.png" alt="Login Image" quality={100} priority width={300} height={300} />
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="flex w-full flex-col gap-[25px]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col justify-start gap-4">
              <label className="text-black/90 font-futura font-semibold text-md">Email</label>
              <div className="flex items-center bg-main/5 w-full rounded-[8px] border border-black/30 p-[15px]">
                <MdOutlineMail className="text-gray-500 text-xl mr-3" />
                <input
                  className="bg-transparent w-full focus:outline-none"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col justify-start gap-4">
              <label className="text-black/90 font-futura font-semibold text-md">Mot de passe</label>
              <div className="bg-main/5 flex items-center p-[15px] w-full rounded-[8px] border border-black/30">
                <TbLockPassword className="text-gray-500 text-xl mr-3" />
                <input
                  className="bg-transparent flex-1 focus:outline-none"
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                />
                <span
                  className="cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full font-futura font-medium bg-main p-[12px] text-white rounded-[12px] text-[20px]"
            disabled={isLoading}
          >
            {isLoading ? "Chargement..." : "Se connecter"}
          </button>
        </form>

        <h2 className="font-montserrat text-black text-[14px] font-regular">
          Irchad © 2025. Tous droits réservés. Fièrement conçu par XCEED.
        </h2>
      </div>

      <div className="hidden xl:block xl:relative xl:py-[15px] xl:w-[52%] flex justify-center items-center">
        <Image
          src={loginImg}
          alt="Login Image"
          quality={100}
          priority
          className="object-contain object-center block"
          style={{ maxWidth: "calc(100% - 10px)", maxHeight: "calc(100% - 10px)" }}
        />
      </div>
    </div>
  );
}
