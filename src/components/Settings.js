import { useDispatch, useSelector } from "react-redux";
import { getItem } from "../redux/slices/item.slice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Settings = () => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.item);

  const itemPerPage = (e) => {
    dispatch(getItem(e.target.value));
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
      className="settings"
    >
      <Link className="btn-arrow" to={-1}>
        <i className="bx bx-left-arrow-alt"></i>
      </Link>
      <h1>Settings</h1>
      <div className="setItem">
        <h2>Item per page</h2>
        <select
          onChange={itemPerPage}
          value={item}
          className="setItems__select"
        >
          <option value={4}>4 items</option>
          <option value={8}>8 items</option>
          <option value={12}>12 items</option>
          <option value={16}>16 items</option>
          <option value={20}>20 items</option>
        </select>
      </div>
    </motion.div>
  );
};

export default Settings;
