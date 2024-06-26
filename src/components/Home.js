import { getName } from "../redux/slices/name.slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/pokebola.png";

const Home = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    dispatch(getName(name));
    navigate("/pokedex");
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{
        x: window.innerWidth,
        transition: {
          duration: 0.3,
        },
      }}
      className="containerHome"
    >
      <div className="homeContainer">
        <motion.img
          src={logo}
          alt="Logo"
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            delay: 0.5,
          }}
          className="home__img"
        />
        <h1 className="homeContainer__h1">¡POKEMON APP!</h1>
        <h2 className="homeContainer__h2">
          Para poder comenzar, escribe tu nombre
        </h2>
        <form noValidate onSubmit={submit} className="homeForm" >
          <input
            placeholder="Tu nombre..."
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="homeForm__input"
            maxLength={16}
          />
          <button className="btn">
            <span className="btn__span">COMENZAR</span>
            <i className="btn__i"></i>
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Home;
