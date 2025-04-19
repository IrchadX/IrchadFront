"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginImg from "../../../../public/assets/loginimg.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    tap: { scale: 0.95 },
    hover: { scale: 1.05 },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
        mode: "cors",
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Authentication failed");

      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/admin/users");
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=" md:py-0 flex flex-col md:flex-row h-screen bg-cover bg-no-repeat justify-center xl:bg-black"
      style={{ backgroundColor: "#fff", color: "#000" }}>
      <div className="pt-10 w-full xl:w-[48%] md:m-8 xl:m-0 flex flex-col justify-center items-center bg-white px-[25px] sm:px-[50px] md:px-[107px] gap-[60px] xl:overflow-hidden xl:h-full z-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex justify-center w-full">
          <Image
            src="/assets/logoirchad.png"
            alt="Login Image"
            quality={100}
            priority
            width={300}
            height={300}
          />
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="bg-red-100 text-red-700 px-4 py-3 rounded">
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full flex-col gap-[25px]"
          onSubmit={handleSubmit}>
          <motion.div
            variants={containerVariants}
            className="flex flex-col gap-8">
            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-start gap-4">
              <label className="text-black/90 font-futura font-semibold text-md">
                Email
              </label>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileFocus={{ scale: 1.01 }}
                className="flex items-center bg-main/5 w-full rounded-[8px] border border-black/30 p-[15px]">
                <MdOutlineMail className="text-gray-500 text-xl mr-3" />
                <input
                  className="bg-transparent w-full focus:outline-none"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col justify-start gap-4">
              <label className="text-black/90 font-futura font-semibold text-md">
                Mot de passe
              </label>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="bg-main/5 flex items-center p-[15px] w-full rounded-[8px] border border-black/30">
                <TbLockPassword className="text-gray-500 text-xl mr-3" />
                <input
                  className="bg-transparent flex-1 focus:outline-none"
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                />
                <motion.span
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}>
                  <FontAwesomeIcon
                    icon={passwordVisible ? faEyeSlash : faEye}
                  />
                </motion.span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            type="submit"
            className="w-full font-futura font-medium bg-main p-[12px] text-white rounded-[12px] text-[20px]"
            disabled={isLoading}>
            {isLoading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ display: "inline-block" }}>
                🔄
              </motion.span>
            ) : (
              "Se connecter"
            )}
          </motion.button>
        </motion.form>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-montserrat text-center text-black text-[14px] font-regular">
          Irchad © 2025. Tous droits réservés. Fièrement conçu par XCEED.
        </motion.h2>
      </div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className=" xl:block xl:relative xl:py-[15px] xl:w-[52%] flex justify-center items-center">
        <Image
          src={loginImg}
          alt="Login Image"
          quality={100}
          priority
          className="object-contain object-center block"
          style={{
            maxWidth: "calc(100% - 10px)",
            maxHeight: "calc(100% - 10px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
